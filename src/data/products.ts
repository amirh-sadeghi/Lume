import { createProductImage } from "./imageAssets";

export type ProductCategory = "Viso" | "Capelli";

type ProductPack = "dropper" | "jar" | "tube" | "spray" | "bottle" | "patch" | "balm";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  tag?: string;
  description: string;
  concern: string;
  accent: "rose" | "sage" | "clay" | "gold";
  imageUrl: string;
  imageAlt: string;
  pack: ProductPack;
}

const PRODUCTS_DATA: Omit<Product, "imageUrl" | "imageAlt">[] = [
  {
    id: 1,
    name: "Siero Luce",
    slug: "siero-luce",
    category: "Viso",
    price: 38,
    tag: "Più amato",
    description: "Siero leggero con vitamina C e niacinamide per un incarnato super luminoso.",
    concern: "Pelle spenta",
    accent: "gold",
    pack: "dropper",
  },
  {
    id: 2,
    name: "Maschera Seta",
    slug: "maschera-seta",
    category: "Capelli",
    price: 29,
    tag: "Novità",
    description: "Maschera cremosa con burro di karité e olio di semi di lino.",
    concern: "Capelli secchi",
    accent: "sage",
    pack: "jar",
  },
  {
    id: 3,
    name: "Olio Rosa",
    slug: "olio-rosa",
    category: "Viso",
    price: 45,
    description: "Olio viso setoso con rosa canina e squalane vegetale.",
    concern: "Comfort barriera",
    accent: "rose",
    pack: "dropper",
  },
  {
    id: 4,
    name: "Crema Ricci",
    slug: "crema-ricci",
    category: "Capelli",
    price: 24,
    tag: "Vegana",
    description: "Crema styling elastica per definire onde e ricci senza appesantire.",
    concern: "Definizione ricci",
    accent: "clay",
    pack: "tube",
  },
  {
    id: 5,
    name: "Detergente Nuvola",
    slug: "detergente-nuvola",
    category: "Viso",
    price: 26,
    description: "Detergente morbido a basso pH per mattina, sera e doppia detersione.",
    concern: "Detersione delicata",
    accent: "sage",
    pack: "bottle",
  },
  {
    id: 6,
    name: "Gocce Cute",
    slug: "gocce-cute",
    category: "Capelli",
    price: 32,
    tag: "Cura cute",
    description: "Trattamento cute con prebiotici e menta dolce per radici leggere.",
    concern: "Cute sensibile",
    accent: "gold",
    pack: "dropper",
  },
  {
    id: 7,
    name: "Crema Barriera",
    slug: "crema-barriera",
    category: "Viso",
    price: 34,
    tag: "Dermotestata",
    description: "Crema cuscinetto con ceramidi, avena e peptide lenitivo.",
    concern: "Idratazione",
    accent: "clay",
    pack: "jar",
  },
  {
    id: 8,
    name: "Spray Lucentezza",
    slug: "spray-lucentezza",
    category: "Capelli",
    price: 21,
    description: "Nebbia lucidante anti-crespo con proteine leggere e profumo pulito.",
    concern: "Finale luminoso",
    accent: "rose",
    pack: "spray",
  },
  {
    id: 9,
    name: "Tonico Rugiada",
    slug: "tonico-rugiada",
    category: "Viso",
    price: 23,
    tag: "Fresh",
    description: "Tonico idratante con acqua di cetriolo e pantenolo per pelle fresca.",
    concern: "Luce e pori",
    accent: "sage",
    pack: "bottle",
  },
  {
    id: 10,
    name: "SPF Velo",
    slug: "spf-velo",
    category: "Viso",
    price: 31,
    tag: "SPF 50",
    description: "Protezione solare leggera, senza scia bianca, perfetta sotto il make-up.",
    concern: "Protezione quotidiana",
    accent: "gold",
    pack: "tube",
  },
  {
    id: 11,
    name: "Patch SOS",
    slug: "patch-sos",
    category: "Viso",
    price: 12,
    description: "Patch trasparenti per imperfezioni, sottili e facili da portare fuori casa.",
    concern: "Imperfezioni",
    accent: "rose",
    pack: "patch",
  },
  {
    id: 12,
    name: "Balsamo Labbra Cloud",
    slug: "balsamo-labbra-cloud",
    category: "Viso",
    price: 14,
    tag: "Pocket",
    description: "Balsamo labbra morbido con burro di mango e finish lucido naturale.",
    concern: "Labbra secche",
    accent: "clay",
    pack: "balm",
  },
  {
    id: 13,
    name: "Shampoo Latte",
    slug: "shampoo-latte",
    category: "Capelli",
    price: 25,
    description: "Shampoo cremoso per lavaggi frequenti, con tensioattivi delicati.",
    concern: "Lavaggio delicato",
    accent: "sage",
    pack: "bottle",
  },
  {
    id: 14,
    name: "Balsamo Onde",
    slug: "balsamo-onde",
    category: "Capelli",
    price: 27,
    tag: "Soft hair",
    description: "Balsamo districante con proteine leggere per lunghezze più morbide.",
    concern: "Nodi e crespo",
    accent: "rose",
    pack: "bottle",
  },
  {
    id: 15,
    name: "Olio Punte",
    slug: "olio-punte",
    category: "Capelli",
    price: 28,
    description: "Olio leggero per punte secche con argan e camelia, senza effetto unto.",
    concern: "Punte secche",
    accent: "gold",
    pack: "dropper",
  },
  {
    id: 16,
    name: "Scrub Cute",
    slug: "scrub-cute",
    category: "Capelli",
    price: 30,
    description: "Scrub pre-shampoo con microgranuli morbidi per cute fresca e leggera.",
    concern: "Reset cute",
    accent: "clay",
    pack: "jar",
  },
];

export const PRODUCTS: Product[] = PRODUCTS_DATA.map((product) => ({
  ...product,
  imageUrl: createProductImage({
    name: product.name,
    category: product.category,
    accent: product.accent,
    pack: product.pack,
  }),
  imageAlt: `Packshot Lumé di ${product.name}`,
}));

export const getFeaturedProducts = () => PRODUCTS.slice(0, 4);
