
import { useState, type FormEvent } from "react";
import "./ContactUs.css";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Headset,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "General Enquiry",
  message: "",
};

export default function ContactUs() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setSuccessMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Frontend demonstration only.
    // Connect this handler to your backend API to send real messages.
    setSuccessMessage(
      "Thank you for contacting iHealthy Bio! Your form is ready to be connected to our support team."
    );
    setForm(initialForm);
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero" id="contact">
          <div className="contact-container">
            <span className="contact-eyebrow">
              WE'RE HERE TO HELP
            </span>
            <h1>Contact <span>iHealthy Bio</span></h1>
            <p>
              Have a question about an order, health product, or our
              services? Our team is here to help you find the right
              information.
            </p>
            <a href="#contact-form" className="contact-hero-button">
              Get in Touch <Send size={17} />
            </a>
          </div>
        </section>

        <section className="contact-content contact-container">
          <div className="contact-info">
            <span className="contact-eyebrow">CONTACT INFORMATION</span>
            <h2>Let's start a conversation</h2>
            <p className="contact-intro">
              Reach out to us for assistance with orders, products,
              appointments, or general enquiries.
            </p>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Mail size={22} />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>For general questions and support</p>
                <a href="mailto:support@ihealthybio.com">
                  support@ihealthybio.com
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Phone size={22} />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>Speak with our support team</p>
                <span>Contact number to be added</span>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Clock size={22} />
              </div>
              <div>
                <h3>Support Hours</h3>
                <p>Monday – Saturday</p>
                <span>Business hours to be confirmed</span>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h3>Our Location</h3>
                <p>iHealthy Bio</p>
                <span>Business address to be added</span>
              </div>
            </div>

            <div className="contact-support-note">
              <ShieldCheck size={24} />
              <div>
                <h3>Your wellbeing matters</h3>
                <p>
                  For medical advice, diagnosis, or treatment, consult a
                  qualified healthcare professional. Contact support is
                  not an emergency medical service.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-card" id="contact-form">
            <span className="contact-eyebrow">SEND US A MESSAGE</span>
            <h2>How can we help you?</h2>
            <p>Complete the form below and tell us what you need.</p>

            {successMessage && (
              <div className="contact-success" role="status">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="subject">Enquiry Type *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option>General Enquiry</option>
                    <option>Order Support</option>
                    <option>Product Information</option>
                    <option>Doctor Appointments</option>
                    <option>Prescription Support</option>
                    <option>Feedback</option>
                  </select>
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  required
                />
              </div>

              <button type="submit" className="contact-submit">
                Send Message <Send size={17} />
              </button>

              <p className="contact-privacy">
                Please avoid including sensitive medical information
                or prescription documents in this general contact form.
              </p>
            </form>
          </div>
        </section>

        <section className="contact-bottom-banner">
          <div className="contact-container contact-bottom-inner">
            <div className="contact-bottom-icon">
              <Headset size={28} />
            </div>
            <div>
              <h2>Need help with your healthcare journey?</h2>
              <p>
                We're here to help you navigate our products and services.
              </p>
            </div>
            <a href="#contact-form">Contact Our Team</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
