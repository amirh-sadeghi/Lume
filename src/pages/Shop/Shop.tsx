import React, { useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product, type ProductCategory } from "../../data/products";
import "./Shop.css";

interface ShopProps {
  initialCategory?: ProductCategory;
  initialSearch?: string;
  onAddToCart: (product: Product) => void;
}

type CategoryFilter = "Tutti" | ProductCategory;

const CONCERNS = ["Tutti", ...Array.from(new Set(PRODUCTS.map((product) => product.concern)))] as const;

const Shop: React.FC<ShopProps> = ({ initialCategory, initialSearch = "", onAddToCart }) => {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory ?? "Tutti");
  const [concern, setConcern] = useState<string>("Tutti");
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    setCategory(initialCategory ?? "Tutti");
    setSearch(initialSearch);
  }, [initialCategory, initialSearch]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory = category === "Tutti" || product.category === category;
      const matchesConcern = concern === "Tutti" || product.concern === concern;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesConcern && matchesSearch;
    });
  }, [category, concern, search]);

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="container shop-hero__inner">
          <div>
            <span className="section-kicker">La mensola completa</span>
            <h1>{category === "Tutti" ? <>Tutto PuffLab</> : `Essenziali ${category.toLowerCase()}`}</h1>
            <p>
              Scopri formule per categoria, esigenza o texture. Ogni prodotto è pensato
              per essere facile da usare, bello da tenere in vista e semplice da combinare.
            </p>
          </div>
          <div className="shop-hero__panel" aria-label="Riepilogo negozio">
            <span>Routine edit</span>
            <strong>Viso + Capelli</strong>
            <small>Scegli per esigenza, texture o momento della giornata.</small>
          </div>
        </div>
      </section>

      <section className="shop-controls">
        <div className="container shop-controls__inner">
          <label className="shop-search">
            <span>Cerca</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Prova: luce, cute, crema..."
            />
          </label>

          <div className="shop-filter" aria-label="Filtro categoria">
            {(["Tutti", "Viso", "Capelli"] as CategoryFilter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                className={category === filter ? "shop-filter__button shop-filter__button--active" : "shop-filter__button"}
                onClick={() => setCategory(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="shop-select">
            <span>Esigenza</span>
            <select value={concern} onChange={(event) => setConcern(event.target.value)}>
              {CONCERNS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="shop-list">
        <div className="container">
          <div className="shop-list__header">
            <p>{filteredProducts.length} prodotti trovati</p>
            <button
              type="button"
              className="shop-list__reset"
              onClick={() => {
                setCategory("Tutti");
                setConcern("Tutti");
                setSearch("");
              }}
            >
              Azzera filtri
            </button>
          </div>

          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="shop-product">
                {product.tag && <span className="shop-product__tag">{product.tag}</span>}
                <div className={`shop-product__visual shop-product__visual--${product.accent}`}>
                  <img src={product.imageUrl} alt={product.imageAlt} />
                </div>
                <div className="shop-product__content">
                  <div>
                    <span className="shop-product__meta">{product.category} / {product.concern}</span>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>
                  <div className="shop-product__footer">
                    <strong>&euro;{product.price}</strong>
                    <button type="button" className="btn-primary" onClick={() => onAddToCart(product)}>
                      Aggiungi
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
