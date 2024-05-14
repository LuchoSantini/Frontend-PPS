import { useState } from "react";
import api from "../Api/Api";
import * as yup from "yup";

import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Button,
  Box,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";

const PostColoursSizesCategories = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  const colourNameValidationScheme = yup.object().shape({
    ColourName: yup
      .string()
      .min(3, "Escribe un color")
      .required("Escribe un color"),
  });

  const sizeNameValidationScheme = yup.object().shape({
    SizeName: yup
      .string()
      .min(1, "Escribe un talle")
      .required("Escribe un talle"),
  });

  const categoryNameValidationScheme = yup.object().shape({
    CategoryName: yup
      .string()
      .min(3, "Escribe una categoría")
      .required("Escribe una categoría"),
  });

  const formikColours = useFormik({
    initialValues: {
      ColourName: "",
    },
    validationSchema: colourNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await api.post("/api/Product/colours", values);
        setColours([...colours, response.data]);
        formikColours.resetForm();
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
    },
  });

  const formikSizes = useFormik({
    initialValues: {
      SizeName: "",
    },
    validationSchema: sizeNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await api.post("/api/Product/sizes", values);
        setSizes([...sizes, response.data]);
        formikSizes.resetForm();
        console.log(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  const formikCategories = useFormik({
    initialValues: {
      CategoryName: "",
    },
    validationSchema: categoryNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await api.post("/api/Product/categories", values);
        setCategories([...categories, response.data]);
        formikCategories.resetForm();
        console.log(response.data);
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    },
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl component="form" onSubmit={formikColours.handleSubmit}>
        <Typography variant="h6" gutterBottom align="center">
          Agregar Color
        </Typography>
        <FormGroup>
          <Box mb={2} mt={1} textAlign="center">
            <FormControl fullWidth>
              <InputLabel htmlFor="ColourName">Color:</InputLabel>
              <Input
                id="ColourName"
                type="text"
                name="ColourName"
                value={formikColours.values.ColourName}
                onChange={formikColours.handleChange}
                onBlur={formikColours.handleBlur}
                error={Boolean(
                  formikColours.touched.ColourName &&
                    formikColours.errors.ColourName
                )}
              />
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </FormGroup>
      </FormControl>

      <FormControl component="form" onSubmit={formikSizes.handleSubmit}>
        <Typography variant="h6" gutterBottom align="center">
          Agregar Talle
        </Typography>
        <FormGroup>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="SizeName">Talle:</InputLabel>
              <Input
                id="SizeName"
                type="text"
                name="SizeName"
                value={formikSizes.values.SizeName}
                onChange={formikSizes.handleChange}
                onBlur={formikSizes.handleBlur}
                error={Boolean(
                  formikSizes.touched.SizeName && formikSizes.errors.SizeName
                )}
              />
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </FormGroup>
      </FormControl>

      <FormControl component="form" onSubmit={formikCategories.handleSubmit}>
        <Typography variant="h6" gutterBottom align="center">
          Agregar Categoría
        </Typography>
        <FormGroup>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="CategoryName">Categoría:</InputLabel>
              <Input
                id="CategoryName"
                type="text"
                name="CategoryName"
                value={formikCategories.values.CategoryName}
                onChange={formikCategories.handleChange}
                onBlur={formikCategories.handleBlur}
                error={Boolean(
                  formikCategories.touched.CategoryName &&
                    formikCategories.errors.CategoryName
                )}
              />
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default PostColoursSizesCategories;
