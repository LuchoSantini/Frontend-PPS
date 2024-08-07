import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ProductMapped from "./Products/ProductMapped/ProductMapped";
import { Box, useMediaQuery } from "@mui/material";
import { Tag, Popover, Popconfirm } from "antd";
import { BellOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  Subscribe,
  getOrdersApproved,
  getUserByEmail,
  postOrderLineApi,
} from "../Api/ApiServices"; // Importa postOrderLineApi
import ToastifyToShow from "../hooks/Effects/ToastifyToShow";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import api from "../Api/Api";
import Footer from "./Footer";

const Home = ({ products }) => {
  const [isTagVisible, setIsTagVisible] = useState(true);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const email = userData?.email;
  const isMobile = useMediaQuery("(max-width:632px)");
  const { token } = useSelector((state) => state.auth);
  const [queryParams, setQueryParams] = useState({});
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParamsObj = {};
    params.forEach((value, key) => {
      queryParamsObj[key] = value;
    });
    setQueryParams(queryParamsObj);
  }, [location]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    } else {
      setUserData(null);
    }
  }, [token]);

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        const res = await api.put(
          `/api/MercadoPago/paymentStatus?preferenceId=${queryParams.preference_id}&status=${queryParams.status}`,
          null,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSubscribe(res.data.notification);
      } catch (error) {
        console.error("Error", error);
      }
    };

    if (Object.keys(queryParams).length > 0) {
      updateOrderStatus();
    }
  }, [queryParams, token]); // Añade token como dependencia

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserByEmail(email, token);
        setIsSubscribe(res.data.notification);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email, token]); // Añade token como dependencia

  const handleCloseTag = () => {
    setIsTagVisible(false);
  };

  const handleTagClick = () => {
    setIsPopoverVisible(false);
  };

  const handlePopoverVisibleChange = (visible) => {
    setIsPopoverVisible(visible);
  };

  const handleSubscribe = async () => {
    try {
      const response = await Subscribe(email, token);
      console.log("Subscribed successfully", response);
      setIsSubscribe(true);
      ToastifyToShow({ message: "Te has suscrito!" });
    } catch (error) {
      console.error("Error subscribing", error);
      ToastifyToShow({ message: "Inténtalo más tarde" });
    }
  };

  const contentNotification = (
    <div style={{ width: 250, textAlign: "center", fontSize: 14 }}>
      <p>
        Te enviaremos a tu correo registrado notificaciones de los productos en
        oferta.
      </p>
      <p>
        Puedes gestionar tus preferencias de notificación en la configuración de
        tu cuenta.
      </p>
    </div>
  );

  return (
    <div>
      <Navbar products={products} />

      {token && !isSubscribe && isTagVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Popconfirm
            placement="topLeft"
            description="¿Quieres suscribirte a notificaciones?"
            okText="Sí"
            cancelText="No"
            onConfirm={handleSubscribe}
          >
            <Popover
              content={contentNotification}
              placement="topRight"
              visible={isPopoverVisible}
              onVisibleChange={handlePopoverVisibleChange}
            >
              <Tag
                closable
                onClose={handleCloseTag}
                closeIcon={<CloseOutlined />}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={handleTagClick}
                icon={
                  <BellOutlined
                    style={{ marginRight: "2px", fontSize: "14px" }}
                  />
                }
              >
                Suscribirse a notificaciones
              </Tag>
            </Popover>
          </Popconfirm>
        </div>
      )}

      <ProductMapped isMobile={isMobile} />
    </div>
  );
};

export default Home;
