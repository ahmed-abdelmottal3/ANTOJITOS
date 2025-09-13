import { NavLink } from "react-router-dom";
import error from "../assets/error.webp";
import Hero from "../components/Hero";
export default function Error() {
  return (
    <>
      <Hero
        title={
          <>
            <h1 className="text-9xl font-bold text-[#fbbf24] mb-6">404</h1>
          </>
        }
        img={error}
      />

      <div className="flex flex-col items-center justify-center bg-[#f9f9f9] py-20">
        <h2 className="text-3xl font-semibold text-[#3d3d3d] mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The page you are looking for doesn’t exist or has been moved. Go back
          to the homepage to continue browsing.
        </p>
        <NavLink
          to="/"
          className="px-6 py-3 bg-[#fbbf24] text-white font-medium rounded-lg shadow-md hover:bg-[#d69e0b] transition-all duration-300"
        >
          Go Home
        </NavLink>
      </div>
    </>
  );
}
