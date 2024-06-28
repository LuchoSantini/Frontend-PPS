import Navbar from "../../../Navbar/Navbar";
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Table } from "antd";
import ProductsTabs from "./ProductTabs";

function ProductsManagement({ loading, products }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descripcion",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Genero",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Colores",
      dataIndex: "colours",
      key: "colours",
    },
  ];

  const data = products.map((product) => ({
    key: product.id,
    id: product.id,
    description: product.description,
    price: product.price,
    genre: product.genre,
    category: product.categories[0].categoryName,
    status: product.status ? "Disponible" : "No Disponible",
    colours: product.stocks.map((stock) => stock.colour.colourName).join(", "),
  }));

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
            <Link to="/admin/ordenes">
              <IconButton>
                <ArrowBackIos />
              </IconButton>
            </Link>
            <Typography variant="h4" gutterBottom>
              Gestión de Productos
            </Typography>
            <Link to="/admin/usuarios">
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </Link>
          </Box>

          <ProductsTabs />
        </Box>
      </Box>

      <Box>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          loading={loading}
          scroll={{
            x: 1500,
          }}
        />
      </Box>
    </Box>
  );
}

export default ProductsManagement;
