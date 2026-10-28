import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Crosshair,
  Heart,
  MapPin,
  Menu,
  PackageCheck,
  Pill,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  X,
  CheckCircle2,
} from "lucide-react";
import "./index.css";

type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  mrp: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 3,
    name: "Daily Wellness Multivitamin",
    category: "Vitamins & Nutrition",
    brand: "Daily Wellness",
    description: "Demo wellness product",
    price: 399,
    mrp: 499,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Gentle Face Cleanser",
    category: "Skin Care",
    brand: "Derma Care",
    description: "Gentle daily skincare",
    price: 299,
    mrp: 349,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VF-TmOJmk2UhFWW4dOwsjgpv40nE04EnvrLUalV2fw&s=10",
    badge: "Bestseller",
  },
  {
    id: 5,
    name: "Hydrating Face Moisturizer",
    category: "Skin Care",
    brand: "Derma Care",
    description: "Daily hydration care",
    price: 349,
    mrp: 449,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrfef7fspS7m8OW31fJHhn3TxV5zDUeOtkvK2gL1siAw&s=10",
  },
  {
    id: 7,
    name: "Daily Sunscreen SPF 50",
    category: "Skin Care",
    brand: "Derma Care",
    description: "Everyday sun protection",
    price: 499,
    mrp: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNGSqcWi4NsKik7k7LwmhdGoyBAzpsI0AjNnIr54X0Yg&s=10",
  },
];

const indianCities = [
  "New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", 
  "Kolkata", "Ahmedabad", "Pune", "Jaipur", "Lucknow", 
  "Bhubaneswar", "Patna", "Chandigarh", "Kochi", "Indore", 
  "Bhopal", "Guwahati", "Visakhapatnam", "Surat", "Varanasi",
  "Nagpur", "Coimbatore", "Vadodara", "Ludhiana", "Agra"
];

const categories = [
  { name: "Medicines", icon: Pill, color: "#eaf2ff" },
  { name: "Vitamins & Nutrition", icon: Heart, color: "#fff0e7" },
  { name: "Skin Care", icon: Sparkles, color: "#fcefe8" },
];

const banners = [
  {
    eyebrow: "AI HEALTH SCANNER",
    title: "Scan your health,",
    highlight: "track your vitals.",
    description:
      "Use our advanced facial scanning technology to instantly check your vital health results and wellbeing metrics.",
    button: "Start Health Scan",
    background: "banner-one",
    link: "https://ihealthy-bio.netlify.app/",
    isExternalLink: true,
  },
  {
    eyebrow: "DISCOVER IHEALTHY",
    title: "Know more about",
    highlight: "our facial scan site.",
    description:
      "Explore how our cutting-edge AI technology measures health vitals quickly, safely, and accurately through your device camera.",
    button: "Learn More",
    background: "banner-two",
    link: "https://ihealthy.vercel.app/",
    isExternalLink: true,
  },
  {
    eyebrow: "WELCOME TO IHEALTHY",
    title: "Your health,",
    highlight: "our priority.",
    description:
      "Discover everyday healthcare essentials, wellness products and trusted skin care solutions across India.",
    button: "Shop Health Essentials",
    background: "banner-three",
    category: "Medicines",
  },
  {
    eyebrow: "CARE FOR YOURSELF",
    title: "Wellness starts",
    highlight: "with you.",
    description:
      "Explore personal care, daily wellness essentials and products for the whole family.",
    button: "Explore Wellness",
    background: "banner-one",
    category: "Skin Care",
  },
];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [slide, setSlide] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  
  // Cart & Checkout Drawer States
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Bhubaneswar",
    pincode: "",
    paymentMethod: "cod"
  });

  // Location States
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Bhubaneswar");
  const [citySearch, setCitySearch] = useState("");

  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLowerCase();
    if (!q) return indianCities;
    return indianCities.filter((city) => city.toLowerCase().includes(q));
  }, [citySearch]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const cartSubtotal = useMemo(() => {
    return products.reduce((sum, product) => {
      return sum + product.price * (cart[product.id] || 0);
    }, 0);
  }, [cart]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  function detectUserLocation() {
    if (!navigator.geolocation) {
      setNotice("Geolocation is not supported by your browser");
      return;
    }
    setNotice("Detecting your location...");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.state_district ||
            data.address.state ||
            "Current Location";
          setCurrentLocation(city);
          setLocationModalOpen(false);
          setNotice(`Location set to ${city}`);
          window.setTimeout(() => setNotice(""), 2500);
        } catch {
          setCurrentLocation("Detected Location");
          setLocationModalOpen(false);
          setNotice("Location detected successfully!");
          window.setTimeout(() => setNotice(""), 2500);
        }
      },
      () => {
        setNotice("Unable to retrieve your location. Please select manually.");
      }
    );
  }

  function addToCart(product: Product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
    setNotice(`${product.name} added to your cart`);
    window.setTimeout(() => setNotice(""), 2500);
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
      const targetId = category === "All" ? "bestsellers" : "results-heading";
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  }

  function scrollRow(id: string, direction: "left" | "right") {
    document.getElementById(`${id}-row`)?.scrollBy({
      left: direction === "left" ? -650 : 650,
      behavior: "smooth",
    });
  }

  const currentBanner = banners[slide];

  function ProductCard({ product }: { product: Product }) {
    const quantity = cart[product.id] || 0;
    const discount = Math.round(
      ((product.mrp - product.price) / product.mrp) * 100,
    );

    return (
      <article className="product-card">
        <button
          className="product-image-button"
          aria-label={`View ${product.name}`}
          onClick={() => {
            setNotice(`${product.name} — ${product.description}`);
            window.setTimeout(() => setNotice(""), 3000);
          }}
        >
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
        </button>

        <div className="product-info">
          <p className="product-brand">{product.brand}</p>
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>

          <div className="product-prices">
            <strong>{formatPrice(product.price)}</strong>
            <span className="mrp">{formatPrice(product.mrp)}</span>
            <span className="discount">{discount}% off</span>
          </div>

          {quantity === 0 ? (
            <button
              className="add-button"
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>
          ) : (
            <div className="quantity-control">
              <button
                aria-label="Decrease quantity"
                onClick={() => changeQuantity(product.id, -1)}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => changeQuantity(product.id, 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </article>
    );
  }

  function ProductSection({
    title,
    subtitle,
    items,
    id,
  }: {
    title: string;
    subtitle: string;
    items: Product[];
    id: string;
  }) {
    if (items.length === 0) return null;

    return (
      <section className="product-section" id={id}>
        <div className="section-heading">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="row-controls">
            <button
              aria-label={`Scroll ${title} left`}
              onClick={() => scrollRow(id, "left")}
            >
              <ArrowLeft size={17} />
            </button>
            <button
              aria-label={`Scroll ${title} right`}
              onClick={() => scrollRow(id, "right")}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="product-row" id={`${id}-row`}>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  }

  const sections = [
    {
      title: "Bestsellers for your health",
      subtitle: "Everyday essentials picked for you",
      id: "bestsellers",
      items: visibleProducts.filter((p) => [3, 4, 5, 7].includes(p.id)),
    },
    {
      title: "Care for the whole family",
      subtitle: "Practical everyday skincare and wellness essentials",
      id: "family-care",
      items: visibleProducts.filter((p) => p.category === "Skin Care"),
    },
  ];

  return (
    <div className="app-shell">
      <div className="top-strip">
        <span>Welcome to iHealthy</span>
        <span>Everyday healthcare across India</span>
        <a href="#footer">Need help?</a>
      </div>

      <header className="site-header">
        <div className="header-main page-container">
          <button
            className="mobile-menu-button icon-button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          <a
            href="#home"
            className="brand"
            aria-label="iHealthy homepage"
          >
            <span className="brand-mark-svg">
              <img src="/iHealthy Asset.png" alt="iHealthy Logo" style={{ height: "95px", width: "auto" }} />
            </span>
            <span className="brand-copy">
              <strong>iHealthy</strong>
              <small>YOUR HEALTH, OUR PRIORITY</small>
            </span>
          </a>

          <button
            className="location-button"
            onClick={() => setLocationModalOpen(true)}
          >
            <MapPin size={19} />
            <span>
              <small>Deliver to</small>
              <strong>{currentLocation}</strong>
            </span>
            <ChevronDown size={15} />
          </button>

          <form
            className="search-box"
            onSubmit={(event) => {
              event.preventDefault();
              setActiveCategory("All");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Search size={20} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveCategory("All");
              }}
              placeholder="Search medicines, health products and more"
              aria-label="Search products"
            />
            {search && (
              <button
                type="button"
                className="clear-search"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <X size={17} />
              </button>
            )}
            <button className="search-submit" type="submit">
              Search
            </button>
          </form>

          <button
            className="cart-button"
            onClick={() => {
              setCheckoutStep("cart");
              setCartDrawerOpen(true);
            }}
          >
            <ShoppingCart size={22} />
            <span>Cart</span>
            {cartCount > 0 && <b className="cart-count">{cartCount}</b>}
          </button>
        </div>

        <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`}>
          <div className="page-container nav-inner nav-flex-container">
            <div className="nav-left-links">
              <a href="#home" onClick={() => setMobileMenu(false)}>
                Home
              </a>
              <a href="#categories" onClick={() => setMobileMenu(false)}>
                Shop by category
              </a>
              <a href="#bestsellers" onClick={() => setMobileMenu(false)}>
                Health products
              </a>
              <a href="#doctors" onClick={() => setMobileMenu(false)}>
                Find a doctor
              </a>
              <a href="#footer" onClick={() => setMobileMenu(false)}>
                About us
              </a>
            </div>

            <div className="nav-right-links">
              <a
                href="https://ihealthy-bio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-external-btn"
              >
                Start Health Scan
              </a>
              <a
                href="https://ihealthy.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-external-btn"
              >
                Explore Products
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main id="home">
        <div className="page-container">
          <section className={`hero ${currentBanner.background}`}>
            <div className="hero-copy">
              <span className="eyebrow">{currentBanner.eyebrow}</span>
              <h1>
                {currentBanner.title}
                <br />
                <span>{currentBanner.highlight}</span>
              </h1>
              <p>{currentBanner.description}</p>
              <button
                className="primary-button"
                onClick={() => {
                  if (currentBanner.isExternalLink && currentBanner.link) {
                    window.open(currentBanner.link, "_blank");
                  } else if (currentBanner.category) {
                    chooseCategory(currentBanner.category);
                  }
                }}
              >
                {currentBanner.button} <ChevronRight size={18} />
              </button>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-circle circle-back" />
              <div className="hero-circle circle-front" />
              <div className="hero-symbol">
                <Heart size={92} strokeWidth={1.3} />
                <span>+</span>
              </div>
              <div className="hero-floating floating-one">
                <ShieldCheck size={25} />
                <span>Health first</span>
              </div>
              <div className="hero-floating floating-two">
                <Sparkles size={25} />
                <span>Wellness daily</span>
              </div>
            </div>

            <div className="hero-controls">
              <button
                aria-label="Previous banner"
                onClick={() =>
                  setSlide((current) =>
                    current === 0 ? banners.length - 1 : current - 1,
                  )
                }
              >
                <ArrowLeft size={17} />
              </button>
              {banners.map((banner, index) => (
                <button
                  key={banner.eyebrow}
                  className={`slide-dot ${slide === index ? "active" : ""}`}
                  aria-label={`Show banner ${index + 1}`}
                  onClick={() => setSlide(index)}
                />
              ))}
              <button
                aria-label="Next banner"
                onClick={() =>
                  setSlide((current) => (current + 1) % banners.length)
                }
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </section>

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
                className="text-link"
                onClick={() => chooseCategory("All")}
              >
                View all <ChevronRight size={17} />
              </button>
            </div>

            <div className="category-grid">
              {categories.map(({ name, icon: Icon, color }) => (
                <button
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
                  className="text-link"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters <X size={16} />
                </button>
              </div>

              {visibleProducts.length ? (
                <div className="filtered-product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="empty-results">
                  <Search size={35} />
                  <h3>No matching products found</h3>
                  <p>Try another product name or category.</p>
                  <button
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
                Our doctor directory and appointment booking feature can be
                added as the next stage of your website.
              </p>
            </div>
            <button
              className="primary-button"
              onClick={() =>
                setNotice(
                  "Doctor directory and appointment booking are planned for the next stage.",
                )
              }
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
                setNotice(
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

      {/* Cart & Checkout Slide-Over Drawer / Page Modal */}
      {cartDrawerOpen && (
        <div className="modal-overlay" onClick={() => setCartDrawerOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {checkoutStep === "cart" && `Your Shopping Cart (${cartCount})`}
                {checkoutStep === "form" && "Checkout & Delivery"}
                {checkoutStep === "success" && "Order Successful!"}
              </h3>
              <button
                className="modal-close"
                onClick={() => setCartDrawerOpen(false)}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {checkoutStep === "cart" && (
                <>
                  {cartCount === 0 ? (
                    <div className="empty-cart-state">
                      <ShoppingCart size={48} />
                      <h4>Your cart is empty</h4>
                      <p>Add some health essentials to get started.</p>
                      <button
                        className="primary-button"
                        onClick={() => setCartDrawerOpen(false)}
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="cart-items-list">
                      {products
                        .filter((p) => cart[p.id] > 0)
                        .map((product) => (
                          <div key={product.id} className="cart-item-row">
                            <img src={product.image} alt={product.name} />
                            <div className="cart-item-details">
                              <h4>{product.name}</h4>
                              <span className="cart-item-price">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                            <div className="quantity-control">
                              <button onClick={() => changeQuantity(product.id, -1)}>
                                −
                              </button>
                              <span>{cart[product.id]}</span>
                              <button onClick={() => changeQuantity(product.id, 1)}>
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "form" && (
                <form
                  className="checkout-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutStep("success");
                    setCart({}); // Clear cart on success
                  }}
                >
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Rojalin Rout"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Flat no., Street name"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Pincode</label>
                      <input
                        type="text"
                        required
                        placeholder="751001"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentMethod: e.target.value })
                      }
                    >
                      <option value="cod">Cash on Delivery (COD)</option>
                      <option value="upi">UPI / Google Pay / PhonePe</option>
                      <option value="card">Credit / Debit Card</option>
                    </select>
                  </div>
                  <button type="submit" className="primary-button checkout-submit-btn">
                    Place Order ({formatPrice(cartSubtotal)})
                  </button>
                </form>
              )}

              {checkoutStep === "success" && (
                <div className="order-success-state">
                  <CheckCircle2 size={64} color="#3eb544" />
                  <h3>Order Placed Successfully!</h3>
                  <p>
                    Thank you for shopping with iHealthy. Your health essentials are on the way to <strong>{formData.city}</strong>.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => setCartDrawerOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {checkoutStep === "cart" && cartCount > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-total-row">
                  <span>Subtotal:</span>
                  <strong>{formatPrice(cartSubtotal)}</strong>
                </div>
                <button
                  className="primary-button checkout-btn"
                  onClick={() => setCheckoutStep("form")}
                >
                  Proceed to Checkout <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location Selection Modal */}
      {locationModalOpen && (
        <div className="modal-overlay" onClick={() => setLocationModalOpen(false)}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose your delivery location</h3>
              <button
                className="modal-close"
                onClick={() => setLocationModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <button
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
                onChange={(e) => setCitySearch(e.target.value)}
              />

              <span className="city-list-title">Popular Cities across India</span>

              <div className="city-grid">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    className={`city-chip ${
                      currentLocation === city ? "active" : ""
                    }`}
                    onClick={() => {
                      setCurrentLocation(city);
                      setLocationModalOpen(false);
                      setNotice(`Delivery location set to ${city}`);
                      window.setTimeout(() => setNotice(""), 2500);
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

      <footer className="site-footer" id="footer">
        <div className="page-container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" className="brand">
                <span className="brand-mark-svg">
                  <img src="/iHealthy Asset.png" alt="iHealthy Logo" style={{ height: "95px", width: "auto" }} />
                </span>
                <span className="brand-copy">
                  <strong>iHealthy</strong>
                  <small>YOUR HEALTH, OUR PRIORITY</small>
                </span>
              </a>
              <p>
                Your destination for everyday health products, wellness
                essentials and convenient healthcare information across India.
              </p>
            </div>

            <div className="footer-column">
              <h3>Shop</h3>
              <a href="#categories">Skin care</a>
              <a href="#categories">Vitamins & nutrition</a>
              <a href="#bestsellers">Featured products</a>
            </div>

            <div className="footer-column">
              <h3>iHealthy</h3>
              <a href="#home">About us</a>
              <a href="#doctors">Healthcare professionals</a>
              <a href="#footer">Contact us</a>
              <a href="#footer">Help centre</a>
            </div>

            <div className="footer-column">
              <h3>Customer support</h3>
              <a href="#footer">Shipping policy</a>
              <a href="#footer">Returns & refunds</a>
              <a href="#footer">Privacy policy</a>
              <a href="#footer">Terms & conditions</a>
            </div>
          </div>

          <div className="footer-disclaimer">
            <ShieldCheck size={20} />
            <p>
              <strong>Health information notice:</strong> This initial website
              uses demonstration products and sample content. Product images,
              prices and availability must be verified before launch. This
              website does not currently process real orders or dispense
              medicines.
            </p>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} iHealthy. All rights reserved.</span>
            <span>Built for better everyday health.</span>
          </div>
        </div>
      </footer>

      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button
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

export default App;