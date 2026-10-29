
import {
  PackageCheck,
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Headset,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ShippingPolicy.css";

const shippingSections = [
  {
    number: "01",
    title: "Order Processing",
    icon: PackageCheck,
    content: [
      "Orders are processed after successful order confirmation and payment verification, where applicable.",
      "Processing times may vary depending on product availability, prescription verification requirements, and business holidays.",
      "If additional information is required to fulfil an order, our support team may contact you.",
    ],
  },
  {
    number: "02",
    title: "Shipping Charges",
    icon: Truck,
    content: [
      "Applicable shipping or delivery charges will be displayed at checkout before you confirm your order.",
      "Any free-shipping offer will be subject to the eligibility conditions displayed with that offer.",
      "Additional charges, if applicable to a particular delivery location or service, will be communicated before order confirmation.",
    ],
  },
  {
    number: "03",
    title: "Delivery Estimates",
    icon: Clock,
    content: [
      "Estimated delivery dates depend on your delivery address, product availability, courier service, and order processing time.",
      "Delivery estimates are indicative and may change due to weather, transport disruptions, public holidays, or other circumstances beyond our control.",
      "Please refer to your order confirmation or tracking information for the latest available delivery updates.",
    ],
  },
  {
    number: "04",
    title: "Order Tracking",
    icon: MapPin,
    content: [
      "Where tracking is available, tracking details will be provided through the order status page, email, SMS, or another supported communication channel.",
      "Tracking information may take some time to appear after an order has been dispatched.",
      "If tracking details are unavailable or have not updated for an extended period, please contact our support team with your order reference.",
    ],
  },
  {
    number: "05",
    title: "Prescription Products",
    icon: ShieldCheck,
    content: [
      "Orders containing prescription medicines may require a valid prescription and verification before dispatch.",
      "Dispatch may be delayed while required documentation or verification is pending.",
      "Prescription products will be supplied only where permitted under applicable laws and subject to the required checks.",
    ],
  },
  {
    number: "06",
    title: "Delivery Issues",
    icon: Headset,
    content: [
      "If your parcel arrives damaged, contains an incorrect item, or appears to be missing, contact our support team promptly after delivery or discovery of the issue.",
      "Please retain the packaging and order details while the issue is being reviewed. Photos may help us assess a damaged parcel.",
      "Any replacement, return, or refund will be handled in accordance with the applicable policy and legal requirements.",
    ],
  },
];

export default function ShippingPolicy() {
  return (
    <>
      <Navbar />

      <main className="shipping-page">
        <section className="shipping-hero">
          <div className="shipping-container">
            <div className="shipping-hero-icon">
              <Truck size={30} />
            </div>

            <span className="shipping-eyebrow">
              IHEALTHY BIO · CUSTOMER INFORMATION
            </span>

            <h1>Shipping <span>Policy</span></h1>

            <p>
              Everything you need to know about order processing,
              shipping, delivery, and tracking your iHealthy Bio order.
            </p>

            <div className="shipping-updated">
              <Clock size={15} />
              <span>
                Effective date: [Add your policy effective date]
              </span>
            </div>
          </div>
        </section>

        <section className="shipping-container shipping-content">
          <aside className="shipping-notice">
            <ShieldCheck size={23} />
            <div>
              <h2>Our commitment to your order</h2>
              <p>
                We aim to provide clear order updates and reliable
                delivery information. Availability, verification
                requirements, and delivery options may vary by product
                and destination.
              </p>
            </div>
          </aside>

          <div className="shipping-intro">
            <h2>About this policy</h2>
            <p>
              This policy describes the general shipping and delivery
              process for purchases made through iHealthy Bio. The
              delivery options, charges, and timelines shown at checkout
              and in your order confirmation apply to your specific order,
              subject to the applicable terms.
            </p>
          </div>

          <div className="shipping-sections">
            {shippingSections.map(({ number, title, icon: Icon, content }) => (
              <article className="shipping-section" key={number}>
                <div className="shipping-section-icon">
                  <Icon size={23} />
                </div>

                <div className="shipping-section-body">
                  <span className="shipping-section-number">
                    SECTION {number}
                  </span>

                  <h2>{title}</h2>

                  <ul>
                    {content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <section className="shipping-address-note">
            <h2>Please check your delivery address</h2>
            <p>
              Ensure that your shipping address, contact number, and
              other delivery details are accurate when placing your
              order. If you notice an error, contact us as soon as
              possible. Address changes may not be possible after
              dispatch.
            </p>
          </section>

          <section className="shipping-help-card">
            <div className="shipping-help-icon">
              <Headset size={27} />
            </div>

            <div className="shipping-help-text">
              <h2>Need help with a delivery?</h2>
              <p>
                Contact our team if you have questions about your
                order, tracking details, or a delivery issue.
              </p>
            </div>

            <Link to="/contact" className="shipping-help-button">
              Contact Support
            </Link>
          </section>

          <p className="shipping-footer-note">
            This policy should be read together with the applicable
            Returns &amp; Refunds Policy and Terms &amp; Conditions.
            Nothing in this policy limits any rights you may have under
            applicable law.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
