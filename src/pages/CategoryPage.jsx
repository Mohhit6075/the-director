import { useParams, Link } from "react-router-dom";
import { products, categories } from "../data/products";
import { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {
  IoCartOutline,
  IoEyeOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { BiSolidStar } from "react-icons/bi";
import { useToast } from "../components/ui/Toast";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const toast = useToast();
  const category = categories.find((cat) => cat.id === parseInt(categoryId));
  const categoryProducts = products.filter(
    (product) => product.categoryId === parseInt(categoryId)
  );

  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

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

  const renderStars = (rating = 4) => {
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

  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const displayedProducts = categoryProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-400">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-[#fd4444] text-white rounded hover:bg-red-600 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 md:mb-8 text-sm flex gap-2 text-yellow-400/60">
          <Link
            to="/"
            className="text-[#ffad33]/70 hover:text-[#ffad33] transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-[#ffad33]">{category.name}</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-0 my-8 md:my-12">
          <div className="flex flex-col items-start gap-2 md:gap-4">
            <div className="flex items-center justify-start gap-2">
              <div className="w-4 md:w-5 h-8 md:h-10 bg-[#fd4444] rounded"></div>
              <p className="text-[#ffad33] text-2xl md:text-3xl font-medium mb-1">
                {category.name}
              </p>
            </div>
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`p-2 md:p-3 rounded-full ${
                currentPage === 0
                  ? "bg-white cursor-not-allowed"
                  : "bg-white hover:bg-gray-700"
              } transition-colors`}
            >
              <IoChevronBack className="text-black text-lg md:text-xl" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`p-2 md:p-3 rounded-full ${
                currentPage >= totalPages - 1
                  ? "bg-white cursor-not-allowed"
                  : "bg-white hover:bg-gray-700"
              } transition-colors`}
            >
              <IoChevronForward className="text-black text-lg md:text-xl" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-400">Check back later for new products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square rounded-md overflow-hidden">
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-[#fd4444] text-white text-xs px-3 py-1 rounded z-10">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs px-3 py-1 rounded z-10">
                      NEW
                    </span>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => handleWishlist(product.id)}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                    >
                      {wishlist.includes(product.id) ? (
                        <IoMdHeart className="text-[#fd4444] text-lg" />
                      ) : (
                        <IoMdHeartEmpty className="text-gray-700 text-lg" />
                      )}
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                        <IoEyeOutline className="text-gray-700 text-lg" />
                      </button>
                    </Link>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=Product";
                      }}
                    />
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-[#ffad33] text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform"
                  >
                    <IoCartOutline className="w-5 h-5" />
                    <span>Add To Cart</span>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-lg text-[#ffad33] mb-2 hover:text-[#ffad33]/80 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#fd4444] font-bold">
                      ${product.price?.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-300 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(product.rating || 4)}
                    <span className="text-sm text-gray-300">
                      ({product.reviews || 88})
                    </span>
                  </div>

                  {/* Color Variants */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          className="w-5 h-5 rounded-full border-2 border-white/30 hover:border-white transition-colors"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentPage(0)}
            className="px-12 py-4 bg-[#fd4444] text-white rounded hover:bg-red-600 transition-colors font-medium"
          >
            View All Products
          </button>
        </div>

        {/* Pagination Info */}
        <div className="text-center mt-6 text-gray-400">
          Page {currentPage + 1} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
