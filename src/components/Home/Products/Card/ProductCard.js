import { Card, Divider, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, price, colors, genre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price) => {
    const priceString = price.toString();
    const [integerPart, decimalPart] = priceString.split(".");  
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const formattedPrice = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
    return formattedPrice;
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
      }}
      cover={
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "100%" }}          
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
          <Tag>{genre}</Tag>
        <div style={{justifyContent:"center", display:"flex", flexDirection:"column", alignItems:"center",marginTop:5}}>
          <h4 style={{margin:0,maxWidth:"34.1rem", zIndex:2}}>{title}</h4>
          <span style={{ color: "ffff", margin:"0px 0" }}>${formatPrice(price)}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
