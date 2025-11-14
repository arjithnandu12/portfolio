import React from 'react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <div className="text-white bg-[#0b0f19] min-h-screen font-poppins">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-10 py-5 bg-transparent z-20">
        <h2 className="text-2xl font-bold tracking-wide">ARJITH DEV.</h2>
        <div className="space-x-8">
          <a href="#home" className="hover:text-cyan-400">Home</a>
          <a href="#skills" className="hover:text-cyan-400">Skills</a>
          <a href="#projects" className="hover:text-cyan-400">Projects</a>
          <a href="#resume" className="hover:text-cyan-400">Resume</a>
          <a href="#contact" className="hover:text-cyan-400">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-5 bg-gradient-to-br from-[#152040] to-[#0b0f19]">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 text-transparent bg-clip-text"
        >
          Hi, I'm Arjith Mandula
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg mt-2 opacity-80"
        >
          Aspiring Full‑Stack Developer | HTML, CSS, JavaScript, Python
        </motion.p>

        <div className="mt-6 space-x-4">
          <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Hire Me</button>
          <button className="px-6 py-3 border border-white rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition">View My Work</button>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 px-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-10">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['HTML','CSS','JavaScript','React','Node.js','Express.js','MongoDB','Python'].map(skill => (
            <div key={skill} className="bg-[#111626] p-6 rounded-xl shadow-lg hover:scale-105 transition text-lg">{skill}</div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 px-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[ 
            { title: 'NXTtrendz', desc: 'Responsive e‑commerce website built with HTML, CSS, JS.' },
            { title: 'Jobby (MERN)', desc: 'Full‑stack job portal with JWT auth & CRUD operations.' },
            { title: 'NxtMart', desc: 'Modern e‑commerce grocery platform.' },
          ].map(p => (
            <div key={p.title} className="bg-[#111626] p-6 rounded-xl shadow-xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-purple-300">{p.title}</h3>
              <p className="opacity-80 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="py-24 px-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-10">Resume</h2>

        <div className="bg-[#111626] p-6 rounded-xl mb-6">
          <h3 className="text-purple-300 text-xl font-semibold mb-2">Education</h3>
          <ul className="space-y-2 opacity-90">
            <li>Nxtwave Institute — BTech CS (2024)</li>
            <li>Narayana Institute — Intermediate MPC (2022)</li>
            <li>Narayana High School — Schooling (2020)</li>
          </ul>
        </div>

        <div className="bg-[#111626] p-6 rounded-xl">
          <h3 className="text-purple-300 text-xl font-semibold mb-2">Skills Summary</h3>
          <ul className="space-y-2 opacity-90">
            <li>HTML, CSS, JavaScript, React</li>
            <li>Node.js, Express.js, MongoDB</li>
            <li>Python, Git & GitHub</li>
          </ul>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-10">Contact</h2>
        <p className="opacity-80">Email: arjithmandula@gmail.com</p>
        <p className="opacity-80 mt-2">Phone: 08919065783</p>
      </section>
    </div>
  );
}
