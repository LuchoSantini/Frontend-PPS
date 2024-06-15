import { useEffect, useState } from "react";
import ProductCard from "../ProductCard"
import { Select, Spin } from "antd";

import { getProductsByFilter } from "../../../../Api/ApiServices"
import Filters from "./Filters";
function ProductMapped({ isMobile }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortMethod, setSortMethod] = useState("default");
  const gridTemplateColumns = isMobile ? " repeat(2,1fr)" : "repeat(3, 1fr)";

  const handleSortChange = (value) => {
    setSortMethod(value);
  };

  const filterSelected = (filterType, description) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: description,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = Object.entries(selectedFilters) // {colour - negro, size - L}
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");

        const response = await getProductsByFilter(query);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [selectedFilters]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response;
        if (sortMethod === "price-descending") {
          filterSelected("priceOrder", "asc");
        } else if (sortMethod === "price-ascending") {
          filterSelected("priceOrder", "desc");
        } else if (sortMethod === "created-descending") {
          filterSelected("dateOrder", "desc");
        } else if (sortMethod === "created-ascending") {
          filterSelected("dateOrder", "asc");
        }
        response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        //console.log(error);
      }
    };
    getProducts();
  }, [sortMethod]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "auto",
          padding: 40,
          marginTop: 30,
        }}
      >
        <Filters
          setSelectedFilters={setSelectedFilters}
          onFilterSelected={filterSelected}
          onSetSortMethod={setSortMethod}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Select
            size="small"
            defaultValue="ORDENAR POR MAS VENDIDOS"
            style={{ width: 240 }}
            onChange={handleSortChange}
          >
            <Select.Option value="price-ascending">
              PRECIO: MAYOR A MENOR
            </Select.Option>
            <Select.Option value="price-descending">
              PRECIO: MENOR A MAYOR
            </Select.Option>
            <Select.Option value="created-descending">
              MAS VIEJO AL MAS NUEVO
            </Select.Option>
            <Select.Option value="created-ascending">
              MAS NUEVO AL MAS VIEJO
            </Select.Option>
          </Select>
        </div>
      </div>
      {loading ? (
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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns,
              gap: isMobile ? "20px" : "40px",
              width: "auto",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.description}
                price={product.price}
                colors={product.colours}
                image={product.image}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductMapped;
