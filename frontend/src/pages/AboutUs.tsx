
import {
  HeartPulse,
  ShieldCheck,
  Users,
  Stethoscope,
  Target,
  Eye,
  ArrowRight,
  CheckCircle2,
  Activity,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutUs.css";

const values = [
  {
    icon: HeartPulse,
    title: "Patient First",
    description:
      "We put people's health and wellbeing at the center of the experience we aim to provide.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "We aim to provide a dependable shopping experience with clear information and responsible practices.",
  },
  {
    icon: Users,
    title: "Care for Everyone",
    description:
      "We want to make exploring healthcare products and connecting with healthcare professionals easier.",
  },
  {
    icon: ClipboardCheck,
    title: "Responsible Healthcare",
    description:
      "We encourage informed decisions and appropriate professional guidance for healthcare needs.",
  },
];

const services = [
  {
    icon: Activity,
    title: "Health & Wellness Products",
    description:
      "Explore health essentials and wellness products in one convenient place.",
  },
  {
    icon: Stethoscope,
    title: "Find Healthcare Professionals",
    description:
      "Explore doctor profiles and find healthcare professionals for your needs.",
  },
  {
    icon: ShieldCheck,
    title: "Prescription-Aware Shopping",
    description:
      "Prescription medicines should be supplied only through the appropriate prescription verification and legal safeguards.",
  },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <div className="about-hero-decoration about-decoration-one" />
          <div className="about-hero-decoration about-decoration-two" />

          <div className="about-container about-hero-grid">
            <div className="about-hero-content">
              <span className="about-eyebrow">
                <HeartPulse size={17} />
                ABOUT iHEALTHY BIO
              </span>

              <h1>
                Your Health.
                <br />
                <span>Our Priority.</span>
              </h1>

              <p>
                We believe healthcare should feel simpler, more accessible,
                and easier to navigate. iHealthy Bio brings health and wellness
                products and doctor discovery together in one convenient
                online destination.
              </p>

              <div className="about-hero-actions">
                <Link to="/doctors" className="about-btn about-btn-primary">
                  Explore Doctors <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="about-btn about-btn-outline">
                  Contact Us
                </Link>
              </div>

              <div className="about-trust-note">
                <CheckCircle2 size={18} />
                <span>Supporting more informed healthcare choices</span>
              </div>
            </div>

            <div className="about-hero-visual">
              <div className="about-image-card">
                <div className="about-image-top">
                  <span className="about-image-icon">
                    <HeartPulse size={30} />
                  </span>
                  <span className="about-image-label">
                    Care that puts you first
                  </span>
                </div>

                <div className="about-health-illustration">
                  <div className="about-orbit about-orbit-one" />
                  <div className="about-orbit about-orbit-two" />
                  <div className="about-main-heart">
                    <HeartPulse size={94} strokeWidth={1.5} />
                  </div>
                  <div className="about-floating-icon about-float-shield">
                    <ShieldCheck size={27} />
                  </div>
                  <div className="about-floating-icon about-float-user">
                    <Users size={27} />
                  </div>
                  <div className="about-floating-icon about-float-doctor">
                    <Stethoscope size={27} />
                  </div>
                </div>

                <div className="about-image-bottom">
                  <div>
                    <strong>iHealthy Bio</strong>
                    <span>Healthcare, made easier to explore.</span>
                  </div>
                  <span className="about-bottom-check">
                    <CheckCircle2 size={23} />
                  </span>
                </div>
              </div>

              <div className="about-floating-tag about-tag-top">
                <ShieldCheck size={20} />
                <span>
                  <strong>Safety matters</strong>
                  <small>Responsible healthcare practices</small>
                </span>
              </div>

              <div className="about-floating-tag about-tag-bottom">
                <Stethoscope size={21} />
                <span>
                  <strong>Care connections</strong>
                  <small>Discover healthcare professionals</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-intro section-padding">
          <div className="about-container about-intro-grid">
            <div className="about-section-heading">
              <span className="about-eyebrow">WHO WE ARE</span>
              <h2>
                Making your healthcare journey
                <span> easier to navigate.</span>
              </h2>
            </div>

            <div className="about-intro-text">
              <p>
                iHealthy Bio is a healthcare ecommerce platform designed to
                help people explore health and wellness products and discover
                healthcare professionals through a convenient digital
                experience.
              </p>
              <p>
                We know that finding the right healthcare information and
                products can feel overwhelming. Our goal is to make the
                experience more organized, accessible, and user-friendly while
                encouraging safe and responsible healthcare decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="about-mission section-padding">
          <div className="about-container about-mission-grid">
            <article className="about-mission-card">
              <div className="about-round-icon">
                <Target size={27} />
              </div>
              <span className="about-card-label">OUR MISSION</span>
              <h2>Make healthcare easier to access.</h2>
              <p>
                Our mission is to provide a convenient online experience for
                exploring health products and finding healthcare professionals,
                with a focus on clarity, trust, and responsible care.
              </p>
            </article>

            <article className="about-vision-card">
              <div className="about-round-icon">
                <Eye size={27} />
              </div>
              <span className="about-card-label">OUR VISION</span>
              <h2>A more connected healthcare experience.</h2>
              <p>
                We envision a future where people can navigate everyday
                healthcare needs with greater confidence and connect more
                easily with appropriate healthcare resources.
              </p>
              <div className="about-vision-decoration">
                <HeartPulse size={145} strokeWidth={0.8} />
              </div>
            </article>
          </div>
        </section>

        <section className="about-values section-padding">
          <div className="about-container">
            <div className="about-centered-heading">
              <span className="about-eyebrow">WHAT GUIDES US</span>
              <h2>The values behind our care</h2>
              <p>
                The principles that shape how we want to serve our customers
                and support their healthcare journey.
              </p>
            </div>

            <div className="about-values-grid">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article className="about-value-card" key={value.title}>
                    <div className="about-value-icon">
                      <Icon size={27} />
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-services section-padding">
          <div className="about-container">
            <div className="about-services-heading">
              <div>
                <span className="about-eyebrow">HOW WE HELP</span>
                <h2>Healthcare essentials in one place</h2>
              </div>
              <p>
                Explore our platform to discover products and healthcare
                resources designed around your needs.
              </p>
            </div>

            <div className="about-services-grid">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article className="about-service-card" key={service.title}>
                    <div className="about-service-icon">
                      <Icon size={28} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-disclaimer">
          <div className="about-container about-disclaimer-inner">
            <ShieldCheck size={25} />
            <div>
              <h3>Your health deserves responsible care</h3>
              <p>
                Website information is for general informational purposes and
                is not a substitute for professional medical advice,
                diagnosis, or treatment. Prescription medicines require valid
                prescriptions and applicable verification. Always consult a
                qualified healthcare professional about your medical needs.
              </p>
            </div>
          </div>
        </section>

        <section className="about-cta-section">
          <div className="about-container about-cta">
            <div>
              <span className="about-cta-label">YOUR HEALTHCARE JOURNEY</span>
              <h2>Let’s take the next step together.</h2>
              <p>
                Explore healthcare professionals or get in touch with our
                team if you need assistance.
              </p>
            </div>
            <div className="about-cta-actions">
              <Link to="/doctors" className="about-btn about-btn-light">
                Explore Doctors <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="about-cta-contact">
                Have a question? Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
