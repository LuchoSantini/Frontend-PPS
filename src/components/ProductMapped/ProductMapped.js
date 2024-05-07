import { useEffect, useState } from "react";
import api from "../ApiCalls/Api";
import ProductCard from "../Card/ProductCard";
import { useMediaQuery } from "@mui/material";
import Filters from "../Filters/Filters";

const products = [
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
  const gridTemplateColumns = isMobile ? "1fr" : "repeat(3, 1fr)"; // Si es móvil, una columna; de lo contrario, 3 columnas

  // Testeado by Lucho je
  // const [productos, setProductos] = useState([]);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const response = await api.get("/api/Product/products");
  //       setProductos(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       setProductos("Error.");
  //     }
  //   };
  //   getProducts();
  // }, [productos]);

  return (
    <>
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
    </>
  );
}

export default ProductMapped;
