import React from "react";

import Navbar from "../Navbar/Navbar";

import ProductMapped from "./Products/ProductMapped/ProductMapped";

import { useMediaQuery } from "@mui/material";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:632px)");
  return (
    <div>
      <Navbar />
      <ProductMapped isMobile={isMobile} />
    </div>
  );
};

export default Home;
