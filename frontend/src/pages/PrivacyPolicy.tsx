
import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  Database,
  Cookie,
  Share2,
  ClipboardCheck,
  Headset,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PrivacyPolicy.css";

const privacySections = [
  {
    icon: UserRound,
    title: "1. Information We Collect",
    paragraphs: [
      "We may collect information you provide when creating an account, placing an order, contacting support, or booking a healthcare appointment.",
      "Depending on the features you use, this may include your name, contact details, delivery address, order information, appointment details, and information required to process payments.",
      "If prescription services are offered, relevant prescription information may be collected when necessary to support lawful prescription verification and order fulfilment.",
    ],
  },
  {
    icon: Database,
    title: "2. How We Use Your Information",
    paragraphs: [
      "We may use your information to process orders, arrange delivery, manage appointments, respond to enquiries, provide customer support, and maintain account security.",
      "Information may also be used to prevent fraud, meet legal obligations, improve website functionality, and communicate important updates about your transactions or services.",
      "We will not use your information for a purpose that is incompatible with applicable law.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "3. Health and Prescription Information",
    paragraphs: [
      "Health-related and prescription information can be sensitive. Where collected, it should be handled with appropriate safeguards and accessed only for legitimate, authorized purposes.",
      "Please provide health information only when it is necessary for the service you are requesting. Do not send unnecessary medical details through general contact forms.",
      "iHealthy Bio is an ecommerce service and does not replace advice, diagnosis, or treatment from a qualified healthcare professional.",
    ],
  },
  {
    icon: Share2,
    title: "4. When We Share Information",
    paragraphs: [
      "We may share relevant information with service providers that help operate our website and fulfil your requests, such as payment processors, delivery partners, hosting providers, and authorized customer support services.",
      "Information may also be disclosed where required by law, to respond to valid legal requests, protect users, or address fraud and security concerns.",
      "We do not needlessly disclose personal information. Any sharing should be limited to what is necessary for the relevant purpose and handled in accordance with applicable law.",
    ],
  },
  {
    icon: Cookie,
    title: "5. Cookies and Website Technologies",
    paragraphs: [
      "Our website may use cookies or similar technologies to support essential functions, maintain sessions, remember preferences, understand website performance, and improve the user experience.",
      "The cookies used depend on the features and services enabled on the website. Where required, we will provide appropriate information and choices about non-essential cookies.",
      "You can also manage cookies through your browser settings. Disabling certain cookies may affect website functionality.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "6. Data Security and Retention",
    paragraphs: [
      "We use appropriate measures intended to protect information from unauthorized access, loss, misuse, or disclosure. No website or electronic transmission can be guaranteed to be completely secure.",
      "Information is retained for as long as necessary for the relevant purposes, including order management, customer support, recordkeeping, dispute resolution, and legal or regulatory obligations.",
      "Retention periods may differ depending on the type of information and the applicable requirements.",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "7. Your Privacy Rights",
    paragraphs: [
      "Depending on applicable law, you may have rights to request access to, correction of, or deletion of certain personal information, and to raise concerns about how your information is handled.",
      "Some information may need to be retained where required by law or for legitimate recordkeeping purposes.",
      "To submit a privacy request, contact us through our Contact Us page. We may need to verify your identity before acting on a request.",
    ],
  },
  {
    icon: UserRound,
    title: "8. Third-Party Services and Links",
    paragraphs: [
      "Our website may link to third-party websites or use external services. Those services may have their own privacy policies and data practices.",
      "Please review the relevant third-party privacy information before providing personal information directly to another service. We cannot guarantee the privacy practices of independent third parties.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "9. Children's Privacy",
    paragraphs: [
      "Our website is not intended to invite children to submit personal information independently. Where a service involves a minor, a parent, guardian, or other legally authorized person should participate as required by applicable law.",
      "If you believe a child has provided personal information inappropriately, please contact us so we can review the matter.",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "10. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy when our services, data practices, or legal obligations change.",
      "The latest version will be published on this page. Please review it periodically to understand how your information may be handled.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="privacy-page">
        <section className="privacy-hero">
          <div className="privacy-container privacy-hero-inner">
            <div className="privacy-hero-copy">
              <span className="privacy-eyebrow">
                <ShieldCheck size={17} />
                Your privacy matters
              </span>

              <h1>Privacy Policy</h1>

              <p>
                Your trust matters to us. Learn how iHealthy Bio may collect,
                use, protect, and manage your personal information when you
                use our website and services.
              </p>

              <div className="privacy-updated">
                <LockKeyhole size={16} />
                Please review this policy before using our services.
              </div>
            </div>

            <div className="privacy-hero-art" aria-hidden="true">
              <ShieldCheck size={94} strokeWidth={1.35} />
              <span className="privacy-art-dot privacy-art-dot-one" />
              <span className="privacy-art-dot privacy-art-dot-two" />
            </div>
          </div>
        </section>

        <section className="privacy-container privacy-main-content">
          <div className="privacy-intro-card">
            <div className="privacy-intro-icon">
              <LockKeyhole size={25} />
            </div>
            <div>
              <h2>About this policy</h2>
              <p>
                This policy explains the general ways personal information
                may be handled through the iHealthy Bio website. The exact
                information collected depends on the services and features
                enabled on your account.
              </p>
            </div>
          </div>

          <div className="privacy-layout">
            <aside className="privacy-sidebar">
              <h2>On this page</h2>
              <nav aria-label="Privacy policy sections">
                {privacySections.map((section, index) => (
                  <a href={`#privacy-section-${index + 1}`} key={section.title}>
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="privacy-sections">
              {privacySections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <article
                    className="privacy-section-card"
                    id={`privacy-section-${index + 1}`}
                    key={section.title}
                  >
                    <div className="privacy-section-heading">
                      <span className="privacy-section-icon">
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

          <section className="privacy-contact-card">
            <div className="privacy-contact-icon">
              <Headset size={29} />
            </div>

            <div className="privacy-contact-copy">
              <h2>Questions about your privacy?</h2>
              <p>
                Contact our team if you have a question about this policy or
                would like to submit a privacy-related request.
              </p>
            </div>

            <Link to="/contact" className="privacy-contact-button">
              Contact Us
            </Link>
          </section>

          <p className="privacy-disclaimer">
            Important: This is a starter policy template. Update it to reflect
            your actual data collection, payment, analytics, hosting, and
            prescription-handling practices, and have it reviewed for the laws
            applicable to your business before publishing.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
