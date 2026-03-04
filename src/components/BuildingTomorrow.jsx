import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from './Icons';

const offerings = [
  { icon: 'desktop', title: 'Web Applications', desc: 'Custom web apps built for scale and performance.' },
  { icon: 'mobile', title: 'Mobile Applications', desc: 'iOS and Android apps that users love.' },
  { icon: 'bot', title: 'AI Solutions', desc: 'Intelligent systems that automate and optimize.' },
  { icon: 'design', title: 'UI/UX Design', desc: 'Beautiful, intuitive experiences from concept to code.' },
  { icon: 'gear', title: 'Custom Software', desc: 'Tailored solutions for unique business needs.' },
  { icon: 'trending', title: 'Digital Marketing', desc: 'Data-driven campaigns that convert.' },
];

export default function BuildingTomorrow() {
  return (
    <section className="section building">
      <div className="building__glow" />
      <div className="section__inner">
        <motion.div
          className="building__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="building__badge">What We Build</span>
          <h2 className="building__title">Building Tomorrow, one line of code at a time</h2>
          <p className="building__subtitle">Comprehensive solutions for modern businesses.</p>
          <span className="building__accent-line" />
        </motion.div>
        <div className="building__grid">
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              className="building-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -6 }}
            >
              <span className="building-card__icon-wrap">
                <Icon name={item.icon} size={28} />
              </span>
              <h3 className="building-card__title">{item.title}</h3>
              <p className="building-card__desc">{item.desc}</p>
              <Link to="/contact" className="building-card__link">
                Explore
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
