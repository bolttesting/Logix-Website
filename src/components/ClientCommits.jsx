import { motion } from 'framer-motion';

const steps = [
  'Project Planning',
  'UI/UX Design',
  'Development Phase',
  'Quality Assurance',
  'Deployment',
  'Support & Maintenance',
  'Marketing & SEO',
  'Client Feedback',
];

const promises = [
  { title: 'Transparent Communication', desc: 'Regular updates and clear timelines.' },
  { title: 'On-Time Delivery', desc: 'We respect deadlines.' },
  { title: 'Quality Assured', desc: 'Rigorous testing every phase.' },
  { title: 'Ongoing Support', desc: 'We stay with you after launch.' },
];

export default function ClientCommits() {
  return (
    <section className="section commits">
      <div className="commits__inner">
        <motion.div
          className="commits__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="commits__title">Our Client Commits</h2>
          <p className="commits__subtitle">We provide an excellent user experience.</p>
        </motion.div>

        <div className="commits__grid">
          <div className="commits__process">
            <h3 className="commits__col-title">How We Work</h3>
            <ol className="commits__list">
              {steps.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="commits__num">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </motion.li>
              ))}
            </ol>
          </div>
          <div className="commits__promise-col">
            <h3 className="commits__col-title">What We Promise</h3>
            <ul className="commits__promise-list">
              {promises.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
