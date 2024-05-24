import * as React from "react";
import { Tab, Button, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Modal } from "antd";

const UserTabs = () => {
  const [value, setValue] = React.useState("1");
  const [openModal, setOpenModal] = React.useState({
    postUsers: false,
    editUsers: false,
    editUserStatus: false,
    postRoles: false,
    changeStatusRoles: false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (modalName) => {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  const handleCloseModal = (modalName) => {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Usuarios" value="1" />
            <Tab label="Roles" value="2" />
            <Tab label="Tab" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("postUsers")}
            sx={{ mt: 2, mr: 5 }}
          >
            Agregar
          </Button>
          <Modal
            open={openModal.postUsers}
            onCancel={() => handleCloseModal("postUsers")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
            }}
          ></Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("editUsers")}
            sx={{ mt: 2, mr: 5 }}
          >
            Editar
          </Button>
          <Modal
            open={openModal.editUsers}
            onCancel={() => handleCloseModal("editUsers")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("editUserStatus")}
            sx={{ mt: 2 }}
          >
            Cambiar estado
          </Button>
          <Modal
            open={openModal.editUserStatus}
            onCancel={() => handleCloseModal("editUserStatus")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Modal>
        </TabPanel>
        <TabPanel value="2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("postRoles")}
            sx={{ mt: 2, mr: 5 }}
          >
            Agregar
          </Button>
          <Modal
            open={openModal.postRoles}
            onCancel={() => handleCloseModal("postRoles")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("changeStatusRoles")}
            sx={{ mt: 2, mr: 5 }}
          >
            Cambiar Rol
          </Button>
          <Modal
            open={openModal.changeStatusRoles}
            onCancel={() => handleCloseModal("changeStatusRoles")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Modal>
        </TabPanel>

        <TabPanel value="3">Tab</TabPanel>
      </TabContext>
    </Box>
  );
};

export default UserTabs;
