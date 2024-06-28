import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";
import { Modal } from "antd";
import useProductsFormik from "../../../hooks/Products/useProductsFormik";

const StockModal = ({
  openModal,
  setOpenModal,
  colours,
  sizes,
  formik,
  stocks,
}) => {
  const {
    handleAddStock,
    handleAddImage,
    handleDeleteImage,
    handleAddStockSizes,
    handleDeleteStockSizes,

    addImageButtonVisibility,
    addStockSizeButtonVisibility,
  } = useProductsFormik();

  // Función para renderizar el contenido del stock en el modal
  const renderStockContent = () => {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          maxHeight: "600px",
        }}
      >
        {formik?.values?.stocks?.map((stock, index) => (
          <Box
            key={index}
            mb={3}
            mr={3}
            style={{
              minWidth: "170px",
              maxWidth: "300px",
            }}
          >
            <Typography variant="h6">Color</Typography>
            <TextField
              select
              label="Color"
              value={stock.ColourId}
              onChange={(e) =>
                formik.setFieldValue(
                  `stocks[${index}].ColourId`,
                  e.target.value
                )
              }
              fullWidth
              style={{ marginBottom: "10px" }}
            >
              {colours.map((colour) => (
                <MenuItem key={colour.id} value={colour.id}>
                  {colour.colourName}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="h6">Talles</Typography>
            {stock?.stockSizes?.map((size, sizeIndex) => (
              <Box key={sizeIndex} mb={2}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Talle"
                    value={size.SizeId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `stocks[${index}].stockSizes[${sizeIndex}].SizeId`,
                        e.target.value
                      )
                    }
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  >
                    {sizes.map((size) => (
                      <MenuItem key={size.id} value={size.id}>
                        {size.sizeName}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    type="number"
                    label="Cantidad"
                    value={size.quantity}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `stocks[${index}].stockSizes[${sizeIndex}].quantity`,
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </FormControl>
              </Box>
            ))}

            {/* Botones para agregar o eliminar tamaños */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button
                variant="contained"
                onClick={() => handleAddStockSizes(stock)}
                disabled={true}
              >
                Agregar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteStockSizes(stock)}
                disabled={true}
              >
                X
              </Button>
            </Box>

            <Typography variant="h6">Imágenes</Typography>
            {stock.images?.map((image, imageIndex) => (
              <TextField
                key={imageIndex}
                label={`URL Imagen ${imageIndex + 1}`}
                value={image.image}
                onChange={(e) =>
                  formik.setFieldValue(
                    `stocks[${index}].images[${imageIndex}].image`,
                    e.target.value
                  )
                }
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            ))}

            {/* Botones para agregar o eliminar imágenes */}
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Button
                variant="contained"
                onClick={() => handleAddImage(index)}
                disabled={true}
              >
                Agregar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteImage(index)}
                disabled={true}
              >
                X
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Modal
      title="Editar Stock"
      open={openModal}
      onCancel={() => setOpenModal(false)}
      onOk={() => {
        handleAddStock();
        setOpenModal(false);
      }}
      width={550}
      footer={[
        <Button
          key="cancel"
          variant="contained"
          onClick={() => setOpenModal(false)}
        >
          Ok
        </Button>,
      ]}
    >
      {renderStockContent()}
    </Modal>
  );
};

export default StockModal;
