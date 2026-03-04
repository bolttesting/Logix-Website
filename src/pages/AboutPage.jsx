import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon, { Stars } from '../components/Icons'
import { useSiteData } from '../context/SiteDataContext'

const innovationServices = [
  { icon: 'desktop', color: '#0162a2', title: 'Web & Mobile App Development', desc: 'Building scalable and responsive applications that work seamlessly across all devices.' },
  { icon: 'design', color: '#2380c4', title: 'UI/UX Design', desc: 'Creating intuitive and engaging user experiences that drive conversion and satisfaction.' },
  { icon: 'megaphone', color: '#ee7723', title: 'Digital Marketing', desc: 'Strategic campaigns that amplify your brand and connect you with your target audience.' },
  { icon: 'gear', color: '#0162a2', title: 'Software Development', desc: 'Custom software solutions tailored to your unique business requirements.' },
  { icon: 'cloud', color: '#2380c4', title: 'Cloud Solutions', desc: 'Secure, scalable cloud infrastructure to power your digital transformation.' },
  { icon: 'wrench', color: '#ee7723', title: 'IT Consultancy', desc: 'Expert guidance to optimize your technology stack and processes.' },
]

const processSteps = [
  { name: 'Discovery', desc: 'We learn your goals, audience, and requirements.', icon: 'search', color: '#0162a2' },
  { name: 'Planning', desc: 'Strategy, roadmap, and milestones are defined.', icon: 'folder', color: '#2380c4' },
  { name: 'Design', desc: 'Wireframes and UI/UX that bring ideas to life.', icon: 'design', color: '#ee7723' },
  { name: 'Development', desc: 'Agile development with regular check-ins.', icon: 'code', color: '#0162a2' },
  { name: 'Testing', desc: 'Rigorous QA ensures quality at every stage.', icon: 'check', color: '#ee7723' },
  { name: 'Deployment', desc: 'Launch, monitor, and support post-go-live.', icon: 'zap', color: '#2380c4' },
]

const timeline = [
  { year: '2018', title: 'Founded Logix Contact', desc: 'Started our journey with a small team and big ambitions.' },
  { year: '2019', title: 'Launched First Project', desc: 'Delivered our first major client project successfully.' },
  { year: '2020', title: 'Expanded Team & Services', desc: 'Grew our capabilities and team to serve more clients.' },
  { year: '2021', title: 'Achieved ISO Certification', desc: 'Formalized our quality and process standards.' },
  { year: '2022', title: 'Opened New Office', desc: 'Expanded our physical presence to new markets.' },
  { year: '2023', title: 'Received Industry Award', desc: 'Recognized for excellence in software development.' },
]

const principles = [
  { icon: 'lightbulb', color: '#0162a2', title: 'Innovation', desc: 'Constantly pushing boundaries to deliver cutting-edge solutions.' },
  { icon: 'heart', color: '#ee7723', title: 'Client-Centricity', desc: 'Your success is our success. We put you at the center.' },
  { icon: 'shield', color: '#2380c4', title: 'Integrity', desc: 'Honest, transparent, and ethical in everything we do.' },
  { icon: 'star', color: '#ee7723', title: 'Excellence', desc: 'Striving for the highest quality in every deliverable.' },
  { icon: 'handshake', color: '#0162a2', title: 'Collaboration', desc: 'Working together to achieve extraordinary results.' },
  { icon: 'check', color: '#2380c4', title: 'Accountability', desc: 'Taking ownership and delivering on our promises.' },
]

const expertise = {
  Frontend: ['React.js', 'Angular.js', 'Vue.js', 'HTML5/CSS3', 'JavaScript/TypeScript', 'Next.js'],
  Backend: ['Node.js', 'Python (Django/Flask)', 'PHP (Laravel)', 'Ruby on Rails', '.NET Core'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server'],
  Mobile: ['React Native', 'Flutter', 'iOS (Swift/Objective-C)', 'Android (Java/Kotlin)'],
  DevOps: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud'],
  'UI/UX Tools': ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
}

export default function AboutPage() {
  const { team: teamData = [], testimonials: testimonialsData = [] } = useSiteData()
  const team = teamData.length ? teamData : [
    { name: 'John Doe', role: 'CEO & Founder', avatar: 'JD' },
    { name: 'Jane Smith', role: 'Lead Developer', avatar: 'JS' },
    { name: 'Robert Johnson', role: 'UI/UX Designer', avatar: 'RJ' },
    { name: 'Emily Davis', role: 'Project Manager', avatar: 'ED' },
  ]
  const testimonials = testimonialsData.length ? testimonialsData : [
    { name: 'Sarah Johnson', role: 'CEO, TechStart', text: 'Exceptional work from start to finish. They delivered our web app on time and exceeded our expectations. Highly recommend!', avatar: 'SJ' },
    { name: 'Michael Chen', role: 'Founder, InnovateLab', text: 'The team understood our vision perfectly. The mobile app they built has transformed our user engagement. Five stars!', avatar: 'MC' },
    { name: 'Emma Roberts', role: 'Director, ScaleUp', text: 'Professional, responsive, and results-driven. Our digital presence has grown significantly since working with them.', avatar: 'ER' },
  ]
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((i) => (i + 1) % testimonials.length)
  }, [])
  const prevTestimonial = useCallback(() => {
    setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const t = setInterval(nextTestimonial, 5000)
    return () => clearInterval(t)
  }, [nextTestimonial])

  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="about-hero__glow" />
        <div className="about-hero__content">
          <motion.span
            className="about-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.span>
          <motion.h1
            className="about-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming Ideas into
            <br />
            <span className="about-hero__accent">Digital Realities</span>
          </motion.h1>
          <motion.p
            className="about-hero__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Web & App Development Agency · Since 2018
          </motion.p>
        </div>
      </section>

      {/* Driving Digital Innovation */}
      <section className="about-section about-section--innovation">
        <div className="about-section__glow" />
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">What We Do</span>
            <h2 className="about-section__title">Driving Digital Innovation</h2>
            <p className="about-section__subtitle">
              We are committed to delivering exceptional results that exceed your expectations
            </p>
            <span className="about-section__accent-line" />
          </motion.div>
          <div className="about-innovation__grid">
            {innovationServices.map((item, i) => (
              <motion.div
                key={item.title}
                className="about-card about-card--innovation"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="about-card__icon-wrap" style={{ '--card-color': item.color }}>
                  <span className="about-card__icon"><Icon name={item.icon} size={26} /></span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="/#services" className="about-card__link">
                  Learn more <Icon name="arrowRight" size={14} />
                </a>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="about-section__cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="/#services" className="about-btn about-btn--purple">Explore Services</a>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">Our Process</span>
            <h2 className="about-section__title">How We Work</h2>
            <p className="about-section__subtitle">
              Our comprehensive approach ensures seamless project execution and client satisfaction
            </p>
          </motion.div>
          <div className="about-process">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.name}
                className="about-process__step"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {i > 0 && <div className="about-process__connector" aria-hidden />}
                <div className="about-process__card">
                  <span className="about-process__num" style={{ background: step.color }}>{i + 1}</span>
                  <div className="about-process__icon" style={{ color: step.color }}>
                    <Icon name={step.icon} size={28} />
                  </div>
                  <h3 className="about-process__title">{step.name}</h3>
                  <p className="about-process__desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section about-section--timeline">
        <div className="about-section__glow about-section__glow--blue" />
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">Milestones</span>
            <h2 className="about-section__title">Our Transformative Journey</h2>
            <p className="about-section__subtitle">
              A timeline of milestones and achievements that define our success
            </p>
            <span className="about-section__accent-line" />
          </motion.div>
          <div className="about-timeline">
            <div className="about-timeline__line" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`about-timeline__item about-timeline__item--${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="about-timeline__dot" style={{ background: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-orange)' }} />
                <div className="about-timeline__card">
                  <span className="about-timeline__year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">Our Values</span>
            <h2 className="about-section__title">Principles That Guide Us</h2>
            <p className="about-section__subtitle">
              Our core values shape every decision and action we take
            </p>
          </motion.div>
          <div className="about-innovation__grid">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                className="about-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="about-card__icon" style={{ background: item.color }}><Icon name={item.icon} size={24} /></span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="about-section">
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">Tech Stack</span>
            <h2 className="about-section__title about-section__title--muted">Our Expertise</h2>
            <p className="about-section__subtitle">
              Leveraging cutting-edge technologies to build future-ready solutions
            </p>
          </motion.div>
          <motion.div
            className="about-expertise"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {Object.entries(expertise).map(([category, techs], ci) => (
              <motion.div
                key={category}
                className="about-expertise__col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08 }}
              >
                <h4>{category}</h4>
                <div className="about-expertise__tags">
                  {techs.map((tech) => (
                    <span key={tech} className="about-expertise__tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="about-section about-section--alt">
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">The People</span>
            <h2 className="about-section__title">Meet Our Team</h2>
            <p className="about-section__subtitle">
              Dedicated professionals committed to bringing your vision to life
            </p>
          </motion.div>
          <div className="about-team__grid">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="about-team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="about-team-card__avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="about-team-card__social">
                  <a href="#" aria-label="LinkedIn"><Icon name="share" size={16} /></a>
                  <a href="#" aria-label="Twitter"><Icon name="share" size={16} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-section">
        <div className="about-section__inner">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="about-section__badge">Reviews</span>
            <h2 className="about-section__title">What Our Clients Say</h2>
            <p className="about-section__subtitle">
              Hear from our satisfied clients about their experience working with us
            </p>
          </motion.div>
          <div className="about-testimonials-slider">
            <button
              type="button"
              className="about-slider__btn about-slider__btn--prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="about-testimonials-slider__viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  className="about-testimonial-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="about-testimonial-card__quote">"</span>
                  <div className="about-testimonial-card__avatar">{testimonials[testimonialIndex].avatar}</div>
                  <h4>{testimonials[testimonialIndex].name}</h4>
                  <span className="about-testimonial-card__role">{testimonials[testimonialIndex].role}</span>
                  <p>{testimonials[testimonialIndex].text}</p>
                  <div className="about-testimonial-card__stars"><Stars count={5} size={14} /></div>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              type="button"
              className="about-slider__btn about-slider__btn--next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
          <div className="about-testimonials-slider__nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`about-slider__dot ${i === testimonialIndex ? 'about-slider__dot--active' : ''}`}
                onClick={() => setTestimonialIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
