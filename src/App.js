import "./App.css";
import Home from "./pages/HomePage";
import Shop from "./shop/ShopPage";
import Detail from "./pages/DetailPage";
import Cart from "./pages/CartPage";
import CheckOut from "./pages/CheckOutPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
