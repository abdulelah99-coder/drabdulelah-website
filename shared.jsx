// Shared Nav + Footer for all pages.
// Each page imports this and renders its own page-specific content between.

function SiteNav({ current = '' }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { key: 'procedures', ar: 'الإجراءات', href: 'index.html#procedures' },
    { key: 'about',      ar: 'الطبيب',     href: 'About.html' },
    { key: 'gallery',    ar: 'المعرض',     href: 'index.html#gallery' },
    { key: 'journal',    ar: 'المقالات',   href: 'Journal.html' },
    { key: 'contact',    ar: 'تواصل',      href: 'index.html#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in oklch, var(--bg) 88%, transparent)' : 'color-mix(in oklch, var(--bg) 70%, transparent)',
      backdropFilter: 'blur(20px) saturate(140%)',
      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'background .3s, border-color .3s',
    }}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px var(--gutter)',
      }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span className="display-ar" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
            د. عبدالإله
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-soft)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Dr Abdulelah
          </span>
        </a>

        <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0, fontSize: 14 }}>
          {items.map((n) => (
            <li key={n.key}>
              <a href={n.href} style={{
                color: current === n.key ? 'var(--fg)' : 'var(--fg-muted)',
                transition: 'color .2s',
                borderBottom: current === n.key ? '1px solid var(--accent)' : '1px solid transparent',
                paddingBottom: 4,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={(e) => e.currentTarget.style.color = current === n.key ? 'var(--fg)' : 'var(--fg-muted)'}>
                {n.ar}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '6px 0',
          }}>EN / ع</button>
          <a href="index.html#contact" className="btn" style={{ padding: '12px 22px', fontSize: 13 }}>
            <span>حجز موعد</span>
            <span className="arrow" />
          </a>
        </div>
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer style={{ paddingBlock: 80, background: 'var(--bg)', borderTop: '1px solid var(--hairline)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 64, marginBottom: 64 }}>
          <div>
            <div className="display-ar" style={{ fontSize: 28, fontWeight: 500 }}>د. عبدالإله</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginTop: 6 }}>
              Dr Abdulelah · Rhinoplasty · Riyadh
            </div>
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-muted)', maxWidth: 360 }}>
              عيادة متخصصة في تجميل الأنف والجيوب الأنفية. هندسةُ ملامحٍ طبيعية بأحدث التقنيات.
            </p>
          </div>
          {[
            { title: 'الإجراءات', items: [['تجميل أولي','index.html#procedures'],['إصلاحي','index.html#procedures'],['الجيوب الأنفية','index.html#procedures'],['إثني','index.html#procedures']] },
            { title: 'تعرف علينا', items: [['عن الطبيب','About.html'],['الإعتمادات','About.html#credentials'],['الإعلام','About.html#press'],['المقالات','Journal.html']] },
            { title: 'الزيارة',   items: [['حجز موعد','index.html#contact'],['المعرض','index.html#gallery'],['الموقع','index.html#contact'],['الأسئلة الشائعة','Journal.html']] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 20 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{ color: 'var(--fg)', fontSize: 14 }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: 32, borderTop: '1px solid var(--hairline)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-soft)',
        }}>
          <span>© 2026 — Dr Abdulelah Practice · Riyadh, KSA</span>
          <span>Licensed by MoH · MOH-RH-4827</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteNav, SiteFooter });
