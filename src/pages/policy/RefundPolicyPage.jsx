import PolicyLayout from './PolicyLayout';

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund Policy"
      description="Refund and cancellation terms for Logix Contact digital services and project fees."
    >
      <h2>Deposits & milestones</h2>
      <p>
        Custom software and design work is typically billed in milestones or phases as set out in your proposal or
        contract. Unless your agreement says otherwise, deposits paid to secure capacity or begin work are generally{' '}
        <strong>non-refundable</strong> once work has started or third-party costs are committed.
      </p>
      <h2>Cancellation</h2>
      <p>
        You may request to pause or end a project in writing. We will invoice work completed and reasonable costs
        incurred up to the cancellation date, as defined in your contract.
      </p>
      <h2>Defects & rework</h2>
      <p>
        We stand behind our deliverables against the agreed scope. If something does not meet the specification in your
        signed scope, we will work with you to remedy it within a reasonable period as per your project terms—not as a
        “refund” but as fulfilment of the agreement.
      </p>
      <h2>Subscriptions & retainers</h2>
      <p>
        For ongoing retainers or subscriptions, notice periods and any partial refunds are specified in the relevant
        order form or agreement.
      </p>
      <h2>Disputes</h2>
      <p>
        We aim to resolve concerns quickly. If you are unhappy with billing or delivery, contact your project lead or use
        our <a href="/contact">Contact</a> page so we can review your case against the contract.
      </p>
      <h2>Statutory rights</h2>
      <p>
        Nothing in this policy affects statutory rights consumers may have under UK law where applicable.
      </p>
    </PolicyLayout>
  );
}
