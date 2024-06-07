import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Link,
} from "@mui/material";

export default function StockGrid() {
  const productStock = [
    {
      color: "Negro",
      size: "S",
      quantity: 15,
      images: [
        "https://example.com/product-image-1.jpg",
        "https://example.com/product-image-2.jpg",
        "https://example.com/product-image-3.jpg",
      ],
    },
    {
      color: "Negro",
      size: "M",
      quantity: 20,
      images: [
        "https://example.com/product-image-4.jpg",
        "https://example.com/product-image-5.jpg",
        "https://example.com/product-image-6.jpg",
      ],
    },
    {
      color: "Azul",
      size: "L",
      quantity: 8,
      images: [
        "https://example.com/product-image-7.jpg",
        "https://example.com/product-image-8.jpg",
        "https://example.com/product-image-9.jpg",
      ],
    },
    {
      color: "Rojo",
      size: "XL",
      quantity: 12,
      images: [
        "https://example.com/product-image-10.jpg",
        "https://example.com/product-image-11.jpg",
        "https://example.com/product-image-12.jpg",
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Stock
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Color</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Talle</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Cantidad</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Imágenes</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productStock.map((item, index) => (
              <TableRow
                key={index}
                sx={{ bgcolor: index % 2 === 0 ? "grey.100" : "white" }}
              >
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {item.images.map((image, imageIndex) => (
                    <Link
                      key={imageIndex}
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mr: 2, color: "primary.main" }}
                    >
                      {image}
                    </Link>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
