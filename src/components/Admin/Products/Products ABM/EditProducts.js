import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
  useMediaQuery,
} from "@mui/material";
import {
  getCategories,
  getColours,
  getProducts,
  getSizes,
} from "../../../Api/ApiServices";
import api from "../../../Api/Api";
import useProductsFormik from "../../../hooks/Products/useProductsFormik";
import { Modal } from "antd";
import StockGrid from "../Visualization/StockGrid";
import StockModal from "../Visualization/StockModal";
import { useSelector } from "react-redux";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [openModal2, setOpenModal2] = useState(false);
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [stock, setStock] = useState([]);
  const [stockButtonVisibility, setStockButtonVisibility] = useState(false);
  const isMobile = useMediaQuery("(max-width: 632px)");
  const { token } = useSelector((state) => state.auth);

  const {
    handleAddImage,
    handleDeleteImage,
    handleAddStockSizes,
    handleDeleteStockSizes,
    handleChange,
    handleChangeCategory,
    handleAddStock,
    addImageButtonVisibility,
    addStockSizeButtonVisibility,
  } = useProductsFormik();

  const fetchData = async () => {
    try {
      const productsResponse = await getProducts();
      const coloursResponse = await getColours();
      const sizesResponse = await getSizes();
      const categoriesResponse = await getCategories();

      setProducts(productsResponse.data);
      setColours(coloursResponse.data);
      setSizes(sizesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      setErrorMessage("Error al cargar los datos");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productsFormValidationScheme = yup.object().shape({
    description: yup.string().required("Ingrese una descripción"),
    price: yup
      .number()
      .min(0.01, "Ingresa un precio válido.")
      .required("Ingrese un precio"),
    image: yup.string().required("Ingrese una URL"),
    genre: yup.string().required("Selecciona un género"),
    category: yup.string().required("Selecciona una categoría"),
    stocks: yup.array().of(
      yup.object().shape({
        ColourId: yup
          .number()
          .min(1, "Selecciona un color")
          .required("Selecciona un color"),
        stockSizes: yup.array().of(
          yup.object().shape({
            SizeId: yup
              .number()
              .min(1, "Selecciona un tamaño")
              .required("Selecciona un tamaño"),
            quantity: yup
              .number()
              .min(1, "Ingresa una cantidad válida.")
              .required("Ingresa una cantidad"),
          })
        ),
        images: yup.array().of(
          yup.object().shape({
            image: yup.string().required("Ingrese una URL válida"),
          })
        ),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      price: "",
      image: "",
      genre: "",
      category: null,
      stocks: [
        {
          ColourId: "",
          stockSizes: [{ SizeId: "", quantity: "" }],
          images: [{ image: "" }],
          status: true,
        },
      ],
    },
    validationSchema: productsFormValidationScheme,
    onSubmit: async (values) => {
      try {
        const formData = {
          ...values,
          category: Array.isArray(values.category)
            ? values.category
            : [values.category],
        };

        formData.stocks.forEach((stock) => {
          stock.status = true; // Asegura que status siempre sea true al enviar los datos
        });

        const response = await api.put(
          `/api/products/edit/${selectedProductId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedProductIndex = products.findIndex(
          (product) => product.id === selectedProductId
        );

        const updatedProducts = [...products];
        updatedProducts[updatedProductIndex] = response.data;

        setProducts(updatedProducts);

        fetchData();
        formik.resetForm();
        setSelectedProductId(1);

        setErrorMessage("");
        ToastifyToShow({ message: "Producto editado correctamente" });
      } catch (error) {
        ToastifyToShow({ message: error.response.data });
      }
    },
  });

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    const selectedCategoryId =
      selectedProduct.categories[0].id > 0
        ? selectedProduct.categories[0].id
        : null;

    const initialValues = {
      id: selectedProduct.id,
      description: selectedProduct.description,
      price: selectedProduct.price,
      image: selectedProduct.image,
      genre: selectedProduct.genre,
      category: selectedCategoryId,
      stocks: selectedProduct.stocks.map((stock) => ({
        ColourId: stock.colour.id,
        stockSizes: stock.stockSizes.map((stockSize) => ({
          SizeId: stockSize.size.id,
          quantity: stockSize.quantity,
        })),
        images: stock.images.map((image) => ({
          image: image.imageURL,
        })),
        status: (stock.status = true),
      })),
    };

    formik.setValues(initialValues);
  };

  const handleDeleteStock = (index) => {
    // Marcar el stock como eliminado en lugar de eliminarlo físicamente
    if (formik.values.stocks.length > 1) {
      formik.setFieldValue(`stocks.${index}.status`, false);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        fullWidth
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h6" gutterBottom align="center">
          Editar Producto
        </Typography>
        <FormGroup>
          <Box mb={2}>
            <FormControl
              fullWidth
              style={{
                minWidth: "211px",
                maxWidth: "211px",
              }}
            >
              <TextField
                select
                label="Seleccione un Producto"
                name="id"
                value={formik.values.id || ""}
                onChange={handleProductChange}
              >
                {products.map((product) => (
                  <MenuItem key={product.id + 1} value={product.id}>
                    {product.description}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Descripción:</InputLabel>
              <Input
                id="description"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.description && formik.errors.description
                )}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="price-input">Precio:</InputLabel>
              <Input
                id="price-input"
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.price && formik.errors.price)}
              />
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="image-input">URL Imagen:</InputLabel>
              <Input
                id="image-input"
                type="text"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.image && formik.errors.image)}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="category-input"
                select
                label="Categoría"
                defaultValue=""
                type="text"
                name="category"
                value={formik.values.category || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.category && formik.errors.category
                )}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="genre-input"
                select
                label="Género"
                name="genre"
                value={formik.values.genre || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.genre && formik.errors.genre)}
              >
                <MenuItem value={"Hombre"}>Hombre</MenuItem>
                <MenuItem value={"Mujer"}>Mujer</MenuItem>
                <MenuItem value={"Unisex"}>Unisex</MenuItem>
              </TextField>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal2(true)}
            sx={{ mb: 2 }}
          >
            Ver Stock
          </Button>

          <Modal
            open={openModal2}
            cancelButtonProps={{ style: { display: "none" } }} // Oculta el botón de cancelar
            onCancel={() => setOpenModal2(false)}
            onOk={() => setOpenModal2(false)}
            style={
              isMobile
                ? {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
                : {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    top: "7%",
                    left: "-7%",
                  }
            }
          >
            {/* Adaptar este Box a Mobile */}
            <Box
              style={
                isMobile
                  ? {
                      justifyContent: "center",
                      display: "flex",
                      top: "50%",
                      left: "50%",
                      width: "300px",
                      maxWidth: 770,
                      maxHeight: 700,
                      overflowY: "auto",
                    }
                  : {
                      justifyContent: "center",
                      display: "flex",
                      top: "50%",
                      left: "50%",
                      width: "770px",
                      maxWidth: 770,
                      maxHeight: 700,
                      overflowY: "auto",
                    }
              }
            >
              <StockGrid
                stocks={formik.values.stocks}
                handleChange={handleChange}
                formik={formik}
                colours={colours}
                sizes={sizes}
                handleDeleteStock={handleDeleteStock}
                handleAddStock={handleAddStock}
              />
            </Box>
          </Modal>

          <StockModal
            colours={colours}
            sizes={sizes}
            stock={stock}
            formik={formik}
          />
        </FormGroup>

        <Button type="submit" variant="contained" color="primary">
          Actualizar Producto
        </Button>
      </FormControl>
    </Box>
  );
};

export default EditProducts;
