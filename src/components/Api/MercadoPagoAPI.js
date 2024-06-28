import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postPayment } from "./ApiServices";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const MercadoPagoAPI = () => {
  initMercadoPago("APP_USR-04c4f42c-5f86-4346-a4d9-e4881c8936d7", {
    locale: "es-AR",
  });
  // Test: APP_USR-04c4f42c-5f86-4346-a4d9-e4881c8936d7
  // Prod: APP_USR-24ea6241-dd0d-4186-9121-9ef6fa946bba

  const [preferenceId, setPreferenceId] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  console.log(items);

  const handlePayment = async () => {
    try {
      if (items && items.length > 0) {
        const paymentResponse = await postPayment(items, token);
        setPreferenceId(paymentResponse.data.preferenceId);
      }
    } catch (error) {
      console.error("Error fetching payment preference:", error);
    }
  };

  console.log(preferenceId);

  return (
    <div>
      {!preferenceId ? (
        <Button variant="contained" onClick={handlePayment}>
          Pagar con MercadoPago
        </Button>
      ) : (
        <Wallet
          initialization={{ preferenceId, redirectMode: "modal" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </div>
  );
};

export default MercadoPagoAPI;
