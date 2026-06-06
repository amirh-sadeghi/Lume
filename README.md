# ✦ Lumé Beauty — Frontend React + TypeScript

E-commerce per prodotti di skincare e haircare, con target giovane.

## 🗂️ Struttura del Progetto

```
beautyshop/
├── index.html                  # Entry point HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                # Bootstrap React
    ├── App.tsx                 # Root component (Navbar + main + Footer)
    ├── App.css                 # Design tokens + stili globali
    │
    ├── components/
    │   ├── Navbar/
    │   │   ├── Navbar.tsx      # Logo, 4 link, icone, CTA
    │   │   ├── Navbar.css
    │   │   └── index.ts
    │   ├── Footer/
    │   │   ├── Footer.tsx      # Footer (vuoto, pronto per espansione)
    │   │   ├── Footer.css
    │   │   └── index.ts
    │   └── BodyContainer/
    │       ├── BodyContainer.tsx  # Hero + Categorie + Prodotti + Banner
    │       ├── BodyContainer.css
    │       └── index.ts
    │
    ├── pages/
    │   ├── Home/Home.tsx
    │   ├── Shop/Shop.tsx
    │   ├── About/About.tsx
    │   └── Contact/Contact.tsx
    │
    └── assets/
        ├── images/             # Immagini prodotti e banner
        ├── icons/              # SVG icons custom
        └── fonts/              # Font locali (se necessario)
```

## 🚀 Come Avviare il Progetto

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server di sviluppo
npm run dev

# 3. Apri il browser su http://localhost:5173
```

## 🧱 Componenti Principali

### `Navbar`
- Logo animato "lumé" con stella rotante
- 4 link di navigazione: Shop, Skincare, Haircare, About
- Icone carrello (con badge) e ricerca
- CTA "Shop Now"
- Menu hamburger per mobile
- Effetto glassmorphism allo scroll

### `Footer`
- Struttura predisposta (vuota)
- Pronta per aggiungere: colonne link, newsletter, social, credits

### `BodyContainer`
- **Hero**: Titolo grande, descrizione, CTA, stats, card animate
- **Categorie**: Skincare e Haircare con link
- **Prodotti in evidenza**: Griglia 4 colonne con card interattive
- **Banner CTA**: Invito al quiz personalizzato

## 🎨 Design System

Il progetto usa **CSS Custom Properties** (variabili CSS) per tutto:

- `--color-rose` → Colore principale brand
- `--font-display` → Playfair Display (serif elegante)
- `--font-body` → DM Sans (moderna e leggibile)
- `--radius-*`, `--space-*`, `--shadow-*` → Spaziature e forme

## 📦 Prossimi Passi

- [ ] Aggiungere React Router per la navigazione tra pagine
- [ ] Completare le pagine Shop, About, Contact
- [ ] Aggiungere uno state manager (Zustand o Context API) per il carrello
- [ ] Completare il Footer con link utili e newsletter
- [ ] Aggiungere immagini reali nella cartella `assets/images/`
