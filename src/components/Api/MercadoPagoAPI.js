import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postPayment } from "./ApiServices";
import { useSelector } from "react-redux";

const MercadoPagoAPI = ({ cartItems }) => {
  initMercadoPago("APP_USR-04c4f42c-5f86-4346-a4d9-e4881c8936d7", {
    locale: "es-AR",
  });
  // Test: APP_USR-04c4f42c-5f86-4346-a4d9-e4881c8936d7
  // Prod: APP_USR-24ea6241-dd0d-4186-9121-9ef6fa946bba
  const [preferenceId, setPreferenceId] = useState(null);
  const { token } = useSelector((state) => state.auth);
  // const items = useSelector((state) => state.cart.items);
  // const cart = useSelector((state) => state.cart);
  // console.log(cart);
  //console.log(token);

  initMercadoPago("APP_USR-04c4f42c-5f86-4346-a4d9-e4881c8936d7", {
    locale: "es-AR",
  });

  useEffect(() => {
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
      {preferenceId ? (
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
