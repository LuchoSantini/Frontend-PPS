import { Modal, Button, Tabs, Tag, Avatar, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Subscribe, UnSubscribe, getUserByEmail } from "../Api/ApiServices";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function UserProfile({ showUserProfile, handleClose, userData, orders }) {
  const email = userData.email;
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(0); // Estado para almacenar el precio total de la orden
  const { token } = useSelector((state) => state.auth);

  const handleFetchUser = async () => {
    try {
      const res = await getUserByEmail(email);
      console.log(res);
      setIsSubscribe(res.data.notification);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    if (email) {
      handleFetchUser();
    }
  }, [email]);

  const handleUnSubscribe = async () => {
    try {
      const response = await UnSubscribe(email, token);
      console.log("Unsubscribed successfully", response);
      setIsSubscribe(false);
    } catch (error) {
      console.error("Error unsubscribing", error);
    }
  };

  // Función para formatear la fecha a dd/mm/aa
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Calcular el precio total de la orden
  const calculatePrecioTotal = (order) => {
    let total = 0;
    if (order && order.orderLines && order.orderLines.length > 0) {
      order.orderLines.forEach((line) => {
        total += line.quantity * line.unitPrice;
      });
    }
    return total.toLocaleString();
  };

  const columns = [
    {
      title: "Número de Orden",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Fecha de Orden",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text, record) => <span>{formatDate(record.updatedAt)}</span>,
    },
    {
      title: "Descripción",
      dataIndex: "orderLines",
      key: "orderLines",
      render: (orderLines) => (
        <ul>
          {orderLines.map((line, index) => (
            <li key={index}>{line.description}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Cantidad",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Color",
      dataIndex: "orderLines",
      key: "color",
      render: (orderLines) => (
        <ul>
          {orderLines.map((line, index) => (
            <li key={index}>{line.color.colourName}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Tamaño",
      dataIndex: "orderLines",
      key: "size",
      render: (orderLines) => (
        <ul>
          {orderLines.map((line, index) => (
            <li key={index}>
              {line.size.sizeName} x ({line.quantity})
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Precio Total",
      dataIndex: "precioTotal",
      key: "precioTotal",
      render: (text, record) => <span>${calculatePrecioTotal(record)}</span>,
    },
  ];
  
  
  return (
    <>
      {showUserProfile && (
        <Modal
          width={1000}
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
                  {!isSubscribe ? (
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
                <Table
                  columns={columns}
                  dataSource={orders}
                  rowKey={(record) => record.id}
                  pagination={false}
                  scroll={{x:800}}
                />
              </div>
            </TabPane>
          </Tabs>
        </Modal>
      )}
    </>
  );
}

export default UserProfile;
