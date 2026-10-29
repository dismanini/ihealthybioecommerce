
import {
  FileText,
  ShieldCheck,
  ShoppingCart,
  CreditCard,
  Pill,
  UserCheck,
  AlertTriangle,
  Headset,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TermsConditions.css";

const termsSections = [
  {
    icon: UserCheck,
    title: "1. Acceptance of These Terms",
    paragraphs: [
      "These Terms & Conditions govern your access to and use of the iHealthy Bio website and its available services.",
      "By accessing the website, creating an account, or placing an order, you agree to these terms and applicable laws. If you do not agree, please discontinue use of the relevant services.",
      "Additional terms may apply to particular services, promotions, appointments, or transactions. Where applicable, those terms will be provided separately.",
    ],
  },
  {
    icon: UserCheck,
    title: "2. Customer Accounts",
    paragraphs: [
      "You are responsible for providing accurate and current information when creating an account or placing an order.",
      "Keep your login credentials confidential and notify us if you suspect unauthorized access to your account.",
      "We may restrict or suspend access where reasonably necessary to protect customers, prevent fraud, investigate misuse, or comply with applicable law.",
    ],
  },
  {
    icon: ShoppingCart,
    title: "3. Products and Product Information",
    paragraphs: [
      "We aim to display accurate product descriptions, images, prices, availability, and other relevant information. Errors or omissions may occasionally occur and will be addressed as appropriate.",
      "Product availability may change without notice. Displayed images are illustrative where indicated and may differ from the supplied packaging.",
      "Please read product labels, instructions, warnings, and usage information before using any healthcare product. Contact a qualified healthcare professional if you need medical guidance.",
    ],
  },
  {
    icon: Pill,
    title: "4. Prescription Medicines and Pharmacy Requirements",
    paragraphs: [
      "Prescription medicines may be supplied only where legally permitted and after the required prescription verification and other applicable checks have been completed.",
      "You must provide a valid prescription and any required information when requested. Orders may be delayed, declined, or cancelled if verification is unsuccessful or supply is not legally permitted.",
      "Medicines are subject to applicable prescription, dispensing, storage, and pharmacy requirements. We do not guarantee that every medicine or prescription order will be available or approved.",
      "Do not share prescription medicines with others or change prescribed treatment without advice from an appropriately qualified healthcare professional.",
    ],
  },
  {
    icon: CreditCard,
    title: "5. Prices and Payments",
    paragraphs: [
      "Prices, applicable taxes, delivery charges, and other order costs will be shown where relevant during checkout or before order confirmation.",
      "Orders are subject to successful payment authorization where prepayment is required. We may contact you to resolve payment or order discrepancies.",
      "If a price, listing, or transaction error is identified, we will take appropriate steps consistent with applicable law and communicate with you about the available options.",
    ],
  },
  {
    icon: ShoppingCart,
    title: "6. Orders, Delivery, and Cancellations",
    paragraphs: [
      "Submitting an order is a request to purchase the selected products. Order acceptance, processing, dispatch, and delivery depend on availability, payment status, delivery details, and any applicable verification requirements.",
      "Delivery estimates, where provided, are indicative unless expressly stated otherwise. Delays may occur due to circumstances outside our reasonable control.",
      "Cancellation eligibility depends on the order status, product type, and applicable law. Please refer to our Shipping Policy and Returns & Refunds page for additional information.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "7. Returns, Refunds, and Damaged Products",
    paragraphs: [
      "Returns, replacements, and refunds are handled according to the applicable Returns & Refunds Policy and relevant legal requirements.",
      "Some medicines and healthcare products may be subject to special return restrictions for safety or regulatory reasons.",
      "If an item is damaged, incorrect, missing, or appears tampered with, contact our support team promptly for review and guidance.",
    ],
  },
  {
    icon: Pill,
    title: "8. Medical Information and Healthcare Disclaimer",
    paragraphs: [
      "Information on this website is provided for general informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment.",
      "Product descriptions and website content should not be interpreted as a guarantee of treatment outcomes or as an instruction to start, stop, or change medication.",
      "Always consult an appropriately qualified healthcare professional about symptoms, diagnoses, medication choices, interactions, and treatment decisions. In an emergency, seek urgent medical assistance.",
      "Where doctor profiles or appointment booking services are available, the scope of those services and the relationship with the healthcare professional may be governed by additional terms.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "9. Acceptable Use",
    paragraphs: [
      "You must not misuse the website, interfere with its operation, attempt unauthorized access, submit fraudulent information, or use the services for unlawful purposes.",
      "You must not knowingly provide false prescription information, impersonate another person, or attempt to bypass required verification procedures.",
      "We may take reasonable action to protect the website, customers, and our services from misuse, subject to applicable law.",
    ],
  },
  {
    icon: FileText,
    title: "10. Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, website text, graphics, branding, logos, design elements, and other content are owned by or licensed to their respective rights holders.",
      "You may use the website for personal and lawful purposes. You must not reproduce, distribute, modify, or commercially exploit protected content without the necessary permission, except as permitted by law.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "11. Liability and Service Availability",
    paragraphs: [
      "We aim to maintain a reliable website, but we do not guarantee uninterrupted or error-free access at all times.",
      "To the extent permitted by applicable law, we are not responsible for losses arising from events beyond our reasonable control, unauthorized use of an account due to compromised credentials, or reliance on general website information as a substitute for professional advice.",
      "Nothing in these terms excludes or limits any liability, consumer right, or legal protection that cannot lawfully be excluded or limited.",
    ],
  },
  {
    icon: FileText,
    title: "12. Changes to These Terms",
    paragraphs: [
      "We may update these Terms & Conditions to reflect changes to our services, business practices, or legal obligations.",
      "The updated version will be published on this page. Where required, we will provide notice or obtain consent before changes take effect.",
      "Your continued use of the website after an update takes effect is subject to the revised terms, to the extent permitted by applicable law.",
    ],
  },
  {
    icon: FileText,
    title: "13. Governing Law and Disputes",
    paragraphs: [
      "These terms are subject to applicable laws and consumer protections. Any governing-law or dispute-resolution provision must be completed to reflect the actual legal entity operating iHealthy Bio and the laws applicable to its business.",
      "Nothing in this section is intended to prevent you from exercising any mandatory rights or remedies available under applicable law.",
    ],
  },
];

export default function TermsConditions() {
  return (
    <>
      <Navbar />

      <main className="terms-page">
        <section className="terms-hero">
          <div className="terms-container terms-hero-inner">
            <div className="terms-hero-copy">
              <span className="terms-eyebrow">
                <ShieldCheck size={17} />
                iHealthy Bio · Legal Information
              </span>

              <h1>Terms &amp; Conditions</h1>

              <p>
                Please read these terms carefully to understand the rules,
                responsibilities, and conditions that apply when you use
                iHealthy Bio and its healthcare ecommerce services.
              </p>

              <div className="terms-hero-note">
                <FileText size={17} />
                Important information about using our services
              </div>
            </div>

            <div className="terms-hero-art" aria-hidden="true">
              <FileText size={88} strokeWidth={1.4} />
              <ShieldCheck
                className="terms-hero-shield"
                size={39}
                strokeWidth={1.7}
              />
            </div>
          </div>
        </section>

        <section className="terms-container terms-content">
          <div className="terms-notice">
            <AlertTriangle size={23} />
            <div>
              <h2>Important healthcare notice</h2>
              <p>
                Online product information does not replace professional
                medical advice. Prescription medicines are subject to
                applicable legal requirements and verification procedures.
              </p>
            </div>
          </div>

          <div className="terms-intro">
            <h2>About these Terms &amp; Conditions</h2>
            <p>
              These terms describe the general conditions for using the
              iHealthy Bio website, shopping for products, and accessing
              available services. Please also review our Privacy Policy,
              Shipping Policy, and Returns &amp; Refunds Policy.
            </p>
          </div>

          <div className="terms-layout">
            <aside className="terms-sidebar">
              <h2>On this page</h2>
              <nav aria-label="Terms and conditions sections">
                {termsSections.map((section, index) => (
                  <a
                    href={`#terms-section-${index + 1}`}
                    key={section.title}
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="terms-sections">
              {termsSections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <article
                    className="terms-section-card"
                    id={`terms-section-${index + 1}`}
                    key={section.title}
                  >
                    <div className="terms-section-heading">
                      <span className="terms-section-icon">
                        <Icon size={22} />
                      </span>
                      <h2>{section.title}</h2>
                    </div>

                    
{section.paragraphs.map((paragraph) => (
  <p key={paragraph}>{paragraph}</p>
))}

                  </article>
                );
              })}
            </div>
          </div>

          <section className="terms-links">
            <h2>Related policies</h2>
            <p>Review our other policies for more information.</p>

            <div className="terms-link-list">
              <Link to="/privacy-policy">
                <ShieldCheck size={19} />
                Privacy Policy
              </Link>

              <Link to="/shipping-policy">
                <ShoppingCart size={19} />
                Shipping Policy
              </Link>

              <Link to="/returns-refunds">
                <CreditCard size={19} />
                Returns &amp; Refunds
              </Link>
            </div>
          </section>

          <section className="terms-contact-card">
            <div className="terms-contact-icon">
              <Headset size={28} />
            </div>

            <div className="terms-contact-copy">
              <h2>Have a question about these terms?</h2>
              <p>
                Contact our team if you need clarification about using our
                website, placing an order, or accessing our services.
              </p>
            </div>

            <Link to="/contact" className="terms-contact-button">
              Contact Us
            </Link>
          </section>

          <p className="terms-disclaimer">
            This is a starter template, not legal advice. Before publishing,
            confirm the operating business's legal name, applicable
            jurisdiction, consumer rights, pharmacy obligations, and actual
            website practices. Consider having the final terms reviewed by a
            qualified legal professional.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
