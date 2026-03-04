import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from './Icons';

const services = [
  { icon: 'globe', title: 'Web App Development', desc: 'Build scalable web applications with modern frameworks and best practices.' },
  { icon: 'mobile', title: 'Mobile App Development', desc: 'Native and cross-platform mobile solutions for iOS and Android.' },
  { icon: 'megaphone', title: 'Digital Marketing', desc: 'Strategic marketing to grow your online presence and reach.' },
  { icon: 'sparkles', title: 'UI/UX Designing', desc: 'User-centric interfaces that delight and convert.' },
  { icon: 'gamepad', title: 'Game Development', desc: 'Engaging games for web, mobile, and desktop platforms.' },
  { icon: 'palette', title: 'Graphics Designing', desc: 'Visual identity, branding, and creative assets.' },
  { icon: 'search', title: 'SEO Optimization', desc: 'Improve visibility and rank higher in search results.' },
  { icon: 'film', title: '2D/3D Animation', desc: 'Motion graphics and animated content for your brand.' },
];

export default function Expertise() {
  return (
    <section className="section expertise" id="services">
      <div className="expertise__glow expertise__glow--1" />
      <div className="section__inner">
        <motion.div
          className="expertise__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="expertise__badge">What We Do</span>
          <h2 className="expertise__title">Our Expertise on Query</h2>
          <p className="expertise__subtitle">We provide next-level services on demand.</p>
          <span className="expertise__accent-line" />
        </motion.div>
        <div className="expertise__grid">
          {services.map((item, i) => (
            <motion.div
              key={item.title}
              className="expertise-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <span className="expertise-card__icon-wrap">
                <Icon name={item.icon} size={28} />
              </span>
              <h3 className="expertise-card__title">{item.title}</h3>
              <p className="expertise-card__desc">{item.desc}</p>
              <Link to="/contact" className="expertise-card__link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
