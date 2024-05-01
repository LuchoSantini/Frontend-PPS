import React, { useState } from "react";
import api from "./Api";

import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";

const ApiCalls = () => {
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    image: "",
    category: "",
    genre: "",
    ColourId: [0],
    SizeId: [0],
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    let value;
    if (e.target.name === "ColourId" || e.target.name === "SizeId") {
      value = parseInt(e.target.value);
      if (isNaN(value)) {
        value = [0];
      } else {
        value = [value];
      }
    } else {
      value =
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value;
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/Product/products", formData);
      console.log(response.data);
    } catch (error) {
      setErrorMessage("Error al agregar un producto");
      console.log(error);
    }
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Agregar Producto
      </Typography>
      <FormGroup>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="description-input">Descripción:</InputLabel>
            <Input
              id="description-input"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="price-input">Precio:</InputLabel>
            <Input
              id="price-input"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        {/*
            Validar que sea URL
          */}
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="image-input">Imagen:</InputLabel>
            <Input
              id="image-input"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        {/*
            Pantalon, remera, buzo
          */}
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="category-input">Categoria:</InputLabel>
            <Input
              id="category-input"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        {/*
            Hombre, mujer, ambos
          */}
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="genre-input">Género:</InputLabel>
            <Input
              id="genre-input"
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        {/*
            Desplegable
          */}
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="colorId-input">ID Color:</InputLabel>
            <Input
              id="colorId-input"
              type="number"
              name="ColourId"
              value={formData.ColourId === null ? "" : formData.ColourId[0]}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        {/*
            Desplegable
          */}
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="sizeId-input">ID Talle:</InputLabel>
            <Input
              id="sizeId-input"
              type="number"
              name="SizeId"
              value={formData.SizeId === null ? "" : formData.SizeId[0]}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box mb={2}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </FormGroup>
      <Button variant="contained" type="submit">
        Agregar Producto
      </Button>
    </FormControl>
  );
};

export default ApiCalls;
