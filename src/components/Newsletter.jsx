import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SlideButton from './ui/SlideButton';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const emailOk = EMAIL_RE.test(email.trim());

  const handleConfirm = useCallback(async () => {
    const addr = email.trim();
    if (!EMAIL_RE.test(addr)) {
      throw new Error('Invalid email');
    }
    // Hook up a real API or Supabase table when ready; for now simulate success.
    await new Promise((r) => setTimeout(r, 1100));
    setEmail('');
  }, [email]);

  return (
    <section className="section newsletter">
      <div className="section__inner newsletter__inner">
        <motion.h2
          className="newsletter__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join Our Daily Newsletter
        </motion.h2>
        <motion.form
          className="newsletter__form"
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={email.length > 0 && !emailOk}
          />
          <SlideButton
            className="newsletter__slide"
            disabled={!emailOk}
            onConfirm={handleConfirm}
            hint="Slide to send"
          />
        </motion.form>
      </div>
    </section>
  );
}
