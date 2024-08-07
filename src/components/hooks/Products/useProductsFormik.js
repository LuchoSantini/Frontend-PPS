import { useState, useEffect } from "react";
import { postProduct } from "../../Api/ApiServices";
import ToastifyToShow from "../Effects/ToastifyToShow";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const useProductsFormik = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [stock, setStock] = useState([]);
  const [stockButtonVisibility, setStockButtonVisibility] = useState(false);
  const [addImageButtonVisibility, setAddImageButtonVisibility] = useState(
    false
  );
  const [
    addStockSizeButtonVisibility,
    setAddStockSizeButtonVisibility,
  ] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const productFormValidationScheme = yup.object().shape({
    description: yup.string().required("Ingrese una descripción"),
    price: yup
      .number()
      .min(0.01, "Ingresa un precio válido.")
      .required("Ingrese un precio"),
    image: yup.string().required("Ingrese una URL"),
    genre: yup.string().required("Selecciona un género"),
    category: yup
      .number()
      .min(1, "Selecciona una categoría")
      .required("Selecciona una categoría"),
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
      price: null,
      image: "",
      genre: "",
      category: null,
      stocks: [
        {
          ColourId: null,
          stockSizes: [{ SizeId: null, quantity: null }],
          images: [{ image: "" }],
          status: true,
        },
      ],
    },
    validationSchema: productFormValidationScheme,
    onSubmit: async (values) => {
      try {
        values.stocks = stock;

        const response = await postProduct(values, token);
        ToastifyToShow({ message: response.data });
        formik.resetForm();
      } catch (error) {
        setErrorMessage("Error al agregar un producto");
        ToastifyToShow({ message: error.response.data });
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleAddStock = () => {
    if (stock.length <= 9) {
      const lastStock = formik.values.stocks[
        formik.values.stocks.length - 1
      ] || {
        ColourId: null,
        stockSizes: [],
        images: [],
      };

      const newStock = {
        ColourId: lastStock.ColourId,
        stockSizes: lastStock.stockSizes.map((size) => ({
          SizeId: size.SizeId,
          quantity: size.quantity,
        })),
        images: lastStock.images.map((image) => ({
          image: image.image,
        })),
        status: true,
      };

      if (stock.length + 1 === 10) {
        setStockButtonVisibility(true);
      }

      const isValid =
        newStock.ColourId !== null &&
        newStock.images.every((image) => image.image !== null) &&
        newStock.stockSizes.every(
          (size) => size.SizeId !== null && size.quantity !== null
        );

      const isIdentical =
        stock.length > 0 &&
        JSON.stringify(newStock) === JSON.stringify(stock[stock.length - 1]);

      if (isValid && !isIdentical) {
        setStock((prevStock) => [...prevStock, newStock]);
        ToastifyToShow({ message: "Stock agregado" });
      } else {
        ToastifyToShow({ message: "No se agregó el Stock" });
      }
    }
  };

  const handleDeleteStock = (index) => {
    setStock((prevStock) => {
      const updatedStock = [...prevStock];
      updatedStock.splice(index, 1);
      return updatedStock;
    });
    if (stock.length < 11) {
      setStockButtonVisibility(false);
    }
  };

  const handleAddImage = (index) => {
    const currentImages = formik.values.stocks[index].images;
    if (currentImages.length < 3) {
      formik.setFieldValue(`stocks.${index}.images`, [
        ...currentImages,
        { image: "" },
      ]);
      if (currentImages.length + 1 === 3) {
        setAddImageButtonVisibility(true);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const currentImages = formik.values.stocks[index].images;

    if (formik.values.stocks[index].images.length > 1) {
      const imageToDelete = formik.values.stocks[index].images.slice(0, -1);
      formik.setFieldValue(`stocks.${index}.images`, imageToDelete);
    }
    if (currentImages.length < 4) {
      setAddImageButtonVisibility(false);
    }
  };

  const handleAddStockSizes = (index) => {
    const currentStockSizes = formik.values.stocks[index].stockSizes;
    if (currentStockSizes.length < 5) {
      formik.setFieldValue(`stocks.${index}.stockSizes`, [
        ...formik.values.stocks[index].stockSizes,
        { SizeId: null, quantity: 0 },
      ]);
      if (currentStockSizes.length + 1 === 5) {
        setAddStockSizeButtonVisibility(true);
      }
    }
  };

  const handleDeleteStockSizes = (index) => {
    const currentStockSizes = formik.values.stocks[index].stockSizes;

    if (formik.values.stocks[index].stockSizes.length > 1) {
      const newStockSizes = formik.values.stocks[index].stockSizes.slice(0, -1);
      formik.setFieldValue(`stocks.${index}.stockSizes`, newStockSizes);
    }
    if (currentStockSizes.length < 5 || currentStockSizes.length - 1 < 5) {
      setAddStockSizeButtonVisibility(false);
    }
  };

  const handleChangeCategory = (e) => {
    let value;
    const { name, value: targetValue, type } = e.target;

    if (name === "ColourId" || name === "SizeId" || name === "category") {
      const id = parseInt(targetValue);
      value = isNaN(id) ? [] : [id]; // Convertir el número entero en un array con un solo elemento
    } else {
      value = type === "number" ? parseFloat(targetValue) : targetValue; // Manejar correctamente valores numéricos
    }

    formik.setFieldValue(name, value);
  };
  return {
    formik,
    handleAddStock,
    handleDeleteStock,
    handleAddImage,
    handleDeleteImage,
    handleAddStockSizes,
    handleDeleteStockSizes,
    handleChange,
    handleChangeCategory,
    stockButtonVisibility,
    addImageButtonVisibility,
    addStockSizeButtonVisibility,
    stock,
  };
};

export default useProductsFormik;
