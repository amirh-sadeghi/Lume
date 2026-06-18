import React, { useState } from "react";
import "./Footer.css";

interface FooterProps {
  onNavigate: (href: string) => void;
}

const SHOP_LINKS = [
  { label: "Tutti i prodotti", href: "/shop" },
  { label: "Viso", href: "/skincare" },
  { label: "Capelli", href: "/haircare" },
];

const COMPANY_LINKS = [
  { label: "Chi siamo", href: "/about" },
  { label: "Contatti", href: "/contact" },
];

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const [isJoined, setIsJoined] = useState<boolean>(false);

  const handleNavigate = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <a href="/" className="footer__logo" onClick={handleNavigate("/")}>
            <span aria-hidden="true">✦</span> PuffLab
          </a>
          <p>
            Essenziali puliti per viso e capelli, pensati per routine piccole ma molto belle.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Link negozio nel footer">
          <h2>Negozio</h2>
          {SHOP_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavigate(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer__nav" aria-label="Link brand nel footer">
          <h2>Brand</h2>
          {COMPANY_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavigate(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <form
          className="footer__newsletter"
          onSubmit={(event) => {
            event.preventDefault();
            setIsJoined(true);
          }}
        >
          <h2>Note di routine</h2>
          <p>Novità mensili, consigli beauty e promemoria ricarica senza spam.</p>
          <div>
            <label className="sr-only" htmlFor="newsletter-email">Indirizzo email</label>
            <input id="newsletter-email" type="email" placeholder="you@example.com" />
            <button type="submit">Entra</button>
          </div>
          {isJoined && <small>Grazie. Sei nella lista PuffLab.</small>}
        </form>
      </div>

      <div className="footer__bottom container">
        <p>&copy; {currentYear} PuffLab. Tutti i diritti riservati.</p>
        <span>Creato per mensole curate e routine più leggere.</span>
      </div>
    </footer>
  );
};

export default Footer;
