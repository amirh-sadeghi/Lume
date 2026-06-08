import { Router } from "express";
import { query, withTransaction } from "../db/pool.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { badRequest, notFound } from "../utils/httpError.js";
import { formatProduct } from "../utils/formatters.js";

export const catalogRouter = Router();

const productSelect = `
  SELECT
    p.*,
    c.name AS category_name,
    c.slug AS category_slug,
    cn.name AS concern_name,
    cn.slug AS concern_slug,
    inv.sku,
    inv.quantity,
    COALESCE(
      json_agg(
        json_build_object(
          'id', pi.id,
          'url', pi.image_url,
          'alt', pi.alt_text,
          'sortOrder', pi.sort_order,
          'isPrimary', pi.is_primary
        )
        ORDER BY pi.is_primary DESC, pi.sort_order ASC
      ) FILTER (WHERE pi.id IS NOT NULL),
      '[]'::json
    ) AS images
  FROM products p
  JOIN categories c ON c.id = p.category_id
  LEFT JOIN concerns cn ON cn.id = p.concern_id
  LEFT JOIN inventory inv ON inv.product_id = p.id
  LEFT JOIN product_images pi ON pi.product_id = p.id
`;

const productGroup = `
  GROUP BY p.id, c.name, c.slug, cn.name, cn.slug, inv.sku, inv.quantity
`;

catalogRouter.get(
  "/categories",
  asyncHandler(async (_req, res) => {
    const { rows } = await query(`
      SELECT
        c.id,
        c.name,
        c.slug,
        c.description,
        COUNT(p.id)::int AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = true
      GROUP BY c.id
      ORDER BY c.name;
    `);

    res.json({ data: rows });
  }),
);

catalogRouter.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { category, concern, search, featured } = req.query;
    const filters = ["p.is_active = true"];
    const params = [];

    if (category) {
      params.push(String(category).toLowerCase());
      filters.push("(LOWER(c.slug) = $" + params.length + " OR LOWER(c.name) = $" + params.length + ")");
    }

    if (concern) {
      params.push(String(concern).toLowerCase());
      filters.push("(LOWER(cn.slug) = $" + params.length + " OR LOWER(cn.name) = $" + params.length + ")");
    }

    if (search) {
      params.push(`%${String(search).toLowerCase()}%`);
      filters.push(`(
        LOWER(p.name) LIKE $${params.length}
        OR LOWER(p.description) LIKE $${params.length}
        OR LOWER(c.name) LIKE $${params.length}
        OR LOWER(COALESCE(cn.name, '')) LIKE $${params.length}
      )`);
    }

    if (featured === "true") {
      filters.push("p.is_featured = true");
    }

    const { rows } = await query(
      `
        ${productSelect}
        WHERE ${filters.join(" AND ")}
        ${productGroup}
        ORDER BY p.is_featured DESC, p.created_at DESC;
      `,
      params,
    );

    res.json({
      data: rows.map(formatProduct),
      meta: {
        count: rows.length,
      },
    });
  }),
);

catalogRouter.get(
  "/products/:slug",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `
        ${productSelect}
        WHERE p.slug = $1 AND p.is_active = true
        ${productGroup}
        LIMIT 1;
      `,
      [req.params.slug],
    );

    if (!rows[0]) {
      throw notFound("Prodotto non trovato");
    }

    res.json({ data: formatProduct(rows[0]) });
  }),
);

catalogRouter.post(
  "/products",
  asyncHandler(async (req, res) => {
    const {
      name,
      slug,
      categorySlug,
      concernSlug,
      description,
      shortDescription = "",
      priceCents,
      tag = null,
      accent = "rose",
      skinType = null,
      hairType = null,
      howToUse = "",
      ingredients = [],
      benefits = [],
      isFeatured = false,
      sku,
      quantity = 0,
      images = [],
    } = req.body;

    if (!name || !slug || !categorySlug || !description || !priceCents || !sku) {
      throw badRequest("Campi obbligatori mancanti", {
        required: ["name", "slug", "categorySlug", "description", "priceCents", "sku"],
      });
    }

    const product = await withTransaction(async (client) => {
      const category = await client.query("SELECT id FROM categories WHERE slug = $1", [categorySlug]);
      if (!category.rows[0]) {
        throw badRequest("Categoria non valida");
      }

      const concern = concernSlug
        ? await client.query("SELECT id FROM concerns WHERE slug = $1", [concernSlug])
        : { rows: [{ id: null }] };

      if (concernSlug && !concern.rows[0]) {
        throw badRequest("Esigenza non valida");
      }

      const insertedProduct = await client.query(
        `
          INSERT INTO products (
            category_id, concern_id, name, slug, description, short_description,
            price_cents, tag, accent, skin_type, hair_type, how_to_use,
            ingredients, benefits, is_featured
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING id, slug;
        `,
        [
          category.rows[0].id,
          concern.rows[0].id,
          name,
          slug,
          description,
          shortDescription,
          priceCents,
          tag,
          accent,
          skinType,
          hairType,
          howToUse,
          ingredients,
          benefits,
          isFeatured,
        ],
      );

      await client.query(
        "INSERT INTO inventory (product_id, sku, quantity) VALUES ($1, $2, $3)",
        [insertedProduct.rows[0].id, sku, quantity],
      );

      for (const [index, image] of images.entries()) {
        await client.query(
          `
            INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
            VALUES ($1, $2, $3, $4, $5)
          `,
          [
            insertedProduct.rows[0].id,
            image.url,
            image.alt ?? name,
            image.sortOrder ?? index,
            image.isPrimary ?? index === 0,
          ],
        );
      }

      return insertedProduct.rows[0];
    });

    res.status(201).json({ data: product });
  }),
);

catalogRouter.post(
  "/products/:id/images",
  asyncHandler(async (req, res) => {
    const { imageUrl, altText, sortOrder = 0, isPrimary = false } = req.body;

    if (!imageUrl || !altText) {
      throw badRequest("imageUrl e altText sono obbligatori");
    }

    const { rows } = await query(
      `
        INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, image_url, alt_text, sort_order, is_primary;
      `,
      [req.params.id, imageUrl, altText, sortOrder, isPrimary],
    );

    res.status(201).json({ data: rows[0] });
  }),
);
