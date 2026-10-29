
import {
  ChevronDown,
  Menu,
  MapPin,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import "./Navbar.css";
import { Link } from "react-router-dom";

type NavbarProps = {
  search: string;
  setSearch: (value: string) => void;
  cartCount: number;
  currentLocation: string;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
  onOpenLocation: () => void;
  onOpenCart: () => void;
  onOpenDoctors: () => void;
};

export default function Navbar({
  search,
  setSearch,
  cartCount,
  currentLocation,
  mobileMenu,
  setMobileMenu,
  onOpenLocation,
  onOpenCart,
  onOpenDoctors,
}: NavbarProps) {
  return (
    <>
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

          <a href="#home" className="brand" aria-label="iHealthy homepage">
            <span className="brand-mark-svg">
              <img
                src="/iHealthy Asset.png"
                alt="iHealthy Logo"
                style={{ height: "95px", width: "auto" }}
              />
            </span>
            <span className="brand-copy">
              <strong>iHealthy</strong>
              <small>YOUR HEALTH, OUR PRIORITY</small>
            </span>
          </a>

          <button className="location-button" onClick={onOpenLocation}>
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
              setMobileMenu(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Search size={20} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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

          <button className="cart-button" onClick={onOpenCart}>
            <ShoppingCart size={22} />
            <span>Cart</span>
            {cartCount > 0 && <b className="cart-count">{cartCount}</b>}
          </button>
        </div>

        <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`}>
          <div className="page-container nav-inner nav-flex-container">
            <div className="nav-left-links">
              <a href="/#home" onClick={() => setMobileMenu(false)}>
                Home
              </a>
              <a href="#categories" onClick={() => setMobileMenu(false)}>
                Shop by category
              </a>
              <a href="#bestsellers" onClick={() => setMobileMenu(false)}>
                Health products
              </a>
              <a
                href="#doctors"
                onClick={(event) => {
                  event.preventDefault();
                  setMobileMenu(false);
                  onOpenDoctors();
                }}
              >
                Find a doctor
              </a>
              {/* <a href="#" onClick={() => setMobileMenu(false)}>
                About us
              </a> */}
              <Link to="/about" onClick={() => setMobileMenu(false)}>
  About us
</Link>
            </div>

            <div className="nav-right-links">
              <a
                href="https://ihealthybio.com/"
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
    </>
  );
}
