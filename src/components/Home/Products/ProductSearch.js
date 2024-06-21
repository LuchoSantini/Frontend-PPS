import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductSearch = ({ products,setOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowList(!!e.target.value);
  };

  const handleItemClick = (productId) => {
    toDescription(productId);
    setShowList(false);
    setOpen(false)
  };

  const toDescription = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      navigate(`/product/${selectedProduct.description}`, {
        state: {
          product: selectedProduct,
          id: selectedProduct.id,
          description:selectedProduct.description
        },
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredProducts = products
    ? products.filter((product) =>
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Box
      ref={searchContainerRef}
      sx={{ position: "relative", zIndex: 2000, width: "100%" }}
    >
      <TextField
        placeholder="Buscar"
        variant="standard"
        fullWidth
        onChange={handleSearch}
        sx={{
          paddingLeft:0.3,
        }}
      />

      {showList && searchQuery && (
        <List
          sx={{
            position: "absolute",
            width: "100%",
            overflow: "auto",
            backgroundColor: "white",
            zIndex: 2000,
            boxShadow:"0 1px 6px rgba(0, 0, 0, .2)"
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ListItem
                button
                key={product.id}
                onClick={() => handleItemClick(product.id)}
                sx={{
                  textAlign:"left"
                }}
              >
              
                <ListItemAvatar>
                  <Avatar variant="square" src={product.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.description}
                  secondary={`$${product.price}`}
                />
                 
              </ListItem>
            ))
          ) : (
            <ListItem >
              <ListItemText primary="No se encontraron productos" />
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default ProductSearch;
