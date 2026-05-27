// App entry — composes all sections + Tweaks panel

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);

  // Apply tweaks to the root document
  React.useEffect(() => {
    const root = document.documentElement;
    // when dark is on, override palette to charcoal but keep selected as visual
    root.setAttribute('data-palette', t.dark ? 'charcoal' : t.palette);
    root.setAttribute('data-display', t.display);
    root.setAttribute('data-density', t.density);
    root.setAttribute('data-dark', String(!!t.dark));
  }, [t.palette, t.display, t.density, t.dark]);

  // Simple reveal on scroll
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { rootMargin: '-10% 0px -10% 0px' });
    document.querySelectorAll('section').forEach((s) => {
      s.classList.add('reveal');
      obs.observe(s);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav tweaks={t} setTweak={setTweak} />
      <main>
        <Hero tweaks={t} />
        <Philosophy />
        <Procedures />
        <Gallery />
        <Journey />
        <Stories />
        <Press />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor label="Palette" value={t.palette}
          options={[
            ['#fbf9f4', '#5a4a3a', '#8a6a4a'],  // ivory
            ['#f4ede0', '#3a2a1a', '#a06030'],  // bronze
            ['#f4f4f6', '#1a1a22', '#3a5a8a'],  // clinical
            ['#1f1a14', '#fafaf6', '#c6a378'],  // charcoal
          ]}
          onChange={(v) => {
            const map = {
              '["#fbf9f4","#5a4a3a","#8a6a4a"]': 'ivory',
              '["#f4ede0","#3a2a1a","#a06030"]': 'bronze',
              '["#f4f4f6","#1a1a22","#3a5a8a"]': 'clinical',
              '["#1f1a14","#fafaf6","#c6a378"]': 'charcoal',
            };
            const name = map[JSON.stringify(v).toLowerCase()] || 'ivory';
            setTweak({ palette: name, dark: name === 'charcoal' });
          }}
        />
        <TweakToggle label="Dark mode" value={t.dark}
          onChange={(v) => setTweak('dark', v)} />

        <TweakSection label="Type" />
        <TweakSelect label="Display font" value={t.display}
          options={[
            { value: 'cormorant', label: 'Cormorant + Amiri' },
            { value: 'playfair',  label: 'Playfair + Amiri' },
            { value: 'garamond',  label: 'EB Garamond + Naskh' },
          ]}
          onChange={(v) => setTweak('display', v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.hero}
          options={[
            { value: 'split',     label: 'Split' },
            { value: 'fullbleed', label: 'Bleed' },
            { value: 'profile',   label: 'Profile' },
            { value: 'portrait',  label: 'Portrait' },
          ]}
          onChange={(v) => setTweak('hero', v)} />
        <TweakRadio label="Density" value={t.density}
          options={['compact', 'regular', 'airy']}
          onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Copy" />
        <TweakText label="CTA label" value={t.cta}
          onChange={(v) => setTweak('cta', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
