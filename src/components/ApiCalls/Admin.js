import React from "react";
import PostProducts from "./PostProducts";
import PostColoursSizes from "./PostColoursAndSizes";
import { Box } from "@mui/material";

const Admin = () => {
  return (
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
  );
};

export default Admin;
