import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postPayment } from "./ApiServices";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import Spinner from "../hooks/Effects/Spinner";

const MercadoPagoAPI = () => {
  initMercadoPago("APP_USR-04c4f42c-5f86-4346-a4d9-e4881c8936d7", {
    locale: "es-AR",
  });

  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);

  const handlePayment = async () => {
    setLoading(true); // Iniciar la carga
    try {
      if (items && items.length > 0) {
        //console.log(`Token: ${token}`); // Imprimir el token para depuración
        const paymentResponse = await postPayment(items, token);
        setPreferenceId(paymentResponse.data.preferenceId);
      }
    } catch (error) {
      console.error("Error fetching payment preference:", error);
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {loading ? (
        <Spinner />
      ) : !preferenceId ? (
        <Button
          variant="contained"
          sx={{
            "&:hover": {
              backgroundColor: "#50C878",
            },
            backgroundColor: "#4BB543",
          }}
          onClick={handlePayment}
        >
          Pagar con MercadoPago
        </Button>
      ) : (
        <Wallet
          initialization={{ preferenceId, redirectMode: "modal" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </Box>
  );
};

export default MercadoPagoAPI;
