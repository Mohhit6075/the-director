import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowUpLong } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import {
  IoChevronBack,
  IoChevronForward,
  IoCartOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { BiSolidStar } from "react-icons/bi";
import { useToast } from "../components/ui/Toast";
import { GoShieldCheck } from "react-icons/go";

export default function HomeWithFlashSales() {
  const toast = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flashSaleIndex, setFlashSaleIndex] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 1, name: "Woman's Fashion", hasSubmenu: true },
    { id: 2, name: "Men's Fashion", hasSubmenu: true },
    { id: 3, name: "Electronics", hasSubmenu: false },
    { id: 4, name: "Home & Lifestyle", hasSubmenu: false },
    { id: 5, name: "Medicine", hasSubmenu: false },
    { id: 6, name: "Sports & Outdoor", hasSubmenu: false },
    { id: 7, name: "Baby's & Toys", hasSubmenu: false },
    { id: 8, name: "Groceries & Pets", hasSubmenu: false },
    { id: 9, name: "Health & Beauty", hasSubmenu: false },
  ];

  const banners = [
    {
      id: 1,
      title: "iPhone 14 Series",
      discount: "Up to 10% off Voucher",
      image: "/images/products/p1.jpg",
      link: "/category/1",
    },
    {
      id: 2,
      title: "New Collection",
      discount: "Up to 20% off Voucher",
      image: "/images/products/p2.jpg",
      link: "/category/2",
    },
  ];

  const flashSaleProducts = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      originalPrice: 160,
      discount: 40,
      rating: 5,
      reviews: 88,
      image: "/images/products/p1.jpg",
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      originalPrice: 1160,
      discount: 35,
      rating: 4,
      reviews: 75,
      image: "/images/products/p2.jpg",
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: 370,
      originalPrice: 400,
      discount: 30,
      rating: 5,
      reviews: 99,
      image: "/images/products/p3.png",
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      price: 375,
      originalPrice: 400,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      image: "/images/products/p4.jpg",
    },
    {
      id: 5,
      name: "S-Series Comfort Chair",
      price: 375,
      originalPrice: 400,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      image: "/images/products/p.jpg",
    },
  ];

  const handleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      toast.show("Removed from wishlist", { type: "error" });
    } else {
      setWishlist([...wishlist, productId]);
      toast.show("Added to wishlist", { type: "success" });
    }
  };

  const handleAddToCart = () => {
    toast.show("Added to cart", { type: "success" });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < rating
                ? "text-yellow-400 text-xs md:text-sm"
                : "text-gray-300 text-xs md:text-sm"
            }
          >
            <BiSolidStar />
          </span>
        ))}
      </div>
    );
  };

  const productsPerView = 4;
  const maxIndex = Math.max(0, flashSaleProducts.length - productsPerView);

  const handlePrevFlashSale = () => {
    setFlashSaleIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextFlashSale = () => {
    setFlashSaleIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col gap-20 py-20 mt-12">
        <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-5 lg:gap-16 px-4 md:px-5 lg:px-6 mx-auto">
          {/* Sidebar Categories */}

          <div className=" grid grid-cols-1 gap-4 order-last md:order-first">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center justify-between text-[#ffad33] tracking-wider text-nowrap gap-2 group cursor-pointer transition-colors hover:text-yellow-400`}
              >
                <span>{category.name}</span>
                {category.hasSubmenu && <IoChevronForward />}
              </div>
            ))}
          </div>

          {/* Hero Banner */}
          <div className="col-span-12 md:col-span-3 lg:col-span-4 relative  rounded-lg overflow-hidden">
            <div className="relative w-full overflow-hidden">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={` rounded-md transition-all delay-700 overflow-hidden ${
                    index === currentSlide ? "block" : "hidden"
                  }`}
                >
                  <div className="w-full flex justify-between bg-[#19191a] gap-4 items-center h-full pl-4 md:pl-6 lg:pl-12">
                    <div className="w-full flex flex-col z-10">
                      <p className="text-[#fd4444] text-xs md:text-sm mb-4">
                        {banner.title}
                      </p>
                      <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#ffad33] mb-3 md:mb-4 lg:mb-8 leading-tight">
                        {banner.discount}
                      </h2>
                      <Link
                        to={banner.link}
                        className="w-32 text-nowrap flex items-center group gap-2 text-white hover:text-[#ffad33] transition-colors"
                      >
                        <span className="group-hover:underline text-sm md:text-base lg:text-lg">
                          Shop Now
                        </span>
                        <span className="group-hover:pl-1 pl-0 transition-all">
                          <IoChevronForward />
                        </span>
                      </Link>
                    </div>

                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover aspect-square overflow-hidden "
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x400?text=Banner";
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-[#fd4444]" : "bg-gray-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sales Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
          <div className="flex items-end justify-between mb-8">
            <div className="flex items-end gap-16 md:gap-12 lg:gap-20">
              <div>
                <div className="flex items-center gap-2 lg:gap-4 mb-2 lg:mb-4">
                  <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
                  <p className="text-[#fd4444] text-lg lg:text-xl font-bold">
                    Today's
                  </p>
                </div>
                <h2 className="text-2xl lg:text-4xl font-extrabold text-[#ffad33]">
                  Flash Sales
                </h2>
              </div>
              <div className="flex gap-1 md:gap-2 lg:gap-4 items-end">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Days</p>
                  <p className="lg:text-3xl md:text-2xl text-xl font-bold text-[#fff]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </p>
                </div>
                <span className="lg:text-3xl md:text-2xl text-xl text-[#fd4444] font-bold">
                  :
                </span>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Hours</p>
                  <p className="lg:text-3xl md:text-2xl text-xl font-bold text-[#fff]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </p>
                </div>
                <span className="lg:text-3xl md:text-2xl text-xl text-[#fd4444] font-bold">
                  :
                </span>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Minutes</p>
                  <p className="lg:text-3xl md:text-2xl text-xl font-bold text-[#fff]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </p>
                </div>
                <span className="lg:text-3xl md:text-2xl text-xl text-[#fd4444] font-bold">
                  :
                </span>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Seconds</p>
                  <p className="lg:text-3xl md:text-2xl text-xl font-bold text-[#fff]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={handlePrevFlashSale}
                disabled={flashSaleIndex === 0}
                className={`p-3 rounded-full ${
                  flashSaleIndex === 0
                    ? "bg-white cursor-not-allowed"
                    : "bg-white hover:bg-gray-200"
                } transition-colors`}
              >
                <IoChevronBack className="text-black text-xl" />
              </button>
              <button
                onClick={handleNextFlashSale}
                disabled={flashSaleIndex >= maxIndex}
                className={`p-3 rounded-full ${
                  flashSaleIndex >= maxIndex
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-white hover:bg-gray-200"
                } transition-colors`}
              >
                <IoChevronForward className="text-black text-xl" />
              </button>
            </div>
          </div>

          {/* Flash Sale Products */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 transition-transform duration-300"
              style={{
                transform: `translateX(-${
                  flashSaleIndex * (100 / productsPerView + 1.5)
                }%)`,
              }}
            >
              {flashSaleProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-lg overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative rounded-md overflow-hidden ">
                    <span className="absolute top-1 md:top-2 lg:top-3 left-1 md:left-2 lg:left-3 bg-[#fd4444] text-white text-xs px-1 md:px-2 lg:px-3 py-1 rounded z-10">
                      -{product.discount}%
                    </span>

                    <div className="absolute top-1 md:top-2 lg:top-3 right-1 md:right-2 lg:right-3 flex flex-col gap-2 z-10">
                      <button
                        onClick={() => handleWishlist(product.id)}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                      >
                        {wishlist.includes(product.id) ? (
                          <IoMdHeart className="text-[#fd4444] text-base md:text-lg" />
                        ) : (
                          <IoMdHeartEmpty className="text-gray-700 text-base md:text-lg" />
                        )}
                      </button>
                      <Link to={`/product/${product.id}`}>
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                          <IoEyeOutline className="text-gray-700 text-base md:text-lg" />
                        </button>
                      </Link>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full aspect-square object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=Product";
                        }}
                      />
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                    >
                      <IoCartOutline className="w-5 h-5" />
                      <span>Add To Cart</span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="py-2 md:py-3 lg:py-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-sm md:text-base lg:text-lg text-[#ffad33] mb-2 hover:text-[#ffad33]/80 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#fd4444] text-sm md:text-base lg:text-lg font-bold">
                        ${product.price}
                      </span>
                      <span className="text-gray-300 line-through text-xs md:text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      {renderStars(product.rating)}
                      <span className="text-xs md:text-sm text-gray-300">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* View All Products Button */}
            <div className="text-center mt-12">
              <Link
                to="/category/1"
                className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-3 lg:py-4 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors font-medium"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
        {/* Best Selling Products */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
          <div className="flex items-end justify-between mb-4 lg:mb-8">
            <div>
              <div className="flex items-center gap-2 lg:gap-4 mb-2 lg:mb-4">
                <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
                <p className="text-[#fd4444] text-lg lg:text-xl font-bold">
                  This Month
                </p>
              </div>
              <h2 className="text-2xl lg:text-4xl font-extrabold text-[#ffad33]">
                Best Selling Products
              </h2>
            </div>
            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={handlePrevFlashSale}
                disabled={flashSaleIndex === 0}
                className={`p-3 rounded-full ${
                  flashSaleIndex === 0
                    ? "bg-white cursor-not-allowed"
                    : "bg-white hover:bg-gray-200"
                } transition-colors`}
              >
                <IoChevronBack className="text-black text-xl" />
              </button>
              <button
                onClick={handleNextFlashSale}
                disabled={flashSaleIndex >= maxIndex}
                className={`p-3 rounded-full ${
                  flashSaleIndex >= maxIndex
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-white hover:bg-gray-200"
                } transition-colors`}
              >
                <IoChevronForward className="text-black text-xl" />
              </button>
            </div>
          </div>

          {/* Best Selling Products */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 transition-transform duration-300"
              style={{
                transform: `translateX(-${
                  flashSaleIndex * (100 / productsPerView + 1.5)
                }%)`,
              }}
            >
              {flashSaleProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-lg overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative rounded-md overflow-hidden ">
                    <span className="absolute top-1 md:top-2 lg:top-3 left-1 md:left-2 lg:left-3 bg-[#fd4444] text-white text-xs px-1 md:px-2 lg:px-3 py-1 rounded z-10">
                      -{product.discount}%
                    </span>

                    <div className="absolute top-1 md:top-2 lg:top-3 right-1 md:right-2 lg:right-3 flex flex-col gap-2 z-10">
                      <button
                        onClick={() => handleWishlist(product.id)}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                      >
                        {wishlist.includes(product.id) ? (
                          <IoMdHeart className="text-[#fd4444] text-base md:text-lg" />
                        ) : (
                          <IoMdHeartEmpty className="text-gray-700 text-base md:text-lg" />
                        )}
                      </button>
                      <Link to={`/product/${product.id}`}>
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                          <IoEyeOutline className="text-gray-700 text-base md:text-lg" />
                        </button>
                      </Link>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full aspect-square object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=Product";
                        }}
                      />
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                    >
                      <IoCartOutline className="w-5 h-5" />
                      <span>Add To Cart</span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="py-2 md:py-3 lg:py-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-sm md:text-base lg:text-lg text-[#ffad33] mb-2 hover:text-[#ffad33]/80 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#fd4444] text-sm md:text-base lg:text-lg font-bold">
                        ${product.price}
                      </span>
                      <span className="text-gray-300 line-through text-xs md:text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      {renderStars(product.rating)}
                      <span className="text-xs md:text-sm text-gray-300">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* View All Products Button */}
            <div className="text-center mt-12">
              <Link
                to="/category/1"
                className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-3 lg:py-4 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors font-medium"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
        {/* Promotional Banner - Enhance Your Experience */}
        <section className="max-w-5xl px-3 md:px-4 lg:px-6 mx-auto mt-20 overflow-hidden">
          <div className="grid grid-cols-2 items-center gap-12 p-4 md:p-4 lg:p-8 bg-[#19191a]  rounded-lg overflow-hidden">
            {/* Left Content */}
            <div className="flex flex-col p-0 lg:p-6 md:p-4 ">
              <p className=" text-xs md:text-sm mb-4 tracking-wide text-[#fd4444]">
                Categories
              </p>

              <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#ffad33] mb-3 md:mb-4 lg:mb-8 leading-tight">
                Enhance Your <br /> Experience
              </h2>

              {/* Countdown Timer */}
              <div className="flex gap-2 md:gap-2 lg:gap-3 mb-5 md:mb-8 lg:mb-10">
                <div className="bg-white rounded-full w-10 h-10 md:w-12 lg:w-16 md:h-12 lg:h-16 flex flex-col items-center justify-center">
                  <p className="text-black font-bold text-sm md:text-base lg:text-lg">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </p>
                  <p className="text-black font-semibold text-[8px] md:text-[10px]">
                    Hour
                  </p>
                </div>
                <div className="bg-white rounded-full w-10 h-10 md:w-12 lg:w-16 md:h-12 lg:h-16 flex flex-col items-center justify-center">
                  <p className="text-black font-bold text-sm md:text-base lg:text-lg">
                    {String(timeLeft.days).padStart(2, "0")}
                  </p>
                  <p className="text-black font-semibold text-[8px] md:text-[10px]">
                    Day
                  </p>
                </div>
                <div className="bg-white rounded-full w-10 h-10 md:w-12 lg:w-16 md:h-12 lg:h-16 flex flex-col items-center justify-center">
                  <p className="text-black font-bold text-sm md:text-base lg:text-lg">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </p>
                  <p className="text-black font-semibold text-[8px] md:text-[10px]">
                    Min
                  </p>
                </div>
                <div className="bg-white rounded-full w-10 h-10 md:w-12 lg:w-16 md:h-12 lg:h-16 flex flex-col items-center justify-center">
                  <p className="text-black font-bold text-sm md:text-base lg:text-lg">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </p>
                  <p className="text-black font-semibold text-[8px] md:text-[10px]">
                    Sec
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/category/featured"
                className=" py-2 md:py-3 lg:py-4 w-28 md:w-32 lg:w-40 bg-[#04b430] text-white text-center text-sm md:text-base font-semibold rounded hover:bg-[#038c23] transition-colors "
              >
                Buy Now!
              </Link>
            </div>

            {/* Right Product Image */}

            <div className="relative w-full z-50 ">
              <img
                src="/images/products/p1.jpg"
                alt="Featured Product"
                className="w-full h-full aspect-square object-cover rounded-md z-50 shadow-[0px_0px_60px_#fff]/20"
              />
            </div>
          </div>
        </section>
        {/* Explore Our Products */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
          <div className="flex items-end justify-between mb-4 lg:mb-8">
            <div>
              <div className="flex items-center gap-2 lg:gap-4 mb-2 lg:mb-4">
                <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
                <p className="text-[#fd4444] text-lg lg:text-xl font-bold">
                  Our Products
                </p>
              </div>
              <h2 className="text-2xl lg:text-4xl font-extrabold text-[#ffad33]">
                Explore Our Products
              </h2>
            </div>
            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={handlePrevFlashSale}
                disabled={flashSaleIndex === 0}
                className={`p-3 rounded-full ${
                  flashSaleIndex === 0
                    ? "bg-white cursor-not-allowed"
                    : "bg-white hover:bg-gray-200"
                } transition-colors`}
              >
                <IoChevronBack className="text-black text-xl" />
              </button>
              <button
                onClick={handleNextFlashSale}
                disabled={flashSaleIndex >= maxIndex}
                className={`p-3 rounded-full ${
                  flashSaleIndex >= maxIndex
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-white hover:bg-gray-200"
                } transition-colors`}
              >
                <IoChevronForward className="text-black text-xl" />
              </button>
            </div>
          </div>

          {/* Best Selling Products */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 transition-transform duration-300"
              style={{
                transform: `translateX(-${
                  flashSaleIndex * (100 / productsPerView + 1.5)
                }%)`,
              }}
            >
              {flashSaleProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-lg overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative rounded-md overflow-hidden ">
                    <span className="absolute top-1 md:top-2 lg:top-3 left-1 md:left-2 lg:left-3 bg-[#fd4444] text-white text-xs px-1 md:px-2 lg:px-3 py-1 rounded z-10">
                      -{product.discount}%
                    </span>

                    <div className="absolute top-1 md:top-2 lg:top-3 right-1 md:right-2 lg:right-3 flex flex-col gap-2 z-10">
                      <button
                        onClick={() => handleWishlist(product.id)}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                      >
                        {wishlist.includes(product.id) ? (
                          <IoMdHeart className="text-[#fd4444] text-base md:text-lg" />
                        ) : (
                          <IoMdHeartEmpty className="text-gray-700 text-base md:text-lg" />
                        )}
                      </button>
                      <Link to={`/product/${product.id}`}>
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                          <IoEyeOutline className="text-gray-700 text-base md:text-lg" />
                        </button>
                      </Link>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover aspect-square"
                      />
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                    >
                      <IoCartOutline className="w-5 h-5" />
                      <span>Add To Cart</span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="py-2 md:py-3 lg:py-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-sm md:text-base lg:text-lg text-[#ffad33] mb-2 hover:text-[#ffad33]/80 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#fd4444] text-sm md:text-base lg:text-lg font-bold">
                        ${product.price}
                      </span>
                      <span className="text-gray-300 line-through text-xs md:text-sm ">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      {renderStars(product.rating)}
                      <span className="text-xs md:text-sm text-gray-300">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* View All Products Button */}
            <div className="text-center mt-12">
              <Link
                to="/category/1"
                className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-3 lg:py-4 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors font-medium"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrival - Featured Section */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <div className="mb-3 md:mb-6 lg:mb-12">
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
              <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
              <p className="text-[#fd4444] text-lg lg:text-xl font-bold">
                Featured
              </p>
            </div>
            <h2 className="text-2xl lg:text-4xl font-extrabold text-[#ffad33]">
              New Arrival
            </h2>
          </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 lg:gap-6 ">
            {/* Large Featured Product - PlayStation 5 */}
            <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/products/Newarrival/139.png"
                alt="PlayStation 5"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x600?text=PlayStation+5";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl lg:text-2xl font-bold text-white lg:mb-2">
                  PlayStation 5
                </h3>
                <p className="text-gray-300 text-sm mb-2 lg:mb-4 max-w-xs">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <Link
                  to="/product/ps5"
                  className="inline-block text-[#ffad33] font-semibold border-b-2 border-[#ffad33] hover:text-[#ffad33] hover:border-[#ffad33] transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Right Column - 3 Cards */}
            <div className="flex flex-col gap-4 md:gap-2 lg:gap-6 ">
              <div className="relative bg-black/90 rounded-lg overflow-hidden h-[48%] group cursor-pointer">
                <img
                  src="/images/products/Newarrival/attractive-woman.jpg"
                  alt="Women's Collections"
                  className="w-full h-full object-cover rotate-y-[180deg] opacity-70 group-hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x300?text=Women+Collection";
                  }}
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white lg:mb-2">
                      Women's Collections
                    </h3>
                    <p className="text-gray-300 text-sm mb-2 lg:mb-4 max-w-xs">
                      Featured woman collections that give you another vibe.
                    </p>
                    <Link
                      to="/category/womens"
                      className="inline-block text-[#ffad33] font-semibold border-b-2 border-[#ffad33] hover:text-[#ffad33] hover:border-[#ffad33] transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Row - Speakers & Perfume */}
              <div className="grid grid-cols-2 gap-4 md:gap-2 lg:gap-6 h-[48%]">
                <div className="relative bg-black/90 rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src="/images/products/Newarrival/264.png"
                    alt="Speakers"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Speakers";
                    }}
                  />
                  <div className="absolute inset-0 flex items-end p-3 lg:p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-white lg:mb-2">
                        Speakers
                      </h3>
                      <p className="text-gray-300 text-xs mb-1 lg:mb-3">
                        Amazon wireless speakers
                      </p>
                      <Link
                        to="/category/speakers"
                        className="inline-block text-[#ffad33] text-sm font-semibold border-b border-[#ffad33] hover:text-[#ffad33] hover:border-[#ffad33] transition-colors"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Perfume */}
                <div className="relative bg-black/90 rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src="/images/products/Newarrival/265.png"
                    alt="Perfume"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Perfume";
                    }}
                  />
                  <div className="absolute inset-0 flex items-end p-3 lg:p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-white lg:mb-2">
                        Perfume
                      </h3>
                      <p className="text-gray-300 text-xs mb-1 lg:mb-3">
                        GUCCI INTENSE OUD EDP
                      </p>
                      <Link
                        to="/category/perfume"
                        className="inline-block text-[#ffad33] text-sm font-semibold border-b border-[#ffad33] hover:text-[#ffad33] hover:border-[#ffad33] transition-colors"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="max-w-6xl mx-auto px-6 mt-20 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-3 lg:gap-8 p-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                  <TbTruckDelivery className="text-white text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#ffad33] mb-3 tracking-wide">
                FREE AND FAST DELIVERY
              </h3>
              <p className="text-yellow-500/90 text-sm">
                Free delivery for all orders over $140
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                  <RiCustomerService2Line className="text-white text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#ffad33] mb-3 tracking-wide">
                24/7 CUSTOMER SERVICE
              </h3>
              <p className="text-yellow-500/90 text-sm">
                Friendly 24/7 customer support
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                  <GoShieldCheck className="text-white text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#ffad33] mb-3 tracking-wide">
                MONEY BACK GUARANTEE
              </h3>
              <p className="text-yellow-500/90 text-sm">
                We return money within 30 days
              </p>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-10 h-10 bg-white hover:bg-gray-300 hover:scale-110 transition-all rounded-full flex items-center justify-center">
            <FaArrowUpLong className=" text-xl" />
          </div>
        </section>
      </div>
    </>
  );
}
