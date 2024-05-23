// AccountForm.js

import React, { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AccountForm = () => {
  const [open, setOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose} closeAfterTransition={true}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {showLoginForm ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <SignupForm toggleForm={toggleForm} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AccountForm;
