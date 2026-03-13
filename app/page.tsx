'use client';

import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [openExtracurriculars, setOpenExtracurriculars] = useState<Record<string, boolean>>({ university: true, highschool: false });
  const [openProjectYears, setOpenProjectYears] = useState<Record<string, boolean>>({ '2026': true, '2025': false, '2024': false, '2023': false, '2022': false });

  const toggleExtracurricular = (key: string) => setOpenExtracurriculars(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleProjectYear = (key: string) => setOpenProjectYears(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'extracurriculars', label: 'Extracurriculars', children: [
      { id: 'ec-university', label: 'University' },
      { id: 'ec-highschool', label: 'High School' },
    ]},
    { id: 'projects', label: 'Projects', children: [
      { id: 'proj-2026', label: '2026' },
      { id: 'proj-2025', label: '2025' },
      { id: 'proj-2024', label: '2024' },
      { id: 'proj-2023', label: '2023' },
      { id: 'proj-2022', label: '2022' },
    ]},
  ];
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedNav, setMobileExpandedNav] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accent, setAccent] = useState('violet');

  const accentPalettes: Record<string, { dot: string; light: Record<string, string>; dark: Record<string, string> }> = {
    pink:   { dot: '#ec4899', light: { accent: '#db2777', tag: '#fce7f3', dotC: '#ec4899', rule: '#f9a8d4', soft: '#fbcfe8', sel: '#fbcfe8', selTx: '#831843' }, dark: { accent: '#f472b6', tag: 'rgba(236,72,153,0.15)', dotC: '#f472b6', rule: 'rgba(236,72,153,0.3)', soft: 'rgba(236,72,153,0.2)', sel: '#9d174d', selTx: '#fce7f3' } },
    rose:   { dot: '#f43f5e', light: { accent: '#e11d48', tag: '#ffe4e6', dotC: '#f43f5e', rule: '#fda4af', soft: '#fecdd3', sel: '#fecdd3', selTx: '#881337' }, dark: { accent: '#fb7185', tag: 'rgba(244,63,94,0.15)', dotC: '#fb7185', rule: 'rgba(244,63,94,0.3)', soft: 'rgba(244,63,94,0.2)', sel: '#9f1239', selTx: '#ffe4e6' } },
    orange: { dot: '#f97316', light: { accent: '#ea580c', tag: '#ffedd5', dotC: '#f97316', rule: '#fdba74', soft: '#fed7aa', sel: '#fed7aa', selTx: '#7c2d12' }, dark: { accent: '#fb923c', tag: 'rgba(249,115,22,0.15)', dotC: '#fb923c', rule: 'rgba(249,115,22,0.3)', soft: 'rgba(249,115,22,0.2)', sel: '#9a3412', selTx: '#ffedd5' } },
    amber:  { dot: '#f59e0b', light: { accent: '#d97706', tag: '#fef3c7', dotC: '#f59e0b', rule: '#fcd34d', soft: '#fde68a', sel: '#fde68a', selTx: '#78350f' }, dark: { accent: '#fbbf24', tag: 'rgba(245,158,11,0.15)', dotC: '#fbbf24', rule: 'rgba(245,158,11,0.3)', soft: 'rgba(245,158,11,0.2)', sel: '#92400e', selTx: '#fef3c7' } },
    green:  { dot: '#22c55e', light: { accent: '#16a34a', tag: '#dcfce7', dotC: '#22c55e', rule: '#86efac', soft: '#bbf7d0', sel: '#bbf7d0', selTx: '#14532d' }, dark: { accent: '#4ade80', tag: 'rgba(34,197,94,0.15)', dotC: '#4ade80', rule: 'rgba(34,197,94,0.3)', soft: 'rgba(34,197,94,0.2)', sel: '#166534', selTx: '#dcfce7' } },
    teal:   { dot: '#14b8a6', light: { accent: '#0d9488', tag: '#ccfbf1', dotC: '#14b8a6', rule: '#5eead4', soft: '#99f6e4', sel: '#99f6e4', selTx: '#134e4a' }, dark: { accent: '#2dd4bf', tag: 'rgba(20,184,166,0.15)', dotC: '#2dd4bf', rule: 'rgba(20,184,166,0.3)', soft: 'rgba(20,184,166,0.2)', sel: '#115e59', selTx: '#ccfbf1' } },
    blue:   { dot: '#3b82f6', light: { accent: '#2563eb', tag: '#dbeafe', dotC: '#3b82f6', rule: '#93c5fd', soft: '#bfdbfe', sel: '#bfdbfe', selTx: '#1e3a8a' }, dark: { accent: '#60a5fa', tag: 'rgba(59,130,246,0.15)', dotC: '#60a5fa', rule: 'rgba(59,130,246,0.3)', soft: 'rgba(59,130,246,0.2)', sel: '#1e40af', selTx: '#dbeafe' } },
    violet: { dot: '#8b5cf6', light: { accent: '#7c3aed', tag: '#ede9fe', dotC: '#8b5cf6', rule: '#c4b5fd', soft: '#ddd6fe', sel: '#ddd6fe', selTx: '#4c1d95' }, dark: { accent: '#a78bfa', tag: 'rgba(139,92,246,0.15)', dotC: '#a78bfa', rule: 'rgba(139,92,246,0.3)', soft: 'rgba(139,92,246,0.2)', sel: '#5b21b6', selTx: '#ede9fe' } },
  };

  const applyAccent = (color: string, currentTheme: string) => {
    const palette = accentPalettes[color]?.[currentTheme as 'light' | 'dark'];
    if (!palette) return;
    const root = document.documentElement;
    root.style.setProperty('--th-accent', palette.accent);
    root.style.setProperty('--th-tag', palette.tag);
    root.style.setProperty('--th-dot', palette.dotC);
    root.style.setProperty('--th-rule', palette.rule);
    root.style.setProperty('--th-soft', palette.soft);
    root.style.setProperty('--th-sel', palette.sel);
    root.style.setProperty('--th-sel-tx', palette.selTx);
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const storedAccent = localStorage.getItem('accent') || 'violet';
    const initial = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    setAccent(storedAccent);
    document.documentElement.className = initial === 'light' ? '' : initial;
    // apply accent after class is set so CSS vars layer correctly
    setTimeout(() => applyAccent(storedAccent, initial), 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTheme = (t: 'light' | 'dark') => {
    setTheme(t);
    document.documentElement.className = t === 'light' ? '' : t;
    localStorage.setItem('theme', t);
    setTimeout(() => applyAccent(accent, t), 0);
  };

  const changeAccent = (color: string) => {
    setAccent(color);
    localStorage.setItem('accent', color);
    applyAccent(color, theme);
  };

  useEffect(() => {
    const subIds = ['ec-university', 'ec-highschool', 'proj-2026', 'proj-2025', 'proj-2024', 'proj-2023', 'proj-2022'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSubSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );
    subIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [openExtracurriculars, openProjectYears]);

  const scrollTo = (id: string) => {
    // Close mobile menu
    setMobileMenuOpen(false);
    setMobileExpandedNav(null);

    // Open the corresponding dropdown if navigating to a sub-group
    if (id.startsWith('ec-')) {
      const key = id.replace('ec-', '');
      setOpenExtracurriculars(prev => ({ ...prev, [key]: true }));
    } else if (id.startsWith('proj-')) {
      const year = id.replace('proj-', '');
      setOpenProjectYears(prev => ({ ...prev, [year]: true }));
    }

    // Small delay to let the dropdown open before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      const distance = Math.abs(top - window.scrollY);
      const duration = Math.min(300 + distance * 0.05, 500);
      const start = window.scrollY;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + (top - start) * easeOutCubic(progress));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, id.startsWith('ec-') || id.startsWith('proj-') ? 50 : 0);
  };

  return (
    <div className={`bg-th-bg text-th-body min-h-screen font-sans selection:bg-th-sel selection:text-th-sel-tx ${mobileMenuOpen ? 'overflow-hidden max-h-screen' : ''}`}>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-th-glass backdrop-blur-sm border-b border-th-line px-4 py-3 lg:hidden">
        <button onClick={() => { scrollTo('about'); }} className="text-lg font-bold text-th-heading tracking-tight">Bella Kim</button>
        <div className="flex items-center gap-3">
          <a href="mailto:b37kim@uwaterloo.ca" className="text-th-accent hover:text-th-heading transition">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/gayeunbella/" target="_blank" rel="noopener noreferrer" className="text-th-accent hover:text-th-heading transition">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://github.com/gayeunbella/" target="_blank" rel="noopener noreferrer" className="text-th-accent hover:text-th-heading transition">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-1 text-th-accent hover:text-th-heading transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-th-overlay" />
          <div className="absolute top-[53px] left-0 right-0 bg-th-glass backdrop-blur-sm border-b border-th-line" onClick={(e) => e.stopPropagation()}>
            <nav className="px-4 py-3">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center">
                      <button
                        className={`flex-1 text-left py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                          activeSection === item.id ? 'text-th-heading' : 'text-th-muted'
                        }`}
                        onClick={() => item.children ? setMobileExpandedNav(mobileExpandedNav === item.id ? null : item.id) : scrollTo(item.id)}
                      >
                        {item.label}
                      </button>
                      {item.children && (
                        <button
                          onClick={() => setMobileExpandedNav(mobileExpandedNav === item.id ? null : item.id)}
                          className="p-2 text-th-muted"
                        >
                          <svg className={`h-3 w-3 transition-transform duration-500 ease-out-expo ${mobileExpandedNav === item.id ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                      )}
                    </div>
                    {item.children && mobileExpandedNav === item.id && (
                      <ul className="ml-4 mb-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button
                              className={`w-full text-left py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                                activeSubSection === child.id ? 'text-th-heading' : 'text-th-muted'
                              }`}
                              onClick={() => scrollTo(child.id)}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className="mx-auto min-h-screen max-w-7xl px-4 pt-16 pb-12 font-sans sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-0 lg:pt-0">
        <div className="lg:flex lg:justify-between lg:gap-0">

          {/* Left Sidebar (Sticky) — hidden on mobile */}
          <header className="hidden lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 lg:pr-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-th-heading sm:text-5xl">
                Bella Kim
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-th-sub sm:text-xl">
                Computer Engineering @ University of Waterloo
              </h2>
              <div className="mt-8 flex items-center gap-4">
                <a href="mailto:b37kim@uwaterloo.ca" className="text-th-accent hover:text-th-heading transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/gayeunbella/" target="_blank" rel="noopener noreferrer" className="text-th-accent hover:text-th-heading transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/gayeunbella/" target="_blank" rel="noopener noreferrer" className="text-th-accent hover:text-th-heading transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-full bg-th-tag p-1 group/theme">
                <div className="flex items-center">
                  {([
                    { key: 'light' as const, label: 'Light Mode', icon: <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
                    { key: 'dark' as const, label: 'Dark Mode', icon: <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg> },
                  ]).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => changeTheme(t.key)}
                      className={`flex items-center rounded-full py-1.5 text-xs font-medium whitespace-nowrap overflow-hidden ${
                        theme === t.key
                          ? 'bg-th-bg text-th-heading shadow-sm gap-1.5 max-w-40 px-2.5 opacity-100'
                          : 'text-th-muted hover:text-th-heading gap-0 max-w-0 px-0 opacity-0 group-hover/theme:gap-1.5 group-hover/theme:max-w-40 group-hover/theme:px-2.5 group-hover/theme:opacity-100'
                      }`}
                      style={{ transition: 'max-width 600ms cubic-bezier(0.16, 1, 0.3, 1), padding 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease, gap 600ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2.5 pr-1.5">
                  {(['pink','rose','orange','amber','green','teal','blue','violet'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => changeAccent(key)}
                      className={`h-3.5 w-3.5 rounded-full transition-all duration-200 ${accent === key ? 'ring-2 ring-offset-1 scale-125' : 'hover:scale-125'}`}
                      style={{ backgroundColor: accentPalettes[key].dot, '--tw-ring-color': accentPalettes[key].dot, '--tw-ring-offset-color': 'var(--th-tag)' } as React.CSSProperties}
                      aria-label={`${key} accent`}
                    />
                  ))}
                </div>
              </div>

              <nav className="nav mt-8">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isParentActive = activeSection === item.id;
                    const activeChild = item.children?.find(c => c.id === activeSubSection);
                    const showChildren = item.children && (hoveredNav === item.id || isParentActive);
                    return (
                      <li
                        key={item.id}
                        onMouseEnter={() => item.children && setHoveredNav(item.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                      >
                        <button
                          className="group flex items-center py-2 w-full text-left"
                          onClick={() => scrollTo(item.id)}
                        >
                          <span
                            className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                              isParentActive
                                ? 'text-th-heading'
                                : 'text-th-muted group-hover:text-th-heading'
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                        {item.children && (
                          <div
                            className={`flex items-stretch gap-1.5 ml-4 overflow-hidden transition-all duration-500 ease-out-expo ${
                              showChildren ? 'max-h-8 opacity-100 mb-1' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <span className="w-px bg-th-rule shrink-0" />
                            {item.children.map((child) => (
                              <button
                                key={child.id}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                                  activeSubSection === child.id
                                    ? 'bg-th-accent text-white'
                                    : activeChild && activeChild.id !== child.id
                                      ? 'text-th-muted hover:text-th-heading hover:bg-th-tag'
                                      : 'text-th-sub hover:text-th-heading hover:bg-th-tag'
                                }`}
                                onClick={() => scrollTo(child.id)}
                              >
                                {child.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </header>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-th-line self-stretch" />

          {/* Right Content (Scrollable) */}
          <main className="pt-2 lg:w-1/2 lg:py-24 lg:pl-12 space-y-12 sm:space-y-16">

            {/* Mobile Hero */}
            <div className="lg:hidden">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-th-heading">Bella Kim</h1>
              <h2 className="mt-1 text-sm sm:text-base font-medium tracking-tight text-th-sub">Computer Engineering @ University of Waterloo</h2>
              <div className="mt-6 flex items-center justify-between rounded-full bg-th-tag p-1">
                <button
                  onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
                  className="flex items-center gap-1.5 rounded-full bg-th-bg px-2.5 py-1.5 text-xs font-medium text-th-heading shadow-sm"
                >
                  {theme === 'light' ? (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  ) : (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                  )}
                  <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
                </button>
                <div className="flex items-center gap-2.5 pr-1.5">
                  {(['pink','rose','orange','amber','green','teal','blue','violet'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => changeAccent(key)}
                      className={`h-3.5 w-3.5 rounded-full transition-all duration-200 ${accent === key ? 'ring-2 ring-offset-1 scale-125' : ''}`}
                      style={{ backgroundColor: accentPalettes[key].dot, '--tw-ring-color': accentPalettes[key].dot, '--tw-ring-offset-color': 'var(--th-tag)' } as React.CSSProperties}
                      aria-label={`${key} accent`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <section id="about" className="scroll-mt-16 lg:scroll-mt-24 text-th-prose leading-relaxed">
              <h3 className="text-lg font-bold uppercase tracking-widest text-th-heading mb-6">About</h3>
              <p className="mb-4">
                I am a first-year Computer Engineering student at the University of Waterloo, admitted with the President&#39;s Scholarship of Distinction. I work at the intersection of hardware and software — from designing custom PCBs for autonomous robots to building full-stack web applications.
              </p>
              <p className="mb-4">
                Currently on my first co-op as a Software Engineering Intern at Graze.AI, where I develop automation tools and internal software. Previously, I co-led JAMHacks 9, securing $10k+ in sponsorship and managing a team of 17 organizers for 200+ attendees.
              </p>
              <p className="mb-6">
                I have won multiple awards at hackathons and competitions, including Best Use of DeSo, Best Sustainability Hack, and Best Software Project. Outside of engineering, I speak English, Korean, and Japanese.
              </p>
              <div className="space-y-4">
                {[
                  { category: "Languages", skills: ["Python", "C++", "JavaScript", "TypeScript", "Verilog", "HTML", "CSS"] },
                  { category: "Web & Frameworks", skills: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Flask", "GraphQL"] },
                  { category: "Tools & Platforms", skills: ["Git", "Vercel", "n8n", "Google AppScript", "Google Cloud API", "BeautifulSoup", "SQLite", "JWT", "Figma"] },
                  { category: "Hardware & Embedded", skills: ["PCB Design", "TraxMaker", "AutoCAD", "Onshape", "FreeRTOS", "Arduino", "Embedded Systems"] },
                ].map((group) => (
                  <div key={group.category}>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-th-accent mb-2">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="flex items-center rounded-full bg-th-tag px-3 py-1 text-xs font-medium leading-5 text-th-sub">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-th-line" />

            <section id="experience" className="scroll-mt-16 lg:scroll-mt-24 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-widest text-th-heading">Work Experience</h3>

              <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2 flex md:block">Winter 2026<span className="hidden md:block"></span><span className="ml-auto md:ml-0"> Jan - Apr</span></header>
                <div className="z-10 md:col-span-6">
                  <h3 className="font-medium leading-snug text-th-heading">Graze.AI</h3>
                  <div className="mt-3 space-y-3">
                    <div className="relative pl-4 border-l border-th-rule">
                      <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                      <p className="text-sm font-medium text-th-heading">Software Engineering Co-op</p>
                      <p className="mt-1 text-sm leading-normal text-th-prose">Developing software solutions and working alongside the engineering team.</p>
                    </div>
                  </div>
                  <ul className="mt-3 flex flex-wrap text-xs font-medium text-th-sub">
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JavaScript</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Google AppScript</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">N8N</div></li>
                  </ul>
                </div>
              </div>

              <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2 flex md:block">Summer 2025<span className="hidden md:block"></span><span className="ml-auto md:ml-0"> Jul — Aug</span></header>
                <div className="z-10 md:col-span-6">
                  <h3 className="font-medium leading-snug text-th-heading">LIKE School</h3>
                  <div className="mt-3 space-y-3">
                    <div className="relative pl-4 border-l border-th-rule">
                      <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                      <p className="text-sm font-medium text-th-heading">Teacher Assistant</p>
                      <p className="mt-1 text-sm leading-normal text-th-prose">Tutored 200+ students in English speaking and writing. Assisted staff with IT operations and created 20+ booklets with leveled study questions.</p>
                    </div>
                  </div>
                  <ul className="mt-3 flex flex-wrap text-xs font-medium text-th-sub">
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Teaching</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">IT Operations</div></li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-th-line" />

            <section id="extracurriculars" className="scroll-mt-16 lg:scroll-mt-24 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-widest text-th-heading">Extracurriculars</h3>

              {/* University */}
              <div id="ec-university">
                <button onClick={() => toggleExtracurricular('university')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openExtracurriculars.university ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">University</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openExtracurriculars.university ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openExtracurriculars.university ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Sep 2025 —<span className="hidden md:block"></span> Present</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">UW AKCSE</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Events Coordinator</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Plan and execute all AKCSE events, coordinating logistics, venues, and outreach for the University of Waterloo chapter.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* High School */}
              <div id="ec-highschool">
                <button onClick={() => toggleExtracurricular('highschool')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openExtracurriculars.highschool ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">High School</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openExtracurriculars.highschool ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openExtracurriculars.highschool ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Aug 2024 —<span className="hidden md:block"></span> Jun 2025</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">JAMHacks 9</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Co Lead</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Led a team of 17 organizers alongside co-lead Jasmine. Secured $10k+ in sponsorship and managed 200+ attendees.</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Vercel</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Jun 2022 —<span className="hidden md:block"></span> Jun 2025</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">Highlander Engineering</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Tech Lead</p>
                            <p className="text-xs text-th-muted">Jun 2024 — Jun 2025</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Designed and updated the official website regularly using Next.js & Vercel.</p>
                          </div>
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Marketing Executive</p>
                            <p className="text-xs text-th-muted">Feb 2023 — Jun 2024</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Designed and posted 20+ posts on social media.</p>
                          </div>
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Software Executive</p>
                            <p className="text-xs text-th-muted">Jun 2022 — Jun 2024</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Vercel</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Sep 2023 —<span className="hidden md:block"></span> Present</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">SVP Teens · Social Venture Partners Waterloo Region</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Website Executive</p>
                            <p className="text-xs text-th-muted">Aug 2024 — Present</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Updated the official webpage regularly using HTML, CSS & JavaScript.</p>
                          </div>
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Fundraising Executive</p>
                            <p className="text-xs text-th-muted">Sep 2023 — Aug 2024</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Planned fundraising events and raised $1900+ as a team in 2023-24.</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">CSS</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JavaScript</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Jun 2022 —<span className="hidden md:block"></span> Present</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">Key Club International</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Co-President</p>
                            <p className="text-xs text-th-muted">Jun 2023 — Present</p>
                          </div>
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Junior Executive</p>
                            <p className="text-xs text-th-muted">Jun 2022 — Jun 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Jan — Nov 2023</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">RythmHacks</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Marketing / Design Executive</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Designed the sponsorship package used to secure funds from 18 companies. Created 30+ social media posts helping the event reach 100+ hackers.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">May 2023</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">TurtleHacks</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Mentor</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Mentored hackers with HTML, CSS, and Python at a 300+ participant hackathon.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Sep 2022</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading">Hack the North</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-th-rule">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-th-dot"></div>
                            <p className="text-sm font-medium text-th-heading">Ceremonies Volunteer</p>
                            <p className="mt-1 text-sm leading-normal text-th-prose">Greeted and guided hackers and helped them find assigned seats at the closing ceremony.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-th-line" />

            <section id="projects" className="scroll-mt-16 lg:scroll-mt-24 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-widest text-th-heading">Projects</h3>

              {/* 2026 */}
              <div id="proj-2026">
                <button onClick={() => toggleProjectYear('2026')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openProjectYears['2026'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">2026</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openProjectYears['2026'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openProjectYears['2026'] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Mar 2026</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">UW Eng Network</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A social media for Engineering students and professors at the University of Waterloo to share projects and connect.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/uwengnetwork" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/uw-network" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">BeautifulSoup</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">SQLite</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">FastAPI</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">httpx</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Google Cloud API</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JWT</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* 2025 */}
              <div id="proj-2025">
                <button onClick={() => toggleProjectYear('2025')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openProjectYears['2025'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">2025</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openProjectYears['2025'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openProjectYears['2025'] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Feb 2025 —<span className="hidden md:block"></span> Jun 2025</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Autonomous Firefighter Bot</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">Autonomous robot that detects and extinguishes fires in a maze environment. Secured fastest completion time (9.8s) among 50 competing robots. Created 3 custom PCB boards using TraxMaker, improving signal reliability by 40%.</p>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">PCB Design</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">TraxMaker</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">AutoCAD</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Onshape</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Embedded Systems</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Mar 2025</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Portfolio</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">Personal portfolio website showcasing projects, experience, and skills. Built with Next.js, React, and Tailwind CSS with a responsive design.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/portfolio" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">TypeScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Tailwind CSS</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* 2024 */}
              <div id="proj-2024">
                <button onClick={() => toggleProjectYear('2024')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openProjectYears['2024'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">2024</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openProjectYears['2024'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openProjectYears['2024'] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">May 2024</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">CashQuiz</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A gamified study platform that quizzes users and rewards correct answers with points redeemable for gift cards. Built at DaveHacks 2024.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/cashquiz" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/cashquiz" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Oct 2023 —<span className="hidden md:block"></span> May 2024</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Fluent Friends</h3>
                        <p className="mt-1 text-sm text-th-heading">🏆 Best User Design at Technovation Girls</p>
                        <p className="mt-2 text-sm leading-normal text-th-prose">Mobile app connecting ESL learners with native speakers. Won Best User Design at Waterloo Live Regional Pitch Event.</p>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Business Dev</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Problem Solving</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Oct 2023 —<span className="hidden md:block"></span> Apr 2024</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Plat AI</h3>
                        <p className="mt-1 text-sm text-th-heading">🏆 2nd Place at Flowboat Pitching Competition</p>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A real-time pitch assistant providing automated feedback on business pitches with 95% accuracy. Built a Q&A system that analyzes pitch topics to generate relevant interview questions.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/jeffrey-zang/plat" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Node.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">OpenAI API</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* 2023 */}
              <div id="proj-2023">
                <button onClick={() => toggleProjectYear('2023')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openProjectYears['2023'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">2023</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openProjectYears['2023'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openProjectYears['2023'] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Sep 2023</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Budget Buddy</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A budget planner that tracks income and expenses while helping users set financial objectives. Built at Hack the North 2023.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/hannaxia/Budget-Buddy" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/budget-buddy-5sunhq" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Tkinter</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Figma</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Jun 2023</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">FashionForecast</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A website that recommends daily outfits based on weather conditions, featuring a personal closet manager and calendar. Built at JAMHacks 7.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/Fashion-Forecast" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/fashionforecast" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">OpenWeatherMap API</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Jan 2023</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Bubble Cat</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A math learning game with feline-themed graphics that quizzes players across five topics including trigonometry and quadratics. Built at Treasure Hacks 3.0.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/Bubble-Cat" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/bubble-cat" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Tkinter</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* 2022 */}
              <div id="proj-2022">
                <button onClick={() => toggleProjectYear('2022')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-th-accent transition-transform duration-500 ease-out-expo ${openProjectYears['2022'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-th-sub group-hover:text-th-heading transition-colors">2022</h4>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${openProjectYears['2022'] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-500 ease-out-expo ${openProjectYears['2022'] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mt-4 space-y-8 ml-3 sm:mt-6 sm:space-y-12 sm:ml-6">
                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Nov 2022</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">CharityChimp</h3>
                        <p className="mt-1 text-sm text-th-heading">🏆 Winner of Best Use of DeSo at Give Back Hacks 3</p>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A full-stack web app powered by the DeSo blockchain that helps users find verified charities to donate to.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/jeffrey-zang/charitychimp" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/charitychimp" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">TypeScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Node.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Express</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">DeSo</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Nov 2022</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Studefficient</h3>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A web-based study tool with a to-do list, calendar, timer, and Pomodoro support to help students stay organized. Built at ClockHacks.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/Studefficient" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/studeficient" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Jun 2022</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">FoodiEco</h3>
                        <p className="mt-1 text-sm text-th-heading">🏆 Winner of Best Software Project at Highlander Engineering Challenge</p>
                        <p className="mt-2 text-sm leading-normal text-th-prose">An app with a fridge tracker, recipe organizer, and eco-friendly ingredient replacement suggestions.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/acrenw/FoodiEco" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/foodieco" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Tkinter</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">May 2022</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Thrift</h3>
                        <p className="mt-1 text-sm text-th-heading">🏆 Winner of Best Sustainability Hack at JAMHacks 6</p>
                        <p className="mt-2 text-sm leading-normal text-th-prose">A Chrome extension delivering real-time sustainability insights to guide eco-conscious purchases. Accelerated product data scraping by 60% using Flask and boosted relevant product match rate by 35%.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/bakuyy/thrift" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/thrift-ys09e8" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-th-accent hover:text-th-heading transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Flask</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all md:grid-cols-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-th-accent md:col-span-2">Oct 2022 —<span className="hidden md:block"></span> Nov 2022</header>
                      <div className="z-10 md:col-span-6">
                        <h3 className="font-medium leading-snug text-th-heading hover:text-th-accent">Light Your Way</h3>
                        <p className="mt-1 text-sm text-th-heading">🏆 Overall Project, Strong Pitch & Organization at Community Changemaker</p>
                        <p className="mt-2 text-sm leading-normal text-th-prose">An event platform connecting students with community resources.</p>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-th-sub">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-th-tag px-3 py-1 leading-5">Event Design</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
