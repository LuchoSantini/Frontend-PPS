import React, { useContext, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useMediaQuery, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import ProductSearchDrawer from "../Admin/Products/Visualization/ProductSearchDrawer";
import UserIcon from "./UserIcon";
import CartIcon from "../Cart/CartIcon";
import { ThemeContext } from "../../context/theme/theme.context";
import { getOrdersApproved } from "../Api/ApiServices";
import ToggleTheme from "../../context/theme/ToggleTheme";

const Navbar = ({ products }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [placement, setPlacement] = useState("");
  const isMobile = useMediaQuery("(max-width: 632px)");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  //console.log(token);
  const showDrawerSearch = () => {
    setOpen(true);
    setTitle("Buscar productos");
    setPlacement("left");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        style={{
          display: "block",
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: isDarkMode ? "#0E1113" : "#fafafa",
        }}
      >
        <Box
          style={{
            alignItems: "center",
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              fontSize: 30,
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <SearchOutlined
              style={{ fontSize: 30, transition: "all 0.3s ease" }}
              onClick={showDrawerSearch}
            />
            <ToggleTheme />
          </Box>
          <div>
            <Link to="/">
              <img
                style={{ width: 80 }}
                src={`${process.env.PUBLIC_URL}/resources/navbaricon-${
                  isDarkMode ? "dark" : "light"
                }.png`}
              />
            </Link>
          </div>
          <Box sx={{ display: "flex" }}>
            <UserIcon tokenUser={token} handleLogout={handleLogout} />
            <CartIcon />
          </Box>
        </Box>
        <ProductSearchDrawer
          title={title}
          placement={placement}
          open={open}
          products={products}
          onClose={() => {
            setOpen(false);
          }}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};

export default Navbar;
