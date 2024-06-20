import React from "react";

import Navbar from "../Navbar/Navbar";

import ProductMapped from "./Products/ProductMapped/ProductMapped";

import { useMediaQuery } from "@mui/material";

const Home = ({ products }) => {
  console.log(products);
  const isMobile = useMediaQuery("(max-width:632px)");
  return (
    <div>
      <Navbar products={products} />
      <ProductMapped isMobile={isMobile} />
    </div>
  );
};

export default Home;
