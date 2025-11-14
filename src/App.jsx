import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Responsive Tailwind + Framer Motion single-file portfolio page
// Improvements for responsiveness:
// - Mobile-friendly navbar with toggle
// - Reduced particle density on small screens
// - Stacked hero on small screens, buttons full-width
// - Larger tap targets for mobile inputs/buttons
// - Adaptive grids and spacing

export default function Portfolio() {
  const canvasRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Particle background (lightweight canvas) with adaptive density
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // determine particle count based on size and device pixel ratio
    function computeCount() {
      const area = w * h;
      const base = Math.floor(area / 120000); // higher divisor -> fewer particles
      const isSmall = window.matchMedia('(max-width: 640px)').matches;
      return Math.max(isSmall ? 18 : 48, base);
    }

    let PARTICLE_COUNT = computeCount();
    const particles = [];

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.24, 0.24),
          vy: rand(-0.12, 0.28),
          r: rand(0.5, 2.6),
          hue: Math.floor(rand(190, 300)),
          alpha: rand(0.05, 0.28),
        });
      }
    }

    initParticles();

    let rafId;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // subtle gradient overlay
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, 'rgba(10,12,30,0.12)');
      g.addColorStop(1, 'rgba(10,6,20,0.12)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
        ctx.shadowBlur = p.r * 6;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, ${Math.min(0.6, p.alpha * 4)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const newCount = computeCount();
      if (newCount !== PARTICLE_COUNT) {
        PARTICLE_COUNT = newCount;
        initParticles();
      }
    }

    window.addEventListener('resize', onResize);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Framer motion variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariant = {
    hover: { scale: 1.03, y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.45)' },
  };

  return (
    <div className="relative min-h-screen font-poppins text-white bg-[#05060b] overflow-x-hidden">
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />

      {/* Subtle animated gradient background */}
      <div className="fixed inset-0 -z-20 animate-gradient bg-gradient-to-br from-[#071029] via-[#0b1024] to-[#06030b] opacity-95" />

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-5xl backdrop-blur-sm bg-white/3 border border-white/4 rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-400 shadow-[0_6px_20px_rgba(99,102,241,0.12)]">
            <span className="font-bold tracking-wide text-[#020617] text-sm md:text-base">AD</span>
          </div>
          <h2 className="text-sm md:text-lg font-semibold tracking-wide">ARJITH DEV.</h2>
        </div>

        {/* Desktop links */}
        <div className={`hidden md:flex items-center gap-6 text-sm opacity-90`}>
          <a href="#home" className="nav-link">Home</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#resume" className="nav-link">Education</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((s) => !s)}
            className="relative z-50 w-10 h-10 rounded-md bg-white/6 flex items-center justify-center"
          >
            <span className={`block w-5 h-[2px] bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-[0px]' : '-translate-y-1.5'}`} />
            <span className={`block w-5 h-[2px] bg-white transition-all ${menuOpen ? 'opacity-0' : 'opacity-80'}`} />
            <span className={`block w-5 h-[2px] bg-white transition-transform ${menuOpen ? '-rotate-45 translate-y-[0px]' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-20 right-4 left-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] border border-white/6 rounded-xl p-6">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="p-3 rounded-lg nav-link" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#skills" className="p-3 rounded-lg nav-link" onClick={() => setMenuOpen(false)}>Skills</a>
              <a href="#projects" className="p-3 rounded-lg nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#resume" className="p-3 rounded-lg nav-link" onClick={() => setMenuOpen(false)}>Education</a>
              <a href="#contact" className="p-3 rounded-lg nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
            </nav>
          </div>
        </div>
      )}

      {/* HERO */}
      <header id="home" className="min-h-screen flex items-center justify-center px-4 md:px-12 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariant}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center"
        >
          {/* Left: Intro */}
          <motion.div className="space-y-5 p-6 md:p-8 bg-gradient-to-br from-white/3 to-white/2 rounded-2xl backdrop-blur-lg border border-white/6 shadow-neon">
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-200 leading-tight"
            >
              Hi, I'm <span className="text-cyan-200">Arjith</span> Mandula
            </motion.h1>

            <motion.p className="text-sm md:text-base opacity-80">
              Aspiring Full‑Stack Developer. I build modern, scalable web apps using <strong>React</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-[#020617] font-semibold shadow-[0_8px_60px_rgba(79,70,229,0.12)] w-full sm:w-auto"
              >
                <span className="relative z-10">🚀 Hire Me</span>
                <span className="absolute -inset-1 rounded-xl blur-2xl opacity-40" style={{ boxShadow: '0 6px 30px rgba(56,189,248,0.16), 0 0 80px rgba(168,85,247,0.08)' }} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/8 w-full sm:w-auto"
                href="#projects"
              >
                <span className="text-sm z-10">View My Work</span>
                <span className="absolute inset-0 rounded-xl" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.02)' }} />
              </motion.a>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs opacity-80">
              <span className="px-3 py-1 rounded-full bg-white/4">HTML</span>
              <span className="px-3 py-1 rounded-full bg-white/4">CSS</span>
              <span className="px-3 py-1 rounded-full bg-white/4">JavaScript</span>
              <span className="px-3 py-1 rounded-full bg-white/4">React</span>
            </div>
          </motion.div>

          {/* Right: Glass card with mock hero image / code block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.9 }}
            className="p-4 md:p-6 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] backdrop-blur-lg border border-white/6 shadow-xl"
          >
            <div className="w-full h-56 md:h-72 rounded-xl bg-gradient-to-br from-[#081227] to-[#0f0520] p-3 relative overflow-hidden">
              <div className="absolute -left-16 -top-16 w-56 h-56 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse-slow" />

              <div className="h-full flex flex-col justify-center">
                <div className="mb-3">
                  <div className="text-xs opacity-70">Featured Project</div>
                  <div className="text-lg font-semibold text-purple-300">Jobby</div>
                </div>

                <pre className="text-xs md:text-sm font-mono leading-5 opacity-80 bg-transparent rounded-md p-2 border border-white/6 overflow-auto" style={{ maxHeight: 160 }}>
{`<section>
  <h2>Jobby</h2>
  <p>Full‑stack job portal with JWT auth & CRUD operations.</p>
</section>`}
                </pre>

                <div className="mt-3 flex gap-2">
                  <a href="https://github.com/arjithnandu12/jobby" target="_blank" rel="noreferrer" className="text-sm px-3 py-2 rounded-md bg-white/4">View Repo</a>
                  <a href="https://jobby-frontend.onrender.com" className="text-sm px-3 py-2 rounded-md bg-white/4">Open Project</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* SKILLS */}
      <motion.section
        id="skills"
        className="py-12 md:py-20 px-4 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariant}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-10 gradient-heading" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Skills
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {['HTML','CSS','JavaScript','React','Node.js','Express.js','MongoDB','Python'].map((skill) => (
              <motion.div
                key={skill}
                whileHover="hover"
                variants={cardVariant}
                transition={{ type: 'spring', stiffness: 240 }}
                className="relative p-4 md:p-6 rounded-xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md border border-white/6"
              >
                <div className="text-sm md:text-base font-semibold text-purple-200">{skill}</div>
                <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-transparent to-cyan-400 opacity-40" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section id="projects" className="py-12 md:py-20 px-4 md:px-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-10 gradient-heading" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: 'NXTtrendz', link: 'https://github.com/arjithnandu12/nxtrendz_', desc: 'Responsive e‑commerce website built with HTML, CSS, JS.' },
              { title: 'Jobby (MERN)', link: 'https://jobby-frontend.onrender.com', desc: 'Full‑stack job portal with JWT auth & CRUD operations.' },
              { title: 'NxtMart', link: 'https://github.com/arjithnandu12/NxtMart', desc: 'Modern e‑commerce grocery platform.' },
            ].map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ scale: 1.025, y: -6 }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={() => window.open(p.link, '_blank')}
                className="cursor-pointer p-4 md:p-6 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] backdrop-blur-md border border-white/6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-300">{p.title}</h3>
                    <p className="opacity-80 mt-2 text-sm">{p.desc}</p>
                  </div>
                  <div className="text-xs opacity-70 hidden sm:block">Open ↗</div>
                </div>

                <div className="mt-3 flex gap-2 text-xs opacity-80">
                  <span className="px-2 py-1 rounded-full bg-white/4">Web</span>
                  <span className="px-2 py-1 rounded-full bg-white/4">Frontend</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EDUCATION / RESUME */}
      <motion.section id="resume" className="py-12 md:py-20 px-4 md:px-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md border border-white/6">
            <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3">Education</h3>
            <ul className="space-y-2 opacity-90 text-sm md:text-base">
              <li>Nxtwave Institute — BTech CS (2024)</li>
              <li>Narayana Institute — Intermediate MPC (2022)</li>
              <li>Narayana High School — Schooling (2020)</li>
            </ul>
          </div>

          <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md border border-white/6">
            <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3">Skills Summary</h3>
            <ul className="space-y-2 opacity-90 text-sm md:text-base">
              <li>HTML, CSS, JavaScript, React</li>
              <li>Node.js, Express.js, MongoDB</li>
              <li>Python, Git & GitHub</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section id="contact" className="py-12 md:py-20 px-4 md:px-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md border border-white/6">
            <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-3">Let's Connect</h2>
            <p className="opacity-80 mb-6 text-sm md:text-base">I'm open to discussing new projects, creative ideas, or opportunities. Reach out and let's build something modern together.</p>

            <div className="space-y-3">
              <a href="https://github.com/arjithnandu12" target="_blank" rel="noreferrer" className="block px-4 py-3 rounded-lg bg-[#0f1525] border border-white/6">🐱 GitHub</a>
              <a href="https://www.linkedin.com/in/arjith-mandula" target="_blank" rel="noreferrer" className="block px-4 py-3 rounded-lg bg-[#0f1525] border border-white/6">💼 LinkedIn</a>
              <a href="mailto:arjithmandula@gmail.com" className="block px-4 py-3 rounded-lg bg-[#0f1525] border border-white/6">✉️ Email</a>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md border border-white/6">
            <form className="space-y-3 text-left" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-sm md:text-base opacity-80">Name</label>
              <input className="w-full p-3 md:p-4 rounded-xl bg-[#0f1525] border border-transparent focus:border-cyan-400 outline-none text-sm md:text-base" placeholder="Your name" />

              <label className="block text-sm md:text-base opacity-80">Email</label>
              <input className="w-full p-3 md:p-4 rounded-xl bg-[#0f1525] border border-transparent focus:border-purple-400 outline-none text-sm md:text-base" placeholder="your.email@example.com" />

              <label className="block text-sm md:text-base opacity-80">Message</label>
              <textarea rows={4} className="w-full p-3 md:p-4 rounded-xl bg-[#0f1525] border border-transparent focus:border-cyan-300 outline-none text-sm md:text-base" placeholder="Tell me about your project..." />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative overflow-hidden w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-[#020617] font-semibold"
              >
                <span className="relative z-10">🚀 Send Message</span>
                <span className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 18px 60px rgba(79,70,229,0.12), 0 0 80px rgba(56,189,248,0.06)' }} />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 md:py-8">
        <div className="max-w-6xl mx-auto text-center text-sm md:text-base opacity-70">© {new Date().getFullYear()} Arjith Mandula</div>
      </footer>

      {/* Inline styles for some custom animations and utilities not provided by Tailwind by default */}
      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientShift 12s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-heading {
          background: linear-gradient(90deg, #a78bfa, #60a5fa, #22d3ee);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .shadow-neon {
          box-shadow: 0 6px 28px rgba(124,58,237,0.06), 0 0 80px rgba(14,165,233,0.03);
        }

        .nav-link {
          position: relative;
          padding: 8px 10px;
          border-radius: 8px;
          transition: all 200ms ease;
          color: rgba(255,255,255,0.95);
        }

        .nav-link:hover {
          transform: translateY(-3px);
          color: #67e8f9;
        }

        .animate-pulse-slow {
          animation: pulse 6s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.12; }
          50% { transform: scale(1.05); opacity: 0.26; }
          100% { transform: scale(1); opacity: 0.12; }
        }

        /* Ensure rounded container doesn't overflow on very small screens */
        @media (max-width: 420px) {
          nav { padding-left: 12px; padding-right: 12px; }
        }
      `}</style>
    </div>
  );
}
