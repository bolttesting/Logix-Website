import { motion } from 'framer-motion';
import Icon from './Icons';

const stats = [
  { value: '73+', label: 'Projects', icon: 'folder' },
  { value: '12k', label: 'Active Clients', icon: 'users' },
  { value: '50+', label: 'Team Members', icon: 'handshake' },
  { value: '8', label: 'Years Experience', icon: 'star' },
];

const priorities = [
  { title: 'Quality', x: '5%', y: '10%', delay: 0 },
  { title: 'Innovation', x: '60%', y: '5%', delay: 0.1 },
  { title: 'Client Success', x: '10%', y: '55%', delay: 0.2 },
  { title: 'Strategic Vision', x: '55%', y: '60%', delay: 0.3 },
];

export default function Mission() {
  return (
    <section className="section mission" id="about">
      <div className="mission__glow mission__glow--1" />
      <div className="mission__glow mission__glow--2" />
      <div className="mission__inner">
        <motion.div
          className="mission__visual"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mission__visual-wrap">
            <div className="mission__center-ring" />
            <div className="mission__center-dot" />
            {priorities.map((item, i) => (
              <motion.div
                key={item.title}
                className="mission__float-badge"
                style={{ left: item.x, top: item.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + item.delay, duration: 0.5 }}
              >
                <span className="mission__float-title">{item.title}</span>
              </motion.div>
            ))}
            <svg className="mission__connections" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="missionGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ee7723" />
                  <stop offset="100%" stopColor="#0162a2" />
                </linearGradient>
              </defs>
              <line x1="50" y1="50" x2="18" y2="18" stroke="url(#missionGrad1)" strokeWidth="0.6" opacity="0.35" />
              <line x1="50" y1="50" x2="72" y2="12" stroke="url(#missionGrad1)" strokeWidth="0.6" opacity="0.35" />
              <line x1="50" y1="50" x2="18" y2="68" stroke="url(#missionGrad1)" strokeWidth="0.6" opacity="0.35" />
              <line x1="50" y1="50" x2="68" y2="72" stroke="url(#missionGrad1)" strokeWidth="0.6" opacity="0.35" />
            </svg>
          </div>
        </motion.div>
        <motion.div
          className="mission__content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mission__badge">Who We Are</span>
          <h2 className="mission__title">Our Mission & Priorities</h2>
          <p className="mission__text">
            We are dedicated to delivering exceptional software solutions that empower businesses
            to thrive in the digital age. Our mission is to combine cutting-edge technology with
            strategic vision, ensuring every project exceeds expectations and drives real results.
          </p>
          <p className="mission__highlight">
            Quality, innovation, and client success are at the heart of everything we do.
          </p>
          <div className="mission__stats">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="mission__stat"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <span className="mission__stat-icon-wrap">
                  <Icon name={stat.icon} size={24} />
                </span>
                <div className="mission__stat-text">
                  <span className="mission__stat-value">{stat.value}</span>
                  <span className="mission__stat-label">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
