import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import { useContext, useEffect, useState } from "react";
import { getProducts, getUsers } from "./components/Api/ApiServices";
import ProductsManagement from "./components/Admin/Products/Visualization/ProductsManagement";
import UsersManagement from "./components/Admin/Users/UsersManagement";
import CheckAdmin from "./context/CheckAdmin";
import OrdersManagement from "./components/Admin/Orders/OrdersManagement";
import ProductDetail from "./components/Home/Products/ProductMapped/ProductDetail";
import { ThemeContext } from "./context/theme/theme.context";
import "./App.css"; // Asegúrate de importar tus estilos CSS
import FloatingButton from "./components/bot/FloatingButton";
import { useSelector } from "react-redux";
import Footer from "./components/Home/Footer";
import { Box } from "@mui/material";
import { MarginTwoTone } from "@mui/icons-material";

function App() {
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await getProducts();
        const resUsers = await getUsers(token);
        setProducts(resProducts.data);
        setUsers(resUsers.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route
            path="/admin"
            element={
              <CheckAdmin>
                <Admin />
              </CheckAdmin>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <CheckAdmin>
                <ProductsManagement products={products} loading={loading} />
              </CheckAdmin>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <CheckAdmin>
                <UsersManagement users={users} loading={loading} />
              </CheckAdmin>
            }
          />
          <Route path="*" element={<Home products={products} />} />
          <Route
            path="/admin/ordenes"
            element={
              <CheckAdmin>
                <OrdersManagement />
              </CheckAdmin>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                products={products}
                loading={loading}
                tokenUser={token}
              />
            }
          />
        </Routes>
        <FloatingButton />
      </BrowserRouter>
      <Box
        sx={{
          marginBottom: "0px",
          marginTop: "auto",
          position: "auto",
          width: "100%",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
