import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import products from "../assets/products.webp";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function Products() {
  const [myData, setMyData] = useState([]);
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

  async function FetchData() {
    try {
      let res = await fetch("https://dummyjson.com/recipes");
      let data = await res.json();

      const fixedData = (data.recipes || []).map((item) => ({
        ...item,
        price: Math.floor(Math.random() * 50) + 10,
      }));

      setMyData(fixedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    FetchData();
  }, []);

  const addLocalCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: (item.qty || 0) + 1 } : item
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAdd = (product) => {
    if  (!currentUser) {
      alert("You must be logged in to add items to the cart.");
      navigate('/login');
      return;
    }else{
      
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price || 0,
          img: product.image,
          qty: 1,
        })
      );
      addLocalCart({
        id: product.id,
        name: product.name,
        price: product.price || 0,
        image: product.image,
        qty: 1,
      });
  };
}

  const categories = ["All", "Dinner", "Lunch", "Snack", "Dessert"];

  const filteredData =
    filter === "All"
      ? myData
      : myData.filter((recipe) => recipe.mealType.includes(filter));

  return (
    <>
      <Hero title={"ALL Products"} img={products} />

      <div className="w-[90%] m-auto mb-10">
        <section className="p-10">
          <h1 className="text-3xl font-bold mb-6 text-center border-b border-[#b9b9b9] w-[30%] m-auto pb-3">
            All Recipes
          </h1>
        </section>

        <section className="flex flex-wrap gap-5 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`py-1 px-5 rounded-2xl transition-all duration-300 cursor-pointer 
                ${
                  filter === cat
                    ? "bg-[#fbbf24] text-white shadow-md"
                    : "bg-transparent border border-[#cccccc] text-black hover:bg-[#fbbf24] hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-xl group flex flex-col justify-between h-[420px]"
            >
              <NavLink
                to={`/ProductsDetails/${recipe.id}`}
                className="flex-grow relative"
              >
                <div className="overflow-hidden rounded-t-2xl relative">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#fbbf24] transition-colors duration-500">
                    {recipe.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {recipe.instructions.slice(0, 100)}...
                  </p>
                  <p className="text-lg font-bold text-[#fbbf24]">
                    ${recipe.price}
                  </p>
                </div>
              </NavLink>

              <div className="p-4 border-t group">
                <button
                  onClick={() => handleAdd(recipe)}
                  className="w-full flex items-center justify-center cursor-pointer gap-2 bg-[#fbbf24] text-white py-2 rounded-lg font-medium hover:bg-[#d69e0b] transition-all duration-300"
                >
                  <ShoppingCart
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
