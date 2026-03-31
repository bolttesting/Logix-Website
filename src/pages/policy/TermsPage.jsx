import PolicyLayout from './PolicyLayout';

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      description="Terms and conditions for using Logix Contact’s website and services. UK-based web and app development agency."
    >
      <h2>Agreement</h2>
      <p>
        By accessing this website or engaging Logix Contact (“we”, “us”, “our”) for services, you agree to these terms.
        If you do not agree, please do not use our site or services.
      </p>
      <h2>Services</h2>
      <p>
        Project scope, deliverables, timelines, and fees are defined in a separate statement of work or proposal agreed
        in writing. General information on this website does not constitute a binding offer.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Unless otherwise agreed in your contract, ownership of custom work transfers according to the payment and
        milestone terms set out in your project agreement. We retain rights to pre-existing tools, libraries, and
        know-how.
      </p>
      <h2>Website use</h2>
      <p>
        You may not misuse this site (e.g. hacking, scraping in breach of our robots policy, or unlawful activity). We may
        suspend access where we reasonably believe terms are breached.
      </p>
      <h2>Limitation</h2>
      <p>
        To the extent permitted by applicable law, we are not liable for indirect or consequential loss arising from use
        of this website. Nothing excludes liability that cannot be excluded under UK law.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The “Last updated” date at the top of this page will change when we
        do. Continued use after changes constitutes acceptance where law allows.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: use the details on our{' '}
        <a href="/contact">Contact</a> page.
      </p>
    </PolicyLayout>
  );
}
