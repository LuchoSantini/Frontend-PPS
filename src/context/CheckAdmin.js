import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const CheckAdmin = ({ children }) => {
  const navigate = useNavigate();

  const checkAdminRole = () => {
    // Obtener el token de las cookies
    const token = Cookies.get("token");

    if (!token) {
      return false; // Manejar el caso en el que no hay token en las cookies
    }

    // Decodificar el token
    try {
      const decodedToken = jwtDecode(token);

      // Verificar el rol del usuario
      return decodedToken.role === "Admin";
    } catch (error) {
      return false; // Manejar errores al decodificar el token
    }
  };

  // Redirigir si el usuario no es un administrador
  useEffect(() => {
    if (!checkAdminRole()) {
      // Si el usuario no es un administrador, redirigir a la página principal
      navigate("/");
    }
  }, [checkAdminRole, navigate]);

  // Renderiza el componente hijo solo si el usuario es un administrador
  return checkAdminRole() ? children : null;
};

export default CheckAdmin;
