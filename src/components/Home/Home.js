import React from "react";
import ProductCard from "../Card/ProductCard";
import Navbar from "../Navbar/Navbar";

const products = [
  {
    id: "01",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_766940-MLA73611188794_122023-O.webp",
    title: "Remera 1",
    price: 25000,
    colors: ["black", "white"],
  },
  {
    id: "02",
    image: "imagestring",
    title: "Remera 2",
    price: 260,
    colors: ["black", "white"],
  },
];

const Home = () => {
  return (
    <div>
      <Navbar />
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          colors={product.colors}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default Home;
