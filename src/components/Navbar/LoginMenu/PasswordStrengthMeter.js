import React from "react";
import zxcvbn from "zxcvbn";
import { Typography, Box, Stack } from "@mui/material";

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const score = testResult.score;

  const getColor = (index) => {
    if (password.length === 0) return "lightgray";
    switch (index) {
      case 0:
        return score >= 1 ? "red" : "lightgray";
      case 1:
        return score >= 2 ? "orange" : "lightgray";
      case 2:
        return score >= 3 ? "yellow" : "lightgray";
      case 3:
        return score >= 4 ? "green" : "lightgray";
      default:
        return "lightgray";
    }
  };

  const getLabel = (score) => {
    switch (score) {
      case 0:
        return "Nula";
      case 1:
        return "Muy Débil";
      case 2:
        return "Débil";
      case 3:
        return "Aceptable";
      case 4:
        return "Fuerte";
      default:
        return "";
    }
  };

  const label = getLabel(score);

  return (
    <Box
      sx={{
        right: "20px",
        bottom: "20px",
        width: "300px",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "15px",
        zIndex: 1000,
      }}
    >
      <Typography variant="body2" gutterBottom>
        Fortaleza de la contraseña: {label}
      </Typography>
      <Stack direction="row" spacing={0.5}>
        {[0, 1, 2, 3].map((index) => (
          <Box
            key={index}
            sx={{
              flexGrow: 1,
              height: "10px",
              borderRadius: "5px",
              backgroundColor: getColor(index),
            }}
          />
        ))}
      </Stack>
      <Typography
        variant="caption"
        display="block"
        style={{ marginTop: "10px" }}
      >
        Para hacer tu contraseña más segura utiliza más de 8 caracteres, una
        mayúscula, un número y un símbolo.
      </Typography>
    </Box>
  );
};

export default PasswordStrengthMeter;
