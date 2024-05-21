import { Card } from "antd";
import React from "react";

const ProductCard = ({ image, title, price, colors }) => {
  return (
    <Card
      bordered={false}
      style={{
        boxShadow: "none",
        height: "100%",
        maxWidth: "250px",
        borderRadius: 0,
      }}
      cover={<img src={image} alt={title} style={{ maxWidth: "100%" }} />}
      extra={
        <p style={{ backgroundColor: "#76949F", padding: 5, color: "white" }}>
          Nuevo
        </p>
      }
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: 16,
        }}
      >
        <p>{title}</p>

        <p style={{ color: "ffff" }}>${price}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
