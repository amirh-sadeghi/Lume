import { Router } from "express";
import { query } from "../db/pool.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { notFound } from "../utils/httpError.js";

export const productAssetsRouter = Router();

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const colorMap = {
  rose: { bg1: "#ffe6dd", bg2: "#f4a7a0", body: "#f8d2ca", cap: "#2c2c2c" },
  sage: { bg1: "#eef8ec", bg2: "#a9c79b", body: "#dcefd8", cap: "#51785c" },
  clay: { bg1: "#f5e2d7", bg2: "#c99072", body: "#f0d4c2", cap: "#6d4939" },
  gold: { bg1: "#fff4cf", bg2: "#e9b95e", body: "#ffe5a3", cap: "#2c2c2c" },
};

const packBySlug = {
  "siero-luce": "dropper",
  "maschera-seta": "jar",
  "olio-rosa": "dropper",
  "crema-ricci": "tube",
  "detergente-nuvola": "bottle",
  "gocce-cute": "dropper",
  "crema-barriera": "jar",
  "spray-lucentezza": "spray",
  "tonico-rugiada": "bottle",
  "spf-velo": "tube",
  "patch-sos": "patch",
  "balsamo-labbra-cloud": "balm",
  "shampoo-latte": "bottle",
  "balsamo-onde": "bottle",
  "olio-punte": "dropper",
  "scrub-cute": "jar",
};

const renderPack = (pack, colors) => {
  if (pack === "jar") {
    return `
      <rect x="96" y="126" width="128" height="86" rx="22" fill="${colors.body}" stroke="#ffffff" stroke-width="5"/>
      <rect x="104" y="106" width="112" height="34" rx="14" fill="${colors.cap}"/>
      <rect x="118" y="154" width="84" height="36" rx="10" fill="#fffaf6" opacity="0.82"/>
    `;
  }

  if (pack === "tube") {
    return `
      <path d="M120 78h80l20 150H100L120 78z" fill="${colors.body}" stroke="#ffffff" stroke-width="5"/>
      <rect x="116" y="214" width="88" height="26" rx="9" fill="${colors.cap}"/>
      <rect x="126" y="132" width="68" height="54" rx="10" fill="#fffaf6" opacity="0.82"/>
    `;
  }

  if (pack === "spray") {
    return `
      <rect x="120" y="84" width="80" height="142" rx="24" fill="${colors.body}" stroke="#ffffff" stroke-width="5"/>
      <rect x="134" y="60" width="52" height="32" rx="12" fill="${colors.cap}"/>
      <rect x="146" y="44" width="28" height="18" rx="5" fill="${colors.cap}"/>
      <rect x="130" y="132" width="60" height="58" rx="10" fill="#fffaf6" opacity="0.82"/>
    `;
  }

  if (pack === "patch") {
    return `
      <rect x="82" y="92" width="156" height="136" rx="28" fill="#fffaf6" stroke="${colors.cap}" stroke-width="4" opacity="0.96"/>
      <circle cx="126" cy="144" r="18" fill="${colors.body}"/>
      <circle cx="178" cy="144" r="18" fill="${colors.body}"/>
      <circle cx="152" cy="186" r="18" fill="${colors.body}"/>
    `;
  }

  if (pack === "balm") {
    return `
      <rect x="98" y="122" width="124" height="54" rx="22" fill="${colors.body}" stroke="#ffffff" stroke-width="5" transform="rotate(-12 160 149)"/>
      <rect x="195" y="112" width="42" height="54" rx="18" fill="${colors.cap}" transform="rotate(-12 216 139)"/>
      <rect x="116" y="132" width="70" height="28" rx="10" fill="#fffaf6" opacity="0.82" transform="rotate(-12 151 146)"/>
    `;
  }

  if (pack === "bottle") {
    return `
      <rect x="108" y="78" width="104" height="152" rx="28" fill="${colors.body}" stroke="#ffffff" stroke-width="5"/>
      <rect x="128" y="52" width="64" height="36" rx="13" fill="${colors.cap}"/>
      <rect x="124" y="132" width="72" height="60" rx="11" fill="#fffaf6" opacity="0.82"/>
    `;
  }

  return `
    <rect x="118" y="78" width="84" height="150" rx="28" fill="${colors.body}" stroke="#ffffff" stroke-width="5"/>
    <rect x="132" y="50" width="56" height="38" rx="15" fill="${colors.cap}"/>
    <rect x="152" y="24" width="16" height="34" rx="8" fill="${colors.cap}"/>
    <rect x="128" y="132" width="64" height="58" rx="10" fill="#fffaf6" opacity="0.82"/>
  `;
};

const renderProductSvg = ({ name, category, accent, slug }) => {
  const safeName = escapeXml(name);
  const safeCategory = escapeXml(category.toUpperCase());
  const colors = colorMap[accent] ?? colorMap.rose;
  const pack = packBySlug[slug] ?? "bottle";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="540" viewBox="0 0 320 260" role="img" aria-label="${safeName}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${colors.bg1}"/>
          <stop offset="1" stop-color="${colors.bg2}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#2c2c2c" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="320" height="260" fill="url(#bg)"/>
      <circle cx="60" cy="54" r="34" fill="#fffaf6" opacity="0.42"/>
      <circle cx="270" cy="200" r="46" fill="#fffaf6" opacity="0.28"/>
      <g filter="url(#shadow)">
        ${renderPack(pack, colors)}
      </g>
      <text x="160" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="800" fill="#2c2c2c" letter-spacing="1.2">${safeCategory}</text>
      <text x="160" y="177" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="700" fill="#2c2c2c">${safeName}</text>
      <text x="160" y="244" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#2c2c2c" opacity="0.62">lumé beauty</text>
    </svg>
  `;
};

productAssetsRouter.get(
  "/product-assets/:slug.svg",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `
        SELECT p.name, p.slug, p.accent, c.name AS category
        FROM products p
        JOIN categories c ON c.id = p.category_id
        WHERE p.slug = $1 AND p.is_active = true
        LIMIT 1;
      `,
      [req.params.slug],
    );

    if (!rows[0]) {
      throw notFound("Immagine prodotto non trovata");
    }

    res.type("image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(renderProductSvg(rows[0]));
  }),
);
