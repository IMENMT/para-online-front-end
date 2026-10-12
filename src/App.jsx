import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Messages from "./pages/Messages";

import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import { CartProvider } from "./context/CartContext";
import { UnreadMessagesProvider } from "./context/UnreadMessagesContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UnreadMessagesProvider>
          <CartProvider>
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />

              <Route
                path="/messages"
                element={
                  <AdminRoute>
                    <Messages />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />
            </Routes>
          </CartProvider>
        </UnreadMessagesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;