import {
  FormControl,
  FormGroup,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

import useFetchDataCSC from "../../../hooks/Products/useFetchDataCSC";
import useHandleStatusCSC from "../../../hooks/Products/useHandleStatusCSC";

const ChangeStatusCSC = () => {
  const {
    handleStatusColours,
    handleStatusSizes,
    handleStatusCategory,
    setSelectedColourId,
    setSelectedSizeId,
    setSelectedCategoryId,
    selectedColourId,
    selectedSizeId,
    selectedCategoryId,
  } = useHandleStatusCSC();

  const { colours, sizes, categories } = useFetchDataCSC();

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
                onClick={handleStatusColours}
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
                onClick={handleStatusSizes}
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
                onClick={handleStatusCategory}
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

export default ChangeStatusCSC;
