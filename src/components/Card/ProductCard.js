import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const ProductCard = ({ image, title, price, colors }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            {title}
          </Typography>
          <CardMedia
            component="img"
            image={image}
            title={title}
            sx={{
              minHeight: "200px",
              minWidth: "300px",
            }}
          />
          <Typography variant="h6" component="p" align="center">
            Precio: ${price.toLocaleString()}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "1px solid gray",
                  marginRight: "5px",
                }}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
