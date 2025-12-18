import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useToast } from "../components/ui/Toast";

export default function Reviews() {
  const toast = useToast();
  const [filter, setFilter] = useState("all");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      productName: "HAVIT HV-G92 Gamepad",
      productImage: "/images/products/p1.jpg",
      rating: 5,
      title: "Excellent gamepad!",
      comment:
        "This gamepad is amazing! Very comfortable to hold and the buttons are very responsive. Highly recommend for gaming enthusiasts.",
      date: "2024-01-15",
      status: "published",
      helpful: 12,
    },
    {
      id: 2,
      productId: 2,
      productName: "AK-900 Wired Keyboard",
      productImage: "/images/products/p2.jpg",
      rating: 4,
      title: "Great keyboard for the price",
      comment:
        "Good build quality and nice RGB lighting. The only downside is that it can be a bit loud when typing.",
      date: "2024-01-10",
      status: "published",
      helpful: 8,
    },
    {
      id: 3,
      productId: 3,
      productName: "IPS LCD Gaming Monitor",
      productImage: "/images/products/p3.png",
      rating: 5,
      title: "Best monitor I've ever owned",
      comment:
        "Crystal clear display with amazing colors. Perfect for both gaming and work. Worth every penny!",
      date: "2024-01-05",
      status: "pending",
      helpful: 0,
    },
  ]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < rating ? (
              <AiFillStar className="text-yellow-400 text-lg" />
            ) : (
              <AiOutlineStar className="text-gray-400 text-lg" />
            )}
          </span>
        ))}
      </div>
    );
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((r) => r.id !== reviewId));
    toast.show("Review deleted successfully", { type: "success" });
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    return review.status === filter;
  });

  const stats = {
    total: reviews.length,
    published: reviews.filter((r) => r.status === "published").length,
    pending: reviews.filter((r) => r.status === "pending").length,
    avgRating:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : 0,
  };

  return (
    <div className="min-h-screen py-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ffad33] mb-2">
            My Reviews
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Manage your product reviews and ratings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 md:gap-4 border-b border-gray-300 pb-4 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  filter === "all"
                    ? "text-[#ffad33] border-b-2 border-[#ffad33]"
                    : "text-gray-300 hover:text-[#ffad33]"
                }`}
              >
                All Reviews ({stats.total})
              </button>
              <button
                onClick={() => setFilter("published")}
                className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  filter === "published"
                    ? "text-[#ffad33] border-b-2 border-[#ffad33]"
                    : "text-gray-300 hover:text-[#ffad33]"
                }`}
              >
                Published ({stats.published})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  filter === "pending"
                    ? "text-[#ffad33] border-b-2 border-[#ffad33]"
                    : "text-gray-300 hover:text-[#ffad33]"
                }`}
              >
                Pending ({stats.pending})
              </button>
            </div>

            {/* Reviews List */}
            {filteredReviews.length === 0 ? (
              <div className="bg-black/5 backdrop-blur-sm rounded-lg border border-white/10 p-12 text-center">
                <AiOutlineStar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">No reviews found</p>
                <p className="text-gray-600 text-sm">
                  {filter === "all"
                    ? "You haven't written any reviews yet. Purchase products and share your experience!"
                    : `You don't have any ${filter} reviews.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-black/5 backdrop-blur-sm rounded-lg border border-[#ffad33] p-6 hover:border-[#ffad33]/50 transition-all"
                  >
                    {/* Product Info */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                      <Link
                        to={`/product/${review.productId}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={review.productImage}
                          alt={review.productName}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80x80?text=Product";
                          }}
                        />
                      </Link>
                      <div className="flex-1 w-full">
                        <Link
                          to={`/product/${review.productId}`}
                          className="text-[#ffad33] font-medium hover:text-yellow-400 transition-colors text-sm md:text-base"
                        >
                          {review.productName}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
                          {renderStars(review.rating)}
                          <span className="text-xs md:text-sm text-gray-300">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              review.status === "published"
                                ? "bg-green-300/20 text-green-400"
                                : "bg-yellow-300/20 text-yellow-400"
                            }`}
                          >
                            {review.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            toast.show("Edit functionality coming soon", {
                              type: "info",
                            })
                          }
                          className="p-2 text-gray-300 hover:text-[#ffad33] hover:bg-white/5 rounded transition-colors"
                          title="Edit review"
                        >
                          <BiEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 text-gray-300 hover:text-[#fd4444] hover:bg-white/5 rounded transition-colors"
                          title="Delete review"
                        >
                          <BiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="space-y-2">
                      <h3 className="text-white font-semibold">
                        {review.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {review.comment}
                      </p>
                      {review.status === "published" && (
                        <p className="text-sm text-gray-400 mt-3">
                          {review.helpful} people found this helpful
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <aside className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-black/5 backdrop-blur-sm rounded-lg border border-[#ffad33] p-4 md:p-6 lg:sticky lg:top-24 mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold text-[#ffad33] mb-4">
                Review Statistics
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-300 mb-1">
                    Total Reviews
                  </div>
                  <div className="text-3xl font-bold text-gray-300">
                    {stats.total}
                  </div>
                </div>

                <div className="border-t border-gray-400 pt-4">
                  <div className="text-sm text-gray-300 mb-1">
                    Average Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-gray-300">
                      {stats.avgRating}
                    </div>
                    <AiFillStar className="text-yellow-400 text-xl" />
                  </div>
                </div>

                <div className="border-t border-gray-400 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Published</span>
                    <span className="text-green-400 font-medium">
                      {stats.published}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Pending</span>
                    <span className="text-yellow-400 font-medium">
                      {stats.pending}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-400">
                <p className="text-xs text-gray-300">
                  Your reviews help other customers make informed decisions.
                  Thank you for sharing your experience!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
