import React, { useEffect, useState } from "react";
import "./Navbar.css";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  cartCount: number;
  currentPath: string;
  onNavigate: (href: string) => void;
  onCartOpen: () => void;
}

const NAV_LINKS: NavLink[] = [
  { label: "Negozio", href: "/shop" },
  { label: "Viso", href: "/skincare" },
  { label: "Capelli", href: "/haircare" },
  { label: "Chi siamo", href: "/about" },
  { label: "Contatti", href: "/contact" },
];

const Navbar: React.FC<NavbarProps> = ({ cartCount, currentPath, onNavigate, onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    onNavigate(href);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearch = searchValue.trim();

    onNavigate(trimmedSearch ? `/shop?search=${encodeURIComponent(trimmedSearch)}` : "/shop");
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a href="/" className="navbar__logo" aria-label="Homepage Lumé" onClick={handleNavigate("/")}>
          <span className="navbar__logo-icon" aria-hidden="true">✦</span>
          <span className="navbar__logo-text">PuffLab</span>
        </a>

        <nav className="navbar__links" aria-label="Navigazione principale">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${currentPath === link.href ? "navbar__link--active" : ""}`}
                  onClick={handleNavigate(link.href)}
                >
                  {link.label}
                  <span className="navbar__link-underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <form
            className={`navbar__search ${isSearchOpen ? "navbar__search--open" : ""}`}
            onSubmit={handleSearchSubmit}
          >
            <button
              type="button"
              className="navbar__icon-btn"
              aria-label="Cerca prodotti"
              onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <label className="sr-only" htmlFor="site-search">Cerca prodotti</label>
            <input
              id="site-search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="siero, ricci..."
            />
          </form>

          <button
            type="button"
            className="navbar__icon-btn"
            aria-label={`Carrello con ${cartCount} prodotti`}
            onClick={onCartOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>

          <a href="/shop" className="navbar__cta btn-primary" onClick={handleNavigate("/shop")}>
            Scopri le novità
          </a>
        </div>

        <button
          className={`navbar__hamburger ${isMobileMenuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-label="Apri menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? "navbar__mobile-menu--open" : ""}`}>
        <nav aria-label="Navigazione mobile">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__mobile-link ${currentPath === link.href ? "navbar__mobile-link--active" : ""}`}
                  onClick={handleNavigate(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/shop" className="btn-primary navbar__mobile-cta" onClick={handleNavigate("/shop")}>
          Scopri le novità
        </a>
      </div>
    </header>
  );
};

export default Navbar;
