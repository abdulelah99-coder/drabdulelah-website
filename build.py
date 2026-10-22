#!/usr/bin/env python3
"""Builds the static site into ./dist (or ./preview with --preview).

  python3 build.py            -> dist/     clean URLs, for your domain
  python3 build.py --preview  -> preview/  links end in index.html, for local viewing

No dependencies beyond Python 3. Edit config.py and content.py, then rebuild.
"""
import json, os, re, shutil, sys, html, posixpath, datetime
from pathlib import Path

import config as C
from content import UI, HOME, ABOUT, CONTACT, P, PROCEDURES

ROOT = Path(__file__).parent
PREVIEW = "--preview" in sys.argv
OUT = ROOT / ("preview" if PREVIEW else "dist")
SITE = C.SITE_URL.rstrip("/")
TODAY = datetime.date.today().isoformat()
LANGS = ["ar", "en"]
esc = html.escape

# ------------------------------------------------------------------ paths
def page_dir(lang, slug):
    parts = [] if lang == "ar" else ["en"]
    if slug:
        parts.append(slug)
    return "/".join(parts)

def abs_url(lang, slug):
    d = page_dir(lang, slug)
    return f"{SITE}/{d + '/' if d else ''}"

def rel(cur, target_dir, is_page=True):
    """Relative link from the page at dir `cur` to dir/file `target_dir`."""
    r = posixpath.relpath(target_dir or ".", cur or ".")
    if not is_page:
        return r
    r = "" if r == "." else r + "/"
    if PREVIEW:
        r += "index.html"
    return r or "./"

def asset(cur, name):
    return rel(cur, "assets/" + name, is_page=False)

def wa_link(lang, text=""):
    """Plain number wins (lets us pre-fill the message); otherwise the business link."""
    from urllib.parse import quote
    if C.WHATSAPP:
        return f"https://wa.me/{C.WHATSAPP}" + (f"?text={quote(text)}" if text else "")
    return getattr(C, "WHATSAPP_LINK", "") or None

# ------------------------------------------------------------------ art
NOSE_SVG = """<svg class="sketch" viewBox="10 20 290 490" role="img" aria-label="{label}" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path class="grid" d="M10 60H300M10 140H300M10 220H300M10 300H300M10 380H300M10 460H300M70 20V510M150 20V510M230 20V510"/>
    <path class="guide" d="M158 198L171 112M158 198L238 302M192 330L250 314M192 330L204 404"/>
    <path class="arc" d="M162 172A26 26 0 0 1 174 216"/>
    <path class="arc" d="M216 323A24 24 0 0 1 197 353"/>
    <path class="lead" d="M134 190H160M134 342H194"/>
    <path class="face" d="M150 30C160 90 170 140 165 175C162 188 156 192 158 200L228 290C240 305 236 318 222 322C212 325 200 326 192 330C196 345 202 355 201 366C198 374 190 378 190 383C195 390 200 395 197 402C192 412 182 418 183 428C186 445 200 458 198 472C195 488 180 495 165 505"/>
  </g>
  <g class="lbl">
    <text x="128" y="186">{nf}</text><text x="128" y="206" class="v">115°–130°</text>
    <text x="128" y="338">{nl}</text><text x="128" y="358" class="v">95°–110°</text>
  </g>
</svg>"""

FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#096174"/><path d="M24 10C27 22 29 30 28 36L42 50C44 53 42 55 39 55L31 56" fill="none" stroke="#C6A14A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>"""

# ------------------------------------------------------------------ head
def font_faces(cur):
    rules = []
    fam = {
        "Plex": ("ibm-plex-sans-arabic", [400, 500, 600], ["arabic", "latin"]),
        "Amiri": ("amiri", [400, 700], ["arabic"]),
        "Cormorant": ("cormorant-garamond", [500, 600], ["latin"]),
    }
    for name, (pkg, weights, subsets) in fam.items():
        for w in weights:
            for s in subsets:
                f = f"{pkg}-{s}-{w}-normal.woff2"
                rules.append(f"@font-face{{font-family:'{name}';font-style:normal;font-weight:{w};font-display:swap;"
                             f"src:url({asset(cur,'fonts/'+f)}) format('woff2');unicode-range:{RANGES[s]}}}")
    return "\n".join(rules)

RANGES = {
    "arabic": "U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC",
    "latin": "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
}

def physician_ld():
    same = [u for u in C.SOCIAL.values() if u]
    d = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "@id": SITE + "/#physician",
        "name": C.NAME_EN,
        "alternateName": [C.NAME_AR, C.NAME_EN_SHORT, C.NAME_AR_SHORT],
        "description": C.TITLE_EN,
        "url": SITE + "/",
        "image": SITE + "/assets/" + (C.PORTRAIT or "og.png"),
        "medicalSpecialty": ["Otolaryngologic", "PlasticSurgery"],
        "knowsLanguage": ["ar", "en"],
        "address": {"@type": "PostalAddress", "addressLocality": "Riyadh", "addressRegion": "Riyadh Region", "addressCountry": "SA"},
        "areaServed": {"@type": "City", "name": "Riyadh"},
        "availableService": [{"@type": "MedicalProcedure", "name": P[s]["en"]["schema_name"],
                              "url": abs_url("en", s)} for s in PROCEDURES],
    }
    if C.PHONE: d["telephone"] = C.PHONE
    if C.EMAIL: d["email"] = C.EMAIL
    if same: d["sameAs"] = same
    return d

def ld_script(obj):
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False, separators=(",", ":")) + "</script>"

def head(lang, slug, title, desc, extra_ld=()):
    cur = page_dir(lang, slug)
    other = "en" if lang == "ar" else "ar"
    canon = abs_url(lang, slug)
    lds = [physician_ld(), *extra_ld]
    preload = "ibm-plex-sans-arabic-arabic-400-normal.woff2" if lang == "ar" else "ibm-plex-sans-arabic-latin-400-normal.woff2"
    return f"""<!doctype html>
<html lang="{lang}" dir="{'rtl' if lang=='ar' else 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
{'' if C.INDEXABLE else '<meta name="robots" content="noindex, nofollow">'}
<link rel="canonical" href="{canon}">
<link rel="alternate" hreflang="ar" href="{abs_url('ar', slug)}">
<link rel="alternate" hreflang="en" href="{abs_url('en', slug)}">
<link rel="alternate" hreflang="x-default" href="{abs_url('ar', slug)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(C.NAME_AR_SHORT if lang=='ar' else C.NAME_EN_SHORT)}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/assets/og.png">
<meta property="og:locale" content="{'ar_SA' if lang=='ar' else 'en_US'}">
<meta property="og:locale:alternate" content="{'en_US' if lang=='ar' else 'ar_SA'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#096174">
<link rel="icon" href="{asset(cur,'favicon.png')}" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="{asset(cur,'apple-touch-icon.png')}">
<link rel="preload" href="{asset(cur,'fonts/'+preload)}" as="font" type="font/woff2" crossorigin>
<style>{font_faces(cur)}</style>
<link rel="stylesheet" href="{asset(cur,'site.css')}">
{chr(10).join(ld_script(o) for o in lds)}
</head>"""

# ------------------------------------------------------------------ chrome
def nav_links(lang, cur):
    u = UI[lang]
    items = [("", u["nav_home"]), ("about", u["nav_about"])]
    items += [(s, P[s][lang]["nav"]) for s in PROCEDURES]
    items += [("contact", u["nav_contact"])]
    return items

def header(lang, slug):
    u = UI[lang]
    cur = page_dir(lang, slug)
    other = "en" if lang == "ar" else "ar"
    name = C.NAME_AR_SHORT if lang == "ar" else C.NAME_EN_SHORT
    sub = "استشاري أنف وأذن وحنجرة وتجميل الوجه" if lang == "ar" else "Consultant ENT & Facial Plastic Surgeon"
    links = []
    for s, label in nav_links(lang, cur):
        aria = ' aria-current="page"' if s == slug else ""
        links.append(f'<li><a href="{rel(cur, page_dir(lang, s))}"{aria}>{esc(label)}</a></li>')
    proc_links = "".join(links[2:6])
    main_links = links[0] + links[1] + f'<li class="has-sub"><span>{u["nav_procedures"]}</span><ul>{proc_links}</ul></li>' + links[6]
    return f"""<body>
<a class="skip" href="#main">{u['skip']}</a>
<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="{rel(cur, page_dir(lang, ''))}">
      <img src="{asset(cur,'logo-tile.png')}" alt="" width="44" height="44">
      <span><strong>{esc(name)}</strong><small>{esc(sub)}</small></span>
    </a>
    <nav class="nav-desk" aria-label="{u['menu']}"><ul>{main_links}</ul></nav>
    <div class="head-actions">
      <a class="lang" href="{rel(cur, page_dir(other, slug))}" hreflang="{other}" lang="{other}" aria-label="{u['switch_label']}">{u['switch']}</a>
      <a class="btn btn-sm" href="{rel(cur, page_dir(lang, 'contact'))}">{u['book']}</a>
      <details class="nav-mob"><summary aria-label="{u['menu']}"><span></span><span></span><span></span></summary>
        <nav aria-label="{u['menu']}"><ul>{''.join(links)}</ul></nav></details>
    </div>
  </div>
</header>
<main id="main">"""

def footer(lang, slug):
    u = UI[lang]
    cur = page_dir(lang, slug)
    name = C.NAME_AR if lang == "ar" else C.NAME_EN
    title = C.TITLE_AR if lang == "ar" else C.TITLE_EN
    locs = "".join(
        f'<li>{esc(l[lang])}<br><span class="muted">{esc(l["city_"+lang])}</span>'
        + (f' · <a href="{esc(l["maps"])}" rel="noopener">{u["map"]}</a>' if l.get("maps") else "") + "</li>"
        for l in C.LOCATIONS)
    contact = []
    if wa_link(lang): contact.append(f'<li><a href="{wa_link(lang)}" rel="noopener">{u["whatsapp"]}</a></li>')
    if C.PHONE: contact.append(f'<li><a href="tel:{re.sub(r"[^0-9+]", "", C.PHONE)}" dir="ltr">{esc(C.PHONE)}</a></li>')
    if C.EMAIL: contact.append(f'<li><a href="mailto:{esc(C.EMAIL)}">{esc(C.EMAIL)}</a></li>')
    contact.append(f'<li><a href="{rel(cur, page_dir(lang,"contact"))}">{u["nav_contact"]}</a></li>')
    social = "".join(f'<li><a href="{esc(v)}" rel="noopener me">{k.capitalize() if k!="x" else "X"}</a></li>' for k, v in C.SOCIAL.items() if v)
    procs = "".join(f'<li><a href="{rel(cur, page_dir(lang, s))}">{esc(P[s][lang]["nav"])}</a></li>' for s in PROCEDURES)
    scfhs = f'<p>{u["scfhs"]}: <span dir="ltr">{esc(C.SCFHS_NO)}</span></p>' if C.SCFHS_NO else ""
    return f"""</main>
<footer class="site-foot">
  <div class="wrap foot-grid">
    <div><p class="foot-name">{esc(name)}</p><p class="muted">{esc(title)}</p>{scfhs}</div>
    <div><h2>{u['nav_procedures']}</h2><ul>{procs}</ul></div>
    <div><h2>{u['locations']}</h2><ul>{locs}</ul></div>
    <div><h2>{u['contact']}</h2><ul>{''.join(contact)}{social}</ul></div>
  </div>
  <div class="wrap foot-base"><p>{u['disclaimer']}</p><p>© {datetime.date.today().year} {esc(name)}. {u['rights']}.</p></div>
</footer>
</body>
</html>
"""

def breadcrumb(lang, slug, label):
    u = UI[lang]
    cur = page_dir(lang, slug)
    ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": u["home_crumb"], "item": abs_url(lang, "")},
        {"@type": "ListItem", "position": 2, "name": label, "item": abs_url(lang, slug)}]}
    nav = f'<nav class="crumbs" aria-label="breadcrumb"><a href="{rel(cur, page_dir(lang, ""))}">{u["home_crumb"]}</a><span aria-hidden="true">/</span><span aria-current="page">{esc(label)}</span></nav>'
    return nav, ld

def faq_block(lang, faq):
    u = UI[lang]
    items = "".join(f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q, a in faq)
    ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]}
    return f'<section class="faq wrap narrow"><h2>{u["faq"]}</h2>{items}</section>', ld

def cta_band(lang, slug):
    u = UI[lang]
    cur = page_dir(lang, slug)
    wa = wa_link(lang, CONTACT[lang]["wa_intro"])
    second = f'<a class="btn btn-ghost-light" href="{wa}" rel="noopener">{u["whatsapp"]}</a>' if wa else ""
    return f"""<section class="cta-band"><div class="wrap cta-row">
  <div><h2>{u['cta_h']}</h2><p>{u['cta_p']}</p></div>
  <div class="cta-btns"><a class="btn btn-gold" href="{rel(cur, page_dir(lang,'contact'))}">{u['book']}</a>{second}</div>
</div></section>"""

def proc_cards(lang, slug, slugs):
    cur = page_dir(lang, slug)
    u = UI[lang]
    out = []
    for s in slugs:
        d = P[s][lang]
        out.append(f'<li><a class="card" href="{rel(cur, page_dir(lang, s))}"><h3>{esc(d["nav"])}</h3><p>{esc(d["card"])}</p><span class="more">{u["read_more"]}</span></a></li>')
    return "".join(out)

def hero_art(lang, cur):
    if C.PORTRAIT:
        alt = C.NAME_AR if lang == "ar" else C.NAME_EN
        return f'<img class="portrait" src="{asset(cur, C.PORTRAIT)}" alt="{esc(alt)}" width="800" height="1000">'
    if lang == "ar":
        return NOSE_SVG.format(label="رسم تخطيطي لزوايا الأنف الجانبية", nf="الزاوية الأنفية الجبهية", nl="الزاوية الأنفية الشفوية")
    return NOSE_SVG.format(label="Profile sketch showing nasal angles", nf="Nasofrontal angle", nl="Nasolabial angle")

# ------------------------------------------------------------------ pages
def page_home(lang):
    h = HOME[lang]; u = UI[lang]; cur = page_dir(lang, "")
    faq_html, faq_ld = faq_block(lang, h["faq"])
    approach = "".join(f'<li><h3>{esc(t)}</h3><p>{esc(p)}</p></li>' for t, p in h["approach"])
    journey = "".join(f'<li><h3>{esc(t)}</h3><p>{esc(p)}</p></li>' for t, p in h["journey"])
    sketch_note = "الزوايا المرجعية تقريبية وتختلف بين الأشخاص" if lang == "ar" else "Reference angles are approximate and vary between people"
    figcap = "" if C.PORTRAIT else f"<figcaption>{sketch_note}</figcaption>"
    art = f'<figure class="hero-art">{hero_art(lang, cur)}{figcap}</figure>' if C.PORTRAIT else ""
    body = f"""
<section class="hero"><div class="wrap hero-grid{'' if C.PORTRAIT else ' hero-solo'}">
  <div class="hero-text">
    <p class="eyebrow">{esc(h['eyebrow'])}</p>
    <h1>{esc(h['h1'])}</h1>
    <p class="lede">{esc(h['lede'])}</p>
    <div class="hero-btns"><a class="btn" href="{rel(cur, page_dir(lang,'contact'))}">{u['book']}</a>
    <a class="btn btn-ghost" href="#services">{u['nav_procedures']}</a></div>
  </div>
  {art}
</div></section>
<section id="services" class="wrap block"><h2 class="sec-h">{esc(h['services_h'])}</h2>
  <ul class="cards cards-4">{proc_cards(lang, '', PROCEDURES)}
  <li class="wide"><div class="card card-plain"><h3>{esc(h['general_ent_t'])}</h3><p>{esc(h['general_ent_p'])}</p></div></li></ul>
</section>
<section class="band"><div class="wrap block"><h2 class="sec-h">{esc(h['approach_h'])}</h2><ul class="trio">{approach}</ul></div></section>
<section class="wrap block"><h2 class="sec-h">{esc(h['journey_h'])}</h2><ol class="steps">{journey}</ol></section>
{faq_html}
{cta_band(lang, '')}"""
    return head(lang, "", h["title"], h["desc"], [faq_ld]) + header(lang, "") + body + footer(lang, "")

def page_about(lang):
    a = ABOUT[lang]; cur = page_dir(lang, "about")
    crumbs, bl = breadcrumb(lang, "about", UI[lang]["nav_about"])
    secs = "".join(f'<section><h2>{esc(t)}</h2>{b}</section>' for t, b in a["sections"])
    creds = ""
    if C.CREDENTIALS:
        hd = "المؤهلات" if lang == "ar" else "Qualifications"
        creds = f'<section><h2>{hd}</h2><ul>' + "".join(f"<li>{esc(c[lang])}</li>" for c in C.CREDENTIALS) + "</ul></section>"
    portrait = f'<img class="portrait about-portrait" src="{asset(cur, C.PORTRAIT)}" alt="{esc(C.NAME_AR if lang=="ar" else C.NAME_EN)}" width="800" height="1000">' if C.PORTRAIT else ""
    profile = {"@context": "https://schema.org", "@type": "ProfilePage", "url": abs_url(lang, "about"),
               "inLanguage": lang, "mainEntity": {"@id": SITE + "/#physician"}}
    body = f"""<div class="wrap page-top">{crumbs}<h1>{esc(a['h1'])}</h1><p class="lede">{esc(a['lede'])}</p></div>
<article class="wrap narrow prose">{portrait}{secs}{creds}</article>
{cta_band(lang, 'about')}"""
    return head(lang, "about", a["title"], a["desc"], [bl, profile]) + header(lang, "about") + body + footer(lang, "about")

def page_proc(lang, slug):
    d = P[slug][lang]; u = UI[lang]
    crumbs, bl = breadcrumb(lang, slug, d["nav"])
    faq_html, faq_ld = faq_block(lang, d["faq"])
    facts = "".join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in d["facts"])
    secs = "".join(f'<section><h2>{esc(t)}</h2>{b}</section>' for t, b in d["sections"])
    page_ld = {"@context": "https://schema.org", "@type": "MedicalWebPage", "url": abs_url(lang, slug),
               "name": d["title"], "inLanguage": lang, "lastReviewed": TODAY,
               "reviewedBy": {"@id": SITE + "/#physician"},
               "about": {"@type": "MedicalProcedure", "name": P[slug]["en"]["schema_name"],
                         "alternateName": P[slug]["ar"]["nav"]}}
    body = f"""<div class="wrap page-top">{crumbs}<h1>{esc(d['h1'])}</h1><p class="lede">{esc(d['lede'])}</p></div>
<div class="wrap proc-grid">
  <aside class="facts" aria-label="{u['facts']}"><h2>{u['facts']}</h2><dl>{facts}</dl>
    <a class="btn btn-block" href="{rel(page_dir(lang, slug), page_dir(lang,'contact'))}">{u['book']}</a></aside>
  <article class="prose">{secs}</article>
</div>
{faq_html}
<section class="wrap block"><h2 class="sec-h">{u['related']}</h2><ul class="cards cards-2">{proc_cards(lang, slug, d['related'])}</ul></section>
{cta_band(lang, slug)}"""
    return head(lang, slug, d["title"], d["desc"], [bl, page_ld, faq_ld]) + header(lang, slug) + body + footer(lang, slug)

def page_contact(lang):
    c = CONTACT[lang]; u = UI[lang]; cur = page_dir(lang, "contact")
    crumbs, bl = breadcrumb(lang, "contact", u["nav_contact"])
    reasons = "".join(f"<option>{esc(r)}</option>" for r in c["reasons"])
    locs_opt = "".join(f"<option>{esc(l[lang])}</option>" for l in C.LOCATIONS)
    direct = []
    if C.WHATSAPP: direct.append(f'<li><span class="k">{u["whatsapp"]}</span><a href="{wa_link(lang, c["wa_intro"])}" rel="noopener" dir="ltr">+{C.WHATSAPP}</a></li>')
    elif wa_link(lang): direct.append(f'<li><span class="k">{u["whatsapp"]}</span><a href="{wa_link(lang)}" rel="noopener">{c["wa_coord"]}</a></li>')
    if C.PHONE: direct.append(f'<li><span class="k">{"الهاتف" if lang=="ar" else "Phone"}</span><a href="tel:{re.sub(r"[^0-9+]", "", C.PHONE)}" dir="ltr">{esc(C.PHONE)}</a></li>')
    if C.EMAIL: direct.append(f'<li><span class="k">{"البريد" if lang=="ar" else "Email"}</span><a href="mailto:{esc(C.EMAIL)}">{esc(C.EMAIL)}</a></li>')
    locs = "".join(f'<li><strong>{esc(l[lang])}</strong><br><span class="muted">{esc(l["city_"+lang])}</span>'
                   + (f'<br><a href="{esc(l["maps"])}" rel="noopener">{u["map"]}</a>' if l.get("maps") else "") + "</li>" for l in C.LOCATIONS)
    labels = json.dumps({k: c[k] for k in ["f_name", "f_phone", "f_reason", "f_loc", "f_note", "wa_intro"]}, ensure_ascii=False)
    wa_any = wa_link(lang)
    form = f"""<form class="book" id="book" data-wa="{C.WHATSAPP}" data-link="{esc(getattr(C, 'WHATSAPP_LINK', ''))}">
  <h2>{c['form_h']}</h2>
  <label for="f-name">{c['f_name']}</label><input id="f-name" name="name" required autocomplete="name">
  <label for="f-phone">{c['f_phone']}</label><input id="f-phone" name="phone" type="tel" inputmode="tel" required autocomplete="tel" dir="ltr">
  <label for="f-reason">{c['f_reason']}</label><select id="f-reason" name="reason">{reasons}</select>
  <label for="f-loc">{c['f_loc']}</label><select id="f-loc" name="loc">{locs_opt}</select>
  <label for="f-note">{c['f_note']}</label><textarea id="f-note" name="note" rows="3"></textarea>
  <button class="btn btn-block" type="submit"{'' if wa_any else ' disabled'}>{c['f_send']}</button>
  <p class="small copied" id="copied" hidden>{c['copied']}</p>
  {'' if wa_any else '<p class="small muted">' + ('الحجز الإلكتروني متاح قريبًا.' if lang == 'ar' else 'Online booking is opening soon.') + '</p>'}
  <p class="small muted">{c['privacy']}</p>
</form>
<script>
(function(){{var f=document.getElementById('book'),L={labels};
f.addEventListener('submit',function(e){{e.preventDefault();var n=f.dataset.wa,k=f.dataset.link;if(!n&&!k)return;
var g=function(id){{return document.getElementById(id).value.trim()}};
var t=L.wa_intro+'\\n'+L.f_name+': '+g('f-name')+'\\n'+L.f_phone+': '+g('f-phone')+'\\n'+L.f_reason+': '+g('f-reason')+'\\n'+L.f_loc+': '+g('f-loc')+(g('f-note')?'\\n'+L.f_note+': '+g('f-note'):'');
if(n){{location.href='https://wa.me/'+n+'?text='+encodeURIComponent(t);return;}}
var go=function(){{window.open(k,'_blank','noopener')||(location.href=k)}};
if(navigator.clipboard&&navigator.clipboard.writeText){{navigator.clipboard.writeText(t).then(function(){{document.getElementById('copied').hidden=false;setTimeout(go,900)}},go)}}else go();}});}})();
</script>"""
    body = f"""<div class="wrap page-top">{crumbs}<h1>{c['h1']}</h1><p class="lede">{c['lede']}</p></div>
<div class="wrap contact-grid">
  {form}
  <div class="contact-side">
    {'<ul class="direct">' + ''.join(direct) + '</ul>' if direct else ''}
    <h2>{u['locations']}</h2><ul class="locs">{locs}</ul>
    <p class="note">{c['emergency']}</p>
  </div>
</div>"""
    return head(lang, "contact", c["title"], c["desc"], [bl]) + header(lang, "contact") + body + footer(lang, "contact")

def page_404():
    return f"""<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة غير موجودة | Page not found</title><meta name="robots" content="noindex"><link rel="icon" href="/assets/favicon.png">
<link rel="stylesheet" href="/assets/site.css"></head><body><main class="wrap page-top nf">
<h1>الصفحة غير موجودة</h1><p class="lede">ربما تغيّر الرابط. <a href="/">العودة إلى الرئيسية</a></p>
<p class="lede" dir="ltr" lang="en">This page doesn't exist. <a href="/en/">Go to the homepage</a></p></main></body></html>"""

# ------------------------------------------------------------------ assets
def write(path, text):
    p = OUT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")

def build():
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "assets/fonts").mkdir(parents=True)
    for f in (ROOT / "assets").rglob("*"):
        if f.is_file():
            dst = OUT / "assets" / f.relative_to(ROOT / "assets")
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, dst)

    slugs = [""] + ["about"] + PROCEDURES + ["contact"]
    for lang in LANGS:
        write(page_dir(lang, "") + "/index.html" if lang == "en" else "index.html", page_home(lang))
        write(page_dir(lang, "about") + "/index.html", page_about(lang))
        for s in PROCEDURES:
            write(page_dir(lang, s) + "/index.html", page_proc(lang, s))
        write(page_dir(lang, "contact") + "/index.html", page_contact(lang))
    write("404.html", page_404())

    # sitemap with hreflang alternates
    urls = []
    for lang in LANGS:
        for s in slugs:
            alts = "".join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{abs_url(l, s)}"/>' for l in LANGS)
            alts += f'<xhtml:link rel="alternate" hreflang="x-default" href="{abs_url("ar", s)}"/>'
            urls.append(f"<url><loc>{abs_url(lang, s)}</loc><lastmod>{TODAY}</lastmod>{alts}</url>")
    write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
          + "\n".join(urls) + "\n</urlset>\n")
    if C.INDEXABLE:
        write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    else:
        write("robots.txt", "User-agent: *\nDisallow: /\n")
    noindex = "" if C.INDEXABLE else "  X-Robots-Tag: noindex\n"
    # works on both Netlify and Cloudflare Pages
    write("_headers", "/*\n" + noindex + "  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n")

    missing = [k for k in ["WHATSAPP", "PHONE", "EMAIL", "SCFHS_NO", "PORTRAIT"] if not getattr(C, k)]
    missing += [f"LOCATIONS[{i}].maps" for i, l in enumerate(C.LOCATIONS) if not l.get("maps")]
    if not any(C.SOCIAL.values()): missing.append("SOCIAL")
    if not C.CREDENTIALS: missing.append("CREDENTIALS")
    n = len(list(OUT.rglob("index.html")))
    print(f"Built {n} pages into {OUT.name}/")
    if missing:
        print("Still to fill in config.py:", ", ".join(missing))

if __name__ == "__main__":
    build()
