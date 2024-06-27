import React, { useState, useEffect, useContext } from "react";
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
  IconButton,
  Hidden,
} from "@mui/material";
import Navbar from "../../../Navbar/Navbar";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cartActions";
import {
  getProductByDescription,
  getProductById,
} from "../../../Api/ApiServices";
import { ThemeContext } from "../../../../context/theme/theme.context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "@mui/material";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { theme, isDarkMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 600px)");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductByDescription(id);
        setProduct(response.data);
        setLoading(false);
        const initialStock = response.data.stocks.find(
          (stock) => stock.status !== false
        );
        if (initialStock) {
          setMainImage(initialStock.images[0]?.imageURL);
          setSelectedColor(initialStock.colourId);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const validStocks = product?.stocks.filter(
      (stock) => stock.status !== false
    );
    const selectedStock = validStocks?.find(
      (stock) => stock.colourId === selectedColor
    );
    if (selectedStock) {
      setMainImage(selectedStock.images[0]?.imageURL || "");
    }
  }, [selectedColor, product]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (!product) return <Typography>Product not found</Typography>;

  const { description, stocks, categories } = product;
  const validStocks = stocks.filter((stock) => stock.status !== false);
  const selectedStock = validStocks.find(
    (stock) => stock.colourId === selectedColor
  );
  const selectedSizeName = selectedStock?.stockSizes.find(stockSize => stockSize.sizeId.toString() === selectedSize)?.size?.sizeName || "Size";
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.colorId === selectedColor &&
        item.sizeId === selectedSize
    );

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;

      const cartProduct = {
        ...existingItem,
        quantity: updatedQuantity,
      };

      dispatch(addToCart(cartProduct));
      console.log(cartProduct);
    } else {
      const cartProduct = {
        id: product.id,
        productId: product.id,
        name: product.description,
        price: product.price,
        color: selectedStock.colour?.colourName,
        colorId: selectedColor,
        sizeId: selectedSize,
        sizeName:selectedSizeName,
        image: mainImage,
        quantity: quantity,
      };

      dispatch(addToCart(cartProduct));
      console.log(cartProduct);
    }
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleNextImage = () => {
    const currentIndex = selectedStock.images.findIndex(
      (img) => img.imageURL === mainImage
    );
    const nextIndex =
      currentIndex === selectedStock.images.length - 1 ? 0 : currentIndex + 1;
    setMainImage(selectedStock.images[nextIndex].imageURL);
  };

  const handlePrevImage = () => {
    const currentIndex = selectedStock.images.findIndex(
      (img) => img.imageURL === mainImage
    );
    const prevIndex =
      currentIndex === 0 ? selectedStock.images.length - 1 : currentIndex - 1;
    setMainImage(selectedStock.images[prevIndex].imageURL);
  };

  const textColor = theme === "dark" ? "white" : "black";
  const backgroundColor = theme === "dark" ? "rgb(48, 48, 48)" : "white";
  const buttonBackgroundColor =
    theme === "dark" ? "rgb(118, 148, 159)" : "rgb(118, 148, 159)";

  

  return (
    <Box maxWidth="lg" mx="auto" py={6} sx={{ minHeight: "90vh" }}>
      <Navbar products={products} />
      <Grid container spacing={6} marginTop={"20px"}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection={isMobile ? "column" : "row"}>
            <Hidden smDown>
              <Grid item xs={3} container direction="column" spacing={2}>
                {selectedStock?.images.map((img, idx) => (
                  <Grid item key={idx}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleThumbnailClick(img.imageURL)}
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
            </Hidden>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <IconButton
                  onClick={handlePrevImage}
                  sx={{ display: isMobile ? "flex" : "none" }}
                >
                  <ArrowBackIcon
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  />
                </IconButton>
                <img
                  src={mainImage}
                  alt="Product Image"
                  style={{ width: "100%", maxWidth: "300px" }}
                />
                <IconButton
                  onClick={handleNextImage}
                  sx={{ display: isMobile ? "flex" : "none" }}
                >
                  <ArrowForwardIcon
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  />
                </IconButton>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            color={textColor}
          >
            {description}
          </Typography>
          <Typography variant="body1" mt={2} color={textColor}>
            {product.genre} - ${product.price}
          </Typography>
          <Box mt={2}>
            <Chip
              label="In Stock"
              variant="outlined"
              sx={{ color: textColor, borderColor: textColor }}
            />
          </Box>
          <Box mt={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: textColor }}>
                Color
              </FormLabel>
              <RadioGroup
                row
                name="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(Number(e.target.value))}
              >
                {validStocks.map((stock) => (
                  <FormControlLabel
                    key={stock.colourId}
                    value={stock.colourId.toString()}
                    control={
                      <Radio
                        sx={{
                          color:
                            selectedColor === stock.colourId
                              ? "rgb(118, 148, 159)"
                              : textColor,
                          "&.Mui-checked": {
                            color: "rgb(118, 148, 159)",
                          },
                        }}
                      />
                    }
                    label={stock.colour?.colourName || "Color"}
                    sx={{ color: textColor }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: textColor }}>
                Size
              </FormLabel>
              <RadioGroup
                row
                name="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {selectedStock?.stockSizes.map((stockSize) => (
                  <FormControlLabel
                    key={stockSize.sizeId}
                    value={stockSize.sizeId.toString()}
                    control={
                      <Radio
                        sx={{
                          color: textColor,
                          "&.Mui-checked": {
                            color: "rgb(118, 148, 159)",
                          },
                        }}
                      />
                    }
                    label={stockSize.size?.sizeName || "Size"}
                    sx={{ color: textColor }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              sx={{
                backgroundColor: buttonBackgroundColor,
                ":hover": {
                  backgroundColor: "rgb(118, 148, 159)",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
          <Box mt={3}>
            <Typography variant="body2" sx={{ color: textColor }}>
              Categories
            </Typography>
            <Box mt={2} display="flex">
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.categoryName}
                  variant="outlined"
                  sx={{
                    color: textColor,
                    borderColor: textColor,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
