INSERT INTO categories (name, slug, description)
VALUES
  ('Viso', 'viso', 'Detergenti, sieri, oli, creme e trattamenti per una pelle luminosa.'),
  ('Capelli', 'capelli', 'Shampoo, maschere, styling e trattamenti cute per capelli morbidi.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description;

INSERT INTO concerns (name, slug)
VALUES
  ('Pelle spenta', 'pelle-spenta'),
  ('Capelli secchi', 'capelli-secchi'),
  ('Comfort barriera', 'comfort-barriera'),
  ('Definizione ricci', 'definizione-ricci'),
  ('Detersione delicata', 'detersione-delicata'),
  ('Cute sensibile', 'cute-sensibile'),
  ('Idratazione', 'idratazione'),
  ('Finale luminoso', 'finale-luminoso'),
  ('Luce e pori', 'luce-e-pori'),
  ('Protezione quotidiana', 'protezione-quotidiana'),
  ('Imperfezioni', 'imperfezioni'),
  ('Labbra secche', 'labbra-secche'),
  ('Lavaggio delicato', 'lavaggio-delicato'),
  ('Nodi e crespo', 'nodi-e-crespo'),
  ('Punte secche', 'punte-secche'),
  ('Reset cute', 'reset-cute')
ON CONFLICT (slug) DO NOTHING;

WITH product_seed AS (
  SELECT *
  FROM (VALUES
    ('Siero Luce', 'siero-luce', 'Viso', 'Pelle spenta', 'Siero leggero con vitamina C e niacinamide per un incarnato super luminoso.', 3800, 'Più amato', 'gold', true, 'LUME-VISO-SLUCE', 42),
    ('Maschera Seta', 'maschera-seta', 'Capelli', 'Capelli secchi', 'Maschera cremosa con burro di karité e olio di semi di lino.', 2900, 'Novità', 'sage', true, 'LUME-CAP-MSETA', 36),
    ('Olio Rosa', 'olio-rosa', 'Viso', 'Comfort barriera', 'Olio viso setoso con rosa canina e squalane vegetale.', 4500, NULL, 'rose', true, 'LUME-VISO-OROSA', 28),
    ('Crema Ricci', 'crema-ricci', 'Capelli', 'Definizione ricci', 'Crema styling elastica per definire onde e ricci senza appesantire.', 2400, 'Vegana', 'clay', true, 'LUME-CAP-CRICCI', 51),
    ('Detergente Nuvola', 'detergente-nuvola', 'Viso', 'Detersione delicata', 'Detergente morbido a basso pH per mattina, sera e doppia detersione.', 2600, NULL, 'sage', false, 'LUME-VISO-DNUV', 60),
    ('Gocce Cute', 'gocce-cute', 'Capelli', 'Cute sensibile', 'Trattamento cute con prebiotici e menta dolce per radici leggere.', 3200, 'Cura cute', 'gold', false, 'LUME-CAP-GCUTE', 33),
    ('Crema Barriera', 'crema-barriera', 'Viso', 'Idratazione', 'Crema cuscinetto con ceramidi, avena e peptide lenitivo.', 3400, 'Dermotestata', 'clay', false, 'LUME-VISO-CBARR', 45),
    ('Spray Lucentezza', 'spray-lucentezza', 'Capelli', 'Finale luminoso', 'Nebbia lucidante anti-crespo con proteine leggere e profumo pulito.', 2100, NULL, 'rose', false, 'LUME-CAP-SLUC', 58),
    ('Tonico Rugiada', 'tonico-rugiada', 'Viso', 'Luce e pori', 'Tonico idratante con acqua di cetriolo e pantenolo per pelle fresca.', 2300, 'Fresh', 'sage', false, 'LUME-VISO-TRUG', 48),
    ('SPF Velo', 'spf-velo', 'Viso', 'Protezione quotidiana', 'Protezione solare leggera, senza scia bianca, perfetta sotto il make-up.', 3100, 'SPF 50', 'gold', false, 'LUME-VISO-SPF', 40),
    ('Patch SOS', 'patch-sos', 'Viso', 'Imperfezioni', 'Patch trasparenti per imperfezioni, sottili e facili da portare fuori casa.', 1200, NULL, 'rose', false, 'LUME-VISO-PSOS', 90),
    ('Balsamo Labbra Cloud', 'balsamo-labbra-cloud', 'Viso', 'Labbra secche', 'Balsamo labbra morbido con burro di mango e finish lucido naturale.', 1400, 'Pocket', 'clay', false, 'LUME-VISO-BLCLOUD', 75),
    ('Shampoo Latte', 'shampoo-latte', 'Capelli', 'Lavaggio delicato', 'Shampoo cremoso per lavaggi frequenti, con tensioattivi delicati.', 2500, NULL, 'sage', false, 'LUME-CAP-SHLATTE', 52),
    ('Balsamo Onde', 'balsamo-onde', 'Capelli', 'Nodi e crespo', 'Balsamo districante con proteine leggere per lunghezze più morbide.', 2700, 'Soft hair', 'rose', false, 'LUME-CAP-BONDE', 44),
    ('Olio Punte', 'olio-punte', 'Capelli', 'Punte secche', 'Olio leggero per punte secche con argan e camelia, senza effetto unto.', 2800, NULL, 'gold', false, 'LUME-CAP-OPUNTE', 38),
    ('Scrub Cute', 'scrub-cute', 'Capelli', 'Reset cute', 'Scrub pre-shampoo con microgranuli morbidi per cute fresca e leggera.', 3000, NULL, 'clay', false, 'LUME-CAP-SCUTE', 34)
  ) AS seed(name, slug, category_name, concern_name, description, price_cents, tag, accent, is_featured, sku, quantity)
),
upserted_products AS (
  INSERT INTO products (
    category_id,
    concern_id,
    name,
    slug,
    description,
    short_description,
    price_cents,
    tag,
    accent,
    how_to_use,
    ingredients,
    benefits,
    is_featured
  )
  SELECT
    categories.id,
    concerns.id,
    product_seed.name,
    product_seed.slug,
    product_seed.description,
    product_seed.description,
    product_seed.price_cents,
    product_seed.tag,
    product_seed.accent,
    'Usa seguendo le indicazioni della tua routine Lumé.',
    ARRAY['Attivi delicati', 'Texture leggera', 'Profumo pulito'],
    ARRAY['Facile da usare', 'Routine friendly', 'Pack curato'],
    product_seed.is_featured
  FROM product_seed
  JOIN categories ON categories.name = product_seed.category_name
  JOIN concerns ON concerns.name = product_seed.concern_name
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    concern_id = EXCLUDED.concern_id,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    short_description = EXCLUDED.short_description,
    price_cents = EXCLUDED.price_cents,
    tag = EXCLUDED.tag,
    accent = EXCLUDED.accent,
    how_to_use = EXCLUDED.how_to_use,
    ingredients = EXCLUDED.ingredients,
    benefits = EXCLUDED.benefits,
    is_featured = EXCLUDED.is_featured,
    updated_at = now()
  RETURNING id, slug, name
)
INSERT INTO inventory (product_id, sku, quantity)
SELECT upserted_products.id, product_seed.sku, product_seed.quantity
FROM upserted_products
JOIN product_seed ON product_seed.slug = upserted_products.slug
ON CONFLICT (product_id) DO UPDATE SET
  sku = EXCLUDED.sku,
  quantity = EXCLUDED.quantity,
  updated_at = now();

UPDATE product_images
SET image_url = '/api/product-assets/' || products.slug || '.svg',
    alt_text = 'Packshot Lumé di ' || products.name
FROM products
WHERE product_images.product_id = products.id
  AND product_images.is_primary = true;

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT
  products.id,
  '/api/product-assets/' || products.slug || '.svg',
  'Packshot Lumé di ' || products.name,
  0,
  true
FROM products
WHERE NOT EXISTS (
  SELECT 1
  FROM product_images
  WHERE product_images.product_id = products.id
    AND product_images.is_primary = true
);

INSERT INTO newsletter_subscribers (email, source)
VALUES ('ciao@lume.example', 'seed')
ON CONFLICT (email) DO NOTHING;
