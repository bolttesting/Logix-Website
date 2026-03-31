import PolicyLayout from './PolicyLayout';

/** “Contract policy” — high-level summary; binding terms live in signed agreements. */
export default function ServiceAgreementPage() {
  return (
    <PolicyLayout
      title="Service & contract policy"
      description="How Logix Contact structures project agreements, changes, acceptance, and confidentiality."
    >
      <h2>Purpose</h2>
      <p>
        This page summarises how we usually contract for digital projects. Your <strong>signed proposal, statement of
        work, or master services agreement</strong> always takes precedence over this summary.
      </p>
      <h2>Formation</h2>
      <p>
        A contract is formed when you accept our written proposal (including by email or e-signature) or when we both
        sign an order form. Verbal requests may be confirmed in writing to avoid ambiguity.
      </p>
      <h2>Scope changes</h2>
      <p>
        Work outside the agreed scope is treated as a change request. We will estimate extra time and cost; delivery
        dates may move until changes are approved in writing.
      </p>
      <h2>Client responsibilities</h2>
      <ul>
        <li>Timely feedback, assets, and access (e.g. hosting, repos, design files) needed to progress.</li>
        <li>Accuracy of information you provide and compliance with laws that apply to your content and use of deliverables.</li>
        <li>Payment according to the schedule in your agreement.</li>
      </ul>
      <h2>Acceptance</h2>
      <p>
        Deliverables are accepted when you confirm in writing or when a review period stated in your contract passes
        without a documented defect against the agreed specification.
      </p>
      <h2>Confidentiality</h2>
      <p>
        We treat non-public information about your business and project as confidential, subject to the confidentiality
        terms in your agreement and professional obligations.
      </p>
      <h2>Subcontractors</h2>
      <p>
        We may use vetted team members or specialists under our direction. We remain responsible to you for performance
        of the services as set out in your contract.
      </p>
      <h2>Questions</h2>
      <p>
        For a copy of your specific terms or to discuss contracting, visit <a href="/contact">Contact</a>.
      </p>
    </PolicyLayout>
  );
}
