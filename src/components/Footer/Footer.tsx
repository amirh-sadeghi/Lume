import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* Placeholder content — da riempire in futuro */}
        <div className="footer__empty">
          <span className="footer__logo">✦ lumé</span>
          <p className="footer__copy">
            © {currentYear} Lumé. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
