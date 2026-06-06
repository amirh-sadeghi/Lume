import React, { useState, useEffect } from "react";
import "./Navbar.css";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Skincare", href: "/skincare" },
  { label: "Haircare", href: "/haircare" },
  { label: "About", href: "/about" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <a href="/" className="navbar__logo" aria-label="Lumé Home">
          <span className="navbar__logo-icon">✦</span>
          <span className="navbar__logo-text">lumé</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar__links" aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar__link">
                  {link.label}
                  <span className="navbar__link-underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button className="navbar__icon-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="navbar__cart-badge">2</span>
          </button>
          <a href="/shop" className="navbar__cta btn-primary">
            Shop Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${isMobileMenuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? "navbar__mobile-menu--open" : ""}`}>
        <nav aria-label="Mobile navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/shop" className="btn-primary navbar__mobile-cta">
          Shop Now
        </a>
      </div>
    </header>
  );
};

export default Navbar;
