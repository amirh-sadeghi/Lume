import React from "react";
import "./BodyContainer.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
  tag?: string;
}

const FEATURED_PRODUCTS: Product[] = [
  { id: 1, name: "Glow Serum", category: "Skincare", price: 38, emoji: "✨", tag: "Bestseller" },
  { id: 2, name: "Silk Hair Mask", category: "Haircare", price: 29, emoji: "🌿", tag: "New" },
  { id: 3, name: "Rose Face Oil", category: "Skincare", price: 45, emoji: "🌸" },
  { id: 4, name: "Curl Cream", category: "Haircare", price: 24, emoji: "💫", tag: "Vegan" },
];

const BodyContainer: React.FC = () => {
  return (
    <div className="body-container">

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero__bg-blob hero__bg-blob--1" />
        <div className="hero__bg-blob hero__bg-blob--2" />
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">✦ Naturale. Giovane. Luminoso.</span>
            <h1 className="hero__title">
              La tua pelle
              <em> merita</em>
              <br />
              il meglio
            </h1>
            <p className="hero__description">
              Prodotti skincare e haircare formulati per la Gen Z.
              Ingredienti puliti, packaging sostenibile, risultati reali.
            </p>
            <div className="hero__actions">
              <a href="/shop" className="btn-primary">
                Scopri i Prodotti
              </a>
              <a href="/about" className="btn-secondary">
                La Nostra Storia
              </a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <strong>10k+</strong>
                <span>Clienti felici</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <strong>100%</strong>
                <span>Cruelty-free</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <strong>Clean</strong>
                <span>Ingredienti</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__visual-card hero__visual-card--main">
              <span className="hero__visual-emoji">🌿</span>
              <p>Glow Collection</p>
              <span className="hero__visual-tag">New Drop</span>
            </div>
            <div className="hero__visual-card hero__visual-card--secondary">
              <span className="hero__visual-emoji">✨</span>
              <p>Vitamin C Serum</p>
            </div>
            <div className="hero__visual-pill">
              <span>🌸</span> Skincare naturale
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Esplora per Categoria</h2>
          <div className="categories__grid">
            <a href="/skincare" className="category-card category-card--skin">
              <span className="category-card__emoji">✨</span>
              <h3>Skincare</h3>
              <p>Sieri, creme, oli</p>
              <span className="category-card__arrow">→</span>
            </a>
            <a href="/haircare" className="category-card category-card--hair">
              <span className="category-card__emoji">💆‍♀️</span>
              <h3>Haircare</h3>
              <p>Maschere, sieri, oli</p>
              <span className="category-card__arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="products">
        <div className="container">
          <div className="products__header">
            <h2 className="section-title">I Più Amati ❤️</h2>
            <a href="/shop" className="products__view-all">Vedi tutti →</a>
          </div>
          <div className="products__grid">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                {product.tag && (
                  <span className="product-card__tag">{product.tag}</span>
                )}
                <div className="product-card__image">
                  <span className="product-card__emoji">{product.emoji}</span>
                </div>
                <div className="product-card__info">
                  <span className="product-card__category">{product.category}</span>
                  <h3 className="product-card__name">{product.name}</h3>
                  <div className="product-card__footer">
                    <span className="product-card__price">€{product.price}</span>
                    <button className="product-card__btn" aria-label={`Aggiungi ${product.name} al carrello`}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANNER ===== */}
      <section className="banner">
        <div className="container banner__inner">
          <div className="banner__text">
            <h2>Inizia il tuo rituale 🌙</h2>
            <p>Ricevi consigli personalizzati per la tua routine beauty.</p>
          </div>
          <a href="/quiz" className="btn-primary">
            Fai il Quiz
          </a>
        </div>
      </section>

    </div>
  );
};

export default BodyContainer;
