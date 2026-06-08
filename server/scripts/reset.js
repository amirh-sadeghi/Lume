import { pool } from "../src/db/pool.js";

const run = async () => {
  await pool.query(`
    TRUNCATE TABLE
      order_items,
      orders,
      cart_items,
      carts,
      addresses,
      customers,
      product_reviews,
      product_images,
      inventory,
      products,
      concerns,
      categories,
      newsletter_subscribers,
      contact_messages
    RESTART IDENTITY CASCADE;
  `);

  console.log("Database svuotato.");
};

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
