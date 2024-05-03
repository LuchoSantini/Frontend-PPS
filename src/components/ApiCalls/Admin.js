import React from "react";
import PostProducts from "./PostProducts";
import PostColoursSizes from "./PostColoursAndSizes";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const Admin = () => {
  const navigation = useNavigate();

  const homePageClickHandler = () => {
    navigation("/");
  };

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
