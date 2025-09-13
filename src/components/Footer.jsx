import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#3d3d3d] text-slate-100 pt-10 pb-6">
      <div className="w-[90%] m-auto px-4 flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <img className="w-[60px]" src={logo} alt="Logo" />
            <h3 className="text-lg font-bold">ANTAJITOS</h3>
          </div>
          <p className="text-sm text-gray-300 text-center md:text-left max-w-xs">
            Bringing you the best flavors with fast delivery and fresh
            ingredients.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h4 className="text-md font-semibold">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <NavLink to="/" className="hover:text-[#fbbf24] transition">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-[#fbbf24] transition">
              About
            </NavLink>
            <NavLink to="/products" className="hover:text-[#fbbf24] transition">
              Products
            </NavLink>
            <NavLink to="/contact" className="hover:text-[#fbbf24] transition">
              Contact
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h4 className="text-md font-semibold">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#fbbf24] transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-[#fbbf24] transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-[#fbbf24] transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ffffff50] mt-8 pt-4 text-center text-sm text-[white]">
        © {new Date().getFullYear()} ANTAJITOS. All rights reserved.
      </div>
    </footer>
  );
}
