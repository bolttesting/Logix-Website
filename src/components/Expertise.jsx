import { motion } from 'framer-motion';
import FeatureCarousel from './FeatureCarousel';

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <FeatureCarousel />
        </motion.div>
      </div>
    </section>
  );
}
