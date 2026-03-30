import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icons';
import { useTheme } from '../context/ThemeContext';
import { servicesMenu, servicePageContent } from '../data/servicesData';

const serviceThemes = {
  'app-development': {
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
    heroBgLight: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 45%, #ecfeff 100%)',
    accent: '#7c3aed',
    icon: 'mobile',
  },
  'web-development': {
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
    heroBgLight: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f8fafc 100%)',
    accent: '#a78bfa',
    icon: 'globe',
  },
  'desktop-development': {
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #115e59 50%, #0f172a 100%)',
    heroBgLight: 'linear-gradient(135deg, #ecfdf5 0%, #b2f5ea 45%, #f0fdfa 100%)',
    accent: '#14b8a6',
    icon: 'desktop',
  },
  'seo-services': {
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #134e4a 45%, #1e1b4b 55%, #0f172a 100%)',
    heroBgLight: 'linear-gradient(135deg, #ecfeff 0%, #d1fae5 40%, #e0e7ff 55%, #f8fafc 100%)',
    accent: '#2dd4bf',
    icon: 'search',
  },
  'digital-marketing': {
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)',
    heroBgLight: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 50%, #fdf4ff 100%)',
    accent: '#c4b5fd',
    icon: 'megaphone',
  },
  'ui-ux-design': {
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
    heroBgLight: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 40%, #ccfbf1 100%)',
    accent: '#14b8a6',
    icon: 'design',
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const { theme: colorTheme } = useTheme();
  const service = servicesMenu.find((s) => s.id === slug);
  const theme = serviceThemes[slug] || serviceThemes['app-development'];
  const pageContent = servicePageContent[slug] || servicePageContent['app-development'];
  const heroBg = colorTheme === 'light' ? theme.heroBgLight : theme.heroBg;

  if (!service) {
    return (
      <main className="service-page">
        <div className="service-page__404">
          <h1>Service Not Found</h1>
          <Link to="/">Go Home</Link>
        </div>
      </main>
    );
  }

  const processSteps = pageContent?.process || [];
  const stepItems = processSteps.map((s) => (typeof s === 'string' ? { title: s, desc: '' } : s));

  return (
    <main className="service-page" style={{ '--service-accent': theme.accent }}>
      {/* Hero */}
      <section className="service-hero" style={{ background: heroBg }}>
        <div className="service-hero__glow" />
        <div className="service-hero__content">
          <motion.span
            className="service-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {service.title}
          </motion.span>
          <motion.span
            className="service-hero__icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            <Icon name={theme.icon} size={56} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {pageContent?.tagline || service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="service-hero__tagline"
          >
            {pageContent?.overview || `${service.items.length} specialized offerings to power your digital success`}
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      {pageContent?.stats && pageContent.stats.length > 0 && (
        <section className="service-stats">
          <div className="service-content__inner">
            <div className="service-stats__grid">
              {pageContent.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="service-stats__item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="service-stats__value">{stat.value}</span>
                  <span className="service-stats__label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What We Offer */}
      <section className="service-content">
        <div className="service-content__inner">
          <motion.div
            className="service-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="service-section__badge">Our Offerings</span>
            <h2>What We Offer</h2>
          </motion.div>
          <div className="service-offerings">
            {service.items.map((item, i) => (
              <motion.div
                key={item.title}
                className="service-offering"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <span className="service-offering__icon"><Icon name={item.icon} size={28} /></span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          {pageContent?.highlights && (
            <motion.div
              className="service-tech"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="service-section__badge">Tech Stack</span>
              <h2>Technologies We Use</h2>
              <div className="service-tech__grid">
                {pageContent.highlights.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="service-tech__badge"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Process */}
          {stepItems.length > 0 && (
            <motion.div
              className="service-process"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="service-section__badge">Our Approach</span>
              <h2>Our Process</h2>
              <div className="service-process__steps">
                {stepItems.map((step, i) => (
                  <motion.div
                    key={step.title}
                    className="service-process__step"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="service-process__num">{i + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      {step.desc && <p>{step.desc}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Benefits */}
          {pageContent?.benefits && (
            <motion.div
              className="service-benefits"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="service-section__badge">Why Us</span>
              <h2>Key Benefits</h2>
              <div className="service-benefits__grid">
                {pageContent.benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    className="service-benefits__card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="service-benefits__icon"><Icon name={benefit.icon} size={32} /></span>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Why Choose */}
          <motion.div
            className="service-why"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="service-section__badge">Trust</span>
            <h2>Why Choose Us</h2>
            <div className="service-why__grid">
              <div className="service-why__card">
                <span><Icon name="check" size={28} /></span>
                <h4>Expert Team</h4>
                <p>Certified professionals with years of industry experience</p>
              </div>
              <div className="service-why__card">
                <span><Icon name="check" size={28} /></span>
                <h4>Proven Track Record</h4>
                <p>Successful projects delivered across diverse industries</p>
              </div>
              <div className="service-why__card">
                <span><Icon name="check" size={28} /></span>
                <h4>End-to-End Support</h4>
                <p>From discovery to deployment and beyond</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="service-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Get Started?</h2>
            <p>Let's discuss your project and create something amazing together.</p>
            <Link to="/contact" className="service-cta__btn">
              Get a Free Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
