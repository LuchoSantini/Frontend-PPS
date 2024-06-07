import { useEffect, useState } from "react";
import { getCategories, getColours, getSizes } from "../../Api/ApiServices";

const useFetchDataCSC = () => {
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coloursResponse = await getColours();
        const sizesResponse = await getSizes();
        const categoriesResponse = await getCategories();

        console.log(coloursResponse.data);
        setColours(coloursResponse.data);
        setSizes(sizesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return { colours, sizes, categories, setColours, setSizes, setCategories };
};

export default useFetchDataCSC;
