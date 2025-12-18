import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { useToast } from "../components/ui/Toast";
import { BiSolidStar } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

const Wishlist = () => {
  const toast = useToast();
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Gucci duffle bag",
      image: "/images/products/p.jpg",
      price: 960,
      originalPrice: 1160,
      discount: "-35%",
      rating: 4.5,
      reviews: 65,
    },
    {
      id: 2,
      name: "RGB liquid CPU Cooler",
      image: "/images/products/p1.jpg",
      price: 1960,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 65,
    },
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      image: "/images/products/p2.jpg",
      price: 550,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 55,
    },
    {
      id: 4,
      name: "Quilted Satin Jacket",
      image: "/images/products/p3.png",
      price: 750,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 55,
    },
  ]);

  const recommendations = [
    {
      id: 5,
      name: "ASUS FHD Gaming Laptop",
      image: "/images/products/p3.png",
      price: 960,
      originalPrice: 1160,
      discount: "-35%",
      rating: 5,
      reviews: 325,
      isNew: false,
    },
    {
      id: 6,
      name: "IPS LCD Gaming Monitor",
      image: "/images/products/p2.jpg",
      price: 1160,
      originalPrice: 1160,
      rating: 5,
      reviews: 99,
      isNew: false,
    },
    {
      id: 7,
      name: "HAVIT HV-G92 Gamepad",
      image: "/images/products/p1.jpg",
      price: 560,
      originalPrice: 1160,
      rating: 5,
      reviews: 88,
      isNew: true,
    },
    {
      id: 8,
      name: "AK-900 Wired Keyboard",
      image: "/images/products/p4.jpg",
      price: 200,
      originalPrice: 1160,
      rating: 3,
      reviews: 75,
      isNew: false,
    },
  ];

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.error("Removed from wishlist", { type: "success" });
  };

  const handleAddToCart = () => {
    toast.show(`Added to cart`, { type: "success" });
  };

  const handleMoveAllToBag = () => {
    toast.show("All items moved to cart", { type: "success" });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < rating ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"
            }
          >
            <BiSolidStar />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className=" mx-auto py-20 min-h-screen mt-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mb-14 px-4 md:px-6 mx-auto text-sm flex gap-2 text-yellow-400/60">
        <Link
          to="/home"
          className="text-[#ffad33]/70 hover:text-[#ffad33] transition-colors"
        >
          Home
        </Link>
        <span>/</span>
        <span className="text-[#ffad33]">Wishlist</span>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
        {/* Wishlist Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
            <p className="text-[#ffad33] text-lg md:text-xl lg:text-2xl font-bold">
              Wishlist ({wishlistItems.length})
            </p>
          </div>

          <button
            onClick={handleMoveAllToBag}
            className="px-8 py-3 text-white rounded bg-[#fd4444] hover:bg-red-600 transition-colors font-medium"
          >
            Move All To Bag
          </button>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white/5 rounded-lg p-12 text-center">
            <IoMdHeartEmpty className="w-20 h-20 mx-auto mb-4 text-white/30" />
            <h2 className="text-2xl font-medium text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-white/60 mb-6">
              Add items you like to your wishlist
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 transition-transform duration-300">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-lg overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative rounded-md overflow-hidden ">
                  {item.discount && (
                    <span className="absolute top-1 md:top-2 lg:top-3 left-1 md:left-2 lg:left-3 bg-[#fd4444] text-white text-xs px-1 md:px-2 lg:px-3 py-1 rounded z-10">
                      {item.discount}
                    </span>
                  )}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-1 md:top-2 lg:top-3 right-1 md:right-2 lg:right-3 flex flex-col gap-2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                  >
                    <IoTrashOutline className="text-gray-700 text-lg" />
                  </button>
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover aspect-square "
                    />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="absolute bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                  >
                    <IoCartOutline className="w-5 h-5" />
                    <span>Add To Cart</span>
                  </button>
                </div>

                {/* Product Info */}
                <div className="py-2 md:py-3 lg:py-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-bold text-sm md:text-base lg:text-lg text-[#ffad33] mb-2 hover:text-[#ffad33]/80 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#fd4444] text-sm md:text-base lg:text-lg font-bold">
                      ${item.price?.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-gray-300 line-through text-xs md:text-sm">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    {renderStars(item.rating)}
                    <span className="text-xs md:text-sm text-gray-500">
                      ({item.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Just For You Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
            <p className="text-[#ffad33] text-lg md:text-xl lg:text-2xl font-bold">
              Just For You
            </p>
          </div>

          <button className="px-8 py-3 text-white rounded bg-[#fd4444] hover:bg-red-600 transition-colors font-medium">
            See All
          </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 transition-transform duration-300">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative rounded-md overflow-hidden">
                {item.discount && (
                  <span className="absolute top-1 md:top-2 lg:top-3 left-1 md:left-2 lg:left-3 bg-[#fd4444] text-white text-xs px-1 md:px-2 lg:px-3 py-1 rounded z-10">
                    {item.discount}
                  </span>
                )}
                <button className="absolute top-1 md:top-2 lg:top-3 right-1 md:right-2 lg:right-3 flex flex-col gap-2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                  <BsEye className="text-gray-700 text-lg" />
                </button>

                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full aspect-square object-cover "
                  />
                </Link>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                >
                  <IoCartOutline className="w-5 h-5" />
                  <span>Add To Cart</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="py-2 md:py-3 lg:py-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-bold text-sm md:text-base lg:text-lg text-[#ffad33] mb-2 hover:text-[#ffad33]/80 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#fd4444] text-sm md:text-base lg:text-lg font-bold">
                    ${item.price?.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-gray-300 line-through text-xs md:text-sm">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  {renderStars(item.rating)}
                  <span className="text-xs md:text-sm text-gray-500">
                    ({item.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
