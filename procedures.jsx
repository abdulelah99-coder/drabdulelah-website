// Procedures + Gallery + Journey

function Procedures() {
  const [active, setActive] = React.useState(0);
  const procs = [
    {
      ar: 'تجميل الأنف الأولي',
      en: 'Primary Rhinoplasty',
      no: '01',
      desc: 'تصميم أنف يتناغم مع ملامح الوجه باستخدام تقنية الحفاظ على البنية. مناسب لمن يقومون بالعملية لأول مرة.',
      duration: '٣ ساعات',
      recovery: '٧–١٠ أيام',
      anesthesia: 'عام',
      bullets: [
        'تقنية الحفاظ على الغضروف (Preservation Rhinoplasty)',
        'محاكاة ثلاثية الأبعاد قبل العملية',
        'تصحيح الانحراف والحدبة',
        'تحسين زاوية الأنف والشفة',
      ],
    },
    {
      ar: 'تجميل الأنف الإصلاحي',
      en: 'Revision Rhinoplasty',
      no: '02',
      desc: 'حالات العمليات السابقة التي تحتاج إلى تصحيح. تقنيات دقيقة لإعادة هيكلة الأنف باستخدام طُعم الغضروف الذاتي.',
      duration: '٤–٥ ساعات',
      recovery: '١٠–١٤ يومًا',
      anesthesia: 'عام',
      bullets: [
        'استخدام غضروف الأذن أو الضلع',
        'تصحيح التشوهات بعد العمليات',
        'استعادة الوظيفة التنفسية',
        'بناء الدعامة الداخلية',
      ],
    },
    {
      ar: 'الجيوب الأنفية',
      en: 'Functional / Sinus',
      no: '03',
      desc: 'علاج انسداد الأنف، الجيوب المزمنة، وانحراف الحاجز — مع إمكانية الدمج مع التجميل في جلسة واحدة.',
      duration: '٢ ساعة',
      recovery: '٥–٧ أيام',
      anesthesia: 'عام',
      bullets: [
        'تصحيح انحراف الحاجز الأنفي',
        'تنظير الجيوب الأنفية (FESS)',
        'تصغير القرنيات (Turbinate)',
        'دمج جراحة وظيفية وتجميلية',
      ],
    },
    {
      ar: 'تجميل الأنف الإثني',
      en: 'Ethnic Rhinoplasty',
      no: '04',
      desc: 'تجميلٌ يحترم الهوية والملامح الخليجية. لا يُغيّر الشخصية، بل يُهذِّب التفاصيل بدقة محسوبة.',
      duration: '٣–٤ ساعات',
      recovery: '٧–١٠ أيام',
      anesthesia: 'عام',
      bullets: [
        'الحفاظ على الهوية الجمالية',
        'تنحيف رأس الأنف بدقة',
        'تحسين الجسر دون مبالغة',
        'موازنة عرض الفتحات',
      ],
    },
  ];

  return (
    <section id="procedures" style={{
      paddingBlock: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, gap: 40 }}>
          <div>
            <span className="eyebrow">الإجراءات — Procedures</span>
            <h2 className="display-ar" style={{
              fontSize: 'clamp(40px, 4.5vw, 64px)',
              margin: '32px 0 0', maxWidth: '14ch',
              letterSpacing: '-0.015em',
            }}>
              تخصصات دقيقة، <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>كلٌّ في موضعه</em>.
            </h2>
          </div>
          <p style={{ maxWidth: 420, fontSize: 16, lineHeight: 1.7, color: 'var(--fg-muted)' }}>
            أربعة مجالات نُجريها بمعايير عالمية — مع برنامج رعاية شخصي قبل وبعد العملية.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid var(--hairline-strong)',
          borderBottom: '1px solid var(--hairline-strong)',
        }}>
          {/* List */}
          <div style={{ borderInlineEnd: '1px solid var(--hairline)' }}>
            {procs.map((p, i) => (
              <button
                key={p.no}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr auto',
                  alignItems: 'center',
                  gap: 24,
                  width: '100%',
                  padding: '36px 32px 36px 0',
                  background: active === i ? 'var(--bg-elev)' : 'transparent',
                  border: 'none',
                  borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
                  textAlign: 'right',
                  cursor: 'pointer',
                  transition: 'background .25s, padding .25s',
                  fontFamily: 'inherit',
                  color: 'inherit',
                  paddingInlineStart: active === i ? 48 : 32,
                }}
              >
                <span className="display-en" style={{
                  fontSize: 18, fontFamily: 'var(--font-mono)',
                  color: active === i ? 'var(--accent)' : 'var(--fg-soft)',
                  fontStyle: 'normal',
                }}>{p.no}</span>
                <div>
                  <div className="display-ar" style={{ fontSize: 28, fontWeight: 500 }}>{p.ar}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--fg-soft)', marginTop: 4,
                  }}>{p.en}</div>
                </div>
                <span style={{
                  fontSize: 20, color: 'var(--fg-soft)',
                  transition: 'transform .25s, color .25s',
                  transform: active === i ? 'translateX(-6px)' : 'translateX(0)',
                  color: active === i ? 'var(--fg)' : 'var(--fg-soft)',
                }}>←</span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{ padding: '56px 48px', background: 'var(--bg-elev)', minHeight: 480 }}>
            <ProcDetail key={active} proc={procs[active]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcDetail({ proc }) {
  return (
    <div style={{
      animation: 'fadeIn .4s ease',
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <h3 className="display-ar" style={{
        fontSize: 44, margin: 0, fontWeight: 500, letterSpacing: '-0.01em',
      }}>{proc.ar}</h3>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--fg-soft)', marginTop: 8,
      }}>{proc.en}</div>

      <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)' }}>
        {proc.desc}
      </p>

      <ul style={{
        margin: '32px 0 0', padding: 0, listStyle: 'none',
      }}>
        {proc.bullets.map((b, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            paddingBlock: 10, fontSize: 15, color: 'var(--fg)',
            borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
          }}>
            <span style={{
              marginTop: 8, width: 6, height: 6, background: 'var(--accent)',
              transform: 'rotate(45deg)', flexShrink: 0,
            }} />
            {b}
          </li>
        ))}
      </ul>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--hairline)',
        gap: 20,
      }}>
        <Meta label="مدة العملية" en="Duration"   value={proc.duration} />
        <Meta label="التعافي"      en="Recovery"   value={proc.recovery} />
        <Meta label="التخدير"      en="Anesthesia" value={proc.anesthesia} />
      </div>
    </div>
  );
}

function Meta({ label, en, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>{en}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>{label}</div>
      <div className="display-ar" style={{ fontSize: 22, marginTop: 8 }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function Gallery() {
  const [revealed, setRevealed] = React.useState(false);
  const [active, setActive]   = React.useState(0);
  const [slider, setSlider]   = React.useState(50);

  const cases = [
    { age: '٢٦', gender: 'أنثى',    proc: 'تجميل أولي',    months: '١٢ شهر' },
    { age: '٣٤', gender: 'ذكر',     proc: 'إصلاحي',         months: '٩ أشهر' },
    { age: '٢٩', gender: 'أنثى',    proc: 'وظيفي + تجميلي', months: '٦ أشهر' },
    { age: '٤٢', gender: 'أنثى',    proc: 'الجيوب الأنفية', months: '٤ أشهر' },
    { age: '٣١', gender: 'ذكر',     proc: 'إثني',           months: '١٢ شهر' },
    { age: '٢٥', gender: 'أنثى',    proc: 'تجميل أولي',    months: '٨ أشهر' },
  ];

  return (
    <section id="gallery" style={{
      paddingBlock: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--bg-elev)',
    }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', justifyContent: 'center' }}>
            قبل وبعد — Before &amp; After
          </span>
          <h2 className="display-ar" style={{
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            margin: '32px auto 0',
            maxWidth: '18ch',
            letterSpacing: '-0.015em',
          }}>
            النتائج التي تتحدثُ عن نفسها.
          </h2>
          <p style={{ marginTop: 20, fontSize: 16, color: 'var(--fg-muted)', maxWidth: 560, marginInline: 'auto' }}>
            صور حقيقية لمرضى وافقوا على عرض حالاتهم. يُرجى المعاينة بخصوصية واحترام.
          </p>
        </div>

        {/* Before/After main display */}
        <div style={{
          position: 'relative',
          background: 'var(--bg)',
          border: '1px solid var(--hairline)',
          padding: 0,
          marginBottom: 32,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            position: 'relative',
            aspectRatio: '16/8',
            filter: revealed ? 'none' : 'blur(28px)',
            transition: 'filter .6s ease',
          }}>
            <div className="placeholder" data-label={revealed ? 'BEFORE · قبل العملية' : ''} style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', top: 24, right: 24,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', color: 'var(--fg)',
                background: 'var(--bg)', padding: '6px 12px',
              }}>قبل / BEFORE</span>
            </div>
            <div className="placeholder" data-label={revealed ? 'AFTER · بعد العملية' : ''} style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', top: 24, left: 24,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', color: 'var(--bg)',
                background: 'var(--accent)', padding: '6px 12px',
              }}>بعد / AFTER</span>
            </div>
            {/* divider */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              width: 1, background: 'var(--bg)',
              transform: 'translateX(-50%)',
            }} />
          </div>

          {/* Consent gate */}
          {!revealed && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'color-mix(in oklch, var(--bg) 88%, transparent)',
              backdropFilter: 'blur(2px)',
              padding: 40, textAlign: 'center',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '1px solid var(--hairline-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="display-ar" style={{ fontSize: 28, margin: 0 }}>
                محتوى طبي — يُعرض بإذن المرضى
              </h3>
              <p style={{ maxWidth: 480, marginTop: 16, color: 'var(--fg-muted)', fontSize: 15 }}>
                النتائج تختلف من حالة لأخرى. النقر على الزر يعني موافقتك على معاينة صور قبل/بعد بشكل لائق.
              </p>
              <button onClick={() => setRevealed(true)} className="btn" style={{ marginTop: 28 }}>
                <span>أوافق — عرض المعرض</span>
                <span className="arrow" />
              </button>
            </div>
          )}

          {/* Case meta strip */}
          {revealed && (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              borderTop: '1px solid var(--hairline)',
            }}>
              {[
                ['العمر', cases[active].age],
                ['الجنس', cases[active].gender],
                ['الإجراء', cases[active].proc],
                ['المتابعة', cases[active].months],
              ].map(([k, v], i) => (
                <div key={k} style={{
                  padding: '20px 24px',
                  borderInlineEnd: i < 3 ? '1px solid var(--hairline)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)',
                  }}>{['AGE','SEX','PROCEDURE','FOLLOW-UP'][i]}</div>
                  <div className="display-ar" style={{ fontSize: 18, marginTop: 6 }}>{k}: {v}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {revealed && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 12,
          }}>
            {cases.map((c, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                aspectRatio: '4/5', padding: 0, border: 'none', cursor: 'pointer',
                outline: active === i ? '2px solid var(--accent)' : '1px solid var(--hairline)',
                outlineOffset: -1,
                background: 'transparent',
              }}>
                <div className="placeholder" data-label={`CASE 0${i+1}`} style={{ width: '100%', height: '100%' }} />
              </button>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#contact" className="btn ghost">
            <span>اطلب معاينة حالة مشابهة لحالتك</span>
            <span className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────

function Journey() {
  const steps = [
    {
      no: '01',
      ar_title: 'الاستشارة الأولية',
      en_title: 'Consultation',
      time: '٤٥ دقيقة',
      body: 'لقاءٌ هادئٌ للاستماع إلى توقعاتك، فحصٌ سريريّ، والإجابة على أسئلتك دون التزام.',
    },
    {
      no: '02',
      ar_title: 'المحاكاة ثلاثية الأبعاد',
      en_title: 'Imaging',
      time: '٣٠ دقيقة',
      body: 'تصوير دقيق ومحاكاة للنتيجة المتوقعة. ترى الشكل النهائي قبل اتخاذ القرار.',
    },
    {
      no: '03',
      ar_title: 'التحضير قبل العملية',
      en_title: 'Pre-op',
      time: '٢ أسبوع',
      body: 'تحاليل، توجيهات غذائية، وإيقاف بعض الأدوية. فريق التنسيق معك في كل خطوة.',
    },
    {
      no: '04',
      ar_title: 'يوم العملية',
      en_title: 'Surgery',
      time: '٢–٥ ساعات',
      body: 'في مستشفى معتمد دولياً. فريق تخدير متخصص، وغرفة تعافٍ خاصة.',
    },
    {
      no: '05',
      ar_title: 'المتابعة بعد العملية',
      en_title: 'Aftercare',
      time: '١٢ شهر',
      body: 'متابعة منتظمة في الأسبوع الأول، الشهر، الثلاثة أشهر، ولمدة عام كامل.',
    },
  ];

  return (
    <section id="journey" style={{
      paddingBlock: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap">
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <span className="eyebrow">الرحلة — Journey</span>
          <h2 className="display-ar" style={{
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            margin: '32px 0 0',
            letterSpacing: '-0.015em',
          }}>
            من الاستشارة إلى التعافي — <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>خمس خطوات</em>.
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Horizontal hairline */}
          <div style={{
            position: 'absolute', top: 30, right: '5%', left: '5%',
            height: 1, background: 'var(--hairline-strong)',
          }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 40,
            position: 'relative',
          }}>
            {steps.map((s, i) => (
              <div key={s.no} style={{ position: 'relative' }}>
                {/* dot */}
                <div style={{
                  width: 12, height: 12, background: 'var(--bg)',
                  border: '1px solid var(--fg)',
                  marginInline: 'auto',
                  marginBottom: 32,
                  position: 'relative', zIndex: 1,
                  transform: 'rotate(45deg)',
                }} />
                <div style={{ textAlign: 'center' }}>
                  <div className="display-en" style={{
                    fontFamily: 'var(--font-mono)', fontStyle: 'normal',
                    fontSize: 14, color: 'var(--fg-soft)',
                  }}>{s.no}</div>
                  <h3 className="display-ar" style={{
                    fontSize: 24, margin: '12px 0 0', fontWeight: 500,
                  }}>{s.ar_title}</h3>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--fg-soft)', marginTop: 6,
                  }}>{s.en_title} · {s.time}</div>
                  <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.65, color: 'var(--fg-muted)' }}>
                    {s.body}
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

Object.assign(window, { Procedures, Gallery, Journey });
