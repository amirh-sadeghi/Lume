import React from "react";
import BodyContainer from "../../components/BodyContainer/BodyContainer";
import type { Product } from "../../data/products";

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  return <BodyContainer onAddToCart={onAddToCart} />;
};

export default Home;
