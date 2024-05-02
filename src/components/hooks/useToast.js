import { useState, useCallback } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [toastType, setToastType] = useState("info");

  const showToast = useCallback((title, message, type = "info") => {
    setTitle(title);
    setMessage(message);
    setToastType(type);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000); // Auto-hide after 3000ms
  }, []);

  const renderToast = () => {
    if (!isVisible) return null;

    return (
      <div
        className="position-fixed top-0 start-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <Toast
          onClose={() => setIsVisible(false)}
          show={isVisible}
          delay={3000}
          autohide
        >
          <ToastHeader icon={toastType}>{title}</ToastHeader>
          <ToastBody>{message}</ToastBody>
        </Toast>
      </div>
    );
  };

  return { showToast, renderToast };
};

export default useToast;
