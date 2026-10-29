
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Truck,
  CreditCard,
  FileText,
  Headset,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HelpCenter.css";

const helpCategories = [
  { name: "All Topics", icon: Headset },
  { name: "Orders", icon: ShoppingBag },
  { name: "Delivery", icon: Truck },
  { name: "Payments", icon: CreditCard },
  { name: "Prescriptions", icon: FileText },
];

const faqs = [
  {
    category: "Orders",
    question: "How can I place an order?",
    answer:
      "Browse our products, add the items you want to your cart, and continue to checkout. Review your order details before confirming your purchase.",
  },
  {
    category: "Orders",
    question: "How can I check my order status?",
    answer:
      "Once order tracking is available, you can check your order status through your account or the tracking link provided in your order confirmation.",
  },
  {
    category: "Orders",
    question: "Can I cancel or change my order?",
    answer:
      "Cancellation or modification depends on your order's processing status and the applicable order policy. Contact our support team as soon as possible for assistance.",
  },
  {
    category: "Delivery",
    question: "How long does delivery take?",
    answer:
      "Delivery times depend on your location, product availability, and the shipping option offered at checkout. Refer to your order confirmation for available delivery details.",
  },
  {
    category: "Delivery",
    question: "What should I do if my order is delayed?",
    answer:
      "Check your latest tracking information first. If your order has not arrived within the estimated delivery window, contact our support team with your order reference.",
  },
  {
    category: "Delivery",
    question: "What if I receive a damaged or incorrect product?",
    answer:
      "Contact support promptly with your order reference and a description of the issue. Our team can explain the applicable return, replacement, or refund process.",
  },
  {
    category: "Payments",
    question: "Which payment methods can I use?",
    answer:
      "Available payment methods will be displayed at checkout. Please check the options shown for your order before completing payment.",
  },
  {
    category: "Payments",
    question: "What should I do if payment fails?",
    answer:
      "Check your payment status with your bank or payment provider before trying again. If money was deducted but your order was not confirmed, contact support with your transaction reference. Never share your PIN or OTP.",
  },
  {
    category: "Payments",
    question: "How do refunds work?",
    answer:
      "Refund eligibility depends on the order and applicable refund policy. Once a refund is approved, the processing time may depend on your original payment method and payment provider.",
  },
  {
    category: "Prescriptions",
    question: "Can I order prescription medicines?",
    answer:
      "Prescription medicines are subject to applicable laws and prescription verification. Where required, you must provide a valid prescription and complete the necessary checks before an order can be fulfilled.",
  },
  {
    category: "Prescriptions",
    question: "How do I submit a prescription?",
    answer:
      "Use the prescription submission option if it is available during your purchase journey. Follow the instructions provided and ensure the prescription is valid and readable. Do not send sensitive medical documents through a general enquiry form.",
  },
  {
    category: "Prescriptions",
    question: "Can I get medical advice from customer support?",
    answer:
      "Customer support can help with website, order, and service questions, but it cannot replace a qualified healthcare professional's medical advice. Consult a licensed clinician about medicines, diagnosis, or treatment.",
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All Topics" ||
        faq.category === activeCategory;

      const matchesSearch =
        !searchTerm ||
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm) ||
        faq.category.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <Navbar />

      <main className="help-page">
        <section className="help-hero">
          <div className="help-container">
            <div className="help-hero-icon">
              <Headset size={28} />
            </div>

            <span className="help-eyebrow">iHEALTHY BIO SUPPORT</span>
            <h1>How can we <span>help you?</span></h1>
            <p>
              Find answers to common questions about orders, delivery,
              payments, and healthcare services.
            </p>

            <div className="help-search">
              <Search size={21} />
              <input
                type="search"
                aria-label="Search help articles"
                placeholder="Search for answers..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            <span className="help-search-hint">
              Try “order status”, “refund”, or “prescription”
            </span>
          </div>
        </section>

        <section className="help-container help-main">
          <div className="help-category-list" aria-label="Help categories">
            {helpCategories.map(({ name, icon: Icon }) => (
              <button
                type="button"
                key={name}
                className={`help-category ${
                  activeCategory === name ? "active" : ""
                }`}
                onClick={() => setActiveCategory(name)}
                aria-pressed={activeCategory === name}
              >
                <Icon size={21} />
                <span>{name}</span>
              </button>
            ))}
          </div>

          <div className="help-faq-section">
            <div className="help-section-heading">
              <div>
                <span className="help-eyebrow">HELP & SUPPORT</span>
                <h2>
                  {search
                    ? "Search Results"
                    : activeCategory === "All Topics"
                      ? "Frequently Asked Questions"
                      : `${activeCategory} Help`}
                </h2>
              </div>
              <span className="help-result-count">
                {filteredFaqs.length}{" "}
                {filteredFaqs.length === 1 ? "answer" : "answers"}
              </span>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="help-faq-list">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaq === faq.question;

                  return (
                    <article
                      className={`help-faq-item ${isOpen ? "open" : ""}`}
                      key={faq.question}
                    >
                      <button
                        type="button"
                        className="help-faq-question"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenFaq(isOpen ? null : faq.question)
                        }
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          size={20}
                          className="help-chevron"
                        />
                      </button>

                      {isOpen && (
                        <div className="help-faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="help-no-results">
                <Search size={32} />
                <h3>No matching answers found</h3>
                <p>
                  Try a different keyword or choose another help category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All Topics");
                  }}
                >
                  View all questions
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="help-service-section">
          <div className="help-container help-service-grid">
            <div className="help-service-card">
              <div className="help-service-icon">
                <PackageCheck size={25} />
              </div>
              <h3>Order Assistance</h3>
              <p>
                Need help with an order, delivery, or a product issue?
                Our support team can guide you.
              </p>
              <Link to="/contact">Get order support →</Link>
            </div>

            <div className="help-service-card">
              <div className="help-service-icon">
                <ShieldCheck size={25} />
              </div>
              <h3>Prescription Support</h3>
              <p>
                Learn about prescription requirements and verification
                before purchasing eligible medicines.
              </p>
              <Link to="/contact">Ask a question →</Link>
            </div>

            <div className="help-service-card">
              <div className="help-service-icon">
                <MessageCircle size={25} />
              </div>
              <h3>Still Need Help?</h3>
              <p>
                Can't find the answer you're looking for? Send our team
                a message through the contact page.
              </p>
              <Link to="/contact">Contact Us →</Link>
            </div>
          </div>
        </section>

        <section className="help-bottom">
          <div className="help-container">
            <h2>Your health and experience matter to us.</h2>
            <p>
              We're here to help you navigate iHealthy Bio's products
              and services.
            </p>
            <Link to="/contact" className="help-contact-button">
              <MessageCircle size={18} />
              Contact Support
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
