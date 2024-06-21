import { Modal, Button, Tabs, Tag, Avatar, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Subscribe, UnSubscribe, getUserByEmail } from "../Api/ApiServices";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function UserProfile({ showUserProfile, handleClose, userData }) {
  const email = userData.email;
  const [isSubscribe, setIsSubscribe] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserByEmail(email);
        console.log(res);
        setIsSubscribe(res.data.notification);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, [email]);

  const handleSubscribe = async () => {
    try {
      const response = await Subscribe(email);
      console.log("Subscribed successfully", response);
      setIsSubscribe(true);
    } catch (error) {
      console.error("Error subscribing", error);
    }
  };

  const handleUnSubscribe = async () => {
    try {
      const response = await UnSubscribe(email);
      console.log("Unsubscribed successfully", response);
      setIsSubscribe(false);
    } catch (error) {
      console.error("Error unsubscribing", error);
    }
  };

  return (
    <>
      {showUserProfile && (
        <Modal
          visible={showUserProfile}
          onCancel={handleClose}
          footer={[
            <Button key="close" type="primary" onClick={handleClose}>
              Cerrar
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Perfil" key="1">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                      marginBottom: "10px",
                    }}
                    icon={<UserOutlined />}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "left", marginRight: "20px" }}>
                      <p>
                        <strong>Nombre:</strong>
                      </p>
                      <p>
                        <strong>Apellido:</strong>
                      </p>
                      <p>
                        <strong>Email:</strong>
                      </p>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p>{userData.name}</p>
                      <p>{userData.surname}</p>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "left" }}>
                  {isSubscribe ? (
                    <Popconfirm
                      placement="topLeft"
                      description="¿Quieres desubscribirte a notificaciones?"
                      okText="Si"
                      cancelText="No"
                      onConfirm={handleUnSubscribe}
                    >
                      <Tag style={{ cursor: "pointer" }}>
                        Desubscribirse a notificaciones
                      </Tag>
                    </Popconfirm>
                  ) : null}
                </div>
              </div>
            </TabPane>
            <TabPane tab="Órdenes" key="2">
              <div>
                <h3>Pedidos Recientes</h3>
                <ul>
                  <li>Orden #1: Producto A - Cantidad: 2 - Precio: $20</li>
                  <li>Orden #2: Producto B - Cantidad: 1 - Precio: $10</li>
                  <li>Orden #3: Producto C - Cantidad: 3 - Precio: $30</li>
                </ul>
              </div>
            </TabPane>
          </Tabs>
        </Modal>
      )}
    </>
  );
}

export default UserProfile;
