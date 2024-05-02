import { useState } from "react";
import api from "./Api";
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

const PostColoursSizes = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);

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
        setErrorMessage(errorMessage.data.title);
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
        setErrorMessage(errorMessage.data.title);
      }
    },
  });

  return (
    <Box>
      <FormControl
        component="form"
        onSubmit={formikColours.handleSubmit}
        sx={{ mr: 5 }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Agregar Color
        </Typography>
        <FormGroup>
          <Box mb={2}>
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
              {formikColours.touched.ColourName &&
              formikColours.errors.ColourName ? (
                <Typography color="error">
                  {formikColours.errors.ColourName}
                </Typography>
              ) : null}
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Agregar Color
          </Button>
        </FormGroup>
      </FormControl>

      <FormControl
        component="form"
        onSubmit={formikSizes.handleSubmit}
        sx={{ mb: 5 }}
      >
        <Typography variant="h5" gutterBottom align="center">
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
              {formikSizes.touched.SizeName && formikSizes.errors.SizeName ? (
                <Typography color="error">
                  {formikSizes.errors.SizeName}
                </Typography>
              ) : null}
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Agregar Talle
          </Button>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default PostColoursSizes;
