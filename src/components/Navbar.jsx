import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ServicesDropdown from './ServicesDropdown';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          Logix<span className="navbar__logo-accent">Contact</span>
        </Link>

        <nav className="navbar__nav">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <ServicesDropdown />
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="navbar__icon" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button className="navbar__icon" aria-label="Toggle theme">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <Link to={isContact ? '/contact#contact-form' : '/contact'} className="navbar__cta">
            {isContact ? 'Get in Touch' : isAbout ? 'Get a Quote' : 'Get Started'}
          </Link>
        </div>

        <button
          className="navbar__burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={mobileOpen ? 'open' : ''} />
          <span className={mobileOpen ? 'open' : ''} />
          <span className={mobileOpen ? 'open' : ''} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/services/app-development" onClick={() => setMobileOpen(false)}>App Development</Link>
            <Link to="/services/web-development" onClick={() => setMobileOpen(false)}>Web Development</Link>
            <Link to="/services/ui-ux-design" onClick={() => setMobileOpen(false)}>UI/UX Design</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="navbar__mobile-cta">
              {isAbout ? 'Get a Quote' : 'Get Started'}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
