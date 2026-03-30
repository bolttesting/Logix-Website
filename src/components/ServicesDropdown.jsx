import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesMenu } from '../data/servicesData';
import Icon from './Icons';

const HOVER_DELAY = 150;

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleTriggerLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_DELAY);
  };

  const handleDropdownEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleDropdownLeave = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const inTrigger = ref.current?.contains(e.target);
      const inDropdown = e.target.closest('.services-dropdown__wrapper');
      if (!inTrigger && !inDropdown) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => () => clearCloseTimer(), []);

  const dropdownMenu = open ? (
    <div
      className="services-dropdown__wrapper"
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
    >
      <motion.div
        className="services-dropdown__menu"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="services-dropdown__inner">
            {servicesMenu.map((category) => (
                <div key={category.id} className="services-dropdown__col">
                  <Link
                    to={category.path}
                    className="services-dropdown__category"
                    onClick={() => setOpen(false)}
                  >
                    {category.title}
                  </Link>
                  {category.items.map((item) => (
                    <Link
                      key={item.title}
                      to={category.path}
                      className="services-dropdown__item"
                      onClick={() => setOpen(false)}
                    >
                      <span className="services-dropdown__icon"><Icon name={item.icon} size={18} /></span>
                      <span className="services-dropdown__title">{item.title}</span>
                    </Link>
                  ))}
                </div>
            ))}
        </div>
      </motion.div>
    </div>
  ) : null;

  return (
    <div
      className="services-dropdown"
      ref={ref}
      onMouseEnter={() => { clearCloseTimer(); setOpen(true); }}
      onMouseLeave={handleTriggerLeave}
    >
      <button
        type="button"
        className={`navbar__ghost navbar__link--btn ${open ? 'navbar__ghost--active' : ''}`}
        onClick={() => setOpen(!open)}
      >
        Services
      </button>
      {createPortal(dropdownMenu, document.body)}
    </div>
  );
}
