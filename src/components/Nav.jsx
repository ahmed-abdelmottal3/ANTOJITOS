import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const reduxCart = useSelector((state) => state.cart?.items ?? []);
  const [totalQty, setTotalQty] = useState(() =>
    (reduxCart.length
      ? reduxCart
      : JSON.parse(localStorage.getItem("cartItems") || "[]")
    ).reduce((a, b) => a + (b.qty || 0), 0)
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    const handleStorage = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const source =
      reduxCart && reduxCart.length
        ? reduxCart
        : JSON.parse(localStorage.getItem("cartItems") || "[]");
    const qty = source.reduce((acc, item) => acc + (item.qty || 0), 0);
    setTotalQty(qty);
  }, [reduxCart]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(updatedUser);
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/login");
  };

  const CustomLink = ({ to, children, isButton, onClick }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isButton
          ? isActive
            ? "bg-[#fbbf24] text-black px-4 py-2 rounded-md font-semibold"
            : "text-white border border-[#fbbf24] px-4 py-2 rounded-md hover:bg-[#fbbf24] hover:text-black transition"
          : isActive
          ? "text-[#fbbf24] font-semibold"
          : "text-white hover:text-[#fbbf24] transition-colors"
      }
      onClick={() => {
        setMenuOpen(false);
        if (onClick) onClick();
      }}
    >
      {children}
    </NavLink>
  );

  const navLinks = (
    <>
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/about">About</CustomLink>
      <CustomLink to="/products">Products</CustomLink>
      <CustomLink to="/services">Services</CustomLink>
      <CustomLink to="/contact">Contact Us</CustomLink>

      {currentUser ? (
        <button
          onClick={handleLogout}
          className="text-white border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      ) : (
        <CustomLink to="/login" isButton>
          Login
        </CustomLink>
      )}

      <NavLink
        to="/cart"
        className="relative text-white hover:text-[#fbbf24]"
        onClick={() => setMenuOpen(false)}
      >
        <ShoppingCart size={24} />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-3 bg-[#fbbf24] text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
            {totalQty}
          </span>
        )}
      </NavLink>
    </>
  );

  return (
    <nav
      className={`fixed z-[1000] w-full transition-colors duration-500 ${
        isScrolled ? "bg-[#3d3d3d] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-[90%] m-auto py-3">
        <div className="flex items-center text-white gap-3">
          <img
            className={`transition-all duration-700 ${
              isScrolled ? "w-[100px]" : "w-[70px]"
            }`}
            src={logo}
            alt="Logo"
          />
          <h3 className="text-xl font-bold">ANTAJITOS</h3>
        </div>

        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#3d3d3d] flex flex-col items-center gap-6 py-6">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
