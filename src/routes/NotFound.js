import { Result } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/theme/theme.context";

function NotFound() {
    const { theme, isDarkMode } = useContext(ThemeContext);
  return (
    <div>
      <Result
        status="404"
        title={<p style={{color:isDarkMode ? "#ffff" : "black"}}>404</p>}
        subTitle={<p style={{color:isDarkMode ? "#ffff" : "black"}}>Parece que estás intentando acceder a una página que no existe.</p>}
        extra={
          <Link to={"/"} style={{ fontSize: 18 }}>
            Volver al inicio
          </Link>
        }
      />
    </div>
  );
}

export default NotFound;
