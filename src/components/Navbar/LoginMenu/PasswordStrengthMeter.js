import React from "react";
import zxcvbn from "zxcvbn";
import { LinearProgress, Typography } from "@mui/material";

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const score = testResult.score;

  const getColor = (score) => {
    switch (score) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
      case 4:
        return "green";
      default:
        return "red";
    }
  };

  const getLabel = (score) => {
    switch (score) {
      case 0:
        return "Muy débil";
      case 1:
        return "Débil";
      case 2:
        return "Aceptable";
      case 3:
        return "Fuerte";
      case 4:
        return "Muy Fuerte";
      default:
        return "";
    }
  };

  const num = (score * 100) / 4;
  const color = getColor(score);
  const label = getLabel(score);

  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <Typography variant="body2" gutterBottom>
        Fortaleza de la contraseña: {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={num}
        style={{
          backgroundColor: "#e0e0e0",
          height: "10px",
          borderRadius: "5px",
        }}
        sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />
    </div>
  );
};

export default PasswordStrengthMeter;
