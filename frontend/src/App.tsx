
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExploreDoctors from "./pages/ExploreDoctors";
import ContactUs from "./pages/ContactUs";
import HelpCenter from "./pages/HelpCenter";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";

function DoctorsRoute() {
  const navigate = useNavigate();

  return (
    <ExploreDoctors
      onBackHome={() => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="page-container">
      <h1>Page not found</h1>
      <button
        type="button"
        className="primary-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctors" element={<DoctorsRoute />} />
       <Route path="/contact" element={<ContactUs />} />
       <Route path="/help-center" element={<HelpCenter />} />
       <Route path="/shipping-policy" element={<ShippingPolicy />} />
       <Route path="/returns-refunds" element={<ReturnsRefunds />} />
       <Route path="/privacy-policy" element={<PrivacyPolicy />} />
       <Route path="/terms-conditions" element={<TermsConditions />} />
       <Route path="/about" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
