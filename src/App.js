import "./App.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./shared/Navbar";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Privateroute from "./shared/Privateroute";
import Footer from "./shared/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/product-list" element={<ProductList />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route
          path="/wishlist"
          element={
            <Privateroute>
              <Wishlist />
            </Privateroute>
          }
        ></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
      <ToastContainer position="top-center"
        autoClose={2000} />
      <Footer />
    </div>
  );
}

export default App;
