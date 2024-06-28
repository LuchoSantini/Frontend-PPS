import { useState } from "react";
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
import {
  postCategories,
  postColours,
  postSizes,
} from "../../../Api/ApiServices";
import ToastifyToShow from "../../../hooks/Effects/ToastifyToShow";

const PostColoursSizesCategories = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  const colourNameValidationScheme = yup.object().shape({
    colourName: yup
      .string()
      .min(3, "Escribe un color")
      .required("Escribe un color"),
  });

  const sizeNameValidationScheme = yup.object().shape({
    sizeName: yup
      .string()
      .min(1, "Escribe un talle")
      .required("Escribe un talle"),
  });

  const categoryNameValidationScheme = yup.object().shape({
    categoryName: yup
      .string()
      .min(3, "Escribe una categoría")
      .required("Escribe una categoría"),
  });

  const formikColours = useFormik({
    initialValues: {
      colourName: "",
    },
    validationSchema: colourNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postColours(values);
        setColours([...colours, response.data]);
        formikColours.resetForm();
        ToastifyToShow({ message: response.data });
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
        ToastifyToShow({ message: error.response.data });
      }
    },
  });

  const formikSizes = useFormik({
    initialValues: {
      sizeName: "",
    },
    validationSchema: sizeNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postSizes(values);
        setSizes([...sizes, response.data]);
        formikSizes.resetForm();
        ToastifyToShow({ message: response.data });
      } catch (error) {
        setErrorMessage(error.message);
        ToastifyToShow({ message: error.response.data });
      }
    },
  });

  const formikCategories = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: categoryNameValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await postCategories(values);
        setCategories([...categories, response.data]);
        formikCategories.resetForm();
        ToastifyToShow({ message: response.data });
      } catch (error) {
        console.log(error);
        ToastifyToShow({ message: error.response.data });
      }
    },
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl component="form" onSubmit={formikColours.handleSubmit}>
        <Typography variant="h6" align="center">
          Agregar Color
        </Typography>
        <FormGroup>
          <Box mb={2} mt={1} textAlign="center">
            <FormControl fullWidth>
              <InputLabel htmlFor="colourName">Color:</InputLabel>
              <Input
                id="colourName"
                type="text"
                name="colourName"
                value={formikColours.colourName}
                onChange={formikColours.handleChange}
                onBlur={formikColours.handleBlur}
                error={Boolean(
                  formikColours.touched.colourName &&
                    formikColours.errors.colourName
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
        <Typography variant="h6" align="center">
          Agregar Talle
        </Typography>
        <FormGroup>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="sizeName">Talle:</InputLabel>
              <Input
                id="sizeName"
                type="text"
                name="sizeName"
                value={formikSizes.values.sizeName}
                onChange={formikSizes.handleChange}
                onBlur={formikSizes.handleBlur}
                error={Boolean(
                  formikSizes.touched.sizeName && formikSizes.errors.sizeName
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
        <Typography variant="h6" align="center">
          Agregar Categoría
        </Typography>
        <FormGroup>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="categoryName">Categoría:</InputLabel>
              <Input
                id="categoryName"
                type="text"
                name="categoryName"
                value={formikCategories.categoryName}
                onChange={formikCategories.handleChange}
                onBlur={formikCategories.handleBlur}
                error={Boolean(
                  formikCategories.touched.categoryName &&
                    formikCategories.errors.categoryName
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
