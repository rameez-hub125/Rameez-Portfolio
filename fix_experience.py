import re

filepath = r'C:\Users\Rameez Khan\Desktop\portfolio\src\App.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the ExperienceSection function entirely
old_func = re.search(
    r'// ═+\n// EXPERIENCE\n// ═+\nfunction ExperienceSection\(\).*?(?=\n// ═)',
    content, re.DOTALL
)

if old_func:
    new_func = '''// ═══════════════════════════════════════════════════════════════
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
            <p className="timeline-date">June 2026 \u2013 September 2026</p>
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
            <p className="timeline-date">July 2025 \u2013 April 2026</p>
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

'''
    content = content[:old_func.start()] + new_func + content[old_func.end():]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS')
else:
    print('ERROR: pattern not found')
