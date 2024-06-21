// src/components/Navbar/Navbar.js
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useMediaQuery, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/store/authSlice";
import ProductSearchDrawer from "../Admin/Products/Visualization/ProductSearchDrawer";
import UserIcon from "./UserIcon";
import CartIcon from "../Cart/CartIcon";

const Navbar = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [placement, setPlacement] = useState("");
  const isMobile = useMediaQuery("(max-width: 632px)");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  console.log(token)
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
          background: "#76949F",
          alignItems: "center",
          height: 27,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            textAlign: "center",
            margin: 0,
          }}
        >
          <p style={{ lineHeight: 0, color: "#fff" }}>20% OFF Codigo: OT2024</p>
        </div>
      </div>

      <div
        style={{
          display: "block",
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 1000,
          marginTop: 27,
          background: "#fff",
        }}
      >
        {isMobile ? (
          <div>
            <div
              style={{
                padding: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <SearchOutlined
                  style={{ fontSize: 30 }}
                  onClick={showDrawerSearch}
                />
              </div>
              <div>
                <Link to="/">
                  <img
                    style={{ width: 80 }}
                    src="https://dcdn.mitiendanube.com/stores/001/990/290/themes/common/logo-1889664424-1714051930-78818b5f4cbb4833eec760c042855ff01714051930-320-0.webp"
                  />
                </Link>
              </div>
              <div style={{ display: "flex" }}>
                <UserIcon token={token} handleLogout={handleLogout} />
                <CartIcon /> {/* Utilizar el CartIcon */}
              </div>
            </div>
          </div>
        ) : (
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
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#abbec4";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "black";
                }}
                onClick={showDrawerSearch}
              />
            </Box>
            <div>
              <Link to="/">
                <img
                  style={{ width: 80 }}
                  src="https://dcdn.mitiendanube.com/stores/001/990/290/themes/common/logo-1889664424-1714051930-78818b5f4cbb4833eec760c042855ff01714051930-320-0.webp"
                />
              </Link>
            </div>
            <div style={{ display: "flex" }}>
              <UserIcon token={token} handleLogout={handleLogout} />
              <CartIcon /> {/* Utilizar el CartIcon */}
            </div>
          </Box>
        )}
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
