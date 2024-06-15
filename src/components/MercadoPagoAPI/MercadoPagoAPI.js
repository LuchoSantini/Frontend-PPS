import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postPayment } from "../Api/ApiServices";

// ta re crudely eto e no hagan caso xd

// Inicializa MercadoPago con tu clave pública
initMercadoPago("YOUR_PUBLIC_KEY");

const MercadoPagoAPI = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentResponse = await postPayment();
        setPreferenceId(paymentResponse.data);
        console.log("xdd");
        console.log(paymentResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Renderiza el componente Wallet solo si preferenceId está definido
  return preferenceId ? (
    <Wallet
      initialization={{ preferenceId }}
      customization={{ texts: { valueProp: "smart_option" } }}
    />
  ) : (
    <div>...</div>
  );
};

export default MercadoPagoAPI;
