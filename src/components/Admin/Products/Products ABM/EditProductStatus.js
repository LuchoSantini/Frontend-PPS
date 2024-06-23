import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../../Api/Api";
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
import { allProducts } from "../../../Api/ApiServices";

const EditProductStatus = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  const fetchData = async () => {
    try {
      const productsResponse = await allProducts();
      setProducts(productsResponse.data);
      console.log(productsResponse.data);
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

  const statusFormValidationScheme = yup.object().shape({
    status: yup.boolean().required("Seleccione un estado"),
  });

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: statusFormValidationScheme,
    onSubmit: async (values) => {
      try {
        const response = await api.put(`/api/products/${selectedProductId}`, {
          status: values.status,
        });

        // Actualizar estado local
        const updatedProducts = products.map((product) =>
          product.id === selectedProductId
            ? { ...product, status: values.status }
            : product
        );
        setProducts(updatedProducts);

        // Aquí actualizamos selectedProductId con el id del producto editado
        setSelectedProductId(response.data.id);
        formik.resetForm();
        setErrorMessage("");
        ToastifyToShow({
          message: response.data,
        });
      } catch (error) {
        console.log(error);
        setErrorMessage("Error al editar el estado del producto");
        ToastifyToShow({ message: error.response.data });
      }
    },
  });

  // Establecer el estado inicial del formulario
  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    );
    if (selectedProduct) {
      formik.setValues({
        status: selectedProduct.status,
      });
    }
    console.log(selectedProductId);
  }, [selectedProductId, products]);

  return (
    <Box mb={2}>
      <FormControl
        style={{
          display: "flex",
          minWidth: "270px",
          maxWidth: "270px",
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h6" gutterBottom align="center">
          Cambiar Estado del Producto
        </Typography>
        <FormGroup
          style={{
            display: "flex",
            minWidth: "270px",
            maxWidth: "270px",
          }}
        >
          <Box mb={2}>
            <FormControl
              fullWidth
              style={{
                display: "flex",
                minWidth: "270px",
                maxWidth: "270px",
              }}
            >
              <TextField
                id="products"
                select
                label="Seleccione un Producto"
                name="productId"
                value={selectedProductId || ""}
                onChange={(e) => setSelectedProductId(e.target.value)}
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
            <FormControl
              fullWidth
              style={{
                display: "flex",
                minWidth: "270px",
                maxWidth: "270px",
              }}
            >
              <TextField
                id="status-input"
                select
                label="Estado"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.status && formik.errors.status)}
              >
                <MenuItem value={true}>Alta</MenuItem>
                <MenuItem value={false}>Baja</MenuItem>
              </TextField>
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Editar Estado del Producto
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default EditProductStatus;
