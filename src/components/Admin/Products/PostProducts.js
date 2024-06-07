import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import api from "../../Api/Api";
import * as yup from "yup";

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
import {
  getCategories,
  getColours,
  getSizes,
  postProduct,
} from "../../Api/ApiServices";
import ToastifyToShow from "../../hooks/Toastify/ToastifyToShow";
import { Modal } from "antd";
import StockGrid from "./StockGrid";

const PostProducts = () => {
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Error al cargar los datos");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productFormValidationScheme = yup.object().shape({
    description: yup.string().required("Ingrese una descripción"),
    price: yup
      .number()
      .min(0.01, "Ingresa un precio válido.")
      .required("Ingrese un precio"),
    image: yup.string().required("Ingrese una URL"),
    genre: yup.string().required("Selecciona un género"),
    category: yup
      .number()
      .min(1, "Selecciona una categoría")
      .required("Selecciona una categoría"),
    stocks: yup.array().of(
      yup.object().shape({
        ColourId: yup
          .number()
          .min(1, "Selecciona un color")
          .required("Selecciona un color"),
        stockSizes: yup.array().of(
          yup.object().shape({
            SizeId: yup
              .number()
              .min(1, "Selecciona un tamaño")
              .required("Selecciona un tamaño"),
            quantity: yup
              .number()
              .min(1, "Ingresa una cantidad válida.")
              .required("Ingresa una cantidad"),
          })
        ),
        images: yup.array().of(
          yup.object().shape({
            image: yup.string().url("Ingrese una URL válida"),
          })
        ),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      price: 0,
      image: "",
      genre: "",
      category: null,
      stocks: [
        {
          ColourId: null,
          stockSizes: [{ SizeId: null, quantity: 0 }],
          images: [{ image: "" }],
        },
      ],
    },
    validationSchema: productFormValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postProduct(values);
        console.log(response.data);
        ToastifyToShow({ message: response.data });
      } catch (error) {
        console.log(error);
        setErrorMessage("Error al agregar un producto");
        ToastifyToShow({ message: error.response.data });
        console.log(errorMessage);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleDeleteSize = (index) => {
    if (formik.values.stocks[index].stockSizes.length > 1) {
      const newStockSizes = formik.values.stocks[index].stockSizes.slice(0, -1);
      formik.setFieldValue(`stocks.${index}.stockSizes`, newStockSizes);
    }
  };

  const handleDeleteImage = (index) => {
    if (formik.values.stocks[index].images.length > 1) {
      const imageToDelete = formik.values.stocks[index].images.slice(0, -1);
      formik.setFieldValue(`stocks.${index}.images`, imageToDelete);
    }
  };

  const handleChangeCategory = (e) => {
    let value;
    const { name, value: targetValue, type } = e.target;

    if (name === "ColourId" || name === "SizeId" || name === "category") {
      const id = parseInt(targetValue);
      value = isNaN(id) ? [] : [id]; // Convertir el número entero en un array con un solo elemento
    } else {
      value = type === "number" ? parseFloat(targetValue) : targetValue; // Manejar correctamente valores numéricos
    }

    formik.setFieldValue(name, value);
  };

  return (
    <Box>
      <FormControl component="form" onSubmit={formik.handleSubmit}>
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
                value={formik.values.price}
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
          {/* */}
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
            onCancel={() => setOpenModal2(false)}
            onOk={() => setOpenModal2(false)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                top: "50%",
                left: "50%",
                maxWidth: 650,
                maxHeight: 650,
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <StockGrid />
            </Box>
          </Modal>
          {/* */}

          <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            onOk={() => setOpenModal(false)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                top: "50%",
                left: "50%",
                maxWidth: 650,
                maxHeight: 650,
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              {formik.values.stocks.map((stock, index) => (
                <Box key={index} mb={2} mr={5}>
                  <Typography variant="h6" gutterBottom align="center">
                    Color
                  </Typography>
                  <FormControl fullWidth>
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
                          formik.touched.stocks[index]?.ColourId !==
                            undefined &&
                          formik.errors.stocks &&
                          formik.errors.stocks[index]?.ColourId !== undefined
                      )}
                      style={{
                        marginBottom: "10px",
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
                                formik.values.stocks[index]?.stockSizes[
                                  sizeIndex
                                ]?.SizeId || ""
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
                                formik.values.stocks[index]?.stockSizes[
                                  sizeIndex
                                ]?.quantity || ""
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
                        style={{
                          marginRight: "5px",
                        }}
                        onClick={() => {
                          formik.setFieldValue(`stocks.${index}.stockSizes`, [
                            ...formik.values.stocks[index].stockSizes,
                            { SizeId: null, quantity: 0 },
                          ]);
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
                          handleDeleteSize(index);
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
                        marginBottom: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          formik.setFieldValue(`stocks.${index}.images`, [
                            ...formik.values.stocks[index].images,
                            { image: "" },
                          ]);
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
                        style={{
                          maxHeight: "37px",
                        }}
                      >
                        X
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              ))}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    formik.setFieldValue("stocks", [
                      ...formik.values.stocks,
                      {
                        ColourId: null,
                        stockSizes: [{ SizeId: null, quantity: 0 }],
                        images: [{ image: "" }],
                      },
                    ]);
                  }}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Agregar Color
                </Button>
              </Box>
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
