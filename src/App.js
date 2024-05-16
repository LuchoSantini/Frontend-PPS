import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import ProductsManagement from "./components/ProductsManagement.js/ProductsManagement";
import UsersManagement from "./components/UsersManagement/UsersManagement";
import { useEffect, useState } from "react";
import { getProducts, getUsers } from "./components/Api/ApiServices";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await getProducts();
        const resUsers = await getUsers();
        setProducts(resProducts.data);
        setUsers(resUsers.data)
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/productos" element={<ProductsManagement products={products} loading={loading} />} />
        <Route path="/admin/usuarios" element={<UsersManagement users={users} loading={loading} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
