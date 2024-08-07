import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const ToastifyToShow = ({ message, backgroundColour }) => {
  Toastify({
    text: message,
    duration: 3000,
    destination: null,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: backgroundColour ? backgroundColour : "#1565c0",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    onClick: function() {},
  }).showToast();

  return null;
};

export default ToastifyToShow;
