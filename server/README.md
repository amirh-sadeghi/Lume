# Lumé Backend

Backend Node.js + Express + Postgres per il sito Lumé.

## Avvio rapido

1. Copia `.env.example` in `.env` e modifica `DATABASE_URL` se serve.
2. Avvia Postgres:

```bash
docker compose up -d
```

3. Crea schema e dati demo:

```bash
npm run db:migrate
npm run db:seed
```

4. Avvia API:

```bash
npm run dev:api
```

API locale: `http://localhost:4000`

## Endpoint principali

- `GET /api/health`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products?category=viso`
- `GET /api/products?category=capelli`
- `GET /api/products?featured=true`
- `GET /api/products?search=siero`
- `GET /api/products/:slug`
- `POST /api/products`
- `POST /api/products/:id/images`
- `POST /api/newsletter`
- `POST /api/contact`
- `POST /api/orders`

## Esempio ordine

```json
{
  "customer": {
    "email": "cliente@example.com",
    "firstName": "Giulia",
    "lastName": "Rossi",
    "phone": "+39 333 000 0000"
  },
  "shippingAddress": {
    "street": "Via Roma 12",
    "city": "Milano",
    "province": "MI",
    "postalCode": "20100",
    "country": "Italia"
  },
  "items": [
    {
      "slug": "siero-luce",
      "quantity": 1
    }
  ],
  "notes": "Lasciare al portiere se non sono in casa."
}
```

## Foto prodotti

Le foto sono salvate nella tabella `product_images` come URL e vengono restituite dentro ogni prodotto:

```json
{
  "images": [
    {
      "url": "https://images.unsplash.com/...",
      "alt": "Flacone di siero viso Lumé con texture luminosa",
      "isPrimary": true
    }
  ]
}
```

La cartella `server/uploads` è servita su `/uploads` per eventuali immagini locali.
