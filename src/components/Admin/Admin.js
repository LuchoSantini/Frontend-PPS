import { useState } from "react";
import PostProducts from "../Products/PostProducts";
import { Box, Modal, Button, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import PostColoursSizesCategories from "../Products/PostColoursSizesCategories";
import EditProducts from "../Products/EditProducts";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box position="relative">
      <Navbar />

      <Typography variant="h5" gutterBottom align="center">
        ¡Bienvenido al panel de Administrador #poner nombre del admin#!
      </Typography>
      <Box display="flex">
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          flexDirection="column"
          mb={2}
        >
          <Typography variant="h6" htmlFor="handleProducts">
            Manejar Productos
          </Typography>
          <Button id="handleProducts" variant="contained" onClick={handleOpen}>
            Productos
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "80vw",
              width: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              overflowY: "auto", // Agregar scroll vertical cuando sea necesario
              maxHeight: "80vh", // Establecer altura máxima para evitar que el modal sea demasiado grande
            }}
          >
            <Typography variant="h5" gutterBottom align="center">
              Manejar Productos
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              minHeight="60vh"
              flexDirection={isMobile ? "column" : "row"} // Cambiar flexDirection a column en dispositivos móviles
              ml={isMobile ? 3 : 0}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="top"
                minHeight="60vh"
                mr={3}
              >
                <PostProducts />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="top"
                minHeight="60vh"
                mr={3}
              >
                <EditProducts />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="top"
                minHeight="60vh"
                mr={3}
              >
                <PostColoursSizesCategories />
              </Box>
            </Box>
            <Button
              variant="contained"
              position="absolute"
              sx={{
                right: isMobile ? "-63%" : "-85%",
              }}
              onClick={handleClose}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Admin;
