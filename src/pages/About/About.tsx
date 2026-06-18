import React from "react";
import "./About.css";

const VALUES = [
  {
    title: "Formule chiare",
    text: "Ogni prodotto ha attivi riconoscibili, texture piacevoli e istruzioni semplici.",
  },
  {
    title: "Meno sprechi",
    text: "Scegliamo pack ricaricabili, materiali riciclabili e routine senza accumuli inutili.",
  },
  {
    title: "Routine senza ansia",
    text: "PuffLab è per chi vuole prendersi cura di sé senza mille step e senza confusione.",
  },
];

const About: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div>
            <span className="section-kicker">Chi siamo</span>
            <h1>Essenziali beauty per rituali semplici, belli e costanti.</h1>
            <p>
              PuffLab nasce come una piccola mensola beauty di prodotti viso e capelli:
              formule facili da capire, piacevoli da usare e pensate per tutti i giorni.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80"
            alt="Prodotti skincare minimal su un piano bagno luminoso"
          />
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__inner">
          <div className="about-story__intro">
            <span className="section-kicker">Il nostro punto di vista</span>
            <h2>Meno step. Texture migliori. Più costanza.</h2>
          </div>
          <div className="about-story__copy">
            <p>
              Disegniamo prodotti intorno a routine ripetibili: detergi, tratta,
              sigilla e definisci. Ogni formula ha uno scopo chiaro, così puoi
              costruire una mensola beauty che segue davvero pelle e capelli.
            </p>
            <p>
              Il nostro mondo visivo è caldo, tattile e curato perché anche
              l’esperienza del prodotto deve farti venire voglia di usarlo.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container about-values__grid">
          {VALUES.map((value, index) => (
            <article key={value.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{value.title}</h2>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
