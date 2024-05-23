import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { Table } from "antd";

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
    <div>
      <Box position="relative">
        <Navbar />
        <Box display="flex" style={{ padding: 50 }}>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            flexDirection="column"
            mb={2}
          >
            <Typography variant="h6" htmlFor="handleProducts">
              Usuarios
            </Typography>
            <Button
              id="handleProducts"
              variant="contained"
              onClick={handleOpen}
            >
              Usuarios
            </Button>
          </Box>
        </Box>
      </Box>

      <div>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          scroll={{
            x: 1500,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default UsersManagement;
