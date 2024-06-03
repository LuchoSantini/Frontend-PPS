import { useState } from "react";

import api from "../../Api/Api";
import useFetchDataCSC from "./useFetchDataCSC";

const useHandleStatusCSC = () => {
  const [selectedColourId, setSelectedColourId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { colours, sizes, categories, setColours, setSizes, setCategories } =
    useFetchDataCSC();

  const handleStatusColours = async () => {
    try {
      await api.put(`/api/colours/${selectedColourId}`);
      setColours(colours.filter((colour) => colour.id !== selectedColourId));
      setSelectedColourId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusSizes = async () => {
    try {
      await api.put(`/api/sizes/${selectedSizeId}`);
      setSizes(sizes.filter((size) => size.id !== selectedSizeId));
      setSelectedSizeId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusCategory = async () => {
    try {
      await api.put(`/api/categories/${selectedCategoryId}`);
      setCategories(
        categories.filter((category) => category.id !== selectedCategoryId)
      );
      setSelectedCategoryId("");
    } catch (error) {
      console.log(error);
    }
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
