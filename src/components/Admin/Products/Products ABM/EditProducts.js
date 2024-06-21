import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ToastifyToShow from "../../../hooks/Effects/ToastifyToShow";

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
  getProducts,
  getSizes,
} from "../../../Api/ApiServices";
import api from "../../../Api/Api";
import useProductsFormik from "../../../hooks/Products/useProductsFormik";
import { Modal } from "antd";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const {
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

  const fetchData = async () => {
    try {
      const productsResponse = await getProducts();
      const coloursResponse = await getColours();
      const sizesResponse = await getSizes();
      const categoriesResponse = await getCategories();

      setProducts(productsResponse.data);
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

  const productsFormValidationScheme = yup.object().shape({
    description: yup.string().required("Ingrese una descripción"),
    price: yup
      .number()
      .min(0.01, "Ingresa un precio válido.")
      .required("Ingrese un precio"),
    image: yup.string().required("Ingrese una URL"),
    genre: yup.string().required("Selecciona un género"),
    category: yup.string().required("Selecciona una categoría"),
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
            image: yup.string().required("Ingrese una URL válida"),
          })
        ),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      price: "",
      image: "",
      genre: "",
      category: null,
      stocks: [
        {
          ColourId: "",
          stockSizes: [{ SizeId: "", quantity: "" }],
          images: [{ image: "" }],
        },
      ],
    },
    validationSchema: productsFormValidationScheme,
    onSubmit: async (values) => {
      try {
        const formData = {
          ...values,
          category: Array.isArray(values.category)
            ? values.category
            : [values.category],
        };

        const response = await api.put(
          `/api/products/edit/${selectedProductId}`,
          formData
        );

        const updatedProductIndex = products.findIndex(
          (product) => product.id === selectedProductId
        );

        const updatedProducts = [...products];
        updatedProducts[updatedProductIndex] = response.data;

        setProducts(updatedProducts);

        fetchData();
        formik.resetForm();
        setSelectedProductId(1);

        setErrorMessage("");
        ToastifyToShow({ message: "Producto editado correctamente" });
      } catch (error) {
        ToastifyToShow({ message: error.response.data });
        console.log(error);
      }
    },
  });

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    const selectedCategoryId =
      selectedProduct.categories[0].id > 0
        ? selectedProduct.categories[0].id
        : null;
    console.log(selectedProduct);

    const initialValues = {
      id: selectedProduct.id,
      description: selectedProduct.description,
      price: selectedProduct.price,
      image: selectedProduct.image,
      genre: selectedProduct.genre,
      category: selectedCategoryId,
      stocks: selectedProduct.stocks.map((stock) => ({
        ColourId: stock.colour.id,
        stockSizes: stock.stockSizes.map((stockSize) => ({
          SizeId: stockSize.size.id,
          quantity: stockSize.quantity,
        })),
        images: stock.images.map((image) => ({
          image: image.imageURL,
        })),
      })),
    };
    console.log(products);
    formik.setValues(initialValues);
  };

  return (
    <Box>
      <FormControl component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" gutterBottom align="center">
          Editar Producto
        </Typography>
        <FormGroup>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                select
                label="Seleccione un Producto"
                name="id"
                value={formik.values.id || ""}
                onChange={handleProductChange}
              >
                {products.map((product) => (
                  <MenuItem key={product.id + 1} value={product.id}>
                    {product.description}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box mb={2}>
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
                onChange={formik.handleChange}
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
                name="genre"
                value={formik.values.genre || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.genre && formik.errors.genre)}
              >
                <MenuItem value={"Hombre"}>Hombre</MenuItem>
                <MenuItem value={"Mujer"}>Mujer</MenuItem>
                <MenuItem value={"Unisex"}>Unisex</MenuItem>
              </TextField>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            sx={{ mb: 2 }}
          >
            Stock
          </Button>
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
                width: "500px",
                top: "50%",
                left: "50%",
                maxWidth: 650,
                maxHeight: 650,
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              {formik.values.stocks.map((stock, index) => (
                <Box key={index} mb={2} mr={3}>
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
                    onChange={formik.handleChange}
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
                  {formik.values.stocks[index]?.stockSizes?.map(
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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
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
                        handleAddStockSizes(stock);
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
                        handleDeleteStockSizes(stock);
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
                          onChange={formik.handleChange}
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
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Actualizar Producto
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default EditProducts;
