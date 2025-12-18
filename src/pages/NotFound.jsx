import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#ffad33] mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#ffad33]">
          Page Not Found
        </h2>
        <p className="text-white/80 my-8">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-[#fd4444] text-white/90 rounded-md font-medium transition hover:bg-red-600 "
        >
          Back To Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
