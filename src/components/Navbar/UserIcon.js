import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Button } from "antd";
import LoginForm from "./LoginMenu/LoginForm";
import SignupForm from "./LoginMenu/SignupForm";
import { jwtDecode } from "jwt-decode";

const UserIcon = ({ token, handleLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    } else {
      setUserData(null);
    }
  }, [token]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <div>
          {userData && (
            <>
              {userData.name} {userData.surname}
              <br />
              {userData.email}
            </>
          )}
        </div>
      </Menu.Item>
      {userData && userData.role === "Admin" && (
        <Menu.Item>
          <Button href="/admin" type="link">
            Panel de Administrador
          </Button>
        </Menu.Item>
      )}
      <Menu.Item onClick={handleLogout}>Cerrar Sesión</Menu.Item>
    </Menu>
  );

  return (
    <>
      {token ? (
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <UserOutlined style={{ fontSize: 30 }} className="buttons-navbar" />
        </Dropdown>
      ) : (
        <UserOutlined
          style={{ fontSize: 30 }}
          className="buttons-navbar"
          onClick={handleOpenModal}
        />
      )}
      <Modal
        title={showLoginForm ? "Iniciar Sesión" : "Registrarse"}
        visible={showModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        {showLoginForm ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <SignupForm toggleForm={toggleForm} />
        )}
      </Modal>
    </>
  );
};

export default UserIcon;
