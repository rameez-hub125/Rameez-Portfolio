import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Hero3D from './components/Hero3D';
import { 
  FaBrain, FaRobot, FaEye, FaRecycle, FaTicketSimple, FaSchool, 
  FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCode, FaLaptopCode, 
  FaServer, FaNetworkWired, FaDiagramProject,
  FaCertificate, FaAward, FaTrophy, FaBriefcase, FaArrowUpRightFromSquare,
  FaGraduationCap, FaGlobe, FaLanguage, FaWandMagicSparkles,
  FaChevronDown, FaChevronUp
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
  {
    icon: <FaBrain style={{ color: '#34d399' }} />,
    title: 'AirGuard-PK — Air Quality AI System',
    desc: 'Explainable AI-powered Air Quality Intelligence and forecasting system providing transparent insights into environmental data.',
    longDesc: 'AirGuard-PK is an Explainable AI (XAI) system designed for monitoring, forecasting, and interpreting air quality metrics. It integrates machine learning predictive models with XAI techniques to deliver transparent, actionable air pollution insights.',
    tags: ['Python', 'Machine Learning', 'Explainable AI', 'XAI', 'Data Analytics'],
    features: [
      'Explainable AI (XAI) model transparency and feature importance',
      'Air quality data preprocessing, feature engineering, and analytics pipeline',
      'Machine learning model training and evaluation metrics',
      'Interactive dashboard for environmental monitoring',
    ],
    link: 'https://github.com/rameez-hub125/Air-Guard'
  },
  {
    icon: <FaSchool style={{ color: '#10b981' }} />,
    title: 'CareFlow — Clinical Management System',
    desc: 'Comprehensive clinical and patient management web platform designed to streamline healthcare administrative workflows.',
    longDesc: 'CareFlow is a full-stack clinical management platform designed to optimize patient records management, appointment scheduling, and clinical operations with a responsive frontend and robust backend infrastructure.',
    tags: ['Full-Stack', 'React.js', 'Node.js', 'Express.js', 'JavaScript'],
    features: [
      'Patient registration, medical history, and records management',
      'Appointment scheduling and clinical workflow automation',
      'Modular full-stack architecture with frontend and backend services',
      'Responsive, user-friendly healthcare management interface',
    ],
    link: 'https://github.com/rameez-hub125/Clinical-system'
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    degreeCode: 'BS CS · 4-Year Degree',
    school: 'University of Education, Lahore (Jauharabad Campus)',
    year: '2022 – 2026',
    status: 'Graduated · Regular Session',
    stats: [
      { label: 'CGPA', value: '3.08 / 4.00', highlight: true },
      { label: 'Percentage', value: '72.00%' },
      { label: 'Credit Hours', value: '131 Cr. Hrs' },
      { label: 'Semesters', value: '8 Completed' },
      { label: 'Medium', value: 'English (Certified)' },
    ],
    transcriptFile: '/certificates/bs-computer-science-transcript.pdf',
    englishProofFile: '/certificates/english-proficiency-certificate.pdf',
    tags: [
      'Artificial Intelligence',
      'Artificial Neural Networks',
      'Computer Vision & Image Processing',
      'Data Structures & Algorithms',
      'Database Systems',
      'Web Engineering',
      'Operating Systems',
      'Mobile App Development'
    ],
    semesters: [
      { num: 'Sem 1', gpa: '3.08', courses: 'Functional English, Calculus-I, Pakistan Studies, Fundamentals of Accounting, Applied Physics, Intro to ICT' },
      { num: 'Sem 2', gpa: '2.74', courses: 'Programming Fundamentals, Islamic Studies, Discrete Mathematics, Communication Skills, Intro to Statistics & Probability, Digital Electronics' },
      { num: 'Sem 3', gpa: '2.96', courses: 'Object Oriented Programming, Elementary Linear Algebra, Principles of Management, Software Engineering, Computer Networks' },
      { num: 'Sem 4', gpa: '3.37', courses: 'Database Systems, General Methods of Teaching, Entrepreneurship, Operating System Concepts, Data Structure & Analysis of Algorithms' },
      { num: 'Sem 5', gpa: '2.98', courses: 'Computer Organization & Assembly Language, Technical Writing, Parallel & Distributed Computing, Design & Analysis of Algorithms, Mobile App Dev, Multivariable Calculus' },
      { num: 'Sem 6', gpa: '3.11', courses: 'Object Oriented Analysis & Design, Information Security, Theory of Automata & Formal Languages, Differential Equations, Fundamentals of Web Engineering' },
      { num: 'Sem 7', gpa: '2.94', courses: 'Artificial Intelligence, Compiler Construction, Introduction to Machine Learning' },
      { num: 'Sem 8', gpa: '3.50', courses: 'Professional Practices, Quran Translation, Artificial Neural Networks (Grade A), Numerical Computing (Grade A), Final Year Project (157/200)' },
    ]
  },
  {
    degree: 'Higher Secondary School Certificate (HSSC)',
    degreeCode: 'FSc Pre-Engineering',
    school: 'The Superior College of Commerce for Boys / BISE Sargodha',
    year: '2019 – 2021',
    status: 'Completed (One Attempt)',
    stats: [
      { label: 'Grade', value: 'Grade A', highlight: true },
      { label: 'Marks', value: '824 / 1100' },
      { label: 'Percentage', value: '74.91%' },
      { label: 'Board', value: 'BISE Sargodha' },
      { label: 'Stream', value: 'Pre-Engineering' },
    ],
    transcriptFile: '/certificates/intermediate-pre-engineering-certificate.pdf',
    tags: [
      'Mathematics (142/200)',
      'Physics (154/200)',
      'Chemistry (148/200)',
      'English (152/200)',
      'Urdu (152/200)',
      'Islamic & Pak Studies'
    ],
    subjects: [
      { name: 'Physics', marks: '154 / 200', score: '77.0%' },
      { name: 'English', marks: '152 / 200', score: '76.0%' },
      { name: 'Urdu', marks: '152 / 200', score: '76.0%' },
      { name: 'Chemistry', marks: '148 / 200', score: '74.0%' },
      { name: 'Mathematics', marks: '142 / 200', score: '71.0%' },
      { name: 'Pakistan Studies', marks: '38 / 50', score: '76.0%' },
      { name: 'Islamic Education', marks: '38 / 50', score: '76.0%' },
    ]
  },
];

const certificationsData = [
  {
    title: '1 Million Prompters — AI & Prompt Engineering',
    issuer: 'Dubai Future Foundation · Dubai Centre for AI',
    date: 'Initiative of H.H. Sheikh Hamdan bin Mohammed Al Maktoum',
    credentialId: 'Dubai Universal Blueprint for AI',
    docFile: '/certificates/one-million-prompters-dubai-future-foundation.pdf',
    category: 'AI & Machine Learning',
    group: 'ai',
    icon: <FaWandMagicSparkles style={{ color: '#06b6d4' }} />,
    color: '#06b6d4',
    description: [
      'Successfully completed the One Million Prompters initiative launched by H.H. Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, Crown Prince of Dubai.',
      'Developed advanced skills in Prompt Engineering and Contextual Intelligence for modern AI systems, contributing to a future-ready global AI workforce.'
    ]
  },
  {
    title: 'AI in Action Job Simulation',
    issuer: 'Forage · VISTA',
    date: 'Completed September 2026',
    credentialId: 'Verification: 6a91808b628256477271ae8d',
    verifyUrl: 'https://www.theforage.com/simulations/forage/ai-in-action',
    docFile: '/certificates/forage-ai-in-action-certificate.pdf',
    category: 'AI & Machine Learning',
    group: 'ai',
    icon: <FaBrain style={{ color: '#a855f7' }} />,
    color: '#a855f7',
    description: [
      'Completed practical tasks in Prompt & Contextual Engineering fluency and systematic AI prompt optimization.',
      'Applied prompt engineering techniques to automate real-world professional workflows and enterprise tasks.'
    ]
  },
  {
    title: 'Data Science & Analytics',
    issuer: 'HP LIFE | HP Foundation',
    date: 'Presented June 2026',
    credentialId: '0a0b5a23-45ae-461c-9343-4d0438ac4eff',
    verifyUrl: 'https://www.life-global.org/certificate/0a0b5a23-45ae-461c-9343-4d0438ac4eff',
    docFile: '/certificates/hp-data-science-analytics.pdf',
    category: 'Technical Certification',
    group: 'tech',
    icon: <FaCertificate style={{ color: '#10b981' }} />,
    color: '#10b981',
    description: [
      'Mastered core data science methodologies, exploratory data analysis, and modern business intelligence tools.',
      'Developed practical proficiency in data-driven decision making, analytical frameworks, and predictive modeling.'
    ]
  },
  {
    title: 'English Language Proficiency Certificate',
    issuer: 'University of Education, Lahore',
    date: 'Issued August 12, 2026 · Office of Registrar',
    credentialId: 'Ref: UE/R/5007/2026 3132',
    docFile: '/certificates/english-proficiency-certificate.pdf',
    category: 'Official Language Proof',
    group: 'language',
    icon: <FaLanguage style={{ color: '#38bdf8' }} />,
    color: '#38bdf8',
    description: [
      'Official institutional certificate verifying that the entire 4-year BS Computer Science degree program was conducted with English as the medium of instruction and examinations.',
      'Affirms professional and academic fluency in written, verbal, and technical English for global teams and international opportunities.'
    ]
  },
  {
    title: 'Marketing & Administrative Assistant',
    issuer: 'Aye Zee Travel & Holiday (Pvt Ltd)',
    date: 'Nov 2021 – Jul 2022 · Issued May 2023',
    credentialId: 'Ref: AZ-EXP-2023',
    docFile: '/certificates/aye-zee-travel-experience.pdf',
    category: 'Experience Certificate',
    group: 'experience',
    icon: <FaBriefcase style={{ color: '#38bdf8' }} />,
    color: '#38bdf8',
    description: [
      'Spearheaded digital operations, brand social media presence, and personalized customer support communication.',
      'Optimized administrative workflows, executive correspondence, and systematic office record management.'
    ]
  },
  {
    title: 'Senior Vice President — PSF',
    issuer: 'Peoples Student Federation · District Khushab',
    date: 'Notification Date: Nov 5, 2024',
    credentialId: 'Ref: PSF/KHB/UOE/11',
    docFile: '/certificates/psf-senior-vice-president.pdf',
    category: 'Leadership Appointment',
    group: 'experience',
    icon: <FaAward style={{ color: '#fbbf24' }} />,
    color: '#fbbf24',
    description: [
      'Appointed to campus executive leadership at University of Education to represent student body governance and welfare.',
      'Organized university youth initiatives, community outreach programs, and cross-departmental student leadership activities.'
    ]
  },
  {
    title: 'Football Championship — 2nd Position',
    issuer: 'University of Education, Lahore',
    date: 'Sports Gala 2025 · Lahore',
    credentialId: 'Award: Runners-Up Trophy',
    docFile: '/certificates/uoe-football-championship.pdf',
    category: 'Athletic Achievement',
    group: 'sports',
    icon: <FaTrophy style={{ color: '#f59e0b' }} />,
    color: '#f59e0b',
    description: [
      'Secured 2nd position in the inter-program football tournament representing campus at the University Sports Gala.',
      'Demonstrated high-tempo athletic conditioning, disciplined tactical coordination, and team sportsmanship under pressure.'
    ]
  },
  {
    title: 'Inter House Sports — 1st Position',
    issuer: 'District Public School & Inter College, Khushab',
    date: 'Nov 2016 · Jinnah House',
    credentialId: 'Award: Certificate of Excellence',
    docFile: '/certificates/inter-house-sports-excellence.pdf',
    category: 'Sports Excellence',
    group: 'sports',
    icon: <FaTrophy style={{ color: '#10b981' }} />,
    color: '#10b981',
    description: [
      'Achieved 1st position representing Jinnah House at the annual inter-house competitive sports tournament.',
      'Awarded Certificate of Excellence by the school principal for outstanding sportsmanship and athletic distinction.'
    ]
  },
  {
    title: 'Volleyball Championship — Certificate of Merit',
    issuer: 'University of Education, Jauharabad',
    date: 'March 2023 · Sports Gala LHR',
    credentialId: 'Award: Certificate of Merit',
    docFile: '/certificates/intercampus-sports.jpg',
    category: 'Athletic Achievement',
    group: 'sports',
    icon: <FaTrophy style={{ color: '#34d399' }} />,
    color: '#34d399',
    description: [
      'Commended for competitive participation and court performance in volleyball at the University Inter Campus Sports Gala.',
      'Contributed to team defensive strategies, agility under match pressure, and active collegiate sports participation.'
    ]
  }
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
    { label: 'About',          id: 'about' },
    { label: 'Skills',         id: 'skills' },
    { label: 'Experience',     id: 'experience' },
    { label: 'Projects',       id: 'projects' },
    { label: 'Education',      id: 'education' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact',        id: 'contact' },
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
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="hero-badge" style={{ marginBottom: 0 }}>
                <span className="hero-badge-dot" />
                Available for Opportunities
              </div>
              <a
                href="/certificates/english-proficiency-certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-badge"
                style={{
                  marginBottom: 0,
                  textDecoration: 'none',
                  background: 'rgba(56, 189, 248, 0.08)',
                  borderColor: 'rgba(56, 189, 248, 0.35)',
                  color: '#38bdf8',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer'
                }}
                title="Official English Proficiency Certificate (University of Education, Lahore)"
              >
                <FaGlobe style={{ fontSize: '0.85rem' }} /> English Certified (Medium of Instruction Proof) ↗
              </a>
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
              AI is changing how people work, solve problems, and build digital solutions, and I am interested in being part of that change. As a Computer Science graduate, I am exploring the practical use of AI, automation, and modern digital tools to turn ideas into efficient and useful solutions.
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
            <p className="timeline-date">June 2026 – July 2026</p>
            <h3 className="timeline-role">Computer Vision / AI Intern</h3>
            <p className="timeline-company">Erudite Solutions Ltd. — Islamabad, Pakistan</p>
            <ul className="timeline-desc">
              <li>Worked on Computer Vision and AI concepts, developing practical understanding of image-based machine learning workflows and AI technologies.</li>
              <li>Strengthened practical skills through a 30-hour/week hybrid internship involving both remote and office-based learning and development activities.</li>
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
          <div className="timeline-item">
            <div className="timeline-dot" />
            <p className="timeline-date">November 2021 – July 2022</p>
            <h3 className="timeline-role">Marketing &amp; Administrative Assistant</h3>
            <p className="timeline-company">Aye Zee Travel &amp; Holiday (Pvt Ltd) — Lahore, Pakistan</p>
            <ul className="timeline-desc">
              <li>Managed and expanded the company's active presence across digital platforms and social media channels to enhance brand outreach.</li>
              <li>Handled client relations, addressed customer inquiries, conducted travel correspondence, and facilitated travel-related support services.</li>
              <li>Assisted the executive management team with daily office workflows, maintained critical documentation, and executed systematic record management.</li>
            </ul>
            <a
              href="/certificates/aye-zee-travel-experience.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-btn"
            >
              <FaArrowUpRightFromSquare style={{ fontSize: '0.8rem' }} /> View Experience Certificate
            </a>
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
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (degree) => {
    setExpandedCards(prev => ({
      ...prev,
      [degree]: !prev[degree]
    }));
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <p className="section-label reveal">Academic Background</p>
        <h2 className="section-title reveal">Education &amp; Official Records</h2>
        <div className="section-divider reveal" />
        <div className="education-grid">
          {education.map((e, i) => {
            const isExpanded = !!expandedCards[e.degree];
            return (
              <div key={e.degree} className="edu-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="edu-card-top">
                  <div className="edu-icon-box">
                    <FaGraduationCap />
                  </div>
                  <div className="edu-title-group">
                    <h3 className="edu-degree">{e.degree}</h3>
                    <p className="edu-degree-code">{e.degreeCode}</p>
                    <p className="edu-school">{e.school}</p>
                    <div className="edu-meta-badges">
                      <span className="edu-pill edu-pill-accent">{e.year}</span>
                      <span className="edu-pill">{e.status}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="edu-stats-grid">
                  {e.stats.map(s => (
                    <div key={s.label} className={`edu-stat-item ${s.highlight ? 'highlight' : ''}`}>
                      <span className="edu-stat-label">{s.label}</span>
                      <span className="edu-stat-value">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Coursework / Highlight Tags */}
                <div>
                  <p className="edu-tags-title">Core Coursework &amp; Competencies</p>
                  <div className="edu-tags">
                    {e.tags.map(tag => (
                      <span key={tag} className="edu-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Actions & Breakdown Toggle */}
                <div className="edu-actions">
                  <a
                    href={e.transcriptFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn cert-btn-primary"
                    title="View Official Verified Academic Transcript"
                  >
                    <FaArrowUpRightFromSquare style={{ fontSize: '0.8rem' }} /> Official Transcript
                  </a>

                  {e.englishProofFile && (
                    <a
                      href={e.englishProofFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-btn cert-btn-secondary"
                      style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                      title="Official English Proficiency Certificate (University of Education)"
                    >
                      <FaGlobe style={{ fontSize: '0.8rem' }} /> English Proof ↗
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleCard(e.degree)}
                    className={`edu-breakdown-btn ${isExpanded ? 'active' : ''}`}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <>
                        <FaChevronUp style={{ fontSize: '0.75rem' }} /> Hide {e.semesters ? 'Semesters' : 'Marks'}
                      </>
                    ) : (
                      <>
                        <FaChevronDown style={{ fontSize: '0.75rem' }} /> {e.semesters ? 'Semester Breakdown' : 'Subject Marks'}
                      </>
                    )}
                  </button>
                </div>

                {/* Expandable Breakdown Drawer */}
                {isExpanded && (
                  <div className="edu-breakdown-panel">
                    {e.semesters && (
                      <div>
                        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>
                          Semester-by-Semester Academic Performance (CGPA 3.08 · 131 Credit Hours)
                        </p>
                        <div className="edu-sem-grid">
                          {e.semesters.map(sem => (
                            <div key={sem.num} className="edu-sem-card">
                              <div className="edu-sem-head">
                                <span className="edu-sem-name">{sem.num}</span>
                                <span className="edu-sem-gpa">GPA {sem.gpa}</span>
                              </div>
                              <p className="edu-sem-courses">{sem.courses}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {e.subjects && (
                      <div>
                        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>
                          BISE Sargodha Official Board Subject Marks (824 / 1100 · Grade A)
                        </p>
                        <div className="edu-subjects-grid">
                          {e.subjects.map(sub => (
                            <div key={sub.name} className="edu-subject-item">
                              <span className="edu-sub-name">{sub.name}</span>
                              <span className="edu-sub-marks">{sub.marks} ({sub.score})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════
function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Credentials', count: certificationsData.length },
    { id: 'ai', label: 'AI & Machine Learning', count: certificationsData.filter(c => c.group === 'ai').length },
    { id: 'tech', label: 'Technical', count: certificationsData.filter(c => c.group === 'tech').length },
    { id: 'language', label: 'English & Official Proof', count: certificationsData.filter(c => c.group === 'language').length },
    { id: 'experience', label: 'Experience & Leadership', count: certificationsData.filter(c => c.group === 'experience').length },
    { id: 'sports', label: 'Sports Excellence', count: certificationsData.filter(c => c.group === 'sports').length },
  ];

  const filteredCerts = activeFilter === 'all'
    ? certificationsData
    : certificationsData.filter(c => c.group === activeFilter);

  return (
    <section id="certifications" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.02) 50%, transparent 100%)' }}>
      <div className="container">
        <p className="section-label reveal">Honors &amp; Credentials</p>
        <h2 className="section-title reveal">Certifications &amp; Achievements</h2>
        <div className="section-divider reveal" />

        {/* Filter Tabs */}
        <div className="cert-filters reveal">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`cert-filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="cert-count-pill">{tab.count}</span>
            </button>
          ))}
        </div>
        
        <div className="certifications-grid">
          {filteredCerts.map((c, i) => (
            <div
              key={c.title}
              className="cert-card reveal"
              style={{
                '--cert-color': c.color,
                transitionDelay: `${i * 0.06}s`
              }}
            >
              <div>
                <div className="cert-header">
                  <div className="cert-icon-wrapper" style={{ color: c.color }}>
                    {c.icon}
                  </div>
                  <span
                    className="cert-category"
                    style={{ borderColor: `${c.color}40`, color: c.color }}
                  >
                    {c.category}
                  </span>
                </div>

                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>

                <div className="cert-meta-row">
                  <span className="cert-date">{c.date}</span>
                  {c.credentialId && <span className="cert-id">{c.credentialId}</span>}
                </div>

                <div className="cert-desc-box">
                  <p className="cert-desc-line">{c.description[0]}</p>
                  <p className="cert-desc-line">{c.description[1]}</p>
                </div>
              </div>

              <div className="cert-actions">
                <a
                  href={c.docFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn cert-btn-primary"
                >
                  <FaArrowUpRightFromSquare style={{ fontSize: '0.8rem' }} /> View Document
                </a>
                {c.verifyUrl && (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn cert-btn-secondary"
                  >
                    Verify Online ↗
                  </a>
                )}
              </div>
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
                  placeholder="Name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reply_to">Your Email</label>
                <input id="reply_to" name="reply_to" type="email" className="form-input"
                  placeholder="name@email.com" required />
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
        <CertificationsSection />
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
