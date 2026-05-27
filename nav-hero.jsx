// Nav + Hero + Philosophy sections

function Nav({ tweaks, setTweak }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { ar: 'الإجراءات', en: 'Procedures', href: '#procedures' },
    { ar: 'قبل وبعد',   en: 'Gallery',    href: '#gallery'    },
    { ar: 'الرحلة',     en: 'Journey',    href: '#journey'    },
    { ar: 'التجارب',    en: 'Stories',    href: '#stories'    },
    { ar: 'الإعلام',    en: 'Press',      href: '#press'      },
    { ar: 'تواصل',      en: 'Contact',    href: '#contact'    },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in oklch, var(--bg) 88%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'background .3s, border-color .3s, backdrop-filter .3s',
    }}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px var(--gutter)',
      }}>
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span className="display-ar" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
            د. عبدالإله
          </span>
          <span className="display-en" style={{ fontSize: 13, color: 'var(--fg-soft)', fontStyle: 'normal', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Dr Abdulelah
          </span>
        </a>

        {/* Center nav */}
        <ul style={{
          display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0,
          fontSize: 14, fontWeight: 400,
        }}>
          {navItems.map((n) => (
            <li key={n.href}>
              <a href={n.href} style={{
                color: 'var(--fg-muted)',
                transition: 'color .2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-muted)'}>
                {n.ar}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: lang + cta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--fg-muted)',
            padding: '6px 0',
          }}>
            EN / ع
          </button>
          <a href="#contact" className="btn" style={{ padding: '12px 22px', fontSize: 13 }}>
            <span>حجز موعد</span>
            <span className="arrow" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────

function HeroSplit({ tweaks }) {
  return (
    <section id="top" style={{
      paddingTop: 140,
      paddingBottom: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap" style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        gap: 80,
        alignItems: 'end',
      }}>
        {/* Text side (RTL: text starts on the right of view; this is first col = right) */}
        <div>
          <span className="eyebrow" style={{ marginBottom: 40, display: 'inline-flex' }}>
            استشاري تجميل الأنف — الرياض
          </span>
          <h1 className="display-ar" style={{
            fontSize: 'clamp(56px, 7vw, 104px)',
            fontWeight: 400,
            margin: '24px 0 0',
            letterSpacing: '-0.015em',
          }}>
            هندسةُ الأنفِ
            <br />
            بلمسةٍ <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>طبيعية</em>.
          </h1>
          <p className="display-en" style={{
            fontSize: 28,
            margin: '20px 0 0',
            fontWeight: 300,
          }}>
            The architecture of natural rhinoplasty.
          </p>

          <p style={{
            marginTop: 56,
            fontSize: 17,
            lineHeight: 1.75,
            maxWidth: 480,
            color: 'var(--fg-muted)',
          }}>
            تجميلٌ يحفظُ ملامحَكَ الأصيلة. عمليّاتٌ دقيقةٌ في تجميل الأنف، الإصلاحي، والجيوب الأنفية،
            تُجرى بأحدث تقنيات الحفاظ على البنية التشريحية.
          </p>

          <div style={{ display: 'flex', gap: 16, marginTop: 48, alignItems: 'center' }}>
            <a href="#contact" className="btn">
              <span>{tweaks.cta}</span>
              <span className="arrow" />
            </a>
            <a href="#procedures" className="btn ghost">
              <span>تعرف على الإجراءات</span>
            </a>
          </div>

          {/* Credentials strip */}
          <div style={{
            marginTop: 80,
            display: 'flex',
            gap: 48,
            paddingTop: 32,
            borderTop: '1px solid var(--hairline)',
          }}>
            <Stat num="+1200" label="عملية ناجحة" en="Procedures" />
            <Stat num="14"    label="سنة من الخبرة" en="Years"    />
            <Stat num="98%"   label="رضا المرضى" en="Satisfaction"/>
          </div>
        </div>

        {/* Portrait side */}
        <div style={{ position: 'relative' }}>
          <div className="placeholder" data-label="PORTRAIT · صورة الدكتور" style={{
            aspectRatio: '4/5',
            width: '100%',
          }} />
          {/* Floating caption */}
          <div style={{
            position: 'absolute',
            bottom: -1,
            left: -1,
            background: 'var(--bg)',
            padding: '20px 28px 20px 36px',
            borderTop: '1px solid var(--hairline)',
            borderRight: '1px solid var(--hairline)',
            maxWidth: 280,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 6 }}>
              CONSULTANT · زمالة عالمية
            </div>
            <div className="display-ar" style={{ fontSize: 18, lineHeight: 1.35 }}>
              د. عبدالإله — استشاري تجميل الأنف والجيوب الأنفية
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFullbleed({ tweaks }) {
  return (
    <section id="top" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="placeholder" data-label="HERO IMAGE · صورة بطل سينمائية" style={{
        position: 'absolute', inset: 0, zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, color-mix(in oklch, var(--bg) 95%, transparent) 0%, color-mix(in oklch, var(--bg) 40%, transparent) 50%, transparent 100%)',
      }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1, padding: '180px var(--gutter) 80px', width: '100%' }}>
        <span className="eyebrow" style={{ marginBottom: 32 }}>
          استشاري تجميل الأنف — الرياض
        </span>
        <h1 className="display-ar" style={{
          fontSize: 'clamp(64px, 9vw, 140px)',
          margin: '20px 0 0',
          maxWidth: '14ch',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}>
          هندسةُ الأنفِ بلمسةٍ <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>طبيعية</em>.
        </h1>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 60,
          alignItems: 'end', marginTop: 60,
        }}>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 520, color: 'var(--fg-muted)' }}>
            تجميلٌ يحفظ ملامحَك الأصيلة. عمليّاتٌ دقيقةٌ في تجميل الأنف، الإصلاحي، والجيوب الأنفية.
          </p>
          <a href="#contact" className="btn">
            <span>{tweaks.cta}</span>
            <span className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroProfile({ tweaks }) {
  return (
    <section id="top" style={{
      paddingTop: 160, paddingBottom: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle classical profile line */}
      <svg viewBox="0 0 400 600" style={{
        position: 'absolute',
        left: '-40px', top: 80, height: '95%',
        opacity: 0.08, pointerEvents: 'none',
      }}>
        <path d="M180,40 C 200,60 210,90 200,130 C 195,160 180,180 190,210 C 200,240 230,250 240,280 C 250,310 240,340 250,370 C 260,400 290,420 280,460 C 270,500 220,520 200,540"
              fill="none" stroke="var(--fg)" strokeWidth="1.5" />
      </svg>

      <div className="wrap" style={{ position: 'relative', textAlign: 'center' }}>
        <span className="eyebrow" style={{ display: 'inline-flex', justifyContent: 'center' }}>
          استشاري تجميل الأنف — الرياض
        </span>
        <h1 className="display-ar" style={{
          fontSize: 'clamp(64px, 9vw, 132px)',
          margin: '32px auto 0',
          maxWidth: '16ch',
          letterSpacing: '-0.02em',
          lineHeight: 1.08,
        }}>
          هندسةُ الأنفِ
          <br />
          بلمسةٍ <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>طبيعية</em>.
        </h1>
        <p className="display-en" style={{ fontSize: 24, margin: '24px 0 0', fontWeight: 300 }}>
          The architecture of natural rhinoplasty.
        </p>
        <p style={{
          marginTop: 48, fontSize: 17, lineHeight: 1.7,
          maxWidth: 580, marginInline: 'auto', color: 'var(--fg-muted)',
        }}>
          تجميلٌ يحفظُ ملامحَكَ الأصيلة. عمليّاتٌ دقيقةٌ في تجميل الأنف،
          الإصلاحي، والجيوب الأنفية، تُجرى بأحدث تقنيات الحفاظ.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 48, justifyContent: 'center' }}>
          <a href="#contact" className="btn">
            <span>{tweaks.cta}</span>
            <span className="arrow" />
          </a>
          <a href="#procedures" className="btn ghost">
            <span>تعرف على الإجراءات</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroPortraitLeft({ tweaks }) {
  return (
    <section id="top" style={{
      paddingTop: 120, paddingBottom: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr',
        gap: 64,
        alignItems: 'stretch',
      }}>
        {/* Portrait first (visual right side in RTL) */}
        <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <div className="placeholder" data-label="PORTRAIT · بورتريه عمودي" style={{
            aspectRatio: '3/4',
            width: '100%',
          }} />
        </div>
        <div style={{ paddingTop: 40 }}>
          <span className="eyebrow">استشاري تجميل الأنف — الرياض</span>
          <h1 className="display-ar" style={{
            fontSize: 'clamp(56px, 6.5vw, 96px)',
            margin: '28px 0 0',
            letterSpacing: '-0.015em',
          }}>
            هندسةُ الأنفِ
            <br />
            بلمسةٍ <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>طبيعية</em>.
          </h1>
          <p className="display-en" style={{ fontSize: 26, margin: '20px 0 0', fontWeight: 300 }}>
            The architecture of natural rhinoplasty.
          </p>
          <p style={{ marginTop: 48, fontSize: 17, lineHeight: 1.75, maxWidth: 520, color: 'var(--fg-muted)' }}>
            تجميلٌ يحفظ ملامحَك الأصيلة. عمليّاتٌ دقيقةٌ في تجميل الأنف، الإصلاحي، والجيوب الأنفية.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
            <a href="#contact" className="btn">
              <span>{tweaks.cta}</span>
              <span className="arrow" />
            </a>
            <a href="#procedures" className="btn ghost">
              <span>تعرف على الإجراءات</span>
            </a>
          </div>
          <div style={{
            marginTop: 80, display: 'flex', gap: 48,
            paddingTop: 32, borderTop: '1px solid var(--hairline)',
          }}>
            <Stat num="+1200" label="عملية ناجحة" en="Procedures" />
            <Stat num="14"    label="سنة من الخبرة" en="Years" />
            <Stat num="98%"   label="رضا المرضى" en="Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label, en }) {
  return (
    <div>
      <div className="display-ar" style={{
        fontSize: 40, fontWeight: 500, lineHeight: 1,
        letterSpacing: '-0.015em',
      }}>{num}</div>
      <div style={{ marginTop: 8, fontSize: 13, color: 'var(--fg-muted)' }}>{label}</div>
      <div style={{
        marginTop: 2, fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'var(--fg-soft)', letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>{en}</div>
    </div>
  );
}

function Hero(props) {
  switch (props.tweaks.hero) {
    case 'fullbleed': return <HeroFullbleed {...props} />;
    case 'profile':   return <HeroProfile   {...props} />;
    case 'portrait':  return <HeroPortraitLeft {...props} />;
    case 'split':
    default:          return <HeroSplit     {...props} />;
  }
}

// ─────────────────────────────────────────────────────────────

function Philosophy() {
  const principles = [
    {
      n: '01',
      ar_title: 'الحفاظ على البنية',
      en_title: 'Preservation',
      body: 'استخدام تقنيات الحفاظ على الغضروف والعظم الأصلي للأنف، بدلاً من الإزالة الواسعة.',
    },
    {
      n: '02',
      ar_title: 'التشخيص بالتصوير ثلاثي الأبعاد',
      en_title: 'Imaging',
      body: 'محاكاة دقيقة للنتيجة قبل العملية تتيح لكم رؤية الشكل المتوقع وفهم خيارات التجميل.',
    },
    {
      n: '03',
      ar_title: 'الانسجام مع الملامح',
      en_title: 'Harmony',
      body: 'كل أنف يُصمَّم بمراعاة نسب الوجه وملامحه — لا قوالب جاهزة ولا نتائج متماثلة.',
    },
  ];
  return (
    <section style={{
      paddingBlock: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 120 }}>
            <span className="eyebrow">المبادئ — Philosophy</span>
            <h2 className="display-ar" style={{
              fontSize: 'clamp(40px, 4.5vw, 64px)',
              margin: '32px 0 0',
              letterSpacing: '-0.015em',
            }}>
              التجميل الذي
              <br />
              لا يَلفِت الانتباه.
            </h2>
            <p className="display-en" style={{ fontSize: 22, marginTop: 16, fontWeight: 300 }}>
              The beauty that doesn’t announce itself.
            </p>
          </div>
          <div>
            {principles.map((p, i) => (
              <div key={p.n} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: 32,
                padding: '40px 0',
                borderTop: i === 0 ? '1px solid var(--hairline-strong)' : '1px solid var(--hairline)',
                borderBottom: i === principles.length - 1 ? '1px solid var(--hairline-strong)' : 'none',
              }}>
                <div className="display-en" style={{
                  fontSize: 28, fontStyle: 'normal',
                  fontFamily: 'var(--font-mono)', color: 'var(--fg-soft)',
                }}>{p.n}</div>
                <div>
                  <h3 className="display-ar" style={{
                    fontSize: 30, margin: 0, fontWeight: 500,
                  }}>{p.ar_title}</h3>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--fg-soft)', marginTop: 8,
                  }}>{p.en_title}</div>
                  <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)', maxWidth: 560 }}>
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Philosophy, Stat });
