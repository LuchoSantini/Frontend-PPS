import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import { useEffect, useState } from "react";
import { getProducts, getUsers } from "./components/Api/ApiServices";
import ProductsManagement from "./components/Admin/Products/ProductsManagement";
import UsersManagement from "./components/Admin/Users/UsersManagement";
import CheckAdmin from "./context/CheckAdmin";
import OrdersManagement from "./components/Admin/Orders/OrdersManagement";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await getProducts();
        const resUsers = await getUsers();
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
              {" "}
              <UsersManagement users={users} loading={loading} />
            </CheckAdmin>
          }
        />
        <Route path="*" element={<Home />} />

        <Route
          path="/admin/ordenes"
          element={
            <CheckAdmin>
              {" "}
              <OrdersManagement />
            </CheckAdmin>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
