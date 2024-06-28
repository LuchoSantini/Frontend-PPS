import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import "./Chatbot.css";

const theme = {
  background: "#333333", // Fondo oscuro
  fontFamily: "Helvetica Neue",
  headerBgColor: "#ff4d4f", // Rojo para el encabezado
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#ff4d4f", // Rojo para los globos del bot
  botFontColor: "#fff",
  userBubbleColor: "#444444", // Gris oscuro para los globos del usuario
  userFontColor: "#fff",
};

const steps = [
  {
    id: "1",
    message: "Hola, ¿cómo puedo ayudarte hoy?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "¿Qué productos ofrecen?", trigger: "3" },
      { value: 2, label: "¿Cómo realizar un pago?", trigger: "4" },
      { value: 3, label: "¿Cómo funciona MercadoPago?", trigger: "5" },
      { value: 4, label: "¿Quíenes son tus creadores?", trigger: "6" },
    ],
  },
  {
    id: "3",
    message:
      "Ofrecemos una variedad de productos como remeras, buzos, pantalones, entre otros.",
    trigger: "2",
  },
  {
    id: "4",
    message:
      "Puedes realizar un pago usando MercadoPago, una plataforma segura y confiable.",
    trigger: "2",
  },
  {
    id: "5",
    message:
      "MercadoPago es nuestro método de pago integrado. Es rápido, seguro y fácil de usar.",
    trigger: "2",
  },
  {
    id: "6",
    message:
      "Mis creadores son Sebastian, Luciano y Martin. Los quiero mucho por ofrecerme la oportunidad de trabajar aquí :)",
    trigger: "2",
  },
  {
    id: "7",
    message: "Lo siento, no puedo ayudarte con eso en este momento.",
    trigger: "2",
  },
];

const Chatbot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
      <button className="close-button" onClick={toggleChat}>
        <CloseIcon />
      </button>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          handleEnd={({ steps, values }) => {
            console.log(steps, values);
          }}
          recognitionEnable={true}
        />
      </ThemeProvider>
    </div>
  );
};

export default Chatbot;
