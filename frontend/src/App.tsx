import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  ChevronDown,
  ChevronRight,
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
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80",
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
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80",
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
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
  },
];

const categories = [
  { name: "Medicines", icon: Pill, color: "#eaf2ff" },
  { name: "Vitamins & Nutrition", icon: Heart, color: "#fff0e7" },
  { name: "Skin Care", icon: Sparkles, color: "#fcefe8" },
];

const banners = [
  {
    eyebrow: "WELCOME TO IHEALTHY",
    title: "Your health,",
    highlight: "our priority.",
    description:
      "Discover everyday healthcare essentials, wellness products and trusted skin care solutions.",
    button: "Shop health essentials",
    background: "banner-one",
    category: "Skin Care",
  },
  {
    eyebrow: "CARE FOR YOURSELF",
    title: "Wellness starts",
    highlight: "with you.",
    description:
      "Explore personal care, daily wellness essentials and products for the whole family.",
    button: "Explore wellness",
    background: "banner-two",
    category: "Skin Care",
  },
  {
    eyebrow: "EVERYDAY HEALTHCARE",
    title: "Small steps,",
    highlight: "healthier days.",
    description:
      "Find useful nutrition and skincare essentials for your everyday routine.",
    button: "Discover products",
    background: "banner-three",
    category: "Vitamins & Nutrition",
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

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
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
        activeCategory === "All" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

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
        <span>Everyday healthcare, made simpler</span>
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
            onClick={() =>
              setNotice("Location selection will be connected in a later step.")
            }
          >
            <MapPin size={19} />
            <span>
              <small>Deliver to</small>
              <strong>Select location</strong>
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
              const summary = products
                .filter((p) => cart[p.id])
                .map((p) => `${p.name} × ${cart[p.id]}`)
                .join("\n");

              setNotice(
                summary
                  ? `Your cart:\n${summary}\nTotal: ${formatPrice(
                      products.reduce(
                        (sum, p) => sum + p.price * (cart[p.id] || 0),
                        0,
                      ),
                    )}`
                  : "Your cart is empty. Add a product to get started.",
              );
              window.setTimeout(() => setNotice(""), 5000);
            }}
          >
            <ShoppingCart size={22} />
            <span>Cart</span>
            {cartCount > 0 && <b className="cart-count">{cartCount}</b>}
          </button>
        </div>

        <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`}>
          <div className="page-container nav-inner">
            <a href="#home" onClick={() => setMobileMenu(false)}>
              Home
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenu(false)}
            >
              Shop by category
            </a>
            <a
              href="#bestsellers"
              onClick={() => setMobileMenu(false)}
            >
              Health products
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenu(false)}
            >
              Find a doctor
            </a>
            <a href="#footer" onClick={() => setMobileMenu(false)}>
              About us
            </a>
            <span className="nav-promo">
              <BadgePercent size={16} /> Offers
            </span>
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
                onClick={() => chooseCategory(currentBanner.category)}
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
                <strong>Easy shopping</strong>
                <small>Simple, convenient browsing</small>
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
                essentials and convenient healthcare information.
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