import React from "react";

import Navbar from "../Navbar/Navbar";

import ProductMapped from "../ProductMapped/ProductMapped";

import { useMediaQuery } from "@mui/material";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <Navbar />
      <ProductMapped isMobile={isMobile} />
    </div>
  );
};

export default Home;
