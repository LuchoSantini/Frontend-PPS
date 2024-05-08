import { useEffect, useState } from "react";
import api from "../ApiCalls/Api";
import ProductCard from "../Card/ProductCard";
import { Select, Spin } from "antd";
import { SlidersOutlined } from "@ant-design/icons";

const productssd = [
  {
    id: "01",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_766940-MLA73611188794_122023-O.webp",
    description: "Remera 1",
    price: 25000,
    colours: ["black", "white"],
  },
  {
    id: "02",
    description: "imagestring",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_766940-MLA73611188794_122023-O.webp",
    price: 260,
    colours: ["black", "white"],
  },
  {
    id: "03",
    description: "imagestring",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_766940-MLA73611188794_122023-O.webp",
    price: 260,
    colours: ["black", "white"],
  },
  {
    id: "04",
    description: "imagestring",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_766940-MLA73611188794_122023-O.webp",
    price: 260,
    colours: ["black", "white"],
  },
  {
    id: "05",
    description: "imagestring",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_766940-MLA73611188794_122023-O.webp",
    price: 260,
    colours: ["black", "white"],
  },
];
function ProductMapped({ isMobile }) {
  const gridTemplateColumns = isMobile ? "1fr" : "repeat(3, 1fr)";
  // Testeado by Lucho je
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState("default");

  const handleSortChange = (value) => {
    setSortMethod(value);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response;
        if (sortMethod === "low") {
          response = await api.get("/api/Product/productsOrderBy?orderBy=true");
        } else if (sortMethod === "high") {
          response = await api.get("/api/Product/productsOrderBy?orderBy=false");
        } else {
          response = await api.get("/api/Product/products");
        }
        setProductos(response.data);
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
          justifyContent: "space-around",
          alignItems: "center",
          width: "auto",
          padding: 40,
        }}
      >
        <div style={{ display: "flex", gap: 8, cursor: "pointer" }}>
          <SlidersOutlined style={{ fontSize: 20 }} />
          <p>FILTRAR</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p>ORDENAR</p>
          <Select
            defaultValue="Mas vendidos"
            style={{ width: 130 }}
            options={[
              {
                value: "high",
                label: "Mayor precio",
              },
              {
                value: "low",
                label: "Menor precio",
              },
            ]}
            onChange={handleSortChange}
          />
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
              gap: 110,
              width: "auto",
            }}
          >
            {productos.map((product) => (
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
