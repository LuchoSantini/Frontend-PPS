import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
} from "@mui/material";
import { getProductById } from "../../../../Api/ApiServices";
import Navbar from "../../../../Navbar/Navbar";

const ProductDetail = ({products}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(1); // Estado para el color seleccionado, por defecto color 1
  const [mainImage, setMainImage] = useState(""); // Estado para la imagen principal

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
        setLoading(false);
        // Establece la imagen principal inicial
        const initialStock = response.data.stocks.find(
          (stock) => stock.colourId === 1
        );
        if (initialStock) {
          setMainImage(initialStock.images[0]?.imageURL || "");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    // Cambia la imagen principal cuando se cambia el color seleccionado
    const selectedStock = product?.stocks.find(
      (stock) => stock.colourId === selectedColor
    );
    if (selectedStock) {
      setMainImage(selectedStock.images[0]?.imageURL || "");
    }
  }, [selectedColor, product]);

  if (loading) return <Typography>Loading...</Typography>;

  if (!product) return <Typography>Product not found</Typography>;

  const { description, stocks, categories } = product;

  // Filtrar el stock según el color seleccionado
  const selectedStock = stocks.find(
    (stock) => stock.colourId === selectedColor
  );

  return (
    <Box maxWidth="lg" mx="auto" py={6} sx={{ minHeight: "90vh" }}>
      <Navbar products={products} />
      <Grid container spacing={6} marginTop={"20px"}>
        <Grid item xs={12} md={6} container>
          <Grid item xs={3} container direction="column" spacing={2}>
            {selectedStock?.images.map((img, idx) => (
              <Grid item key={idx}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setMainImage(img.imageURL)} // Cambiar imagen principal al hacer clic
                  sx={{
                    margin: "8px",
                    width: "90%",
                    height: "20dvh",
                    borderColor: "transparent",
                    borderBottom: "4px solid",
                    borderBottomColor: "rgb(118, 148, 159)",
                    color: "white",
                    padding: "5px 12px",
                    "&:hover": {
                      backgroundColor: "rgb(118, 148, 159)",
                      borderColor: "transparent",
                    },
                  }}
                >
                  <img
                    src={img.imageURL}
                    alt={`Preview ${idx + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={9}>
            <img
              src={mainImage}
              alt="Product Image"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            {description}
          </Typography>
          <Typography variant="body1" mt={2}>
            {product.genre} - ${product.price}
          </Typography>
          <Box mt={2}>
            <Chip label="In Stock" variant="outlined" />
          </Box>
          <Box mt={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Color</FormLabel>
              <RadioGroup
                row
                name="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(parseInt(e.target.value))}
              >
                {stocks.map((stock) => (
                  <FormControlLabel
                    key={stock.colourId}
                    value={stock.colourId.toString()}
                    control={
                      <Radio
                        sx={{
                          color: (theme) =>
                            selectedColor === stock.colourId
                              ? "rgb(118, 148, 159)"
                              : theme.palette.grey[400],
                          "&.Mui-checked": {
                            color: "rgb(118, 148, 159)",
                          },
                        }}
                      />
                    }
                    label={stock.colour?.colourName || "Color"}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Size</FormLabel>
              <RadioGroup row name="size" defaultValue="m">
                {selectedStock?.stockSizes.map((stockSize) => (
                  <FormControlLabel
                    key={stockSize.sizeId}
                    value={stockSize.size.sizeName.toLowerCase()}
                    control={
                      <Radio
                        sx={{
                          color: (theme) =>
                            selectedStock === stockSize.size.sizeId
                              ? "rgb(118, 148, 159)"
                              : theme.palette.grey[400],
                          "&.Mui-checked": {
                            color: "rgb(118, 148, 159)",
                          },
                        }}
                      />
                    }
                    label={stockSize.size.sizeName}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box mt={4}>
            <Typography variant="body2">Categories</Typography>
            <Box mt={1}>
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.categoryName}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              backgroundColor: "rgb(118, 148, 159)",
              "&:hover": {
                backgroundColor: "rgb(118, 148, 159)", //Cambiar brillo o transparencia
                borderColor: "transparent",
              },
            }}
          >
            Add to cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
