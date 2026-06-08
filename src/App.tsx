import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import type { Product, ProductCategory } from "./data/products";
import "./App.css";

interface CartLine {
  product: Product;
  quantity: number;
}

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  notes: string;
}

const initialCheckoutForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Italia",
  notes: "",
};

const API_BASE_URL = "http://localhost:4000";

const App: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState(() => window.location.pathname + window.location.search);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>(initialCheckoutForm);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string>("");
  const [orderSuccess, setOrderSuccess] = useState<string>("");
  const [cartNotice, setCartNotice] = useState<{ title: string; text: string } | null>(null);

  const navigate = useCallback((href: string) => {
    window.history.pushState({}, "", href);
    setCurrentUrl(window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor || anchor.target === "_blank") {
        return;
      }

      const url = new URL(anchor.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [navigate]);

  useEffect(() => {
    if (!cartNotice) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCartNotice(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [cartNotice]);

  const handleAddToCart = (product: Product) => {
    setCartLines((lines) => {
      const existingLine = lines.find((line) => line.product.id === product.id);

      if (existingLine) {
        return lines.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [...lines, { product, quantity: 1 }];
    });

    setCartNotice({ title: product.name, text: "aggiunto al carrello" });
  };

  const handleRemoveCartLine = (productId: number) => {
    setCartLines((lines) => lines.filter((line) => line.product.id !== productId));
  };

  const handleIncrementCartLine = (product: Product) => {
    setCartLines((lines) =>
      lines.map((line) =>
        line.product.id === product.id
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      ),
    );
  };

  const handleDecrementCartLine = (productId: number) => {
    setCartLines((lines) =>
      lines.flatMap((line) => {
        if (line.product.id !== productId) {
          return [line];
        }

        if (line.quantity <= 1) {
          return [];
        }

        return [{ ...line, quantity: line.quantity - 1 }];
      }),
    );
  };

  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0);

  const cartSubtotal = cartLines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  const handleCheckout = () => {
    if (cartLines.length === 0) {
      setCartNotice({ title: "Carrello vuoto", text: "aggiungi un prodotto prima del checkout" });
      return;
    }

    setCheckoutError("");
    setOrderSuccess("");
    setIsCheckoutOpen(true);
  };

  const handleCheckoutChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCheckoutForm((form) => ({ ...form, [name]: value }));
  };

  const handleOrderSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutError("");
    setOrderSuccess("");

    if (!checkoutForm.firstName || !checkoutForm.lastName || !checkoutForm.email || !checkoutForm.street || !checkoutForm.city || !checkoutForm.postalCode) {
      setCheckoutError("Compila nome, cognome, email e indirizzo di spedizione.");
      return;
    }

    setIsSubmittingOrder(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            firstName: checkoutForm.firstName,
            lastName: checkoutForm.lastName,
            email: checkoutForm.email,
            phone: checkoutForm.phone || undefined,
          },
          shippingAddress: {
            street: checkoutForm.street,
            city: checkoutForm.city,
            province: checkoutForm.province || undefined,
            postalCode: checkoutForm.postalCode,
            country: checkoutForm.country || "Italia",
          },
          items: cartLines.map((line) => ({
            slug: line.product.slug,
            quantity: line.quantity,
          })),
          notes: checkoutForm.notes || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error?.message ?? "Non siamo riusciti a creare l'ordine.");
      }

      setOrderSuccess(`Ordine creato: ${result.data.id}`);
      setCartLines([]);
      setCheckoutForm(initialCheckoutForm);
      setIsCheckoutOpen(false);
      setCartNotice({ title: "Ordine inviato", text: "salvato nel database" });
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Errore durante il checkout. Controlla che backend e database siano attivi.",
      );
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const path = useMemo(() => currentUrl.split("?")[0], [currentUrl]);
  const query = useMemo(() => currentUrl.split("?")[1] ?? "", [currentUrl]);

  const categoryFromPath: ProductCategory | undefined =
    path === "/skincare" ? "Viso" : path === "/haircare" ? "Capelli" : undefined;

  const page = (() => {
    if (path === "/shop" || categoryFromPath) {
      return (
        <Shop
          initialCategory={categoryFromPath}
          initialSearch={new URLSearchParams(query).get("search") ?? ""}
          onAddToCart={handleAddToCart}
        />
      );
    }

    if (path === "/about") {
      return <About />;
    }

    if (path === "/contact") {
      return <Contact />;
    }

    return <Home onAddToCart={handleAddToCart} />;
  })();

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        currentPath={path}
        onNavigate={navigate}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <main className="main-content">
        {page}
      </main>
      <Footer onNavigate={navigate} />

      <div className={`cart-toast ${cartNotice ? "cart-toast--show" : ""}`} role="status">
        {cartNotice && (
          <>
            <strong>{cartNotice.title}</strong>
            <span>{cartNotice.text}</span>
          </>
        )}
      </div>

      <div
        className={`cart-overlay ${isCartOpen ? "cart-overlay--open" : ""}`}
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(false);
        }}
        aria-hidden={!isCartOpen}
      />

      <aside className={`cart-drawer ${isCartOpen ? "cart-drawer--open" : ""}`} aria-label="Carrello">
        <div className="cart-drawer__header">
          <div>
            <span>{isCheckoutOpen ? "Checkout" : "Il tuo carrello"}</span>
            <h2>{cartCount} prodotti</h2>
          </div>
          <button
            type="button"
            aria-label="Chiudi carrello"
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(false);
            }}
          >
            x
          </button>
        </div>

        {cartLines.length > 0 ? (
          isCheckoutOpen ? (
            <form className="checkout-form" onSubmit={handleOrderSubmit}>
              <div className="checkout-form__intro">
                <button type="button" onClick={() => setIsCheckoutOpen(false)}>
                  Torna al carrello
                </button>
                <h3>Dati per la spedizione</h3>
                <p>Completa i campi per salvare l'ordine nel backend.</p>
              </div>

              <div className="checkout-form__grid">
                <label>
                  <span>Nome</span>
                  <input name="firstName" value={checkoutForm.firstName} onChange={handleCheckoutChange} autoComplete="given-name" required />
                </label>
                <label>
                  <span>Cognome</span>
                  <input name="lastName" value={checkoutForm.lastName} onChange={handleCheckoutChange} autoComplete="family-name" required />
                </label>
              </div>

              <label>
                <span>Email</span>
                <input type="email" name="email" value={checkoutForm.email} onChange={handleCheckoutChange} autoComplete="email" required />
              </label>

              <label>
                <span>Telefono</span>
                <input type="tel" name="phone" value={checkoutForm.phone} onChange={handleCheckoutChange} autoComplete="tel" />
              </label>

              <label>
                <span>Indirizzo</span>
                <input name="street" value={checkoutForm.street} onChange={handleCheckoutChange} autoComplete="street-address" required />
              </label>

              <div className="checkout-form__grid">
                <label>
                  <span>Citta</span>
                  <input name="city" value={checkoutForm.city} onChange={handleCheckoutChange} autoComplete="address-level2" required />
                </label>
                <label>
                  <span>CAP</span>
                  <input name="postalCode" value={checkoutForm.postalCode} onChange={handleCheckoutChange} autoComplete="postal-code" required />
                </label>
              </div>

              <div className="checkout-form__grid">
                <label>
                  <span>Provincia</span>
                  <input name="province" value={checkoutForm.province} onChange={handleCheckoutChange} autoComplete="address-level1" />
                </label>
                <label>
                  <span>Paese</span>
                  <input name="country" value={checkoutForm.country} onChange={handleCheckoutChange} autoComplete="country-name" required />
                </label>
              </div>

              <label>
                <span>Note</span>
                <textarea name="notes" rows={3} value={checkoutForm.notes} onChange={handleCheckoutChange} />
              </label>

              <div className="checkout-form__total">
                <span>Totale prodotti</span>
                <strong>&euro;{cartSubtotal}</strong>
              </div>

              {checkoutError && <p className="checkout-form__error">{checkoutError}</p>}
              {orderSuccess && <p className="checkout-form__success">{orderSuccess}</p>}

              <button type="submit" className="btn-primary" disabled={isSubmittingOrder}>
                {isSubmittingOrder ? "Invio in corso..." : "Conferma ordine"}
              </button>
            </form>
          ) : (
            <>
              <div className="cart-drawer__items">
                {cartLines.map(({ product, quantity }) => (
                  <article key={product.id} className="cart-line">
                    <img src={product.imageUrl} alt={product.imageAlt} />
                    <div>
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>
                      <div className="cart-line__quantity" aria-label={`Quantita ${product.name}`}>
                        <button
                          type="button"
                          aria-label={`Diminuisci quantita ${product.name}`}
                          onClick={() => handleDecrementCartLine(product.id)}
                        >
                          -
                        </button>
                        <strong>{quantity}</strong>
                        <button
                          type="button"
                          aria-label={`Aumenta quantita ${product.name}`}
                          onClick={() => handleIncrementCartLine(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-line__side">
                      <strong>&euro;{product.price * quantity}</strong>
                      <button type="button" onClick={() => handleRemoveCartLine(product.id)}>
                        Rimuovi
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-drawer__footer">
                <div>
                  <span>Subtotale</span>
                  <strong>&euro;{cartSubtotal}</strong>
                </div>
                <button type="button" className="btn-primary" onClick={handleCheckout}>
                  Procedi al checkout
                </button>
                <button type="button" className="cart-drawer__clear" onClick={() => setCartLines([])}>
                  Svuota carrello
                </button>
              </div>
            </>
          )
        ) : (
          <div className="cart-drawer__empty">
            <h3>Il carrello e vuoto</h3>
            <p>Aggiungi un prodotto dalla pagina negozio per iniziare.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/shop");
              }}
            >
              Vai al negozio
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default App;
