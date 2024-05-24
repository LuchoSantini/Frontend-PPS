import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import api from "../../Api/Api";
import * as yup from "yup";
import ToastifyToShow from "../../hooks/ToastifyToShow";

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

const PostProducts = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  // Usar un Toast para mostrar el mensaje.
  const productFormValidationScheme = yup.object().shape({
    description: yup.string().required("Ingrese una descripción"),
    price: yup
      .number()
      .min(1, "Ingresa un precio válido.")
      .required("Ingrese un precio"),
    image: yup.string().required("Ingrese una URL"),
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

  const formik = useFormik({
    initialValues: {
      description: "",
      price: 0,
      image: "",
      genre: "",
      category: "",
      ColourId: null,
      SizeId: null,
      CategoryId: null,
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
    let value;
    const { name, value: targetValue, type } = e.target;

    if (name === "ColourId" || name === "SizeId" || name === "CategoryId") {
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
                name="CategoryId"
                value={formik.values.CategoryId || ""}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.category && formik.errors.category
                )}
              >
                {categories.map((categories) => (
                  <MenuItem key={categories.id} value={categories.id}>
                    {categories.categoryName}
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
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="colour-input"
                select
                label="Color"
                type="text"
                name="ColourId"
                value={formik.values.ColourId || ""}
                onChange={handleChange}
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
                type="text"
                name="SizeId"
                value={formik.values.SizeId || ""}
                onChange={handleChange}
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
        </FormGroup>
        <Button variant="contained" type="submit">
          Agregar Producto
        </Button>
      </FormControl>
    </Box>
  );
};

export default PostProducts;
