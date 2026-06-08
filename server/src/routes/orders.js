import { Router } from "express";
import { withTransaction } from "../db/pool.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { badRequest, notFound } from "../utils/httpError.js";
import { formatPrice } from "../utils/formatters.js";

export const ordersRouter = Router();

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(String(email ?? ""));

ordersRouter.post(
  "/orders",
  asyncHandler(async (req, res) => {
    const {
      customer,
      shippingAddress,
      items,
      notes = null,
      shippingCents = 490,
    } = req.body;

    if (!customer?.email || !customer?.firstName || !customer?.lastName) {
      throw badRequest("Cliente incompleto", {
        required: ["customer.email", "customer.firstName", "customer.lastName"],
      });
    }

    if (!isValidEmail(customer.email)) {
      throw badRequest("Email cliente non valida");
    }

    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.postalCode) {
      throw badRequest("Indirizzo di spedizione incompleto");
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw badRequest("L'ordine deve contenere almeno un prodotto");
    }

    const order = await withTransaction(async (client) => {
      const customerResult = await client.query(
        `
          INSERT INTO customers (email, first_name, last_name, phone)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (email) DO UPDATE SET
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            phone = EXCLUDED.phone
          RETURNING id;
        `,
        [
          customer.email.toLowerCase(),
          customer.firstName,
          customer.lastName,
          customer.phone ?? null,
        ],
      );

      const customerId = customerResult.rows[0].id;
      const normalizedItems = [];

      for (const item of items) {
        const quantity = Number(item.quantity ?? 1);
        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw badRequest("Quantità prodotto non valida");
        }

        const productResult = await client.query(
          `
            SELECT p.id, p.name, p.price_cents, inv.quantity AS stock_quantity
            FROM products p
            JOIN inventory inv ON inv.product_id = p.id
            WHERE (p.id::text = $1 OR p.slug = $1) AND p.is_active = true
            FOR UPDATE OF inv;
          `,
          [item.productId ?? item.slug],
        );

        const product = productResult.rows[0];
        if (!product) {
          throw notFound("Uno dei prodotti dell'ordine non esiste");
        }

        if (Number(product.stock_quantity) < quantity) {
          throw badRequest(`Stock insufficiente per ${product.name}`);
        }

        normalizedItems.push({
          productId: product.id,
          productName: product.name,
          unitPriceCents: product.price_cents,
          quantity,
          totalCents: product.price_cents * quantity,
        });
      }

      const subtotalCents = normalizedItems.reduce((total, item) => total + item.totalCents, 0);
      const totalCents = subtotalCents + Number(shippingCents);

      const orderResult = await client.query(
        `
          INSERT INTO orders (
            customer_id, email, subtotal_cents, shipping_cents, total_cents,
            shipping_address, notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, status, created_at;
        `,
        [
          customerId,
          customer.email.toLowerCase(),
          subtotalCents,
          shippingCents,
          totalCents,
          shippingAddress,
          notes,
        ],
      );

      for (const item of normalizedItems) {
        await client.query(
          `
            INSERT INTO order_items (
              order_id, product_id, product_name, unit_price_cents, quantity, total_cents
            )
            VALUES ($1, $2, $3, $4, $5, $6);
          `,
          [
            orderResult.rows[0].id,
            item.productId,
            item.productName,
            item.unitPriceCents,
            item.quantity,
            item.totalCents,
          ],
        );

        await client.query(
          "UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2",
          [item.quantity, item.productId],
        );
      }

      return {
        id: orderResult.rows[0].id,
        status: orderResult.rows[0].status,
        createdAt: orderResult.rows[0].created_at,
        customer: {
          id: customerId,
          email: customer.email.toLowerCase(),
        },
        items: normalizedItems,
        totals: {
          subtotal: formatPrice(subtotalCents),
          shipping: formatPrice(Number(shippingCents)),
          total: formatPrice(totalCents),
        },
      };
    });

    res.status(201).json({ data: order });
  }),
);
