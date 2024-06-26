import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postPayment } from "./ApiServices";

const MercadoPagoAPI = ({ cartItems }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isMercadoPagoInitialized, setIsMercadoPagoInitialized] =
    useState(false);

  useEffect(() => {
    // Inicializa MercadoPago solo una vez
    if (!isMercadoPagoInitialized) {
      initMercadoPago("APP_USR-24ea6241-dd0d-4186-9121-9ef6fa946bba", {
        locale: "es-AR",
      });
      setIsMercadoPagoInitialized(true);
    }
  }, [isMercadoPagoInitialized]);

  useEffect(() => {
    // Obtiene la preferencia solo cuando hay items en el carrito
    const fetchData = async () => {
      try {
        const paymentResponse = await postPayment(cartItems);
        setPreferenceId(paymentResponse.data.preferenceId);
      } catch (error) {
        console.error("Error fetching payment preference:", error);
      }
    };

    if (cartItems && cartItems.length > 0) {
      fetchData();
    }
  }, [cartItems]);

  return (
    <div>
      {preferenceId && isMercadoPagoInitialized ? (
        <Wallet
          initialization={{ preferenceId, redirectMode: "modal" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MercadoPagoAPI;
