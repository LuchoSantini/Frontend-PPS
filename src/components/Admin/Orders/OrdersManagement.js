import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Navbar from "../../Navbar/Navbar";

const OrdersManagement = () => {
  return (
    <Box style={{ marginTop: 30 }}>
      <Box position="relative">
        <Navbar />
        <Box display="flex" style={{ padding: 50 }} flexDirection="column">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link to="/admin/usuarios">
              <IconButton>
                <ArrowBackIos />
              </IconButton>
            </Link>
            <Typography variant="h4" gutterBottom>
              Gestión de Ordenes
            </Typography>
            <Link to="/admin/productos">
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersManagement;
