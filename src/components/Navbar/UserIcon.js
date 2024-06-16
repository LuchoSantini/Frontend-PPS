import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Button } from "antd";
import LoginForm from "./LoginMenu/LoginForm";
import SignupForm from "./LoginMenu/SignupForm";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
const UserIcon = ({ token, handleLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

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

  const handleOpenUserProfile = () => {
      setShowUserProfile(true)
  }
  const handleCloseUserProfile = () => {
    setShowUserProfile(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleOpenUserProfile}>
        <div>
          {userData && (
            <a style={{color:"black"}} >
              Mi perfil
            </a>
          )}
        </div>
      </Menu.Item>
      {userData && userData.role === "Admin" && (
        <Menu.Item key="2">
          <a href="/admin" type="link">
          Panel de Administrador
          </a>
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleLogout}>
       <a>Cerrar Sesión</a> 
      </Menu.Item>
    </Menu>
  );

  return (
    <>
    {
      showUserProfile && <UserProfile
          showUserProfile={showUserProfile}
          handleClose={handleCloseUserProfile}
          userData={userData}
        />
    }
      {token ? (
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <UserOutlined
            style={{ fontSize: 30 }}
            className="buttons-navbar"
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#abbec4";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "black";
            }}
          />
        </Dropdown>
      ) : (
        <UserOutlined
          style={{ fontSize: 30 }}
          className="buttons-navbar"
          onClick={handleOpenModal}
        />
      )}
      <Modal visible={showModal} onCancel={handleCloseModal} footer={null}>
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
