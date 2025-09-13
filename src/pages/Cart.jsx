import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Hero from "../components/Hero";
import cartImg from "../assets/cart.webp";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, remove, setCart } from "../store/cartSlice";

const getRandomPrice = (id) => {
  const min = 5;
  const max = 20;
  return ((id * 7) % (max - min + 1)) + min;
};

export default function Cart() {
  const reduxItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || reduxItems || []
  );

  useEffect(() => {
    if (reduxItems && reduxItems.length) {
      const withPrices = reduxItems.map((it) => ({
        ...it,
        price: it.price || getRandomPrice(it.id),
      }));
      setCartItems(withPrices);
      localStorage.setItem("cartItems", JSON.stringify(withPrices));
    }
  }, [reduxItems]);

  useEffect(() => {
    const update = () => {
      const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
      const withPrices = stored.map((it) => ({
        ...it,
        price: it.price || getRandomPrice(it.id),
      }));
      setCartItems(withPrices);
      dispatch(setCart(withPrices));
    };
    window.addEventListener("cartUpdated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cartUpdated", update);
      window.removeEventListener("storage", update);
    };
  }, [dispatch]);

  const handleIncrement = (id) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const total = (cartItems || []).reduce(
    (acc, it) => acc + (it.price || 0) * (it.qty || 0),
    0
  );

  return (
    <>
      <Hero title={"Cart"} img={cartImg} />
      <div className=" bg-[#f9f9f9] py-12 flex flex-col">
        <div className="w-[90%] max-w-6xl m-auto flex flex-col flex-grow">
          <h1 className="text-lg md:text-3xl font-bold mb-12 text-center text-[#3d3d3d]">
            Your <span className="text-[#fbbf24]">Cart</span>
          </h1>

          {!cartItems || cartItems.length === 0 ? (
            <p className="flex flex-col text-center text-gray-600 text-lg mt-20 flex-grow">
              Your cart is empty.
              <NavLink
                to="/products"
                className="flex items-center justify-center w-[60%] sm:w-[20%] mt-5 m-auto bg-[#fbbf24] hover:bg-[#d69e0b] text-white py-3 rounded-lg font-medium shadow-lg transition-all duration-300"
              >
                Continue Shopping
              </NavLink>
            </p>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 flex-grow">
              <div className="md:w-2/3 flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={item.img || item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#3d3d3d]">
                        {item.name}
                      </h2>
                      <p className="text-gray-600">
                        Price: ${item.price ? item.price.toFixed(2) : "0.00"}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium">{item.qty}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-4"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="md:w-1/3 bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#3d3d3d]">
                    Summary
                  </h2>
                  <p className="text-gray-700 mb-2 font-medium">
                    Total Items:{" "}
                    {cartItems.reduce((acc, it) => acc + (it.qty || 0), 0)}
                  </p>
                  <p className="text-gray-700 mb-6 font-semibold text-lg">
                    Total Price: ${total.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <button className="w-full bg-[#fbbf24] hover:bg-[#d69e0b] text-white py-3 rounded-lg font-medium shadow-lg transition-all duration-300">
                    Checkout
                  </button>
                  <NavLink
                    to="/products"
                    className="block text-center text-[#3d3d3d] hover:underline"
                  >
                    Continue Shopping
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
