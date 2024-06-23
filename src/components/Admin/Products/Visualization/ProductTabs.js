import * as React from "react";
import { Tab, Button, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Modal } from "antd";

import PostProducts from "../Products ABM/PostProducts";
import EditProducts from "../Products ABM/EditProducts";
import EditProductStatus from "../Products ABM/EditProductStatus";
import PostColoursSizesCategories from "../CSC ABM/PostColoursSizesCategories";
import ChangeStatusCSC from "../CSC ABM/ChangeStatusCSC";

const ProductsTabs = () => {
  const [value, setValue] = React.useState("1");
  const [openModal, setOpenModal] = React.useState({
    postProducts: false,
    editProducts: false,
    editProductStatus: false,
    postColoursSizesCategories: false,
    changeStatusColoursSizesCategories: false,
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
            <Tab label="Productos" value="1" />
            <Tab label="Colores, Talles y Categorias" value="2" />
            <Tab label="Tab" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("postProducts")}
            sx={{ mt: 2, mr: 5 }}
          >
            Agregar
          </Button>
          <Modal
            open={openModal.postProducts}
            onCancel={() => handleCloseModal("postProducts")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
            }}
          >
            <PostProducts />
          </Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("editProducts")}
            sx={{ mt: 2, mr: 5 }}
          >
            Editar
          </Button>
          <Modal
            open={openModal.editProducts}
            onCancel={() => handleCloseModal("editProducts")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "200px",
            }}
          >
            <EditProducts />
          </Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("editProductStatus")}
            sx={{ mt: 2 }}
          >
            Cambiar estado
          </Button>
          <Modal
            open={openModal.editProductStatus}
            onCancel={() => handleCloseModal("editProductStatus")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "25%",
            }}
          >
            <EditProductStatus />
          </Modal>
        </TabPanel>
        <TabPanel value="2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("postColoursSizesCategories")}
            sx={{ mt: 2, mr: 5 }}
          >
            Agregar
          </Button>
          <Modal
            open={openModal.postColoursSizesCategories}
            onCancel={() => handleCloseModal("postColoursSizesCategories")}
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PostColoursSizesCategories />
          </Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleOpenModal("changeStatusColoursSizesCategories")
            }
            sx={{ mt: 2, mr: 5 }}
          >
            Cambiar estado
          </Button>
          <Modal
            open={openModal.changeStatusColoursSizesCategories}
            onCancel={() =>
              handleCloseModal("changeStatusColoursSizesCategories")
            }
            footer={null}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChangeStatusCSC />
          </Modal>
        </TabPanel>

        <TabPanel value="3">Tab</TabPanel>
      </TabContext>
    </Box>
  );
};
export default ProductsTabs;
