import { useState, useEffect } from "react";
import api from "../Api/Api";

import {
  FormControl,
  FormGroup,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

const DeleteColoursSizesCategories = () => {
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedColourId, setSelectedColourId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const coloursResponse = await api.get("/api/colours");
      const sizesResponse = await api.get("/api/sizes");
      const categoriesResponse = await api.get("/api/categories");

      setColours(coloursResponse.data);
      setSizes(sizesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteColours = async () => {
    try {
      await api.delete(`/api/colours/${selectedColourId}`);
      setColours(colours.filter((colour) => colour.id !== selectedColourId));
      setSelectedColourId("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error");
    }
  };

  const handleDeleteSizes = async () => {
    try {
      await api.delete(`/api/sizes/${selectedSizeId}`);
      setSizes(sizes.filter((size) => size.id !== selectedSizeId));
      setSelectedSizeId("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await api.delete(`/api/categories/${selectedCategoryId}`);
      setCategories(
        categories.filter((category) => category.id !== selectedCategoryId)
      );
      setSelectedCategoryId("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error");
    }
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl component="form">
        <Typography variant="h6" gutterBottom align="center">
          Eliminar Color
        </Typography>
        <FormGroup>
          <Box mb={2} textAlign="center">
            <FormControl fullWidth>
              <TextField
                id="colour-input"
                select
                label="Color"
                defaultValue=""
                type="text"
                name="colour"
                value={selectedColourId}
                onChange={(e) => setSelectedColourId(e.target.value)}
              >
                {colours.map((colour) => (
                  <MenuItem key={colour.id} value={colour.id}>
                    {colour.colourName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                type="button"
                onClick={handleDeleteColours}
                disabled={!selectedColourId}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        </FormGroup>
      </FormControl>

      <FormControl component="form">
        <Typography variant="h6" gutterBottom align="center">
          Eliminar Talle
        </Typography>
        <FormGroup>
          <Box mb={2} textAlign="center">
            <FormControl fullWidth>
              <TextField
                id="size-input"
                select
                label="Talle"
                defaultValue=""
                type="text"
                name="size"
                value={selectedSizeId}
                onChange={(e) => setSelectedSizeId(e.target.value)}
              >
                {sizes.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.sizeName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Box mt={2}>
              <Button
                variant="contained"
                type="button"
                onClick={handleDeleteSizes}
                disabled={!selectedSizeId}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        </FormGroup>
      </FormControl>

      <FormControl component="form">
        <Typography variant="h6" gutterBottom align="center">
          Eliminar Categoría
        </Typography>
        <FormGroup>
          <Box mb={2} textAlign="center">
            <FormControl fullWidth>
              <TextField
                id="category-input"
                select
                label="Categoría"
                defaultValue=""
                type="text"
                name="category"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Box mt={2}>
              <Button
                variant="contained"
                type="button"
                onClick={handleDeleteCategory}
                disabled={!selectedCategoryId}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default DeleteColoursSizesCategories;
