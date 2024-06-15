import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Button,
  Box,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import { getCategories, getColours, getSizes } from "../../Api/ApiServices";
import { Modal } from "antd";
import StockGrid from "./StockGrid";
import useProductsFormik from "../../hooks/Products/useProductsFormik";

const PostProducts = () => {
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const fetchData = async () => {
    try {
      const coloursResponse = await getColours();
      const sizesResponse = await getSizes();
      const categoriesResponse = await getCategories();

      setColours(coloursResponse.data);
      setSizes(sizesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    formik,
    stock,
    handleAddStock,
    handleDeleteStock,
    handleAddImage,
    handleDeleteImage,
    handleAddStockSizes,
    handleDeleteStockSizes,
    handleChange,
    handleChangeCategory,
    stockButtonVisibility,
    addImageButtonVisibility,
    addStockSizeButtonVisibility,
  } = useProductsFormik();

  return (
    <Box>
      <FormControl fullWidth component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" gutterBottom align="center">
          Agregar Producto
        </Typography>
        <FormGroup>
          <Box mb={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Descripción:</InputLabel>
              <Input
                id="description"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.description && formik.errors.description
                )}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="price-input">Precio:</InputLabel>
              <Input
                id="price-input"
                type="number"
                name="price"
                value={formik.values.price || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.price && formik.errors.price)}
              />
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="image-input">URL Imagen:</InputLabel>
              <Input
                id="image-input"
                type="text"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.image && formik.errors.image)}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="category-input"
                select
                label="Categoría"
                defaultValue=""
                type="text"
                name="category"
                value={formik.values.category || ""}
                onChange={handleChangeCategory}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.category && formik.errors.category
                )}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="genre-input"
                select
                label="Género"
                type="text"
                name="genre"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.genre && formik.errors.genre)}
              >
                <MenuItem value={"Hombre"}>Hombre</MenuItem>
                <MenuItem value={"Mujer"}>Mujer</MenuItem>
                <MenuItem value={"Ambos"}>Ambos</MenuItem>
              </TextField>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            sx={{ mb: 2 }}
          >
            Añadir Stock
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal2(true)}
            sx={{ mb: 2 }}
          >
            Ver Stock
          </Button>
          <Modal
            open={openModal2}
            cancelButtonProps={{ style: { display: "none" } }} // Oculta el botón de cancelar
            onCancel={() => setOpenModal2(false)}
            onOk={() => setOpenModal2(false)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              top: "7%",
              left: "-7%",
            }}
          >
            {/* Adaptar este Box a Mobile */}
            <Box
              style={{
                justifyContent: "center",
                display: "flex",
                top: "50%",
                left: "50%",
                width: "770px",
                maxWidth: 770,
                maxHeight: 700,
                overflowY: "auto",
              }}
            >
              <StockGrid
                stocks={stock}
                handleChange={handleChange}
                formik={formik}
                colours={colours}
                sizes={sizes}
                handleDeleteStock={handleDeleteStock}
              />
            </Box>
          </Modal>

          <Modal
            open={openModal}
            cancelButtonProps={{ style: { display: "none" } }}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "300px",
                top: "50%",
                left: "50%",
                maxWidth: 650,
                maxHeight: 650,
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              {formik.values.stocks.map((stock, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="h6" align="center">
                    Color
                  </Typography>

                  <TextField
                    id="colour-input"
                    select
                    label="Color"
                    type="text"
                    name={`stocks.${index}.ColourId`}
                    value={formik.values.stocks[index]?.ColourId || ""}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.stocks &&
                        formik.touched.stocks[index]?.ColourId !== undefined &&
                        formik.errors.stocks &&
                        formik.errors.stocks[index]?.ColourId !== undefined
                    )}
                    style={{
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    {colours.map((colour) => (
                      <MenuItem key={colour.id} value={colour.id}>
                        {colour.colourName}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="h6" align="center">
                    Talles
                  </Typography>
                  {formik.values.stocks[index]?.stockSizes.map(
                    (size, sizeIndex) => (
                      <Box key={sizeIndex} mb={1}>
                        <FormControl fullWidth>
                          <TextField
                            id={`stockSizes-input-${sizeIndex}`}
                            select
                            label="Talle"
                            type="text"
                            name={`stocks.${index}.stockSizes.${sizeIndex}.SizeId`}
                            value={
                              formik.values.stocks[index]?.stockSizes[sizeIndex]
                                ?.SizeId || ""
                            }
                            error={
                              formik.touched.stocks &&
                              formik.touched.stocks[index]?.stockSizes &&
                              formik.touched.stocks[index]?.stockSizes[
                                sizeIndex
                              ]?.SizeId !== undefined &&
                              formik.errors.stocks &&
                              formik.errors.stocks[index]?.stockSizes &&
                              formik.errors.stocks[index]?.stockSizes[sizeIndex]
                                ?.SizeId !== undefined
                            }
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              marginBottom: "10px",
                            }}
                          >
                            {sizes.map((size) => (
                              <MenuItem key={size.id} value={size.id}>
                                {size.sizeName}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            id={`stockQuantity-input-${sizeIndex}`}
                            placeholder="Cantidad"
                            label="Cantidad"
                            type="number"
                            name={`stocks.${index}.stockSizes.${sizeIndex}.quantity`}
                            value={
                              formik.values.stocks[index]?.stockSizes[sizeIndex]
                                ?.quantity || ""
                            }
                            error={
                              formik.touched.stocks &&
                              formik.touched.stocks[index]?.stockSizes &&
                              formik.touched.stocks[index]?.stockSizes[
                                sizeIndex
                              ]?.quantity !== undefined &&
                              formik.errors.stocks &&
                              formik.errors.stocks[index]?.stockSizes &&
                              formik.errors.stocks[index]?.stockSizes[sizeIndex]
                                ?.quantity !== undefined
                            }
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </FormControl>
                      </Box>
                    )
                  )}
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      disabled={addStockSizeButtonVisibility}
                      style={{
                        marginRight: "5px",
                      }}
                      onClick={() => {
                        handleAddStockSizes(index);
                      }}
                    >
                      Agregar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{
                        maxHeight: "37px",
                      }}
                      onClick={() => {
                        handleDeleteStockSizes(index);
                      }}
                    >
                      X
                    </Button>
                  </Box>
                  <Typography variant="h6" align="center">
                    Imágenes
                  </Typography>
                  {formik.values.stocks[index]?.images.map(
                    (image, imageIndex) => (
                      <Box key={imageIndex}>
                        <TextField
                          id="image-input"
                          label="URL Imagen"
                          type="text"
                          name={`stocks.${index}.images.${imageIndex}.image`}
                          value={
                            formik.values.stocks[index]?.images[imageIndex]
                              ?.image || ""
                          }
                          error={
                            formik.touched.stocks &&
                            formik.touched.stocks[index]?.images &&
                            formik.touched.stocks[index]?.images[imageIndex]
                              ?.image &&
                            Boolean(
                              formik.errors.stocks &&
                                formik.errors.stocks[index]?.images &&
                                formik.errors.stocks[index]?.images[imageIndex]
                                  ?.image
                            )
                          }
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        />
                      </Box>
                    )
                  )}
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      disabled={addImageButtonVisibility}
                      onClick={() => {
                        handleAddImage(index);
                      }}
                    >
                      Agregar
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleDeleteImage(index);
                      }}
                    >
                      X
                    </Button>
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      disabled={stockButtonVisibility}
                      variant="contained"
                      type="submit"
                      onClick={handleAddStock}
                      style={{ marginBottom: "10px" }}
                    >
                      Agregar Stock
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Modal>
        </FormGroup>
        <Button variant="contained" type="submit">
          Agregar Producto
        </Button>
      </FormControl>
    </Box>
  );
};

export default PostProducts;
