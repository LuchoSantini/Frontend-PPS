import React from "react";
import PostProducts from "./PostProducts";
import PostColoursSizes from "./PostColoursAndSizes";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const Admin = () => {
  return (
    <Box position="relative">
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box mr={3}>
          <PostProducts />
        </Box>
        <Box mr={3}>
          <PostColoursSizes />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
