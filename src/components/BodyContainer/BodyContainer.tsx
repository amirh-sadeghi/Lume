import React from "react";
import { getFeaturedProducts, type Product } from "../../data/products";
import { categoryImages } from "../../data/imageAssets";
import "./BodyContainer.css";

interface BodyContainerProps {
  onAddToCart: (product: Product) => void;
}

const FEATURED_PRODUCTS = getFeaturedProducts();

const BodyContainer: React.FC<BodyContainerProps> = ({ onAddToCart }) => {
  return (
    <div className="body-container">
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">Beauty pulita per rituali veri</span>
            <h1 className="hero__title">
              Luce fresca, capelli morbidi, zero complicazioni.
            </h1>
            <p className="hero__description">
              Formule viso e capelli con attivi gentili, texture leggere e pack
              sostenibili. Per una routine bella da vedere e facile da amare.
            </p>
            <div className="hero__actions">
              <a href="/shop" className="btn-primary">
                Scopri la collezione
              </a>
              <a href="/about" className="btn-secondary">
                Conosci Lum&eacute;
              </a>
            </div>
            <div className="hero__stats" aria-label="Punti forti del brand">
              <div className="hero__stat">
                <strong>10k+</strong>
                <span>routine felici</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <strong>100%</strong>
                <span>cruelty-free</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <strong>16</strong>
                <span>prodotti base</span>
              </div>
            </div>
          </div>

          <div className="hero__visual" aria-label="Prodotti Lumé per viso e capelli">
            <img
              className="hero__image"
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80"
              alt="Flaconi e creme skincare su una superficie calda"
            />
            <div className="hero__floating-card">
                <span>Nuovo lancio</span>
              <strong>Crema Barriera</strong>
              <small>Ceramidi + avena lenitiva</small>
            </div>
          </div>
        </div>
      </section>

      <section className="categories" aria-labelledby="category-title">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Scegli il tuo mood</span>
            <h2 id="category-title" className="section-title">Compra per categoria</h2>
          </div>
          <div className="categories__grid">
            <a href="/skincare" className="category-card category-card--skin">
              <img className="category-card__image" src={categoryImages.viso} alt="Prodotti Lumé per il viso" />
              <span className="category-card__label">Viso</span>
              <h3>Luce, idratazione, barriera felice</h3>
              <p>Sieri, oli, creme e detergenti per una pelle fresca e luminosa.</p>
              <span className="category-card__arrow">Esplora</span>
            </a>
            <a href="/haircare" className="category-card category-card--hair">
              <img className="category-card__image" src={categoryImages.capelli} alt="Prodotti Lumé per capelli" />
              <span className="category-card__label">Capelli</span>
              <h3>Morbidezza dalle radici alle punte</h3>
              <p>Maschere, creme ricci, gocce cute e spray lucidanti anti-crespo.</p>
              <span className="category-card__arrow">Esplora</span>
            </a>
          </div>
        </div>
      </section>

      <section className="products" aria-labelledby="featured-title">
        <div className="container">
          <div className="products__header">
            <div>
              <span className="section-kicker">Parti da qui</span>
              <h2 id="featured-title" className="section-title">I più desiderati</h2>
            </div>
            <a href="/shop" className="products__view-all">Vedi tutti i prodotti</a>
          </div>
          <div className="products__grid">
            {FEATURED_PRODUCTS.map((product) => (
              <article key={product.id} className="product-card">
                {product.tag && <span className="product-card__tag">{product.tag}</span>}
                <div className={`product-card__image product-card__image--${product.accent}`}>
                  <img src={product.imageUrl} alt={product.imageAlt} />
                </div>
                <div className="product-card__info">
                  <span className="product-card__category">{product.category}</span>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__footer">
                    <span className="product-card__price">&euro;{product.price}</span>
                    <button
                      className="product-card__btn"
                      type="button"
                      aria-label={`Aggiungi ${product.name} al carrello`}
                      onClick={() => onAddToCart(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="routine">
        <div className="container routine__inner">
          <div>
            <span className="section-kicker">Rituale base in 3 passaggi</span>
            <h2 className="section-title">Una routine che sta nelle mattine vere.</h2>
          </div>
          <div className="routine__steps">
            <article>
              <span>01</span>
              <h3>Detergi</h3>
              <p>Inizia con una detersione morbida che lascia la pelle comoda.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Tratta</h3>
              <p>Scegli un attivo mirato per glow, barriera o cute più equilibrata.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Sigilla</h3>
              <p>Chiudi con crema, olio o spray lucentezza per un finish curato.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="banner">
        <div className="container banner__inner">
          <div className="banner__text">
            <h2>Crea la tua prima mensola Lum&eacute;.</h2>
            <p>Filtra per viso, capelli e bisogno della tua routine.</p>
          </div>
          <a href="/shop" className="btn-primary">
            Inizia ora
          </a>
        </div>
      </section>
    </div>
  );
};

export default BodyContainer;
