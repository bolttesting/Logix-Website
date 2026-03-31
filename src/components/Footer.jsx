import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Icon from './Icons';
import { useSiteData } from '../context/SiteDataContext';
import { TextHoverEffect, FooterBackgroundGradient } from './ui/hover-footer';

const ACCORDION_MQ = '(max-width: 900px)';

function useFooterAccordionMode() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(ACCORDION_MQ).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(ACCORDION_MQ);
    const onChange = () => setNarrow(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return narrow;
}

function FooterAccordionColumn({
  sectionId,
  title,
  isNarrow,
  isOpen,
  onToggle,
  className = '',
  children,
}) {
  if (!isNarrow) {
    return (
      <div className={`footer__col ${className}`.trim()}>
        <h4>{title}</h4>
        {children}
      </div>
    );
  }

  const panelId = `footer-section-${sectionId}`;
  const triggerId = `footer-trigger-${sectionId}`;

  return (
    <div className={`footer__col footer__col--accordion ${isOpen ? 'footer__col--open' : ''} ${className}`.trim()}>
      <button
        type="button"
        className="footer__accordion-trigger"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="footer__accordion-title">{title}</span>
        <ChevronDown className="footer__accordion-chevron" size={18} strokeWidth={2} aria-hidden />
      </button>
      <div className="footer__accordion-panel" id={panelId} role="region" aria-labelledby={triggerId}>
        <div className="footer__accordion-panel-inner" inert={!isOpen || undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

const services = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'Cloud Solutions',
  'IT Consultancy',
];

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
];

export default function Footer() {
  const { settings } = useSiteData();
  const email = settings?.email || 'info@logixcontact.com';
  const phone = settings?.phone || '+123-456-7890';
  const isNarrow = useFooterAccordionMode();

  const [open, setOpen] = useState({
    quick: true,
    services: false,
    contact: false,
  });

  useEffect(() => {
    if (!isNarrow) {
      setOpen({ quick: true, services: true, contact: true });
    } else {
      setOpen({ quick: true, services: false, contact: false });
    }
  }, [isNarrow]);

  const toggle = useCallback(
    (key) => {
      if (!isNarrow) return;
      setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [isNarrow],
  );

  return (
    <footer className="footer">
      <FooterBackgroundGradient />
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              Logix<span className="footer__logo-accent">Contact</span>
            </Link>
            <p className="footer__slogan">Web & App Development Agency</p>
          </div>
          <div className="footer__cols">
            <FooterAccordionColumn
              sectionId="quick"
              title="Quick Links"
              isNarrow={isNarrow}
              isOpen={open.quick}
              onToggle={() => toggle('quick')}
            >
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </FooterAccordionColumn>
            <FooterAccordionColumn
              sectionId="services"
              title="Services"
              isNarrow={isNarrow}
              isOpen={open.services}
              onToggle={() => toggle('services')}
            >
              <ul>
                {services.map((s) => (
                  <li key={s}>
                    <Link to="/#services">{s}</Link>
                  </li>
                ))}
              </ul>
            </FooterAccordionColumn>
            <FooterAccordionColumn
              sectionId="contact"
              title="Contact"
              className="footer__col--contact"
              isNarrow={isNarrow}
              isOpen={open.contact}
              onToggle={() => toggle('contact')}
            >
              <a href={`mailto:${email}`} className="footer__contact-item">
                {email}
              </a>
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="footer__contact-item">
                {phone}
              </a>
            </FooterAccordionColumn>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__social footer__social--bottom">
            {socialLinks.map((s) => (
              <a key={s.name} href={s.href} className="footer__social-link" aria-label={s.name}>
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
          <p className="footer__copyright">
            © {new Date().getFullYear()} Logix Contact. All rights reserved.
          </p>
        </div>
        <div className="footer__brand-mark">
          <TextHoverEffect text="Logix Contact" duration={0} viewBox="0 0 640 110" />
        </div>
      </div>
    </footer>
  );
}
