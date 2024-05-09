import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import api from "../Api/Api";

const ProductCard = ({ image, title, price, colors }) => {
  // ver si necesita loguearse para agregar al carrito..
  const AddOrder = async () => {
    try {
      const response = await api.post("/api/Order/order");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      bordered={false}
      style={{ boxShadow: "none", height: "100%", maxWidth: "250px" }}
      cover={<img src={image} alt={title} style={{ maxWidth: "100%" }} />}
    >
      <div>
        <Meta title={title} style={{ fontFamily: "monospace" }} />
        <p style={{ color: "ffff" }}>${price}</p>
        <div style={{ display: "flex" }}>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#000000",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "1px solid gray",
                marginRight: "5px",
              }}
            ></div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
