import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');

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
          />
          <button type="submit" className="newsletter__btn">
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
}
