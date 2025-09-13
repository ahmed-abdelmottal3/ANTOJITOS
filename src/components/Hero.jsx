
export default function Hero({img, title }) {
  return (
    <div className="relative w-full ">
      <img className="w-full h-full" src={img} alt="hero" />

      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold flex flex-col items-center">
          {title}
        </h1>
      </div>
    </div>
  );
}
