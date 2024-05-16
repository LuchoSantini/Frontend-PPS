import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { AuditOutlined, SkinOutlined, TeamOutlined } from "@ant-design/icons";

const Admin = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box position="relative">
      <Navbar />

      <Typography variant="h5" gutterBottom align="center">
        ¡Bienvenido al panel de Administrador #poner nombre del admin#!
      </Typography>
      <div
        style={{
          display: isMobile ? "grid" : "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 50,
        }}
      >
        <Card style={{ width: 220, alignItems: "center", textAlign: "center" }}>
          <Link to={"/admin/productos"}>
            <SkinOutlined style={{ fontSize: 80 }} />
            <h2>Manejo de Productos</h2>
          </Link>
        </Card>

        <Card style={{ width: 220, alignItems: "center", textAlign: "center" }}>
          <Link to={"/admin/usuarios"}>
            <TeamOutlined style={{ fontSize: 80 }} />
            <h2>Manejo de Usuarios</h2>
          </Link>
        </Card>

        <Card style={{ width: 220, alignItems: "center", textAlign: "center" }}>
          <Link to={"/admin/ordenes"}>
            <AuditOutlined style={{ fontSize: 80 }} />
            <h2>Manejo de Ordenes</h2>
          </Link>
        </Card>
      </div>
    </Box>
  );
};

export default Admin;
