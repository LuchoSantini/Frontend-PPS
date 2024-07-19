import { useState } from "react";

import api from "../../Api/Api";
import useFetchDataCSC from "./useFetchDataCSC";
import ToastifyToShow from "../Effects/ToastifyToShow";
import { useSelector } from "react-redux";
const useHandleStatusCSC = () => {
  const [selectedColourId, setSelectedColourId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { token } = useSelector((state) => state.auth);
  const {
    colours,
    sizes,
    categories,
    setColours,
    setSizes,
    setCategories,
  } = useFetchDataCSC();

  const handleStatusColours = async () => {
    try {
      await api.put(
        `/api/colours/${selectedColourId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setColours(colours.filter((colour) => colour.id !== selectedColourId));
      setSelectedColourId("");
      ToastifyToShow({ message: "Cambió el estado" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusSizes = async () => {
    try {
      await api.put(
        `/api/sizes/${selectedSizeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSizes(sizes.filter((size) => size.id !== selectedSizeId));
      setSelectedSizeId("");
      ToastifyToShow({ message: "Cambió el estado" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusCategory = async () => {
    try {
      await api.put(
        `/api/categories/${selectedCategoryId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(
        categories.filter((category) => category.id !== selectedCategoryId)
      );
      setSelectedCategoryId("");
      ToastifyToShow({ message: "Cambió el estado" });
    } catch (error) {}
  };
  return {
    handleStatusColours,
    handleStatusSizes,
    handleStatusCategory,
    setSelectedColourId,
    setSelectedSizeId,
    setSelectedCategoryId,
    selectedColourId,
    selectedSizeId,
    selectedCategoryId,
  };
};

export default useHandleStatusCSC;
