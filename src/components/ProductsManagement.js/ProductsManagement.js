import React, { useEffect, useState } from "react";
import PostProducts from "../Products/PostProducts";
import {
  Box,
  Modal,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PostColoursSizesCategories from "../Products/PostColoursSizesCategories";
import EditProducts from "../Products/EditProducts";
import Navbar from "../Navbar/Navbar";
import { Table } from "antd";

import EditProductStatus from "../Products/EditProductStatus";
import DeleteColoursSizesCategories from "../Products/DeleteColoursSizesCategories";

function ProductsManagement({loading, products}) {
  const [openProducts, setOpenProducts] = useState(false);
  const [openCSC, setOpenCSC] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleOpenProducts = () => {
    setOpenProducts(true);
  };

  const handleCloseProducts = () => {
    setOpenProducts(false);
  };

  const handleOpenCSC = () => {
    setOpenCSC(true);
  };

  const handleCloseCSC = () => {
    setOpenCSC(false);
  };

  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Descripcion",
      dataIndex: "description",
    },
    {
      title: "Precio",
      dataIndex: "price",

      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Genero",
      dataIndex: "genre",
    },
    {
      title: "Categoria",
      dataIndex: "category",
    },
    {
      title: "Estado",
      dataIndex: "status",
    },
    {
      title: "Color",
      dataIndex: "colours",
    },
  ];

console.log(products);

  const data = products.map((product) => ({
    id: product.id,
    description: product.description,
    price: product.price,
    genre: product.genre,
    category: product.category,
    status: product.status ? "Disponible" : "No Disponible",
    colours: product.colours.map((colour) => colour.description).join(", "),
  }));

  return (
    <div style={{marginTop:30}}>
      <Box position="relative">
        <Navbar />
        <Box display="flex" style={{ padding: 50 }}>
          <Box display="flex" justifyContent="start">
            <Box
              display="flex"
              justifyContent="left"
              alignItems="center"
              flexDirection="column"
              mb={2}
              pr={5}
            >
              <Typography variant="h6" htmlFor="handleProducts">
                Productos
              </Typography>
              <Button
                id="handleProducts"
                variant="contained"
                onClick={handleOpenProducts}
              >
                Abrir
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="left"
              alignItems="center"
              flexDirection="column"
              mb={2}
            >
              <Typography variant="h6" htmlFor="handleCSC">
                Colores, Talles y Categorías
              </Typography>
              <Button
                id="handleCSC"
                variant="contained"
                onClick={handleOpenCSC}
              >
                Abrir
              </Button>
            </Box>
          </Box>
          <Modal
            open={openProducts}
            onClose={handleCloseProducts}
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
                  <EditProductStatus />
                </Box>
              </Box>
              <Button
                variant="contained"
                position="absolute"
                sx={{
                  right: isMobile ? "-63%" : "-85%",
                }}
                onClick={handleCloseProducts}
              >
                Cerrar
              </Button>
            </Box>
          </Modal>
          <Modal
            open={openCSC}
            onClose={handleCloseCSC}
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
                Manejar Colores, Talles y Categorías
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
                  <PostColoursSizesCategories />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="top"
                  minHeight="60vh"
                  mr={3}
                >
                  <DeleteColoursSizesCategories />
                </Box>
              </Box>
              <Button
                variant="contained"
                position="absolute"
                sx={{
                  right: isMobile ? "-50%" : "-80%",
                }}
                onClick={handleCloseCSC}
              >
                Cerrar
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>

      <div>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          loading={loading}
          scroll={{
            x: 1500,
          }}
        />
      </div>
    </div>
  );
}

export default ProductsManagement;
