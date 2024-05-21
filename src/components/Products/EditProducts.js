import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../Api/Api";
import ToastifyToShow from "../hooks/ToastifyToShow";

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
} from "../Api/ApiServices";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

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

      if (productsResponse.data.length > 0) {
        setSelectedProductId(productsResponse.data[0].id);
      }
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
      .min(1, "Ingresa un precio válido.")
      .required("Ingrese un precio"),
    image: yup.string().required("Ingrese una URL"),
    category: yup.string().required("Selecciona una categoría"),
    genre: yup.string().required("Selecciona un género"),
    ColourId: yup
      .number()
      .min(1, "Selecciona un color")
      .required("Selecciona un color"),
    SizeId: yup
      .number()
      .min(1, "Selecciona un tamaño")
      .required("Selecciona un tamaño"),
  });

  const formik = useFormik({
    initialValues: {
      productId: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      CategoryId: null,
      genre: "",
      ColourId: null,
      SizeId: null,
    },
    validationSchema: productsFormValidationScheme,
    onSubmit: async (values) => {
      try {
        const selectedColour = colours.find(
          (colour) => colour.id === values.ColourId
        );
        const selectedSize = sizes.find((size) => size.id === values.SizeId);
        const selectedCategory = categories.find(
          (category) => category.categoryName === values.category
        );

        const response = await api.put(
          `/api/products/edit/${selectedProductId}`,
          {
            description: values.description,
            price: values.price,
            image: values.image,
            genre: values.genre,
            category: values.category,
            colourId: [
              {
                id: selectedColour.id,
                colourName: selectedColour.colourName,
              },
            ],
            sizeId: [
              {
                id: selectedSize.id,
                sizeName: selectedSize.sizeName,
              },
            ],
            categoryId: [
              {
                id: selectedCategory.id,
                categoryName: selectedCategory.categoryName,
              },
            ],
          }
        );

        const updatedProductIndex = products.findIndex(
          (product) => product.id === selectedProductId
        );

        const updatedProducts = [...products];
        updatedProducts[updatedProductIndex] = response.data;

        setProducts(updatedProducts);

        // Aquí actualizamos selectedProductId con el id del producto editado
        setSelectedProductId(response.data.id);

        fetchData();
        formik.resetForm();
        setErrorMessage("");
        ToastifyToShow({ message: "Producto editado correctamente" });
      } catch (error) {
        ToastifyToShow({ message: error.response.data });
        console.log(errorMessage);
      }
    },
  });

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    const selectedColourId =
      selectedProduct.colours.length > 0 ? selectedProduct.colours[0].id : null;

    const selectedSizeId =
      selectedProduct.sizes.length > 0 ? selectedProduct.sizes[0].id : null;

    const selectedCategoryId =
      selectedProduct.categories.length > 0
        ? selectedProduct.categories[0].id
        : null;

    formik.setValues({
      productId: selectedProduct.id,
      description: selectedProduct.description,
      price: selectedProduct.price,
      image: selectedProduct.image,
      genre: selectedProduct.genre,
      status: selectedProduct.status,
      category: selectedProduct.category,
      ColourId: selectedColourId,
      SizeId: selectedSizeId,
      CategoryId: selectedCategoryId,
    });
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
                id="products"
                select
                label="Seleccione un Producto"
                name="productId"
                value={selectedProductId || ""}
                onChange={handleProductChange}
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
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
                name="category"
                value={formik.values.category || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.category && formik.errors.category
                )}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.categoryName}>
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
                <MenuItem value={"Ambos"}>Ambos</MenuItem>
              </TextField>
            </FormControl>
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="colour-input"
                select
                label="Color"
                name="ColourId"
                value={formik.values.ColourId || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.ColourId && formik.errors.ColourId
                )}
              >
                {colours.map((colour) => (
                  <MenuItem key={colour.id} value={colour.id}>
                    {colour.colourName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="size-input"
                select
                label="Talle"
                name="SizeId"
                value={formik.values.SizeId || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.SizeId && formik.errors.SizeId)}
              >
                {sizes.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.sizeName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          {/* <Box mb={1}>
            {(formik.touched.description && formik.errors.description) ||
            (formik.touched.price && formik.errors.price) ||
            (formik.touched.image && formik.errors.image) ||
            (formik.touched.CategoryId && formik.errors.CategoryId) ||
            (formik.touched.genre && formik.errors.genre) ||
            (formik.touched.ColourId && formik.errors.ColourId) ||
            (formik.touched.SizeId && formik.errors.SizeId) ||
            errorMessage ? (
              <Alert severity="error">
                {formik.errors.description ||
                  formik.errors.price ||
                  formik.errors.image ||
                  formik.errors.CategoryId ||
                  formik.errors.genre ||
                  formik.errors.ColourId ||
                  formik.errors.SizeId}
              </Alert>
            ) : null}
          </Box> */}
        </FormGroup>
        <Button variant="contained" type="submit">
          Editar Producto
        </Button>
      </FormControl>
    </Box>
  );
};

export default EditProducts;
