import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Navbar from "../../Navbar/Navbar";
import { Table } from "antd";
import UserTabs from "./UserTabs";

function UsersManagement({ users, loading }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Rol",
      dataIndex: "userType",
    },
  ];

  const data = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    userType: user.userType,
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
            <Link to="/admin/productos">
              <IconButton>
                <ArrowBackIos />
              </IconButton>
            </Link>
            <Typography variant="h4" gutterBottom>
              Gestión de Usuarios
            </Typography>
            <Link to="/admin/ordenes">
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </Link>
          </Box>
          <UserTabs />
        </Box>
      </Box>

      <Box>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          scroll={{
            x: 1500,
          }}
          loading={loading}
        />
      </Box>
    </Box>
  );
}

export default UsersManagement;
