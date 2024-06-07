import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, price, colors }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: "none",
        height: "100%",
        maxWidth: "250px",
        borderRadius: 0,
      }}
      cover={
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "100%" }}
          onClick={handleClick}
        />
      }
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
