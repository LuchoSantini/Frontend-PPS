import React from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import { useNavigate } from "react-router-dom";

const UserDisplayMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <div>
      <Typography variant="h5">Welcome, {user.firstName}</Typography>
      <Typography>{user.email}</Typography>
      {user.role === "admin" && (
        <Button variant="contained" onClick={handleAdminClick}>
          Administrar
        </Button>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserDisplayMenu;
