const encodeSvg = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

type ProductImageOptions = {
  name: string;
  category: string;
  accent: "rose" | "sage" | "clay" | "gold";
  pack: "dropper" | "jar" | "tube" | "spray" | "bottle" | "patch" | "balm";
};

const accentColors = {
  rose: {
    bg1: "#ffe6dd",
    bg2: "#f4a7a0",
    body: "#f8d2ca",
    cap: "#2c2c2c",
  },
  sage: {
    bg1: "#eef8ec",
    bg2: "#a9c79b",
    body: "#dcefd8",
    cap: "#51785c",
  },
  clay: {
    bg1: "#f5e2d7",
    bg2: "#c99072",
    body: "#f0d4c2",
    cap: "#6d4939",
  },
  gold: {
    bg1: "#fff4cf",
    bg2: "#e9b95e",
    body: "#ffe5a3",
    cap: "#2c2c2c",
  },
};

const packMarkup = (pack: ProductImageOptions["pack"], colors: typeof accentColors.rose) => {
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

export const createProductImage = ({ name, category, accent, pack }: ProductImageOptions) => {
  const colors = accentColors[accent];

  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="540" viewBox="0 0 320 260" role="img" aria-label="${name}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${colors.bg1}"/>
          <stop offset="1" stop-color="${colors.bg2}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#2c2c2c" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="320" height="260" rx="0" fill="url(#bg)"/>
      <circle cx="60" cy="54" r="34" fill="#fffaf6" opacity="0.42"/>
      <circle cx="270" cy="200" r="46" fill="#fffaf6" opacity="0.28"/>
      <g filter="url(#shadow)">
        ${packMarkup(pack, colors)}
      </g>
      <text x="160" y="160" text-anchor="middle" font-family="DM Sans, Arial, sans-serif" font-size="10" font-weight="800" fill="#2c2c2c" letter-spacing="1.2">${category.toUpperCase()}</text>
      <text x="160" y="177" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="14" font-weight="700" fill="#2c2c2c">${name}</text>
      <text x="160" y="244" text-anchor="middle" font-family="DM Sans, Arial, sans-serif" font-size="10" font-weight="700" fill="#2c2c2c" opacity="0.62">lumé beauty</text>
    </svg>
  `);
};

export const categoryImages = {
  viso: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520" role="img" aria-label="Prodotti per il viso Lumé">
      <defs>
        <linearGradient id="skinBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff1e8"/>
          <stop offset="1" stop-color="#ffc8bc"/>
        </linearGradient>
      </defs>
      <rect width="900" height="520" fill="url(#skinBg)"/>
      <circle cx="180" cy="110" r="78" fill="#fffaf6" opacity="0.45"/>
      <circle cx="760" cy="420" r="112" fill="#fffaf6" opacity="0.32"/>
      <rect x="315" y="135" width="138" height="255" rx="45" fill="#ffe5a3" stroke="#fffaf6" stroke-width="12"/>
      <rect x="343" y="82" width="82" height="70" rx="24" fill="#2c2c2c"/>
      <rect x="372" y="38" width="24" height="54" rx="12" fill="#2c2c2c"/>
      <rect x="475" y="175" width="150" height="190" rx="42" fill="#f8d2ca" stroke="#fffaf6" stroke-width="12"/>
      <rect x="492" y="140" width="116" height="52" rx="20" fill="#6d4939"/>
      <rect x="338" y="240" width="92" height="72" rx="16" fill="#fffaf6" opacity="0.84"/>
      <rect x="504" y="242" width="92" height="56" rx="16" fill="#fffaf6" opacity="0.84"/>
      <text x="450" y="458" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="48" font-weight="700" fill="#2c2c2c">Viso</text>
    </svg>
  `),
  capelli: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520" role="img" aria-label="Prodotti per capelli Lumé">
      <defs>
        <linearGradient id="hairBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f0f8ed"/>
          <stop offset="1" stop-color="#a9c79b"/>
        </linearGradient>
      </defs>
      <rect width="900" height="520" fill="url(#hairBg)"/>
      <circle cx="710" cy="120" r="88" fill="#fffaf6" opacity="0.4"/>
      <circle cx="160" cy="420" r="120" fill="#fffaf6" opacity="0.28"/>
      <rect x="285" y="110" width="120" height="290" rx="42" fill="#dcefd8" stroke="#fffaf6" stroke-width="12"/>
      <rect x="315" y="62" width="60" height="62" rx="18" fill="#51785c"/>
      <rect x="445" y="160" width="168" height="112" rx="34" fill="#f0d4c2" stroke="#fffaf6" stroke-width="12"/>
      <rect x="461" y="128" width="136" height="48" rx="20" fill="#6d4939"/>
      <path d="M620 350c48-36 60-96 26-134" fill="none" stroke="#51785c" stroke-width="18" stroke-linecap="round"/>
      <path d="M650 362c54-46 72-122 30-174" fill="none" stroke="#51785c" stroke-width="10" stroke-linecap="round" opacity="0.68"/>
      <rect x="306" y="244" width="78" height="70" rx="16" fill="#fffaf6" opacity="0.84"/>
      <rect x="482" y="190" width="92" height="48" rx="14" fill="#fffaf6" opacity="0.84"/>
      <text x="450" y="458" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="48" font-weight="700" fill="#2c2c2c">Capelli</text>
    </svg>
  `),
};
