import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ResetConfirm from "./pages/ResetConfirm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useAuth } from "./context/AuthContext";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Returns from "./pages/Returns";
import Wishlist from "./pages/Wishlist";
import Cancellations from "./pages/Cancellations";
import HomeWithFlashSales from "./pages/HomeWithFlashSales";
import Reviews from "./pages/Reviews";

const App = () => {
  return (
    <div className="h-screen overflow-x-hidden flex flex-col gap-20 relative">
      <div className="fixed inset-0 bg-[url('/images/ui/bg.jpg')] bg-cover bg-center bg-no-repeat -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <Navbar />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-confirm" element={<ResetConfirm />} />
          <Route
            path="/home"
            element={
              <ProfileWrapper>
                <HomeWithFlashSales />
              </ProfileWrapper>
            }
          />
          <Route
            path="/account/:section"
            element={
              <ProfileWrapper>
                <Account />
              </ProfileWrapper>
            }
          />
          <Route
            path="/account/orders"
            element={
              <ProfileWrapper>
                <Orders />
              </ProfileWrapper>
            }
          />
          <Route
            path="/account/returns"
            element={
              <ProfileWrapper>
                <Returns />
              </ProfileWrapper>
            }
          />
          <Route
            path="/account/cancellations"
            element={
              <ProfileWrapper>
                <Cancellations />
              </ProfileWrapper>
            }
          />
          <Route
            path="/account/reviews"
            element={
              <ProfileWrapper>
                <Reviews />
              </ProfileWrapper>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProfileWrapper>
                <Wishlist />
              </ProfileWrapper>
            }
          />
          <Route
            path="/cart"
            element={
              <ProfileWrapper>
                <Cart />
              </ProfileWrapper>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProfileWrapper>
                <Checkout />
              </ProfileWrapper>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

function ProfileWrapper({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login with the current path as redirect parameter
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children ? children : <Account />;
}
