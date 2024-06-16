import { Modal, Button, Divider, Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

function UserProfile({ showUserProfile, handleClose, userData }) {
  console.log(userData);
  return (
    <>
      {showUserProfile && (
        <Modal
          title="Perfil de Usuario"
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
              <div style={{ display: "flex", gap: 50, justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Nombre: {userData.name}</span>
                  <span>Apellido: {userData.surname}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Email: {userData.email}</span>
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
