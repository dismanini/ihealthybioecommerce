
import {
  RotateCcw,
  PackageCheck,
  ClipboardCheck,
  Clock,
  ShieldCheck,
  Headset,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ReturnsRefunds.css";

const returnSteps = [
  {
    icon: ClipboardCheck,
    title: "1. Submit a Request",
    description:
      "Contact our support team with your order number, product details, and reason for requesting a return or refund.",
  },
  {
    icon: PackageCheck,
    title: "2. Request Review",
    description:
      "Our team will review your request against the applicable product and return conditions and explain the next steps.",
  },
  {
    icon: RotateCcw,
    title: "3. Return Instructions",
    description:
      "If your return is approved, follow the instructions provided by our support team. Do not send products back before receiving instructions.",
  },
  {
    icon: CheckCircle2,
    title: "4. Refund Processing",
    description:
      "Once an eligible return or refund is approved, we will communicate the applicable refund method and expected processing timeline.",
  },
];

const sections = [
  {
    title: "1. Return Eligibility",
    content: (
      <>
        <p>
          Return eligibility depends on the product type, its condition, the
          reason for the request, and applicable law. Please contact our support
          team before returning an item.
        </p>
        <p>
          Products must not be returned without prior instructions. Where
          applicable, retain the original packaging, invoice, and any included
          accessories until your request is reviewed.
        </p>
      </>
    ),
  },
  {
    title: "2. Medicines and Healthcare Products",
    content: (
      <>
        <p>
          For safety, quality, and regulatory reasons, medicines and certain
          healthcare products may have restrictions on returns or resale.
          Eligibility will be assessed in accordance with applicable law and
          product-specific requirements.
        </p>
        <p>
          If you receive the wrong product, a damaged package, an expired
          product, or an item that appears defective, contact us promptly so
          that we can review the issue.
        </p>
        <p>
          Do not use a product if its packaging appears tampered with or if you
          have concerns about its safety. Contact our support team for guidance.
        </p>
      </>
    ),
  },
  {
    title: "3. Damaged, Incorrect, or Missing Items",
    content: (
      <>
        <p>
          Please report damaged packages, incorrect items, or missing products
          as soon as possible after delivery. Include your order number and a
          clear description of the issue. Photographs of the outer packaging
          and product may help us investigate.
        </p>
        <p>
          We will review the details and communicate the available resolution,
          which may include a replacement or refund where applicable.
        </p>
      </>
    ),
  },
  {
    title: "4. Refund Method and Timeline",
    content: (
      <>
        <p>
          Approved refunds will be handled using the applicable payment method
          or another method communicated by our support team. The time required
          for the refund to appear may depend on your payment provider or bank.
        </p>
        <p>
          We will confirm the applicable timeline after reviewing your request.
          Any shipping charges, deductions, or other adjustments will be
          explained where relevant and permitted by law.
        </p>
      </>
    ),
  },
  {
    title: "5. Cancellations",
    content: (
      <>
        <p>
          If you need to cancel an order, contact us as soon as possible and
          provide your order number. Cancellation may not be possible after an
          order has been processed, dispatched, or otherwise reached a stage
          where cancellation is restricted.
        </p>
        <p>
          Prescription orders may also be subject to additional verification
          and applicable pharmacy requirements.
        </p>
      </>
    ),
  },
  {
    title: "6. How to Request a Return or Refund",
    content: (
      <>
        <p>When contacting support, please provide:</p>
        <ul>
          <li>Your order number and registered contact details.</li>
          <li>The product name and quantity.</li>
          <li>The reason for your request.</li>
          <li>Relevant photographs or supporting details, if applicable.</li>
        </ul>
        <p>
          Please do not include unnecessary medical information or sensitive
          personal details in your message.
        </p>
      </>
    ),
  },
];

export default function ReturnsRefunds() {
  return (
    <>
      <Navbar />

      <main className="returns-page">
        <section className="returns-hero">
          <div className="returns-container returns-hero-inner">
            <div className="returns-hero-copy">
              <span className="returns-eyebrow">
                <ShieldCheck size={16} />
                iHealthy Bio Customer Care
              </span>

              <h1>Returns &amp; Refunds</h1>

              <p>
                Need help with an order? Find out how to request a return,
                report a product issue, or ask about a refund.
              </p>

              <Link to="/contact" className="returns-primary-button">
                Contact Support
              </Link>
            </div>

            <div className="returns-hero-icon" aria-hidden="true">
              <RotateCcw size={100} strokeWidth={1.3} />
            </div>
          </div>
        </section>

        <section className="returns-container returns-intro">
          <div className="returns-notice">
            <AlertCircle size={22} />
            <div>
              <h2>Please read before returning a product</h2>
              <p>
                Return eligibility varies by product. Medicines and other
                healthcare items may have specific restrictions. Contact our
                support team before sending anything back.
              </p>
            </div>
          </div>

          <div className="returns-section-heading">
            <span className="returns-eyebrow">Simple process</span>
            <h2>How returns and refunds work</h2>
            <p>
              Our team will guide you through the applicable process for your
              order.
            </p>
          </div>

          <div className="returns-steps">
            {returnSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article className="returns-step-card" key={step.title}>
                  <div className="returns-step-icon">
                    <Icon size={25} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="returns-policy-section">
          <div className="returns-container">
            <div className="returns-section-heading">
              <span className="returns-eyebrow">Policy details</span>
              <h2>Our Returns &amp; Refunds Policy</h2>
              <p>
                Review the information below before submitting your request.
              </p>
            </div>

            <div className="returns-policy-list">
              {sections.map((section) => (
                <article className="returns-policy-card" key={section.title}>
                  <h3>{section.title}</h3>
                  <div className="returns-policy-content">
                    {section.content}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="returns-container returns-help-section">
          <div className="returns-help-icon">
            <Headset size={30} />
          </div>
          <div className="returns-help-copy">
            <h2>Need help with an order?</h2>
            <p>
              Contact our support team with your order details. We will help
              you understand the next steps for your request.
            </p>
          </div>
          <Link to="/contact" className="returns-secondary-button">
            Contact Us
          </Link>
        </section>

        <section className="returns-container returns-disclaimer">
          <Clock size={18} />
          <p>
            This page provides general information. Before publishing, confirm
            your actual return eligibility rules, refund timelines, cancellation
            terms, and applicable legal requirements.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
