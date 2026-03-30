import { Link } from 'react-router-dom';
import Icon from './Icons';
import { useSiteData } from '../context/SiteDataContext';
import { TextHoverEffect, FooterBackgroundGradient } from './ui/hover-footer';

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
            <div className="footer__col">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h4>Services</h4>
              <ul>
                {services.map((s) => (
                  <li key={s}>
                    <Link to="/#services">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col footer__col--contact">
              <h4>Contact</h4>
              <a href={`mailto:${email}`} className="footer__contact-item">
                {email}
              </a>
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="footer__contact-item">
                {phone}
              </a>
            </div>
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
