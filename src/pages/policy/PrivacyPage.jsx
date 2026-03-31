import PolicyLayout from './PolicyLayout';

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="How Logix Contact collects, uses, and protects personal data when you use our website and services (UK)."
    >
      <h2>Who we are</h2>
      <p>
        Logix Contact is a UK-focused web and app development agency. This policy explains how we handle personal data
        in line with UK GDPR and the Data Protection Act 2018.
      </p>
      <h2>Data we collect</h2>
      <ul>
        <li>
          <strong>Contact forms:</strong> name, email, phone, and message content you choose to send.
        </li>
        <li>
          <strong>Website use:</strong> technical data such as IP address, browser type, and cookies where used (see your
          browser settings and any cookie banner we run).
        </li>
        <li>
          <strong>Clients:</strong> business contact details and project-related information needed to deliver services.
        </li>
      </ul>
      <h2>How we use data</h2>
      <p>
        We use personal data to respond to enquiries, deliver and improve our services, comply with law, and—where
        allowed—send relevant updates you have opted into.
      </p>
      <h2>Legal bases</h2>
      <p>
        Depending on the activity, we rely on consent, contract performance, legitimate interests (e.g. running our
        business and securing our systems), or legal obligation.
      </p>
      <h2>Retention & security</h2>
      <p>
        We keep data only as long as needed for the purposes above or as required by law. We use appropriate technical
        and organisational measures to protect personal data.
      </p>
      <h2>Your rights</h2>
      <p>
        You may have rights to access, rectify, erase, restrict, or object to processing, and to data portability or to
        complain to the ICO (UK). Contact us via our <a href="/contact">Contact</a> page to exercise these rights.
      </p>
      <h2>International transfers</h2>
      <p>
        If we use processors outside the UK, we ensure appropriate safeguards (e.g. UK adequacy regulations or standard
        contractual clauses) where required.
      </p>
      <h2>Updates</h2>
      <p>We may update this policy; the date at the top will change when we do.</p>
    </PolicyLayout>
  );
}
