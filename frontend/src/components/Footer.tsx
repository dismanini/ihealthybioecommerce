
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="page-container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="brand">
              <span className="brand-mark-svg">
                <img
                  src="/iHealthy Asset.png"
                  alt="iHealthy Logo"
                  style={{ height: "80px", width: "auto" }}
                />
              </span>

              <span className="brand-copy">
                <strong>iHealthy</strong>
                <small>YOUR HEALTH, OUR PRIORITY</small>
              </span>
            </a>

            <p>
              Your destination for everyday health products,
              wellness essentials, and convenient healthcare
              information across India.
            </p>
          </div>

          {/* Shopping Links */}
          <div className="footer-column">
            <h3>Shop</h3>
            <a href="/#categories">Health Categories</a>
            <a href="/#bestsellers">Bestsellers</a>
            <a href="/#family-care">Personal Care</a>
            <a href="/#categories">Wellness Essentials</a>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h3>iHealthy</h3>
            <a href="/#home">About Us</a>
            <a href="/doctors">Explore Doctors</a>
            <a href="/contact">Contact Us</a>
            <a href="/help-center">Help Centre</a>
          </div>

          {/* Customer Support */}
          <div className="footer-column">
            <h3>Customer Support</h3>
            <a href="/shipping-policy">Shipping Policy</a>
            <a href="/returns-refunds">Returns &amp; Refunds</a>
           <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-conditions">Terms &amp; Conditions</a>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="footer-disclaimer">
          <ShieldCheck size={22} />

          <p>
            <strong>Health Information Notice:</strong>{" "}
            Product information on this demonstration website
            is for general informational purposes only. It is
            not a substitute for professional medical advice,
            diagnosis, or treatment. Prescription medicines
            require appropriate prescription verification and
            applicable legal compliance.
          </p>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} iHealthy. All rights reserved.
          </span>

          <span>Built for better everyday health.</span>
        </div>
      </div>
    </footer>
  );
}
