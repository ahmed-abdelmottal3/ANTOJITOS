import { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function UP() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisibility);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-[#fbbf24] text-white p-3 rounded-full shadow-lg transition-all duration-500 hover:bg-[#d69e0b] ${
        isVisible ? "opacity-100" : "opacity-0 "
      }`}
    >
      <ArrowUp size={24} />
    </button>
  );
}
