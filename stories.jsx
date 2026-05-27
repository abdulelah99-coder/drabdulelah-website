// Stories + Press + Contact + Footer

function Stories() {
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const stories = [
    {
      name: 'ر. ع.',
      age: '٢٨',
      proc: 'تجميل أولي',
      quote: 'لم أرد أن يلاحظ أحدٌ أنني أجريت عملية — والنتيجة جاءت كما تمنّيت تماماً. أنفٌ يشبهني.',
      en_quote: 'I didn’t want anyone to notice — and the result is exactly what I hoped for.',
    },
    {
      name: 'م. ا.',
      age: '٣٤',
      proc: 'إصلاحي',
      quote: 'بعد ثلاث عمليات في الخارج، كان د. عبدالإله الوحيد الذي شرح لي ما يمكن تحقيقه وما لا يمكن. الصراحة قبل كل شيء.',
      en_quote: 'After three operations abroad, he was the only one who told me what was actually possible.',
    },
    {
      name: 'ن. س.',
      age: '٢٥',
      proc: 'وظيفي + تجميلي',
      quote: 'كنت أعاني من ضيق التنفس لسنوات. الآن أتنفس بشكل طبيعي، وملامحي تحسنت دون أن تتغير.',
      en_quote: 'I had breathing issues for years. Now I breathe normally — and my features look refined, not different.',
    },
  ];

  return (
    <section id="stories" style={{
      paddingBlock: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--bg-elev)',
    }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <span className="eyebrow">التجارب — Patient stories</span>
            <h2 className="display-ar" style={{
              fontSize: 'clamp(40px, 4.5vw, 64px)',
              margin: '32px 0 0',
              letterSpacing: '-0.015em',
            }}>
              كلماتٌ من
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>أصحاب التجربة</em>.
            </h2>
            <p style={{ marginTop: 24, fontSize: 16, color: 'var(--fg-muted)', maxWidth: 440, lineHeight: 1.7 }}>
              قصص حقيقية من مرضى وافقوا على مشاركة تجربتهم — أسماؤهم بأحرف مختصرة احتراماً لخصوصيتهم.
            </p>

            {/* Story switcher */}
            <div style={{ marginTop: 56 }}>
              {stories.map((s, i) => (
                <button key={i}
                  onClick={() => { setActive(i); setPlaying(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 20,
                    width: '100%', textAlign: 'right',
                    padding: '24px 0',
                    background: 'transparent', border: 'none',
                    borderTop: '1px solid var(--hairline)',
                    cursor: 'pointer', color: 'inherit',
                    fontFamily: 'inherit',
                  }}>
                  <span className="display-en" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 14,
                    fontStyle: 'normal', color: active === i ? 'var(--accent)' : 'var(--fg-soft)',
                    minWidth: 28,
                  }}>0{i+1}</span>
                  <div style={{ flex: 1 }}>
                    <div className="display-ar" style={{
                      fontSize: 20,
                      color: active === i ? 'var(--fg)' : 'var(--fg-muted)',
                      transition: 'color .2s',
                    }}>{s.name} · {s.age} سنة · {s.proc}</div>
                  </div>
                  <span style={{
                    color: active === i ? 'var(--fg)' : 'var(--fg-soft)',
                    transition: 'transform .2s, color .2s',
                    transform: active === i ? 'translateX(-4px)' : 'translateX(0)',
                  }}>←</span>
                </button>
              ))}
            </div>
          </div>

          {/* Video card */}
          <div>
            <div style={{ position: 'relative', aspectRatio: '4/5' }}>
              <div className="placeholder" data-label={`VIDEO TESTIMONIAL · ${stories[active].name}`} style={{
                width: '100%', height: '100%',
              }} />
              {!playing && (
                <button onClick={() => setPlaying(true)} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'color-mix(in oklch, var(--fg) 30%, transparent)',
                  border: 'none', cursor: 'pointer',
                  transition: 'background .25s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'color-mix(in oklch, var(--fg) 50%, transparent)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'color-mix(in oklch, var(--fg) 30%, transparent)'}
                >
                  <div style={{
                    width: 88, height: 88, borderRadius: '50%',
                    border: '1px solid var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--bg)',
                  }}>
                    <svg width="22" height="26" viewBox="0 0 22 26">
                      <polygon points="0,0 22,13 0,26" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
            <blockquote style={{
              margin: '32px 0 0',
              padding: 0,
            }}>
              <p className="display-ar" style={{
                fontSize: 26, lineHeight: 1.5, fontWeight: 400,
              }}>
                « {stories[active].quote} »
              </p>
              <p className="display-en" style={{ fontSize: 16, marginTop: 16, fontWeight: 300 }}>
                « {stories[active].en_quote} »
              </p>
              <footer style={{
                marginTop: 24,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-soft)',
              }}>
                — {stories[active].name} / {stories[active].proc} / {stories[active].age} YR
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────

function Press() {
  const outlets = ['الرياض', 'العربية', 'سيدتي', 'هلا', 'ELLE Arabia', 'Vogue Arabia', 'الإقتصادية', 'MBC'];
  const articles = [
    { date: '٢٠٢٥', src: 'العربية', ar: 'تقنيات الحفاظ على الأنف — الجراحة الجديدة',  en: 'Preservation rhinoplasty — a new era' },
    { date: '٢٠٢٤', src: 'ELLE Arabia', ar: 'الجمال الذي يحترم الملامح الخليجية', en: 'Beauty that respects regional identity' },
    { date: '٢٠٢٤', src: 'سيدتي',  ar: 'حوار: ماذا تعرفين عن تجميل الأنف الإصلاحي؟', en: 'Interview: revision rhinoplasty explained' },
  ];

  return (
    <section id="press" style={{
      paddingBlock: 'var(--space-section)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', justifyContent: 'center' }}>
            الإعلام — Press &amp; features
          </span>
          <h2 className="display-ar" style={{
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            margin: '32px 0 0', maxWidth: '20ch', marginInline: 'auto',
            letterSpacing: '-0.015em',
          }}>
            حضورٌ متواصل في الإعلام الطبي والاجتماعي.
          </h2>
        </div>

        {/* Logo strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${outlets.length}, 1fr)`,
          borderTop: '1px solid var(--hairline-strong)',
          borderBottom: '1px solid var(--hairline-strong)',
        }}>
          {outlets.map((o, i) => (
            <div key={o} style={{
              padding: '32px 16px', textAlign: 'center',
              borderInlineEnd: i < outlets.length - 1 ? '1px solid var(--hairline)' : 'none',
              fontFamily: i < 4 ? 'var(--font-display-ar)' : 'var(--font-display-en)',
              fontSize: 22, color: 'var(--fg-muted)',
              fontStyle: i >= 4 ? 'italic' : 'normal',
              transition: 'color .25s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-muted)'}>
              {o}
            </div>
          ))}
        </div>

        {/* Featured articles */}
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--hairline)' }}>
          {articles.map((a, i) => (
            <a key={i} href="#" style={{
              background: 'var(--bg)',
              padding: 32,
              display: 'block',
              transition: 'background .25s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elev)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)',
              }}>
                <span>{a.src}</span>
                <span>{a.date}</span>
              </div>
              <h3 className="display-ar" style={{
                fontSize: 26, margin: '32px 0 0', lineHeight: 1.3, fontWeight: 400,
              }}>{a.ar}</h3>
              <p className="display-en" style={{ fontSize: 15, marginTop: 12 }}>{a.en}</p>
              <div style={{
                marginTop: 56,
                display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg)',
              }}>
                READ <span style={{ width: 24, height: 1, background: 'currentColor' }} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────

function Contact() {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    name: '', phone: '', proc: '', date: '', message: '',
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const procs = ['تجميل أولي', 'إصلاحي', 'الجيوب الأنفية', 'إثني', 'لم أقرر بعد'];

  return (
    <section id="contact" style={{
      paddingBlock: 'var(--space-section)',
      background: 'var(--bg-deep)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          {/* Left: info */}
          <div>
            <span className="eyebrow">احجز موعدك — Book a consultation</span>
            <h2 className="display-ar" style={{
              fontSize: 'clamp(40px, 4.5vw, 72px)',
              margin: '32px 0 0',
              letterSpacing: '-0.015em',
            }}>
              لنبدأ
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>محادثة هادئة</em>.
            </h2>
            <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)', maxWidth: 480 }}>
              املأ النموذج وسيتواصل معك فريق التنسيق خلال ٢٤ ساعة لتحديد موعد الاستشارة الأولية.
            </p>

            <div style={{ marginTop: 72 }}>
              <ContactRow ar_label="العيادة" en="Clinic">
                الرياض — حي السليمانية، طريق العليا العام
              </ContactRow>
              <ContactRow ar_label="ساعات العمل" en="Hours">
                الأحد – الخميس · ٩:٠٠ ص — ٩:٠٠ م
              </ContactRow>
              <ContactRow ar_label="هاتف مباشر" en="Direct line">
                +966 11 000 0000
              </ContactRow>
              <ContactRow ar_label="واتساب" en="WhatsApp">
                +966 50 000 0000
              </ContactRow>
              <ContactRow ar_label="البريد" en="Email" last>
                consult@drabdulelah.sa
              </ContactRow>
            </div>
          </div>

          {/* Right: form */}
          <div style={{
            background: 'var(--bg)',
            padding: 48,
            border: '1px solid var(--hairline)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36 }}>
              <div className="display-en" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-soft)', fontStyle: 'normal',
              }}>FORM · نموذج الحجز</div>
              <div className="display-en" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', color: 'var(--fg-soft)', fontStyle: 'normal',
              }}>{step+1} / 3</div>
            </div>

            {step === 0 && (
              <div>
                <Field label="الاسم الكامل" en="Full name">
                  <input value={form.name} onChange={(e)=>set('name', e.target.value)} style={inputStyle} placeholder="فلان الفلاني" />
                </Field>
                <Field label="رقم الجوال" en="Mobile">
                  <input value={form.phone} onChange={(e)=>set('phone', e.target.value)} style={inputStyle} placeholder="+966" type="tel" />
                </Field>
                <button className="btn" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }} onClick={() => setStep(1)}>
                  <span>التالي</span>
                  <span className="arrow" />
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <Field label="الإجراء المطلوب" en="Procedure">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {procs.map((p) => (
                      <button key={p} type="button" onClick={() => set('proc', p)} style={{
                        ...chipStyle,
                        background: form.proc === p ? 'var(--fg)' : 'transparent',
                        color: form.proc === p ? 'var(--bg)' : 'var(--fg)',
                      }}>{p}</button>
                    ))}
                  </div>
                </Field>
                <Field label="الموعد المُفضّل" en="Preferred date">
                  <input value={form.date} onChange={(e)=>set('date', e.target.value)} style={inputStyle} placeholder="مثلاً: الأسبوع القادم — مساءً" />
                </Field>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button className="btn ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(0)}>
                    <span>السابق</span>
                  </button>
                  <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(2)}>
                    <span>التالي</span>
                    <span className="arrow" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <Field label="ملاحظات إضافية" en="Notes (optional)">
                  <textarea value={form.message} onChange={(e)=>set('message', e.target.value)}
                    rows={5}
                    style={{ ...inputStyle, paddingTop: 12, paddingBottom: 12, resize: 'vertical' }}
                    placeholder="شارك أي تفاصيل ترى أنها مهمة." />
                </Field>
                <p style={{ fontSize: 12, color: 'var(--fg-soft)', lineHeight: 1.6, marginTop: 16 }}>
                  جميع المعلومات سرية ومحمية وفق سياسة خصوصية المرضى. لن يتم مشاركتها مع أي طرف ثالث.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button className="btn ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(1)}>
                    <span>السابق</span>
                  </button>
                  <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(3)}>
                    <span>إرسال الطلب</span>
                    <span className="arrow" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 56, height: 56, marginInline: 'auto',
                  border: '1px solid var(--accent)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="display-ar" style={{ fontSize: 28, margin: '24px 0 0' }}>
                  تم استلام طلبك.
                </h3>
                <p style={{ marginTop: 12, fontSize: 15, color: 'var(--fg-muted)' }}>
                  سيتواصل معك فريق التنسيق خلال ٢٤ ساعة.
                </p>
                <button className="btn ghost" style={{ marginTop: 32 }} onClick={() => { setStep(0); setForm({ name: '', phone: '', proc: '', date: '', message: '' }); }}>
                  <span>إرسال طلب آخر</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'transparent', border: 'none',
  borderBottom: '1px solid var(--hairline-strong)',
  padding: '12px 0', fontFamily: 'var(--font-body-ar)',
  fontSize: 16, color: 'var(--fg)', outline: 'none',
  transition: 'border-color .2s',
};

const chipStyle = {
  padding: '10px 16px', fontSize: 13,
  border: '1px solid var(--hairline-strong)',
  background: 'transparent', cursor: 'pointer',
  fontFamily: 'inherit', color: 'var(--fg)',
  transition: 'all .2s',
};

function Field({ label, en, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <label style={{ fontSize: 14, color: 'var(--fg)' }}>{label}</label>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)',
        }}>{en}</span>
      </div>
      {children}
    </div>
  );
}

function ContactRow({ ar_label, en, children, last }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px 1fr',
      gap: 24, padding: '20px 0',
      borderTop: '1px solid var(--hairline)',
      borderBottom: last ? '1px solid var(--hairline)' : 'none',
    }}>
      <div>
        <div className="display-ar" style={{ fontSize: 16, fontWeight: 500 }}>{ar_label}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginTop: 4,
        }}>{en}</div>
      </div>
      <div style={{ fontSize: 16, color: 'var(--fg-muted)', alignSelf: 'center' }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      paddingBlock: 80,
      background: 'var(--bg)',
    }}>
      <div className="wrap">
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 64, marginBottom: 64,
        }}>
          <div>
            <div className="display-ar" style={{ fontSize: 28, fontWeight: 500 }}>
              د. عبدالإله
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--fg-soft)', marginTop: 6,
            }}>Dr Abdulelah · Rhinoplasty · Riyadh</div>
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--fg-muted)', maxWidth: 360 }}>
              عيادة متخصصة في تجميل الأنف والجيوب الأنفية. هندسةُ ملامحٍ طبيعية بأحدث التقنيات.
            </p>
          </div>
          {[
            { title: 'الإجراءات', items: ['تجميل أولي','إصلاحي','الجيوب الأنفية','إثني'] },
            { title: 'تعرف علينا', items: ['الفريق الطبي','الاعتمادات','الإعلام','المدونة'] },
            { title: 'الزيارة',   items: ['حجز موعد','الموقع','الأسعار','الأسئلة الشائعة'] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-soft)', marginBottom: 20,
              }}>{col.title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" style={{ color: 'var(--fg)', fontSize: 14 }}>{it}</a>
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
          <span>Licensed by MoH · MOH-RH-{Math.floor(Math.random()*9000+1000)}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Stories, Press, Contact, Footer });
