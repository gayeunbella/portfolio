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
    <div className="bg-blue-950 text-blue-100 min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-0">

          {/* Left Sidebar (Sticky) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 lg:pr-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Bella Kim
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-blue-300 sm:text-xl">
                Computer Engineering @ University of Waterloo
              </h2>
              <div className="mt-8 flex items-center gap-4">
                <a href="mailto:b37kim@uwaterloo.ca" className="text-blue-400 hover:text-white transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/gayeunbella/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/gayeunbella/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>

              <nav className="nav mt-8">
                <ul className="mt-8 w-max">
                  {navItems.map((item) => {
                    const isParentActive = activeSection === item.id;
                    const activeChild = item.children?.find(c => c.id === activeSubSection);
                    return (
                      <li
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => item.children && setHoveredNav(item.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                      >
                        <button
                          className="group flex items-center py-3"
                          onClick={() => scrollTo(item.id)}
                        >
                          <span
                            className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                              isParentActive
                                ? 'text-white'
                                : 'text-blue-400/60 group-hover:text-blue-300'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.children && (
                            <svg className={`ml-1.5 h-3 w-3 transition-colors ${isParentActive ? 'text-white' : 'text-blue-400/60 group-hover:text-blue-300'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                          )}
                        </button>
                        {item.children && hoveredNav === item.id && (
                          <ul className="absolute left-0 top-full z-50 min-w-30 rounded-md border border-blue-400/20 bg-blue-950/95 backdrop-blur-sm py-1 shadow-lg">
                            {item.children.map((child) => (
                              <li key={child.id}>
                                <button
                                  className={`w-full px-4 py-2 text-left text-xs font-medium uppercase tracking-wider transition-colors ${
                                    activeSubSection === child.id
                                      ? 'text-white bg-blue-900/50'
                                      : 'text-blue-400/60 hover:text-white hover:bg-blue-900/50'
                                  }`}
                                  onClick={() => {
                                    scrollTo(child.id);
                                    setHoveredNav(null);
                                  }}
                                >
                                  {child.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        {/* Show active sub-label next to parent when scrolled to a child */}
                        {isParentActive && activeChild && !hoveredNav && (
                          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-[10px] font-medium uppercase tracking-wider text-blue-400/60 whitespace-nowrap">
                            {activeChild.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </header>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-white/20 self-stretch" />

          {/* Right Content (Scrollable) */}
          <main className="pt-24 lg:w-1/2 lg:py-24 lg:pl-12 space-y-24">

            <section id="about" className="scroll-mt-16 lg:scroll-mt-24 text-blue-300/80 leading-relaxed">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-6">About</h3>
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
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 text-xs font-medium leading-5 text-blue-300">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-white/20" />

            <section id="experience" className="scroll-mt-16 lg:scroll-mt-24 space-y-12">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Work Experience</h3>

              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Winter 2026<br/>Jan - Apr</header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-white">Graze.AI</h3>
                  <div className="mt-3 space-y-3">
                    <div className="relative pl-4 border-l border-blue-400/30">
                      <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                      <p className="text-sm font-medium text-white">Software Engineering Co-op</p>
                      <p className="mt-1 text-sm leading-normal text-blue-300/80">Developing software solutions and working alongside the engineering team.</p>
                    </div>
                  </div>
                  <ul className="mt-3 flex flex-wrap text-xs font-medium text-blue-300">
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JavaScript</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Google AppScript</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">N8N</div></li>
                  </ul>
                </div>
              </div>

              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Summer 2025<br/>Jul — Aug</header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-white">LIKE School</h3>
                  <div className="mt-3 space-y-3">
                    <div className="relative pl-4 border-l border-blue-400/30">
                      <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                      <p className="text-sm font-medium text-white">Teacher Assistant</p>
                      <p className="mt-1 text-sm leading-normal text-blue-300/80">Tutored 200+ students in English speaking and writing. Assisted staff with IT operations and created 20+ booklets with leveled study questions.</p>
                    </div>
                  </div>
                  <ul className="mt-3 flex flex-wrap text-xs font-medium text-blue-300">
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Teaching</div></li>
                    <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">IT Operations</div></li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-white/20" />

            <section id="extracurriculars" className="scroll-mt-16 lg:scroll-mt-24 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Extracurriculars</h3>

              {/* University */}
              <div id="ec-university">
                <button onClick={() => toggleExtracurricular('university')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openExtracurriculars.university ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">University</h4>
                </button>
                {openExtracurriculars.university && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Program</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">BETS</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Participant</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Bridging Entrepreneurs to Students participant.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* High School */}
              <div id="ec-highschool">
                <button onClick={() => toggleExtracurricular('highschool')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openExtracurriculars.highschool ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">High School</h4>
                </button>
                {openExtracurriculars.highschool && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Aug 2024 —<br/>Jun 2025</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">JAMHacks 9</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Co Lead</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Led a team of 17 organizers alongside co-lead Jasmine. Secured $10k+ in sponsorship and managed 200+ attendees.</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Vercel</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Jun 2022 —<br/>Jun 2025</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">Highlander Engineering</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Tech Lead</p>
                            <p className="text-xs text-blue-400/60">Jun 2024 — Jun 2025</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Designed and updated the official website regularly using Next.js & Vercel.</p>
                          </div>
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Marketing Executive</p>
                            <p className="text-xs text-blue-400/60">Feb 2023 — Jun 2024</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Designed and posted 20+ posts on social media.</p>
                          </div>
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Software Executive</p>
                            <p className="text-xs text-blue-400/60">Jun 2022 — Jun 2024</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Vercel</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Sep 2023 —<br/>Present</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">SVP Teens · Social Venture Partners Waterloo Region</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Website Executive</p>
                            <p className="text-xs text-blue-400/60">Aug 2024 — Present</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Updated the official webpage regularly using HTML, CSS & JavaScript.</p>
                          </div>
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Fundraising Executive</p>
                            <p className="text-xs text-blue-400/60">Sep 2023 — Aug 2024</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Planned fundraising events and raised $1900+ as a team in 2023-24.</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">CSS</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JavaScript</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Jun 2022 —<br/>Present</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">Key Club International</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Co-President</p>
                            <p className="text-xs text-blue-400/60">Jun 2023 — Present</p>
                          </div>
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Junior Executive</p>
                            <p className="text-xs text-blue-400/60">Jun 2022 — Jun 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Jan — Nov 2023</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">RythmHacks</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Marketing / Design Executive</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Designed the sponsorship package used to secure funds from 18 companies. Created 30+ social media posts helping the event reach 100+ hackers.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">May 2023</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">TurtleHacks</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Mentor</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Mentored hackers with HTML, CSS, and Python at a 300+ participant hackathon.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Sep 2022</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white">Hack the North</h3>
                        <div className="mt-3 space-y-3">
                          <div className="relative pl-4 border-l border-blue-400/30">
                            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-blue-400"></div>
                            <p className="text-sm font-medium text-white">Ceremonies Volunteer</p>
                            <p className="mt-1 text-sm leading-normal text-blue-300/80">Greeted and guided hackers and helped them find assigned seats at the closing ceremony.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <hr className="border-white/20" />

            <section id="projects" className="scroll-mt-16 lg:scroll-mt-24 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Projects</h3>

              {/* 2026 */}
              <div id="proj-2026">
                <button onClick={() => toggleProjectYear('2026')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openProjectYears['2026'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">2026</h4>
                </button>
                {openProjectYears['2026'] && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Mar 2026</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">UW Eng Network</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A social media for Engineering students and professors at the University of Waterloo to share projects and connect.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/uwengnetwork" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/uw-network" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">BeautifulSoup</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">SQLite</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">FastAPI</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Next.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">httpx</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Google Cloud API</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JWT</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2025 */}
              <div id="proj-2025">
                <button onClick={() => toggleProjectYear('2025')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openProjectYears['2025'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">2025</h4>
                </button>
                {openProjectYears['2025'] && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Feb 2025 —<br/>Jun 2025</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Autonomous Firefighter Bot</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">Autonomous robot that detects and extinguishes fires in a maze environment. Secured fastest completion time (9.8s) among 50 competing robots. Created 3 custom PCB boards using TraxMaker, improving signal reliability by 40%.</p>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">PCB Design</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">TraxMaker</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">AutoCAD</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Onshape</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Embedded Systems</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2024 */}
              <div id="proj-2024">
                <button onClick={() => toggleProjectYear('2024')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openProjectYears['2024'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">2024</h4>
                </button>
                {openProjectYears['2024'] && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">May 2024</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">CashQuiz</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A gamified study platform that quizzes users and rewards correct answers with points redeemable for gift cards. Built at DaveHacks 2024.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/cashquiz" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/cashquiz" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Oct 2023 —<br/>May 2024</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Fluent Friends</h3>
                        <p className="mt-1 text-sm text-white">🏆 Best User Design at Technovation Girls</p>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">Mobile app connecting ESL learners with native speakers. Won Best User Design at Waterloo Live Regional Pitch Event.</p>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Business Dev</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Problem Solving</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Oct 2023 —<br/>Apr 2024</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Plat AI</h3>
                        <p className="mt-1 text-sm text-white">🏆 2nd Place at Flowboat Pitching Competition</p>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A real-time pitch assistant providing automated feedback on business pitches with 95% accuracy. Built a Q&A system that analyzes pitch topics to generate relevant interview questions.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/jeffrey-zang/plat" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Node.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">OpenAI API</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2023 */}
              <div id="proj-2023">
                <button onClick={() => toggleProjectYear('2023')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openProjectYears['2023'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">2023</h4>
                </button>
                {openProjectYears['2023'] && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Sep 2023</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Budget Buddy</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A budget planner that tracks income and expenses while helping users set financial objectives. Built at Hack the North 2023.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/hannaxia/Budget-Buddy" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/budget-buddy-5sunhq" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Tkinter</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Figma</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Jun 2023</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">FashionForecast</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A website that recommends daily outfits based on weather conditions, featuring a personal closet manager and calendar. Built at JAMHacks 7.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/Fashion-Forecast" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/fashionforecast" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">OpenWeatherMap API</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Jan 2023</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Bubble Cat</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A math learning game with feline-themed graphics that quizzes players across five topics including trigonometry and quadratics. Built at Treasure Hacks 3.0.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/Bubble-Cat" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/bubble-cat" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Tkinter</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2022 */}
              <div id="proj-2022">
                <button onClick={() => toggleProjectYear('2022')} className="flex items-center gap-2 w-full text-left group">
                  <svg className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${openProjectYears['2022'] ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">2022</h4>
                </button>
                {openProjectYears['2022'] && (
                  <div className="mt-6 space-y-12 ml-6">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Nov 2022</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">CharityChimp</h3>
                        <p className="mt-1 text-sm text-white">🏆 Winner of Best Use of DeSo at Give Back Hacks 3</p>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A full-stack web app powered by the DeSo blockchain that helps users find verified charities to donate to.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/jeffrey-zang/charitychimp" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/charitychimp" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">TypeScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Node.js</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Express</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">DeSo</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Nov 2022</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Studefficient</h3>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A web-based study tool with a to-do list, calendar, timer, and Pomodoro support to help students stay organized. Built at ClockHacks.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/gayeunbella/Studefficient" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/studeficient" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Jun 2022</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">FoodiEco</h3>
                        <p className="mt-1 text-sm text-white">🏆 Winner of Best Software Project at Highlander Engineering Challenge</p>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">An app with a fridge tracker, recipe organizer, and eco-friendly ingredient replacement suggestions.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/acrenw/FoodiEco" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/foodieco" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Tkinter</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">May 2022</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Thrift</h3>
                        <p className="mt-1 text-sm text-white">🏆 Winner of Best Sustainability Hack at JAMHacks 6</p>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">A Chrome extension delivering real-time sustainability insights to guide eco-conscious purchases. Accelerated product data scraping by 60% using Flask and boosted relevant product match rate by 35%.</p>
                        <div className="mt-3 flex items-center gap-3">
                          <a href="https://github.com/bakuyy/thrift" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                          <a href="https://devpost.com/software/thrift-ys09e8" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-400 hover:text-white transition flex items-center gap-1">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
                            Devpost
                          </a>
                        </div>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Python</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Flask</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">JavaScript</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">HTML</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">CSS</div></li>
                        </ul>
                      </div>
                    </div>

                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:col-span-2">Oct 2022 —<br/>Nov 2022</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-white hover:text-blue-300">Light Your Way</h3>
                        <p className="mt-1 text-sm text-white">🏆 Overall Project, Strong Pitch & Organization at Community Changemaker</p>
                        <p className="mt-2 text-sm leading-normal text-blue-300/80">An event platform connecting students with community resources.</p>
                        <ul className="mt-2 flex flex-wrap text-xs font-medium text-blue-300">
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">React</div></li>
                          <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-blue-900/50 px-3 py-1 leading-5">Event Design</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
