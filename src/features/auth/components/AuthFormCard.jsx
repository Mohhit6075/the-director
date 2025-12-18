import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function AuthFormCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
  showGoogleSignIn = false,
  onGoogleSignIn,
  error,
  loading,
  image,
  reverse = false,
}) {
  return (
    <div className="h-[90%] flex items-center justify-center pt-32">
      <div className="flex h-full flex-col lg:flex-row w-[90%] max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div
          className={`hidden w-full lg:block lg:w-1/2 relative ${
            reverse ? "lg:order-last" : ""
          }`}
        >
          <img
            src={image}
            alt="Auth background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#ffad33] mb-3 font-serif tracking-wide">
                {title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <p className="text-xs sm:text-sm text-red-600 font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Form Content */}
            <div className="mb-6">{children}</div>

            {/* Google Sign In Button */}
            {showGoogleSignIn && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={onGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                >
                  <FcGoogle style={{ width: "1.25rem", height: "1.25rem" }} />
                  <span className="text-sm sm:text-base">
                    Sign {title?.toLowerCase().includes("log") ? "in" : "up"}{" "}
                    with Google
                  </span>
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <span
                    className="border-2 border-gray-600 border-t-transparent rounded-full animate-spin"
                    style={{ width: "1rem", height: "1rem" }}
                  ></span>
                  <span>Processing...</span>
                </div>
              </div>
            )}

            {/* Footer Link */}
            {footerText && footerLinkText && footerLinkTo && (
              <div className="text-center pt-4 md:pt-6">
                <p className="text-sm text-gray-700">
                  {footerText}{" "}
                  <Link
                    to={footerLinkTo}
                    className="text-[#ffad33] font-semibold hover:text-yellow-600 hover:underline transition-colors ml-1"
                  >
                    {footerLinkText}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
