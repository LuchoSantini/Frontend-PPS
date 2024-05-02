import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import PostProducts from "./components/ApiCalls/PostProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<PostProducts />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
