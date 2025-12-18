import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ui/Toast";
import { IoHeartOutline, IoHeart, IoCartOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );
  const { addToCart } = useAuth();
  const toast = useToast();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);

  const colors = [
    { name: "Red", value: "#DC2626" },
    { name: "Pink", value: "#EC4899" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-white/70">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
    if (!isWishlist) {
      toast.show("Added to wishlist", { type: "success" });
    } else {
      toast.show("Removed from wishlist", { type: "error" });
    }
  };
  const handlerelatedAddToCart = () => {
    toast.show("Added to cart successfully!", { type: "success" });
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.show("Please select a size", { type: "error" });
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/images/product-placeholder.svg",
      size: selectedSize,
      qty: quantity,
      variant: selectedSize,
    };

    addToCart(cartItem);
    toast.show("Added to cart successfully!", { type: "success" });
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen mt-12">
      {/* Breadcrumb */}
      <div className="mb-14 text-sm flex gap-2 text-yellow-400/60">
        <Link to="/" className="text-[#ffad33]/70 transition-colors">
          Account
        </Link>
        <span>/</span>
        <Link to="/" className="text-[#ffad33]/70 transition-colors">
          Gaming
        </Link>
        <span>/</span>
        <span className="text-[#ffad33]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Product Images */}
        <div className="flex gap-4">
          {/* Thumbnail Column */}
          <div className="flex flex-col gap-4 w-16 md:w-24">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
                  selectedImage === index
                    ? "border-[#ffad33]"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-square  overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#ffad33] tracking-wide mb-1">
                {product.name}
              </h1>
              <button
                onClick={() => handleWishlist()}
                className="p-3 border border-white/30 rounded hover:bg-white/10 transition-all"
              >
                {isWishlist ? (
                  <IoHeart className="text-[#fd4444] text-2xl" />
                ) : (
                  <IoHeartOutline className="text-white text-2xl" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 md:gap-4 mb-4">
              <div className="flex items-center md:gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < 4 ? "text-yellow-400" : "text-gray-600"}
                  >
                    ★
                  </span>
                ))}
                <span className="text-white/60 text-sm ml-1 md:ml-2">
                  (150 Reviews)
                </span>
              </div>
              <span className="text-green-500 text-sm">In Stock</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed border-b border-white/20 pb-6">
              {product.description ||
                "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
            </p>
          </div>

          {/* Colors */}
          <div className="flex gap-6">
            <h3 className="text-lg font-medium text-[#ffad33] ">Colors :</h3>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex gap-10 items-end">
            <h3 className="text-lg font-medium text-[#ffad33] mb-3">Size :</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded transition-all font-medium ${
                    selectedSize === size
                      ? "bg-[#ffad33]/90 text-white border-[#ffad33]"
                      : "border-white/30 text-white hover:border-white/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col md:flex-row gap-4 items-center pt-0 md:pt-4">
            {/* Quantity */}
            <div className="flex gap-4 w-full ">
              <div className="flex items-center border border-white/30 rounded overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 px-4 py-3 text-white hover:bg-[#fd4444] transition-colors border-r border-white/30"
                >
                  -
                </button>
                <span className="w-20 px-7 py-3 text-white text-center font-medium ">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="w-12 px-4 py-3 text-white text-center  hover:bg-[#fd4444] transition-colors border-l border-white/30"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex w-fit gap-3 bg-[#ffad33] text-white px-7 md:px-4 py-3 text-nowrap rounded hover:bg-yellow-600 transition-all font-medium"
              >
                <IoCartOutline className="text-2xl" />
                <span>Add To Cart</span>
              </button>
            </div>
            <Link
              to={`/checkout`}
              className="w-full bg-[#fd4444] text-nowrap text-white text-center px-8 lg:px-4 py-3 rounded hover:bg-red-500 transition-all font-medium"
            >
              Buy Now
            </Link>
          </div>

          {/* Delivery Info */}
          <div className="border border-white/20 rounded-lg overflow-hidden">
            <div className="flex gap-4 px-6 py-4 border-b border-white/20 transition-colors hover:bg-white/5 hover:backdrop-blur-sm">
              <TbTruckDelivery className="text-white text-3xl flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Free Delivery</h4>
                <p className="text-white/60 text-sm">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex gap-4 py-4 px-6 transition-colors hover:bg-white/5 hover:backdrop-blur-sm">
              <HiOutlineRefresh className="text-white text-3xl flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Return Delivery</h4>
                <p className="text-white/60 text-sm">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="max-w-7xl mx-auto px-0 lg:px-3">
        <div className="flex items-center gap-2 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
          <div className="w-3 md:w-4 lg:w-5 h-10 bg-[#fd4444] rounded"></div>
          <p className="text-[#ffad33] text-lg lg:text-xl font-bold">
            Related Items
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 transition-transform duration-300">
            {relatedProducts.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden"
              >
                <div className="relative rounded-md overflow-hidden">
                  <span className="absolute top-1 md:top-2 lg:top-3 left-1 md:left-2 lg:left-3 bg-[#fd4444] text-white text-xs px-1 md:px-2 lg:px-3 py-1 rounded z-10">
                    -40%
                  </span>
                  <div className="absolute top-1 md:top-2 lg:top-3 right-1 md:right-2 lg:right-3 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => handleWishlist(product.id)}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                    >
                      {isWishlist ? (
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
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </Link>
                  <button
                    onClick={() => handlerelatedAddToCart()}
                    className="absolute z-50 bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                  >
                    <IoCartOutline className="w-5 h-5" />
                    <span>Add To Cart</span>
                  </button>
                </div>

                {/* Product Details */}
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
                      <span className="text-gray-500 line-through text-xs md:text-sm">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < 4
                              ? "text-yellow-400 text-xs md:text-sm"
                              : "text-gray-300 text-xs md:text-sm"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-300 text-xs md:text-sm">
                      (88)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/category/1"
              className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-3 lg:py-4 bg-[#fd4444] text-white rounded hover:bg-red-600 transition-colors font-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
