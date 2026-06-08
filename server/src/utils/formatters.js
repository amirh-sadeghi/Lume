export const formatPrice = (priceCents, currency = "EUR") => ({
  cents: priceCents,
  amount: priceCents / 100,
  currency,
  formatted: new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
  }).format(priceCents / 100),
});

export const formatProduct = (row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  category: {
    name: row.category_name,
    slug: row.category_slug,
  },
  concern: row.concern_name
    ? {
        name: row.concern_name,
        slug: row.concern_slug,
      }
    : null,
  description: row.description,
  shortDescription: row.short_description,
  price: formatPrice(row.price_cents, row.currency),
  tag: row.tag,
  accent: row.accent,
  skinType: row.skin_type,
  hairType: row.hair_type,
  howToUse: row.how_to_use,
  ingredients: row.ingredients ?? [],
  benefits: row.benefits ?? [],
  isFeatured: row.is_featured,
  inventory: {
    sku: row.sku,
    quantity: Number(row.quantity ?? 0),
    inStock: Number(row.quantity ?? 0) > 0,
  },
  images: row.images ?? [],
});
