import React from "react";

import Navbar from "../Navbar/Navbar";

import ProductMapped from "../ProductMapped/ProductMapped";
import Filters from "../Filters/Filters";
import { useMediaQuery } from "@mui/material";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <Navbar />
      <Filters isMobile={isMobile} />
      <ProductMapped isMobile={isMobile} />
    </div>
  );
};

export default Home;
