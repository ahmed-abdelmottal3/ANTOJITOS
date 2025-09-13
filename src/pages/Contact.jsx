import { useForm } from "react-hook-form";
import Hero from "../components/Hero";
import contact from "../assets/contact.webp";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Hero title={"Contact Us"} img={contact} />

      <section className="bg-gray-100 py-16">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] m-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Get in Touch
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5"
          >
            <label className="flex flex-col w-full">
              <span className="sr-only">E-mail</span>
              <input
                type="email"
                placeholder="Enter Your E-mail"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-[#fbbf24] ${
                    errors.email ? "border-rose-500" : "border-gray-300"
                  }`}
              />
              {errors.email && (
                <span role="alert" className="text-rose-500 mt-1 text-sm">
                  {errors.email.message}
                </span>
              )}
            </label>

            <label className="flex flex-col w-full">
              <span className="sr-only">Password</span>
              <input
                type="password"
                placeholder="Enter Your Password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Required",
                  minLength: {
                    value: 8,
                    message: "Should be at least 8 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-[#fbbf24] ${
                    errors.password ? "border-rose-500" : "border-gray-300"
                  }`}
              />
              {errors.password && (
                <span role="alert" className="text-rose-500 mt-1 text-sm">
                  {errors.password.message}
                </span>
              )}
            </label>

            <label className="flex flex-col w-full">
              <span className="sr-only">Phone</span>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                {...register("phone", {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-[#fbbf24] ${
                    errors.phone ? "border-rose-500" : "border-gray-300"
                  }`}
              />
              {errors.phone && (
                <span role="alert" className="text-rose-500 mt-1 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </label>

            <label className="flex flex-col w-full">
              <span className="sr-only">Message</span>
              <textarea
                rows={4}
                placeholder="Write your message..."
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message should be at least 10 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border placeholder-gray-500 resize-none
                  focus:outline-none focus:ring-2 focus:ring-[#fbbf24] ${
                    errors.message ? "border-rose-500" : "border-gray-300"
                  }`}
              ></textarea>
              {errors.message && (
                <span role="alert" className="text-rose-500 mt-1 text-sm">
                  {errors.message.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-[#fbbf24] font-semibold hover:bg-[#d9a20c] cursor-pointer text-white disabled:opacity-60 transition-all duration-300"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
