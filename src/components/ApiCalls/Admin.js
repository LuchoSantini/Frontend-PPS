import React from "react";
import PostProducts from "./PostProducts";
import PostColoursSizes from "./PostColoursAndSizes";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Admin = () => {
  const navigation = useNavigate();

  const homePageClickHandler = () => {
    navigation("/");
  };

  return (
    <Box position="relative">
      <Button
        onClick={homePageClickHandler}
        sx={{ position: "absolute", top: 0, right: 0, m: 2 }}
      >
        Home
      </Button>
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
