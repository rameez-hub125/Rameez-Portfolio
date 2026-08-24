import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Hero3D from './components/Hero3D';
import { 
  FaBrain, FaRobot, FaEye, FaRecycle, FaTicketSimple, FaSchool, 
  FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCode, FaLaptopCode, 
  FaServer, FaNetworkWired, FaDiagramProject
} from 'react-icons/fa6';
import { 
  SiPython, SiTensorflow, SiReact, SiNodedotjs, SiTypescript, 
  SiJavascript, SiHtml5, SiPostgresql, SiGit, SiCplusplus, SiOpencv
} from 'react-icons/si';
import './App.css';
import './index.css';
import './components.css';

// ─── Data ────────────────────────────────────────────────────────
const skillsData = [
  { name: 'Python',           icon: <SiPython style={{ color: '#3776AB' }} />, pct: 90 },
  { name: 'TensorFlow/Keras', icon: <SiTensorflow style={{ color: '#FF6F00' }} />, pct: 85 },
  { name: 'Computer Vision',  icon: <FaEye style={{ color: '#34d399' }} />, pct: 80 },
  { name: 'Machine Learning', icon: <FaRobot style={{ color: '#fbbf24' }} />, pct: 82 },
  { name: 'React.js',         icon: <SiReact style={{ color: '#61DAFB' }} />, pct: 88 },
  { name: 'Node.js',          icon: <SiNodedotjs style={{ color: '#5FA04E' }} />, pct: 80 },
  { name: 'TypeScript',       icon: <SiTypescript style={{ color: '#3178C6' }} />, pct: 75 },
  { name: 'JavaScript',       icon: <SiJavascript style={{ color: '#F7DF1E' }} />, pct: 90 },
  { name: 'HTML / CSS',       icon: <SiHtml5 style={{ color: '#E34F26' }} />, pct: 92 },
  { name: 'SQL',              icon: <SiPostgresql style={{ color: '#4169E1' }} />, pct: 78 },
  { name: 'Git & GitHub',     icon: <SiGit style={{ color: '#F05032' }} />, pct: 85 },
  { name: 'REST APIs',        icon: <FaServer style={{ color: '#10b981' }} />, pct: 82 },
  { name: 'CNN / MobileNet',  icon: <FaNetworkWired style={{ color: '#a7f3d0' }} />, pct: 80 },
  { name: 'OpenCV',           icon: <SiOpencv style={{ color: '#5C3EE8' }} />, pct: 75 },
  { name: 'C / C++',          icon: <SiCplusplus style={{ color: '#00599C' }} />, pct: 65 },
  { name: 'Data Preprocessing',icon: <FaDiagramProject style={{ color: '#fbbf24' }} />, pct: 78 },
];

const projects = [
  {
    icon: <FaRecycle style={{ color: '#10b981' }} />,
    title: 'AI-Powered Recycling Platform',
    desc: 'Gamified waste recycling web application with real-time AI image classification. Built with React.js, Node.js, TypeScript and Neon Database.',
    longDesc: 'A full-stack gamified web application that encourages recycling through AI. Users upload photos of waste, and the system instantly classifies it using a CNN model built on MobileNetV2 with transfer learning. Points are awarded for correct recycling, powering a leaderboard system. The backend uses Node.js with RESTful APIs connected to a Neon PostgreSQL database.',
    tags: ['React.js', 'TensorFlow', 'MobileNetV2', 'Node.js', 'TypeScript', 'Neon DB'],
    features: [
      'Real-time AI image classification with 90%+ accuracy',
      'Gamification with points, badges and leaderboard',
      'RESTful API with Node.js and TypeScript',
      'Neon PostgreSQL database for persistent storage',
      'MobileNetV2 transfer learning model',
    ],
    link: 'https://github.com/rameez-hub125/treasure-to-trash'
  },
  {
    icon: <FaBrain style={{ color: '#fbbf24' }} />,
    title: 'CNN Image Classifier',
    desc: 'Trained, tested, evaluated and optimized convolutional neural network models for real-world computer vision applications.',
    longDesc: 'A comprehensive deep learning project covering the full ML pipeline — data collection, preprocessing, augmentation, model architecture design, training, evaluation and optimization. Used MobileNetV2 with fine-tuning and custom dense layers to achieve high accuracy on multi-class classification tasks.',
    tags: ['Python', 'Keras', 'CNN', 'Transfer Learning', 'OpenCV'],
    features: [
      'MobileNetV2 transfer learning with fine-tuning',
      'Data augmentation to prevent overfitting',
      'Confusion matrix, precision, recall evaluation',
      'Model optimization and hyperparameter tuning',
      'OpenCV-based image preprocessing pipeline',
    ],
    link: 'https://www.kaggle.com/code/bsf58rameezraza/fyp-cnn-model'
  },
  {
    icon: <FaTicketSimple style={{ color: '#61DAFB' }} />,
    title: 'Ticketing System',
    desc: 'Full-featured ticketing management system with real-time updates, role-based access control, and clean admin dashboard.',
    longDesc: 'A full-stack event ticketing platform with multi-role access (Admin, Manager, Staff). Admins can create events, set ticket quotas, and monitor sales. The dashboard shows real-time stats and the system handles concurrent bookings gracefully.',
    tags: ['React.js', 'Node.js', 'SQL', 'REST API', 'JavaScript'],
    features: [
      'Role-based access control (Admin / Staff)',
      'Real-time dashboard with live ticket counts',
      'Booking management with validation',
      'SQL database with normalized schema',
      'RESTful API with error handling',
    ],
  },
  {
    icon: <FaSchool style={{ color: '#34d399' }} />,
    title: 'School Management System',
    desc: 'Comprehensive school management POS system for handling students, teachers, and administrative tasks with intuitive dashboards.',
    longDesc: 'A comprehensive school ERP system with modules for student registration, fee management, attendance tracking, and report generation. Built as a POS-style interface for ease of use by non-technical school staff.',
    tags: ['Full-Stack', 'JavaScript', 'SQL', 'CSS'],
    features: [
      'Student and teacher registration & management',
      'Fee payment tracking and receipt generation',
      'Attendance marking and reporting',
      'POS-style intuitive interface',
      'SQL-backed data with relational structure',
    ],
    link: 'https://github.com/rameez-hub125/School-Managment-sys'
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of Education, Lahore',
    year: '2022 – 2026',
    grade: 'CGPA: 3.08 / 4.0',
  },
  {
    degree: 'FSc Pre-Engineering',
    school: 'Superior Group Of Colleges',
    year: '2019 – 2021',
    grade: 'Percentage: 73%',
  },
];

const EMAILJS_SERVICE  = 'service_zhazv58';
const EMAILJS_TEMPLATE = 'template_b7ubk2f';
const EMAILJS_PUBLIC   = 'CBTQVoOlazPBIdiZh';

// ═══════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const onDown = () => {
      dotRef.current?.classList.add('clicking');
      ringRef.current?.classList.add('clicking');
    };
    const onUp = () => {
      dotRef.current?.classList.remove('clicking');
      ringRef.current?.classList.remove('clicking');
    };

    const onHover = () => {
      dotRef.current?.classList.add('hovering');
      ringRef.current?.classList.add('hovering');
    };
    const onLeave = () => {
      dotRef.current?.classList.remove('hovering');
      ringRef.current?.classList.remove('hovering');
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.querySelectorAll('a, button, .project-card, .skill-bar-item').forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    let animId;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.left  = pos.current.x + 'px';
        dotRef.current.style.top   = pos.current.y + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCROLL-TO-TOP
// ═══════════════════════════════════════════════════════════════
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button
      id="scroll-top-btn"
      className={`scroll-top-btn ${visible ? '' : 'hidden'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Optional: observer.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '50px' }
    );
    els.forEach(el => observer.observe(el));

    // Fallback: force visibility for the hero section immediately
    setTimeout(() => {
      document.querySelectorAll('.hero-section .reveal-left, .hero-section .reveal-right').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);

    return () => observer.disconnect();
  }, []);
}

// ═══════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════
// TYPEWRITER
// ═══════════════════════════════════════════════════════════════
function Typewriter({ phrases }) {
  const [display, setDisplay] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      setDisplay(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(i => i + 1), 70);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      setDisplay(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(i => i - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return (
    <span>
      {display}
      <span style={{ color: 'var(--accent-primary)', animation: 'pulse 1s infinite' }}>|</span>
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'About',      id: 'about' },
    { label: 'Skills',     id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects',   id: 'projects' },
    { label: 'Education',  id: 'education' },
    { label: 'Contact',    id: 'contact' },
  ];

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none' }}>
        <div className="navbar-inner">
          <a href="#about" className="navbar-logo" style={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={e => navTo(e, 'about')}>
            <span className="logo-icon-box">
              <FaCode style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }} />
            </span>
            <span className="logo-text">
              RAMEEZ <span className="logo-accent">RAZA</span>
            </span>
          </a>
          <ul className="navbar-links">
            {navLinks.map(({ label, id }) => (
              <li key={id}><a href={`#${id}`} id={`nav-${id}`} onClick={e => navTo(e, id)}>{label}</a></li>
            ))}
          </ul>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mrrameez32@gmail.com"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary navbar-hire"
            id="navbar-hire-btn"
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px' }}>
            Hire Me
          </a>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ label, id }) => (
          <a key={id} href={`#${id}`} onClick={e => navTo(e, id)}>{label}</a>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function HeroSection() {
  const photoContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!photoContainerRef.current) return;
    const { left, top, width, height } = photoContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = (e.clientY - top - height / 2) / 15;
    photoContainerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!photoContainerRef.current) return;
    photoContainerRef.current.style.transform = `rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="hero-section">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for Opportunities
            </div>
            <h1 className="hero-name">
              Muhammad<br />
              <span className="text-gradient">Rameez Raza</span>
            </h1>
            <p className="hero-title">
              <Typewriter phrases={[
                'AI & ML Engineer',
                'Full-Stack Developer',
                'Computer Vision Expert',
                'React.js Developer',
                'Python Developer',
              ]} />
            </p>
            <p className="hero-desc">
              Motivated Computer Science graduate passionate about Artificial Intelligence,
              Machine Learning, Computer Vision, and Full-Stack Web Development.
              I build intelligent systems and beautiful digital experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary" id="hero-projects-btn"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                🚀 View Projects
              </a>
              <a href="/RAMEEZcs.pdf" download="Muhammad_Rameez_Raza_CV.pdf" className="btn btn-outline" id="hero-cv-btn">
                📄 Download CV
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number"><AnimatedCounter target={4} suffix="+" /></span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number"><AnimatedCounter target={3} suffix=".0" /><AnimatedCounter target={8} /></span>
                <span className="stat-label">CGPA (prev)</span>
              </div>
              <div className="stat-item">
                <span className="stat-number"><AnimatedCounter target={1} suffix="+" /></span>
                <span className="stat-label">Years Exp.</span>
              </div>
            </div>
          </div>

          <div className="hero-photo-wrapper" style={{ perspective: '1000px' }}>
            <div 
              className="profile-photo-container"
              ref={photoContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
            >
              <div className="profile-photo-glow" style={{ transform: 'translateZ(-20px)' }} />
              <div className="profile-photo-ring" style={{ transform: 'translateZ(-10px)' }} />
              <div className="profile-photo-ring-inner" style={{ transform: 'translateZ(-5px)' }} />
              <img src="/profile.jpg" alt="Muhammad Rameez Raza" className="profile-photo" style={{ transform: 'translateZ(10px)' }} />
              <div className="profile-tech-badge badge-ai" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaBrain style={{ color: '#10b981' }} /> AI & ML Engineer
              </div>
              <div className="profile-tech-badge badge-fullstack" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaLaptopCode style={{ color: '#fbbf24' }} /> Full-Stack Dev
              </div>
              <div className="profile-tech-badge badge-cv" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FaEye style={{ color: '#34d399' }} /> Computer Vision
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SKILL BAR
// ═══════════════════════════════════════════════════════════════
function SkillBar({ name, icon, pct }) {
  const fillRef = useRef(null);
  const pctRef  = useRef(null);
  const done    = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        setTimeout(() => {
          if (fillRef.current) fillRef.current.style.width = pct + '%';
          // count up
          let n = 0;
          const step = pct / 50;
          const timer = setInterval(() => {
            n += step;
            if (n >= pct) { n = pct; clearInterval(timer); }
            if (pctRef.current) pctRef.current.textContent = Math.floor(n) + '%';
          }, 20);
        }, 200);
      }
    }, { threshold: 0.3 });
    if (fillRef.current) observer.observe(fillRef.current);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{icon} {name}</span>
        <span className="skill-bar-pct" ref={pctRef}>0%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" ref={fillRef} />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.03) 50%, transparent 100%)' }}>
      <div className="container">
        <p className="section-label reveal">What I Work With</p>
        <h2 className="section-title reveal">Technical Skills</h2>
        <div className="section-divider reveal" />
        <div className="skills-progress-grid">
          {skillsData.map((s, i) => (
            <div key={s.name} className="reveal" style={{ transitionDelay: `${i * 0.04}s` }}>
              <SkillBar {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPERIENCE
// ═══════════════════════════════════════════════════════════════
function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="section-label reveal">Work History</p>
        <h2 className="section-title reveal">Experience</h2>
        <div className="section-divider reveal" />
        <div className="timeline reveal">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <p className="timeline-date">June 2026 – September 2026</p>
            <h3 className="timeline-role">MERN Stack Internship</h3>
            <p className="timeline-company">Exelia Technologies</p>
            <ul className="timeline-desc">
              <li>Completed a 3-month internship gaining practical experience in software development within a professional IT environment.</li>
              <li>Worked with MERN Stack technologies (MongoDB, Express.js, React.js, and Node.js) on real-world web applications.</li>
              <li>Contributed to frontend implementation, backend API development, and database integration.</li>
              <li>Performed debugging and code optimization to improve overall application functionality and performance.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <p className="timeline-date">July 2025 – April 2026</p>
            <h3 className="timeline-role">AI &amp; Full-Stack Developer</h3>
            <p className="timeline-company">University of Education, Lahore</p>
            <ul className="timeline-desc">
              <li>Designed and developed a gamified waste recycling web application using React.js, Node.js, TypeScript, and Neon Database.</li>
              <li>Built and integrated an AI-powered image classification system using TensorFlow/Keras with MobileNetV2 architecture.</li>
              <li>Trained, tested, evaluated, and optimized CNN models achieving high classification accuracy.</li>
              <li>Conducted data collection, preprocessing, and augmentation to improve model robustness.</li>
              <li>Designed RESTful API endpoints and integrated front-end with AI backend for real-time classification.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════
// PROJECT MODAL
// ═══════════════════════════════════════════════════════════════
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <span className="modal-icon">{project.icon}</span>
        <h3 className="modal-title">{project.title}</h3>
        <p className="modal-desc">{project.longDesc}</p>

        <p className="modal-section-label">Tech Stack</p>
        <div className="modal-tags">
          {project.tags.map(t => <span key={t} className="modal-tag">{t}</span>)}
        </div>

        <p className="modal-section-label">Key Features</p>
        <ul className="modal-features">
          {project.features.map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(251,191,36,0.02) 50%, transparent 100%)' }}>
      <div className="container">
        <p className="section-label reveal">What I've Built</p>
        <h2 className="section-title reveal">Featured Projects</h2>
        <div className="section-divider reveal" />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={p.title} className="project-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => {
                if (p.link) window.open(p.link, '_blank', 'noopener,noreferrer');
                else setActiveProject(p);
              }}>
              <span className="project-icon">{p.icon}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {p.link ? 'View Live Project ↗' : 'Click to view details →'}
              </p>
            </div>
          ))}
        </div>
      </div>
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDUCATION
// ═══════════════════════════════════════════════════════════════
function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="container">
        <p className="section-label reveal">Academic Background</p>
        <h2 className="section-title reveal">Education</h2>
        <div className="section-divider reveal" />
        <div className="education-grid">
          {education.map((e, i) => (
            <div key={e.degree} className="edu-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <p className="edu-degree">{e.degree}</p>
              <p className="edu-school">{e.school}</p>
              <p className="edu-year">{e.year} · {e.grade}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM + LINKS
// ═══════════════════════════════════════════════════════════════
function ContactSection() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const contacts = [
    { icon: <FaEnvelope style={{ color: '#10b981' }} />, type: 'Email',    value: 'mrrameez32@gmail.com',                      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mrrameez32@gmail.com', external: true },
    { icon: <FaPhone style={{ color: '#fbbf24' }} />, type: 'Phone',    value: '+92 304 6179842',                            href: 'tel:+923046179842', external: false },
    { icon: <FaLinkedin style={{ color: '#0A66C2' }} />, type: 'LinkedIn', value: 'linkedin.com/in/rameez-raza-48bb72413',      href: 'https://www.linkedin.com/in/rameez-raza-48bb72413', external: true },
    { icon: <FaGithub style={{ color: '#ffffff' }} />, type: 'GitHub',   value: 'github.com/rameez-hub125',                  href: 'https://github.com/rameez-hub125', external: true },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_PUBLIC);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrapper">
          <p className="section-label reveal" style={{ justifyContent: 'center' }}>Let's Connect</p>
          <h2 className="section-title reveal">Get In Touch</h2>
          <div className="section-divider reveal" style={{ margin: '0 auto 2rem' }} />
          <p className="reveal" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            I'm currently open to new opportunities. Whether you have a project, a question,
            or just want to say hi — my inbox is always open!
          </p>

          {/* Contact cards */}
          <div className="contact-links reveal">
            {contacts.map(c => (
              <a key={c.type} href={c.href} className="contact-item"
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}>
                <div className="contact-icon">{c.icon}</div>
                <div className="contact-text">
                  <p className="contact-type">{c.type}</p>
                  <p className="contact-value">{c.value}</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--accent-primary)', fontSize: '1.1rem' }}>
                  {c.external ? '↗' : '→'}
                </span>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form reveal">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="from_name">Your Name</label>
                <input id="from_name" name="from_name" type="text" className="form-input"
                  placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reply_to">Your Email</label>
                <input id="reply_to" name="reply_to" type="email" className="form-input"
                  placeholder="john@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" className="form-input"
                placeholder="Job Opportunity / Project Collaboration" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-textarea"
                placeholder="Tell me about the opportunity or project..." required />
            </div>

            {status === 'success' && (
              <p className="form-status success">✅ Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-status error">❌ Oops! Something went wrong. Please email me directly.</p>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="submit" id="form-submit-btn" className="btn btn-primary form-submit"
                disabled={loading}>
                {loading ? '⏳ Sending...' : '📧 Send Message'}
              </button>
              <a href="/RAMEEZcs.pdf" download="Muhammad_Rameez_Raza_CV.pdf"
                className="btn btn-outline" id="download-cv-btn">
                📄 Download CV
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════
function App() {
  useReveal();

  return (
    <>
      <CustomCursor />
      <Hero3D />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
        <footer className="footer">
          <p>Designed & Built by{' '}
            <span style={{ color: 'var(--accent-primary)' }}>Muhammad Rameez Raza</span>
            {' '}· {new Date().getFullYear()}
          </p>
        </footer>
      </div>
      <ScrollToTop />
    </>
  );
}

export default App;
