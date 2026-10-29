
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  ChevronRight,
  Crosshair,
  Heart,
  PackageCheck,
  Search,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import ProductSection from "../components/ProductSection";
import HeroSlider from "../components/HeroSlider";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import type { CheckoutFormData } from "../components/CartDrawer";

import {
  products,
  indianCities,
  categories,
  banners,
  type Product,
} from "../data/products";

export default function HomePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [slide, setSlide] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "form" | "success"
  >("cart");

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    city: "Bhubaneswar",
    pincode: "",
    paymentMethod: "cod",
  });

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Bhubaneswar");
  const [citySearch, setCitySearch] = useState("");

  const filteredCities = useMemo(() => {
    const query = citySearch.trim().toLowerCase();

    if (!query) return indianCities;

    return indianCities.filter((city) =>
      city.toLowerCase().includes(query),
    );
  }, [citySearch]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const cartSubtotal = useMemo(
    () =>
      products.reduce(
        (sum, product) =>
          sum + product.price * (cart[product.id] || 0),
        0,
      ),
    [cart],
  );

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function detectUserLocation() {
    if (!navigator.geolocation) {
      showNotice("Geolocation is not supported by your browser.");
      return;
    }

    showNotice("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
          );

          if (!response.ok) {
            throw new Error("Location lookup failed");
          }

          const data = await response.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.state_district ||
            data.address?.state ||
            "Current Location";

          setCurrentLocation(city);
          setLocationModalOpen(false);
          showNotice(`Delivery location set to ${city}`);
        } catch {
          showNotice("Could not identify your city. Please select it manually.");
        }
      },
      () => showNotice("Location permission denied. Please select a city."),
    );
  }

  function addToCart(product: Product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));

    showNotice(`${product.name} added to your cart.`);
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = { ...current };
      const updated = (next[id] || 0) + amount;

      if (updated <= 0) {
        delete next[id];
      } else {
        next[id] = updated;
      }

      return next;
    });
  }

  function chooseCategory(category: string) {
    setActiveCategory(category);
    setSearch("");

    window.setTimeout(() => {
      const targetId =
        category === "All" ? "bestsellers" : "results-heading";

      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  function handlePlaceOrder() {
    setCheckoutStep("success");
    setCart({});
  }

  const sections = [
    {
      title: "Bestsellers for your health",
      subtitle: "Everyday essentials picked for you",
      id: "bestsellers",
      items: visibleProducts.filter((product) =>
        [3, 4, 5, 7].includes(product.id),
      ),
    },
    {
      title: "Care for the whole family",
      subtitle: "Practical everyday skincare and wellness essentials",
      id: "family-care",
      items: visibleProducts.filter(
        (product) => product.category === "Skin Care",
      ),
    },
  ];

  return (
    <div className="app-shell">
      <Navbar
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setActiveCategory("All");
        }}
        cartCount={cartCount}
        currentLocation={currentLocation}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenCart={() => {
          setCheckoutStep("cart");
          setCartDrawerOpen(true);
        }}
        onOpenDoctors={() => navigate("/doctors")}
      />

      <main id="home">
        <div className="page-container">
          <HeroSlider
            banners={banners}
            slide={slide}
            onSlideChange={setSlide}
            onChooseCategory={chooseCategory}
          />

          <section className="trust-strip">
            <div>
              <ShieldCheck size={23} />
              <span>
                <strong>Quality-focused</strong>
                <small>Carefully selected essentials</small>
              </span>
            </div>

            <div>
              <PackageCheck size={23} />
              <span>
                <strong>Pan-India Delivery</strong>
                <small>Reaching every corner of India</small>
              </span>
            </div>

            <div>
              <Heart size={23} />
              <span>
                <strong>Health comes first</strong>
                <small>Products for everyday wellbeing</small>
              </span>
            </div>
          </section>

          <section className="category-section" id="categories">
            <div className="section-heading">
              <div>
                <h2>Shop by health category</h2>
                <p>Find the essentials you are looking for</p>
              </div>

              <button
                type="button"
                className="text-link"
                onClick={() => chooseCategory("All")}
              >
                View all <ChevronRight size={17} />
              </button>
            </div>

            <div className="category-grid">
              {categories.map(({ name, icon: Icon, color }) => (
                <button
                  type="button"
                  key={name}
                  className={`category-card ${
                    activeCategory === name ? "selected" : ""
                  }`}
                  onClick={() => chooseCategory(name)}
                >
                  <span
                    className="category-icon"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={31} strokeWidth={1.7} />
                  </span>

                  <strong>{name}</strong>

                  <span className="category-arrow">
                    <ChevronRight size={16} />
                  </span>
                </button>
              ))}
            </div>
          </section>

          {(search || activeCategory !== "All") && (
            <section className="search-results" id="results-heading">
              <div className="section-heading">
                <div>
                  <h2>
                    {search
                      ? `Search results for "${search}"`
                      : activeCategory}
                  </h2>
                  <p>
                    {visibleProducts.length} product
                    {visibleProducts.length === 1 ? "" : "s"} found
                  </p>
                </div>

                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters <X size={16} />
                </button>
              </div>

              {visibleProducts.length > 0 ? (
                <div className="filtered-product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={cart[product.id] || 0}
                      onAddToCart={addToCart}
                      onChangeQuantity={changeQuantity}
                      onNotify={showNotice}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-results">
                  <Search size={35} />
                  <h3>No matching products found</h3>
                  <p>Try another product name or category.</p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                  >
                    Browse all products
                  </button>
                </div>
              )}
            </section>
          )}

          {!search &&
            activeCategory === "All" &&
            sections.map((section) => (
              <ProductSection
                key={section.id}
                title={section.title}
                subtitle={section.subtitle}
                items={section.items}
                id={section.id}
                cart={cart}
                onAddToCart={addToCart}
                onChangeQuantity={changeQuantity}
                onNotify={showNotice}
              />
            ))}

          <section className="doctor-banner" id="doctors">
            <div className="doctor-icon">
              <Stethoscope size={48} strokeWidth={1.5} />
            </div>

            <div>
              <span className="eyebrow">YOUR WELLBEING MATTERS</span>
              <h2>Looking for a healthcare professional?</h2>
              <p>
                Explore our doctor directory and discover healthcare
                professionals for your needs.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/doctors")}
            >
              Explore doctors <ChevronRight size={18} />
            </button>
          </section>

          <section className="newsletter">
            <div>
              <h2>Stay informed. Stay well.</h2>
              <p>
                Subscribe to receive iHealthy news and wellness updates.
              </p>
            </div>

            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
                showNotice(
                  "Newsletter demo only. Email subscriptions are not stored yet.",
                );
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </section>
        </div>
      </main>

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        products={products}
        cart={cart}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        checkoutStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        formData={formData}
        setFormData={setFormData}
        onChangeQuantity={changeQuantity}
        onPlaceOrder={handlePlaceOrder}
      />

      {locationModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setLocationModalOpen(false)}
        >
          <div
            className="location-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Choose your delivery location</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setLocationModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <button
                type="button"
                className="detect-location-btn"
                onClick={detectUserLocation}
              >
                <Crosshair size={18} />
                <span>Detect my current location (GPS)</span>
              </button>

              <input
                type="text"
                className="location-search-input"
                placeholder="Search city across India (e.g. Mumbai, Delhi...)"
                value={citySearch}
                onChange={(event) => setCitySearch(event.target.value)}
              />

              <span className="city-list-title">
                Popular Cities across India
              </span>

              <div className="city-grid">
                {filteredCities.map((city) => (
                  <button
                    type="button"
                    key={city}
                    className={`city-chip ${
                      currentLocation === city ? "active" : ""
                    }`}
                    onClick={() => {
                      setCurrentLocation(city);
                      setLocationModalOpen(false);
                      showNotice(`Delivery location set to ${city}`);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
<Footer />
      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setNotice("")}
          >
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
