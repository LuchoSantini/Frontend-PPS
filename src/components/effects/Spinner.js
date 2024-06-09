import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div style={{ marginTop: "9px" }}>
      <CircularProgress size={35} thickness={5} color="primary" />
    </div>
  );
};

export default Spinner;
