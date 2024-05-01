import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ApiCalls from "./components/ApiCalls/ApiCalls";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ApiCalls/>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
