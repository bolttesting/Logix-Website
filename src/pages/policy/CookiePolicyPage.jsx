import PolicyLayout from './PolicyLayout';

export default function CookiePolicyPage() {
  return (
    <PolicyLayout
      title="Cookie Policy"
      description="How Logix Contact uses cookies and similar technologies, how you can manage them, and your rights in the UK."
    >
      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help websites function,
        remember preferences, and measure performance.
      </p>

      <h2>How we use cookies</h2>
      <ul>
        <li><strong>Essential cookies:</strong> required for core site functions such as security and basic navigation.</li>
        <li><strong>Analytics cookies:</strong> help us understand how visitors use our site so we can improve content and UX.</li>
        <li><strong>Preference cookies:</strong> remember settings where available (for example, cookie consent state).</li>
      </ul>

      <h2>Cookies we may set</h2>
      <ul>
        <li><strong>Cookie consent:</strong> records whether you accepted our cookie notice.</li>
        <li><strong>Analytics identifiers:</strong> non-essential metrics for traffic and usage patterns.</li>
      </ul>

      <h2>Third-party cookies</h2>
      <p>
        Some pages may use trusted third-party services (for example analytics providers). These services may set their
        own cookies under their own privacy and cookie policies.
      </p>

      <h2>How to manage cookies</h2>
      <p>
        You can control and delete cookies in your browser settings. You can also revisit this page and your browser
        controls at any time. Blocking some cookies may affect website functionality.
      </p>

      <h2>Legal basis and compliance</h2>
      <p>
        We use cookies in line with UK GDPR, the Data Protection Act 2018, and PECR where applicable. Non-essential
        cookies should only be used with appropriate consent.
      </p>

      <h2>Contact us</h2>
      <p>
        For questions about cookies or data privacy, please contact us via our <a href="/contact">Contact page</a>.
      </p>

      <h2>Updates to this policy</h2>
      <p>We may update this Cookie Policy from time to time. Any updates will be reflected by the date shown at the top.</p>
    </PolicyLayout>
  );
}
