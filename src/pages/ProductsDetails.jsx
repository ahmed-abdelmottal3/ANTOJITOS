import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import details from "../assets/details.webp";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { ShoppingCart } from "lucide-react";

export default function ProductsDetails() {
  const params = useParams();
  const [myData, setMyData] = useState(null);
  const dispatch = useDispatch();

async function fetchData() {
  const res = await fetch(`https://dummyjson.com/recipes/${params.id}`);
  const data = await res.json();

  const fixed = {
    ...data,
    price: Math.floor(Math.random() * 50) + 10,
  };

  setMyData(fixed);
}

  useEffect(() => {
    fetchData();
  }, [params.id]);

  if (!myData)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

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
    dispatch(
      addToCart({
        id: myData.id,
        name: myData.name,
        img: myData.image,
        price: myData.price,
        qty: 1,
      })
    );
    addLocalCart({
      id: myData.id,
      name: myData.name,
      img: myData.image,
      price: myData.price,
      qty: 1,
    });
  };

  return (
    <>
      <Hero title={"Product Details"} img={details} />

      <div className="w-[90%] max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-extrabold text-center text-[#3d3d3d] mb-10">
          {myData.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-white shadow-xl rounded-2xl p-6 flex justify-center">
            <img
              className="w-[450px] max-w-full rounded-xl object-cover"
              src={myData.image}
              alt={myData.name}
            />
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-5">
            <p className="text-lg">
              <b>Rating:</b> ⭐ {myData.rating}
            </p>
            <p className="text-lg">
              <b>Cuisine:</b> {myData.cuisine}
            </p>

            <div>
              <b className="block mb-2">Ingredients:</b>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {myData.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div>
              <b className="block mb-2">Instructions:</b>
              <p className="text-gray-600 leading-relaxed">
                {myData.instructions}
              </p>
            </div>

            <p>
              <b>Meal Type:</b>{" "}
              <span className="text-yellow-500 font-medium">
                {myData.mealType}
              </span>
            </p>

            <p>
              <b>Prep Time:</b> {myData.prepTimeMinutes} Minutes
            </p>

            <button
              onClick={() => handleAdd(myData)}
              className="mt-4 flex items-center justify-center gap-2 bg-[#fbbf24] text-white py-3 rounded-lg font-semibold hover:bg-[#d69e0b] transition-all duration-300"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
