import { useState } from "react";
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
} from "@mui/material";
import { Button } from "antd";
import StockModal from "../Visualization/StockModal";

const StockGrid = ({ stocks, colours, sizes, handleDeleteStock, formik }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  console.log(stocks);
  return (
    <Box
      sx={{
        width: "120%",
        maxWidth: "1500px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Stock
      </Typography>
      {stocks && stocks.length > 0 && stocks[0].status != undefined ? (
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
                <TableCell>
                  <Typography variant="h6">Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks
                .filter((stock) => stock.status !== false)
                .map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ bgcolor: index % 2 === 0 ? "grey.100" : "white" }}
                  >
                    <TableCell
                      sx={{
                        minWidth: 120,
                        maxWidth: 200,
                      }}
                    >
                      <Typography noWrap>
                        {item.ColourId
                          ? colours.find((c) => c.id === item.ColourId)
                              ?.colourName
                          : ""}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 120, maxWidth: 200 }}>
                      {item.stockSizes.map((size, sizeIndex) => (
                        <Box
                          key={sizeIndex}
                          sx={{ minWidth: 120, maxWidth: 200 }}
                        >
                          <Typography noWrap>
                            {size.SizeId
                              ? sizes.find((s) => s.id === size.SizeId)
                                  ?.sizeName
                              : ""}
                          </Typography>
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100, maxWidth: 150 }}>
                      {item.stockSizes.map((size, sizeIndex) => (
                        <Box
                          key={sizeIndex}
                          sx={{ minWidth: 100, maxWidth: 150 }}
                        >
                          <Typography noWrap>{size.quantity}</Typography>
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      {item.images.map((image, imageIndex) => (
                        <Box
                          key={imageIndex}
                          sx={{ minWidth: 100, maxWidth: 300 }}
                        >
                          <Typography noWrap>
                            {image.image ? (
                              <a
                                href={image.image}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Imagen {imageIndex + 1}
                              </a>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          danger
                          onClick={() => handleDeleteStock(index)}
                          style={{
                            marginRight: "10px",
                          }}
                        >
                          X
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleOpenModal}
                          success
                        >
                          Editar
                        </Button>
                        <StockModal
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                          colours={colours}
                          sizes={sizes}
                          stocks={stocks}
                          formik={formik}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="h7"
          component="h2"
          gutterBottom
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          No hay Stocks agregados.
        </Typography>
      )}
    </Box>
  );
};

export default StockGrid;
