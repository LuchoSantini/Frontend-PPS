import { useState } from "react";
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
} from "@mui/material";

import { useFormik } from "formik";
import { postCategories, postColours, postSizes } from "../../Api/ApiServices";

const PostColoursSizesCategories = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  const colourNameValidationScheme = yup.object().shape({
    description: yup
      .string()
      .min(3, "Escribe un color")
      .required("Escribe un color"),
  });

  const sizeNameValidationScheme = yup.object().shape({
    description: yup
      .string()
      .min(1, "Escribe un talle")
      .required("Escribe un talle"),
  });

  const categoryNameValidationScheme = yup.object().shape({
    description: yup
      .string()
      .min(3, "Escribe una categoría")
      .required("Escribe una categoría"),
  });

  const formikColours = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: colourNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postColours(values);
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
      description: "",
    },
    validationSchema: sizeNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postSizes(values);
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
      description: "",
    },
    validationSchema: categoryNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postCategories(values);
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
              <InputLabel htmlFor="description">Color:</InputLabel>
              <Input
                id="description"
                type="text"
                name="description"
                value={formikColours.values.description}
                onChange={formikColours.handleChange}
                onBlur={formikColours.handleBlur}
                error={Boolean(
                  formikColours.touched.description &&
                    formikColours.errors.description
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
              <InputLabel htmlFor="description">Talle:</InputLabel>
              <Input
                id="description"
                type="text"
                name="description"
                value={formikSizes.values.description}
                onChange={formikSizes.handleChange}
                onBlur={formikSizes.handleBlur}
                error={Boolean(
                  formikSizes.touched.description &&
                    formikSizes.errors.description
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
              <InputLabel htmlFor="description">Categoría:</InputLabel>
              <Input
                id="description"
                type="text"
                name="description"
                value={formikCategories.values.description}
                onChange={formikCategories.handleChange}
                onBlur={formikCategories.handleBlur}
                error={Boolean(
                  formikCategories.touched.description &&
                    formikCategories.errors.description
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
