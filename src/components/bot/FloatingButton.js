import React, { useState } from "react";
import "./FloatingButton.css";
import Chatbot from "./Chatbot";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="floating-button" onClick={toggleChat}>
        🤖
      </button>
      {isOpen && <Chatbot onClose={toggleChat} />}
    </div>
  );
};

export default FloatingButton;
