import Hero from "../components/Hero";
import {
  Truck,
  Leaf,
  PhoneCall,
  Rocket,
  Apple,
  Headphones,
} from "lucide-react";
import service from "../assets/services.webp";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Fast Delivery",
      desc: "Get your order delivered quickly and on time.",
      icon: <Truck className="w-12 h-12 text-[#fbbf24]" />,
    },
    {
      id: 2,
      title: "Fresh Ingredients",
      desc: "We use only the freshest and finest ingredients.",
      icon: <Leaf className="w-12 h-12 text-[#22c55e]" />,
    },
    {
      id: 3,
      title: "24/7 Support",
      desc: "Our support team is available any time you need.",
      icon: <PhoneCall className="w-12 h-12 text-[#3b82f6]" />,
    },
  ];

  return (
    <>
      <Hero title={"Services"} img={service} />

      <section className="bg-gray-100 py-16">
        <div className="w-[80%] m-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 mb-12">
            We always strive to provide the best experience for our customers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-[#fbbf24]/10 to-[#3b82f6]/10 py-20">
        <div className="w-[80%] mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Makes Us Special
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We don’t just serve food, we create an experience that keeps you
            coming back.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#fbbf24] text-white group-hover:scale-110 transition">
                <Rocket className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800 group-hover:text-[#fbbf24] transition">
                Fast Delivery
              </h3>
              <p className="text-gray-600 mt-2">
                Your food, hot and fresh, delivered right to your doorstep in
                minutes.
              </p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#22c55e] text-white group-hover:scale-110 transition">
                <Apple className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800 group-hover:text-[#22c55e] transition">
                Healthy Ingredients
              </h3>
              <p className="text-gray-600 mt-2">
                We source only the freshest organic ingredients for your meals.
              </p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#3b82f6] text-white group-hover:scale-110 transition">
                <Headphones className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800 group-hover:text-[#3b82f6] transition">
                Always Here
              </h3>
              <p className="text-gray-600 mt-2">
                Need help? Our support team is available 24/7 to assist you
                anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
