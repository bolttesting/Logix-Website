import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TYPING_TEXT = 'And Smart Plan';
const CODE_LINES = [
  'const project = {',
  '  name: "excellence",',
  '  stack: ["React", "Node"],',
  '  status: "in_progress"',
  '};',
  'export default project;',
  '// Building the future',
  'function deploy() {',
  '  return success();',
  '}',
  'async function innovate() {',
  '  await transform();',
  '}',
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    const run = () => {
      if (!isDeleting) {
        i++;
        setTypedText(TYPING_TEXT.slice(0, i));
        if (i >= TYPING_TEXT.length) {
          isDeleting = true;
          setTimeout(run, 2500);
        } else setTimeout(run, 100);
      } else {
        i--;
        setTypedText(TYPING_TEXT.slice(0, i));
        if (i <= 0) {
          isDeleting = false;
          setTimeout(run, 400);
        } else setTimeout(run, 60);
      }
    };
    const t = setTimeout(run, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__grid">
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted Development Partner
          </motion.div>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empowering brands with strategic vision
            <br />
            <span className="hero__title-accent">
              {typedText}
              <span className={`hero__cursor ${showCursor ? '' : 'hidden'}`}>|</span>
            </span>
          </motion.h1>
          <motion.p
            className="hero__desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            We transform ideas into powerful digital experiences. From web apps to mobile solutions, 
            we deliver scalable software that drives business growth.
          </motion.p>
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span><strong>50+</strong> Projects</span>
            <span><strong>30+</strong> Clients</span>
            <span><strong>5+</strong> Years</span>
          </motion.div>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href="/contact" className="hero__btn hero__btn--primary">
              Get Started
            </a>
            <a href="/portfolio" className="hero__btn hero__btn--outline">
              View Our Work
            </a>
          </motion.div>
        </div>
        <motion.div
          className="hero__monitor"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 0.8,
            },
          }}
        >
          <div className="hero__monitor-frame">
            <div className="hero__monitor-screen">
              <div className="hero__code-scroll">
                {[...CODE_LINES, ...CODE_LINES].map((line, i) => {
                  const c = line.trim().startsWith('//') ? 'comment' : /^(const|function|async|export|return)\b/.test(line.trim()) ? 'keyword' : line.includes(':') || line.includes('=') ? 'key' : 'normal';
                  return (
                    <div key={i} className="hero__code-line">
                      <span className={c}>{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
