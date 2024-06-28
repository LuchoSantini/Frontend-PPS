import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import "./Chatbot.css";

const theme = {
  background: "#333333",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#ff4d4f",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#ff4d4f",
  botFontColor: "#fff",
  userBubbleColor: "#444444",
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
      { value: 4, label: "¿Quiénes son tus creadores?", trigger: "6" },
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
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          setIsOpen(false);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
      <button className="close-button" onClick={toggleChat}>
        <CloseIcon />
      </button>
      {initialized && (
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            handleEnd={({ steps, values }) => {
              console.log(steps, values);
            }}
          />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Chatbot;
