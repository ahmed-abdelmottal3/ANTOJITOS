import Hero from "../components/Hero";
import { Heart, Award, Users } from "lucide-react";
import about from "../assets/about.webp";

export default function About() {
  return (
    <>
      <Hero title={"About Us"} img={about} />
      <section className="bg-[#f9f9f9] py-20">
        <div className="w-[90%] max-w-6xl mx-auto flex flex-col md:flex-row items-center mt-20 gap-12">
          <div className="flex-1 group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800&auto=format&fit=crop"
              alt="About ANTAJITOS"
              className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex-1 text-[#3d3d3d]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-[#fbbf24]">ANTAJITOS</span>
            </h2>
            <p className="text-lg md:text-xl mb-4 leading-relaxed">
              At <span className="font-semibold">ANTAJITOS</span>, we believe in
              creating simple, practical, and high-quality products that make
              everyday life better. Our mission is to provide our customers with
              items that combine modern design with functionality, always
              ensuring the best user experience.
            </p>
            <p className="text-lg md:text-xl mb-6 leading-relaxed">
              Since our launch, we've been passionate about delivering value,
              focusing on details, and staying true to our commitment:
              <span className="italic text-[#fbbf24]">
                {" "}
                simplicity, quality, and trust.{" "}
              </span>
            </p>

            <button className="px-8 py-3 bg-[#fbbf24] text-white rounded-lg font-medium hover:bg-[#d69e0b] shadow-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="w-[85%] max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Our <span className="text-[#fbbf24]">Values</span>
          </h2>

          <div className="relative border-l-4 border-[#fbbf24] pl-12 space-y-12 text-left">
            <div className="relative">
              <span className="absolute -left-[38px] top-0 bg-[#fbbf24] text-white p-3 rounded-full shadow-md">
                <Heart className="w-6 h-6" />
              </span>
              <div className="pl-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Passion for Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every product we make is crafted with love, care, and
                  attention to detail to ensure the best experience for you.
                </p>
              </div>
            </div>

            <div className="relative">
              <span className="absolute -left-[38px] top-0 bg-[#22c55e] text-white p-3 rounded-full shadow-md">
                <Award className="w-6 h-6" />
              </span>
              <div className="pl-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Commitment to Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We constantly strive to innovate and improve, bringing you
                  only the highest standards of products and services.
                </p>
              </div>
            </div>

            <div className="relative">
              <span className="absolute -left-[38px] top-0 bg-[#3b82f6] text-white p-3 rounded-full shadow-md">
                <Users className="w-6 h-6" />
              </span>
              <div className="pl-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Customer First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our customers are at the heart of everything we do. Your trust
                  and satisfaction drive us forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
