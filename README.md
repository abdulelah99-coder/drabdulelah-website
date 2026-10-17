# drabdulelah website

Bilingual (Arabic / English) practice website for Dr. Abdulelah Alqahtani.
Live: https://drabdulelah.netlify.app (Netlify project "drabdulelah", GitHub-login account)

## Folder

| File / folder | What it is |
|---|---|
| `config.py`   | Your details: domain, phone, WhatsApp, email, SCFHS no., locations, social links, portrait. **Edit this first.** |
| `content.py`  | All page text, Arabic and English: home, about, contact, the four procedure pages. |
| `assets/`     | Stylesheet, fonts, share image, icons. Put your portrait photo here. |
| `build.py`    | Turns the two files above into the website. |
| `dist/`       | The finished website. This is the folder that goes to Netlify. |

## Change something and publish

1. Edit `config.py` or `content.py`.
2. In Terminal, inside this folder, run:
   ```
   python3 build.py
   ```
   It rebuilds `dist/` and lists any details still missing.
3. Open https://app.netlify.com/projects/drabdulelah/deploys and drag the **dist** folder onto the upload box.

To look at the site on your own Mac before publishing:
```
python3 build.py --preview
open preview/index.html
```

## Before going public on Google

In `config.py`:
- set `SITE_URL` to your real domain, e.g. `https://drabdulelah.com`
- set `INDEXABLE = True`
- fill WhatsApp, phone, email, SCFHS number

Then rebuild, upload, connect the domain in Netlify (Domain management), and submit
`https://YOUR-DOMAIN/sitemap.xml` in Google Search Console.
