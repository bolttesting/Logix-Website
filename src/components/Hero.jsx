import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ShaderAnimation } from './ui/ShaderAnimation';
import ButtonCrossArrow from './ui/ButtonCrossArrow';
import ButtonAnimatedGradient from './ui/ButtonAnimatedGradient';

const easeOut = [0.23, 1, 0.32, 1];
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};
const fadeUp = (reduceMotion) => ({
  hidden: { opacity: 0, transform: reduceMotion ? 'translateY(0)' : 'translateY(14px)' },
  show: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: { duration: 0.5, ease: easeOut },
  },
});

const PILL_LABELS = ['Research-led UX', 'Web & mobile', 'Launch support'];
const BOARD_ROWS = [
  { label: 'Discovery & scope', status: 'done', tag: 'Done' },
  { label: 'Design & prototype', status: 'active', tag: 'In progress' },
  { label: 'Build & hardening', status: 'queued', tag: 'Queued' },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const ctaVariant = theme === 'light' ? 'light' : 'dark';

  return (
    <section className="hero" id="hero">
      {!reduceMotion && <ShaderAnimation className="hero__shader" />}
      <div className="hero__noise" aria-hidden />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__glow hero__glow--3" />
      <div className="hero__grid">
        <motion.div
          className="hero__content"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div className="hero__badge" variants={fadeUp(reduceMotion)}>
            <span className="hero__badge-dot" />
            Full-service product studio
          </motion.div>
          <motion.h1 className="hero__title" variants={fadeUp(reduceMotion)}>
            <span className="hero__title-line">We design and build</span>
            <span className="hero__title-gradient"> digital products that scale.</span>
          </motion.h1>
          <motion.p className="hero__desc" variants={fadeUp(reduceMotion)}>
            Strategy, product design, and engineering in one team — fewer handoffs, clearer owners, and a
            path from first workshop to stable release.
          </motion.p>
          <motion.ul className="hero__pills" variants={fadeUp(reduceMotion)} aria-label="Focus areas">
            {PILL_LABELS.map((label) => (
              <li key={label} className="hero__pill">
                {label}
              </li>
            ))}
          </motion.ul>
          <motion.div className="hero__cta" variants={fadeUp(reduceMotion)}>
            <ButtonCrossArrow to="/contact" variant={ctaVariant}>
              Plan a project
            </ButtonCrossArrow>
            <ButtonAnimatedGradient to="/services/app-development" variant={ctaVariant}>
              See capabilities
            </ButtonAnimatedGradient>
          </motion.div>
          <motion.p className="hero__footnote" variants={fadeUp(reduceMotion)}>
            Typical kickoff: two-week discovery · then weekly stakeholder demos
          </motion.p>
        </motion.div>

        <motion.div
          className={`hero__visual${reduceMotion ? '' : ' hero__visual--float'}`}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
          aria-hidden
        >
          <div className="hero__visual-frame">
            <div className="hero__visual-header">
              <span className="hero__visual-dots" aria-hidden>
                <span className="hero__visual-dot" />
                <span className="hero__visual-dot" />
                <span className="hero__visual-dot" />
              </span>
              <span className="hero__visual-title">Delivery board</span>
              <span className="hero__visual-live">Live</span>
            </div>
            <div className="hero__visual-body">
              <div className="hero__visual-board">
                {BOARD_ROWS.map((row) => (
                  <div key={row.label} className={`hero__board-row hero__board-row--${row.status}`}>
                    <span className="hero__board-dot" />
                    <span className="hero__board-label">{row.label}</span>
                    <span className="hero__board-tag">{row.tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero__visual-metrics">
              <div className="hero__metric">
                <span className="hero__metric-value">2 week</span>
                <span className="hero__metric-label">Discovery sprint</span>
              </div>
              <div className="hero__metric">
                <span className="hero__metric-value">1 team</span>
                <span className="hero__metric-label">Design + build</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {!reduceMotion && (
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, transform: 'translateX(-50%) translateY(8px)' }}
          animate={{ opacity: 1, transform: 'translateX(-50%) translateY(0)' }}
          transition={{ delay: 1.1, duration: 0.5, ease: easeOut }}
        >
          <span className="hero__scroll-text">Scroll</span>
          <span className="hero__scroll-line" />
        </motion.div>
      )}
    </section>
  );
}
