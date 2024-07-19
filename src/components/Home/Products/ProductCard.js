import { Card, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  image,
  description,
  price,
  genre,
  createdDate,
  newProductDays,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${description}`);
  };

  const isNewProduct = (createdDate, newProductDays) => {
    const currentDate = new Date();
    const productDate = new Date(createdDate);
    const diffTime = Math.abs(currentDate - productDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < newProductDays;
  };

  return (
    <Card
      bordered={false}
      hoverable
      onClick={handleClick}
      style={{
        height: "100%",
        maxWidth: "250px",
        borderRadius: 0,
        marginBottom: "20px",
      }}
      cover={
        <img
          src={image}
          alt={description}
          style={{ maxWidth: "350px", maxHeight: "350px" }}
        />
      }
      extra={
        isNewProduct(createdDate, newProductDays) && (
          <p style={{ backgroundColor: "#76949F", padding: 5, color: "white" }}>
            Nuevo
          </p>
        )
      }
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: 16,
        }}
      >
        <Tag>{genre}</Tag>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <h4 style={{ margin: 0, maxWidth: "34.1rem", zIndex: 2 }}>
            {description}
          </h4>
          <span style={{ color: "ffff", margin: "0px 0" }}>
            ${price.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
