import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import { ShoppingCart } from "lucide-react";
import hero from "../assets/hero.jpg";
import { Utensils, ChefHat, BookOpen } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function Home() {
  const [myData, setMyData] = useState([]);
  const dispatch = useDispatch();

  async function fetchData() {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();
    console.log(data);
    setMyData(data.recipes);
  }

  useEffect(() => {
    fetchData();
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

  return (
    <>
      <Hero
        title={
          <>
            <h1 className="text-xl font-medium">WELCOME TO</h1>
            <span className="text-[#fbbf24] font-bold text-4xl">ANTOJITOS</span>
          </>
        }
        img={hero}
      />

      {/* Recipes Section */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 text-center border-b border-[#b9b9b9] w-[30%] m-auto pb-3">
          Recipes
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myData.slice(0, 6).map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-xl flex flex-col justify-between h-[430px] group"
            >
              <NavLink
                to={`/ProductsDetails/${recipe.id}`}
                className="relative overflow-hidden rounded-t-2xl"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              </NavLink>

              <div className="p-5 flex flex-col flex-grow transition-transform duration-500 group-hover:-translate-y-1">
                <h2 className="text-lg font-bold text-[#3d3d3d] mb-2 group-hover:text-[#fbbf24] transition-colors duration-500">
                  {recipe.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {recipe.instructions.slice(0, 100)}...
                </p>
              </div>

              <div className="p-4 border-t">
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

        <div className="flex items-center justify-center mt-8">
          <NavLink to={`/products`}>
            <button className="text-[white] bg-[#fbbf24] cursor-pointer py-1.5 px-5 rounded-lg hover:bg-transparent hover:border hover:border-[#fbbf24] hover:text-[#fbbf24] hover:px-8 transition-all duration-300">
              See All Recipes
            </button>
          </NavLink>
        </div>
      </div>

      {/* Chefs Section */}
      <div className="p-10 mb-10 bg-[#f9f9f9]">
        <h1 className="text-3xl font-bold mb-6 text-center border-b border-[#b9b9b9] w-[30%] m-auto pb-3">
          Our Chefs
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              name: "Chef Maria",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
              bio: "Specialist in Italian cuisine and fresh homemade pasta.",
            },
            {
              id: 2,
              name: "Chef John",
              img: "https://randomuser.me/api/portraits/men/46.jpg",
              bio: "Expert in BBQ and grilled recipes with unique flavors.",
            },
            {
              id: 3,
              name: "Chef Aisha",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
              bio: "Loves creating desserts that bring smiles to every table.",
            },
          ].map((chef) => (
            <div
              key={chef.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform flex flex-col items-center text-center p-6"
            >
              <img
                src={chef.img}
                alt={chef.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-[#fbbf24]"
              />
              <h2 className="text-xl font-semibold">{chef.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{chef.bio}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#3d3d3d] py-16">
        <h1 className="text-3xl font-bold mb-12 text-center text-white">
          What Our Customers Say
        </h1>

        <section className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              name: "Sarah L.",
              review:
                "Absolutely love the recipes here! Easy to follow and taste amazing. My family is always happy when I cook from ANTAJITOS.",
              img: "https://randomuser.me/api/portraits/women/50.jpg",
            },
            {
              id: 2,
              name: "Michael B.",
              review:
                "The chefs are incredible! I tried the Italian pasta recipe from Chef Maria and it was restaurant-quality.",
              img: "https://randomuser.me/api/portraits/men/30.jpg",
            },
            {
              id: 3,
              name: "Amira K.",
              review:
                "A wonderful platform with great design. Easy to navigate and very inspiring recipes. Highly recommended!",
              img: "https://randomuser.me/api/portraits/women/20.jpg",
            },
          ].map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full border-4 border-[#fbbf24] mb-4 object-cover shadow-md"
              />
              <p className="text-gray-200 italic mb-4 leading-relaxed">
                "{testimonial.review}"
              </p>
              <h3 className="font-semibold text-lg text-[#fbbf24]">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </section>
      </div>

      {/* Featured Products Section */}
      <section className="my-12 w-[90%] m-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myData.slice(6, 9).map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col h-[500px] group"
            >
              <div className="relative overflow-hidden h-64">
                <NavLink
                  to={`/ProductsDetails/${recipe.id}`}
                  className="block w-full h-full"
                >
                  <img
                    src={recipe.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </NavLink>

                <NavLink
                  to={`/ProductsDetails/${recipe.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors duration-300"
                >
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-white"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                      </svg>
                    </div>
                  </div>
                </NavLink>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-[#3d3d3d] mb-2">
                  {recipe?.name ?? "Untitled"}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {recipe.instructions
                    ? `${recipe.instructions.slice(0, 100)}...`
                    : "No description available."}
                </p>
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={() => handleAdd(recipe)}
                  className="w-full flex items-center justify-center cursor-pointer gap-2 bg-[#04ac4f] text-white py-2 rounded-lg font-medium hover:bg-[#047e3b] transition-all duration-300"
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
        </div>
      </section>

      {/* Features Section */}
      <div className="bg-[#fff8e7] py-16">
        <h1 className="text-3xl font-bold mb-12 text-center text-[#3d3d3d]">
          Why Choose <span className="text-[#fbbf24]">ANTOJITOS</span>
        </h1>

        <section className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              id: 1,
              title: "Delicious & Healthy",
              desc: "All recipes are designed to be both tasty and nutritious, giving you the best of both worlds.",
              icon: <Utensils className="w-12 h-12 text-[#fbbf24]" />,
            },
            {
              id: 2,
              title: "Trusted Chefs",
              desc: "Our chefs bring years of experience and creativity to every recipe.",
              icon: <ChefHat className="w-12 h-12 text-[#fbbf24]" />,
            },
            {
              id: 3,
              title: "Easy to Follow",
              desc: "Step-by-step instructions that anyone can follow, whether beginner or pro.",
              icon: <BookOpen className="w-12 h-12 text-[#fbbf24]" />,
            },
          ].map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl text-[#3d3d3d] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Categories Section */}
      <div className="bg-[#f9f9f9] py-16">
        <h1 className="text-3xl font-bold mb-12 text-center text-[#3d3d3d]">
          Explore by <span className="text-[#fbbf24]">Categories</span>
        </h1>

        <section className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              id: 1,
              name: "Dinner",
              img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800&auto=format&fit=crop",
            },
            {
              id: 2,
              name: "Lunch",
              img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
            },
            {
              id: 3,
              name: "Snacks",
              img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop",
            },
            {
              id: 4,
              name: "Desserts",
              img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
            },
          ].map((category) => (
            <div
              key={category.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="w-full h-64">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Blog Section */}
      <div className="bg-gradient-to-r from-[#fbbf24]/10 to-[#fff] py-15">
        <h1 className="text-4xl font-extrabold mb-16 text-center text-[#3d3d3d]">
          Latest <span className="text-[#fbbf24]">Articles</span>
        </h1>

        <section className="w-[85%] mx-auto space-y-10">
          {[
            {
              id: 1,
              title: "10 Tips for Healthy Cooking",
              desc: "Learn how to make your meals healthier without losing the taste and joy of food.",
              img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=80",
            },
            {
              id: 2,
              title: "The Secret Behind Perfect Pasta",
              desc: "Discover how our chefs prepare pasta that tastes like it came straight from Italy.",
              img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80",
            },
            {
              id: 3,
              title: "Top 5 Desserts for Any Occasion",
              desc: "Sweet treats that are perfect for birthdays, gatherings, or just a cozy night at home.",
              img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
            },
          ].map((article, index) => (
            <div
              key={article.id}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500`}
            >
              {/* الصورة */}
              <div className="md:w-1/2 w-full h-64 md:h-80 overflow-hidden">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* النص */}
              <div className="md:w-1/2 w-full p-8">
                <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-base mb-6">{article.desc}</p>
                <button className="px-5 py-2 bg-[#fbbf24] text-white font-medium rounded-lg hover:bg-[#d89e0d] transition-all">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
