import React, { useState } from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <div>
            <span className="section-kicker">Contatti</span>
            <h1>Vuoi costruire una routine più tua?</h1>
            <p>
              Scrivici per consigli prodotto, supporto ordine o collaborazioni.
              Il team Lum&eacute; risponde durante gli orari dello studio.
            </p>
          </div>
          <div className="contact-card">
            <span>Email</span>
            <a href="mailto:care@lume.example">care@lume.example</a>
            <span>Orari studio</span>
            <strong>Lun - Ven / 9:00 - 18:00</strong>
          </div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container contact-content__inner">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Nome</span>
              <input type="text" name="name" placeholder="Il tuo nome" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              <span>Argomento</span>
              <select name="topic" defaultValue="routine">
                <option value="routine">Consiglio routine</option>
                <option value="order">Supporto ordine</option>
                <option value="wholesale">Collaborazioni e retail</option>
              </select>
            </label>
            <label>
              <span>Messaggio</span>
              <textarea name="message" rows={6} placeholder="Raccontaci cosa stai cercando..." />
            </label>
            <button type="submit" className="btn-primary">
              Invia messaggio
            </button>
            {isSent && (
              <p className="contact-form__success">
                Grazie. Il tuo messaggio è pronto per il team Lum&eacute;.
              </p>
            )}
          </form>

          <aside className="contact-info">
            <article>
              <h2>Consiglio prodotto</h2>
              <p>Condividi la tua routine attuale e ti suggeriamo il prossimo step.</p>
            </article>
            <article>
              <h2>Ordini</h2>
              <p>Inserisci il numero ordine per spedizioni, resi o pacchi danneggiati.</p>
            </article>
            <article>
              <h2>Retail</h2>
              <p>Per concept store e studio beauty, inviaci città e dettagli del progetto.</p>
            </article>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
