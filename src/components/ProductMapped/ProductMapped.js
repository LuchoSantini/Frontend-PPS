import { useEffect, useState } from "react";
import api from "../Api/Api";
import ProductCard from "../Card/ProductCard";
import { Select, Spin } from "antd";
import { SlidersOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

function ProductMapped({ isMobile }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState("default");

  const gridTemplateColumns = isMobile ? " repeat(2,1fr)" : "repeat(3, 1fr)";
  const handleSortChange = (value) => {
    setSortMethod(value);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response;
        if (sortMethod === "price-descending") {
          response = await api.get("api/products?priceOrder=asc");
        } else if (sortMethod === "price-ascending") {
          response = await api.get("/api/products?priceOrder=desc");
        } else {
          response = await api.get("/api/products");
        }
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
        }}
      >
        <div style={{ display: "flex", gap: 8, cursor: "pointer", width: 240, justifyContent:"center" }}>
          <p>FILTRAR</p>
          <SlidersOutlined style={{ fontSize: 20 }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Select
            size="small"
            defaultValue="ORDENAR POR MAS VENDIDOS"
            style={{ width: 240 }}
            onChange={handleSortChange}
          >
            <Option value="price-ascending">PRECIO: MAYOR A MENOR</Option>
            <Option value="price-descending">PRECIO: MENOR A MAYOR</Option>
            <Option value="created-descending">MAS VIEJO AL MAS NUEVO</Option>
            <Option value="created-ascending">MAS NUEVO AL MAS VIEJO</Option>
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
          {" "}
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
              gap: isMobile ? "50px" : "110px",
              width: "auto",
            }}
          >
            {products.map((product) => (
              <ProductCard
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
