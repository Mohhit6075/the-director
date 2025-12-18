import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel, MdCheckCircle, MdPending } from "react-icons/md";
import { BiPackage } from "react-icons/bi";
import { useToast } from "../components/ui/Toast";

export default function Cancellations() {
  const toast = useToast();
  const [filter, setFilter] = useState("all");
  const [cancellations, setCancellations] = useState([
    {
      id: 1,
      orderId: "ORD-2024-001",
      productName: "HAVIT HV-G92 Gamepad",
      productImage: "/images/products/p1.jpg",
      quantity: 1,
      price: 120,
      reason: "Found a better price elsewhere",
      requestDate: "2024-01-18",
      status: "approved",
      refundAmount: 120,
      refundDate: "2024-01-20",
    },
    {
      id: 2,
      orderId: "ORD-2024-002",
      productName: "AK-900 Wired Keyboard",
      productImage: "/images/products/p2.jpg",
      quantity: 1,
      price: 960,
      reason: "Ordered by mistake",
      requestDate: "2024-01-15",
      status: "pending",
      refundAmount: null,
      refundDate: null,
    },
    {
      id: 3,
      orderId: "ORD-2024-003",
      productName: "IPS LCD Gaming Monitor",
      productImage: "/images/products/p3.png",
      quantity: 1,
      price: 370,
      reason: "Changed my mind",
      requestDate: "2024-01-10",
      status: "rejected",
      rejectionReason: "Product already shipped",
      refundAmount: null,
      refundDate: null,
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <MdCheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <MdPending className="w-5 h-5 text-yellow-500" />;
      case "rejected":
        return <MdOutlineCancel className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-300/20 text-green-400";
      case "pending":
        return "bg-yellow-300/20 text-yellow-400";
      case "rejected":
        return "bg-red-300/20 text-red-500";
      default:
        return "bg-gray-300/30 text-gray-400";
    }
  };

  const filteredCancellations = cancellations.filter((cancellation) => {
    if (filter === "all") return true;
    return cancellation.status === filter;
  });

  const stats = {
    total: cancellations.length,
    approved: cancellations.filter((c) => c.status === "approved").length,
    pending: cancellations.filter((c) => c.status === "pending").length,
    rejected: cancellations.filter((c) => c.status === "rejected").length,
    totalRefunded: cancellations
      .filter((c) => c.status === "approved")
      .reduce((sum, c) => sum + (c.refundAmount || 0), 0),
  };

  return (
    <div className="min-h-screen py-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ffad33] mb-2">
            My Cancellations
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Track your order cancellation requests and refunds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-2 md:gap-4 border-b border-gray-300 pb-4 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  filter === "all"
                    ? "text-[#ffad33] border-b-2 border-[#ffad33]"
                    : "text-gray-300 hover:text-[#ffad33]"
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  filter === "approved"
                    ? "text-[#ffad33] border-b-2 border-[#ffad33]"
                    : "text-gray-300 hover:text-[#ffad33]"
                }`}
              >
                Approved ({stats.approved})
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
              <button
                onClick={() => setFilter("rejected")}
                className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  filter === "rejected"
                    ? "text-[#ffad33] border-b-2 border-[#ffad33]"
                    : "text-gray-300 hover:text-[#ffad33]"
                }`}
              >
                Rejected ({stats.rejected})
              </button>
            </div>

            {/* Cancellations List */}
            {filteredCancellations.length === 0 ? (
              <div className="bg-black/5 backdrop-blur-sm rounded-lg border border-[#ffad33] p-12 text-center">
                <BiPackage className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  No cancellations found
                </p>
                <p className="text-gray-500 text-sm">
                  {filter === "all"
                    ? "You haven't requested any order cancellations."
                    : `You don't have any ${filter} cancellation requests.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCancellations.map((cancellation) => (
                  <div
                    key={cancellation.id}
                    className="bg-black/5 backdrop-blur-sm rounded-lg border border-[#ffad33] p-6 hover:border-[#ffad33]/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm">Order ID:</span>
                        <Link
                          to={`/account/orders`}
                          className="text-[#ffad33] font-medium hover:text-yellow-400 transition-colors"
                        >
                          {cancellation.orderId}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(cancellation.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            cancellation.status
                          )}`}
                        >
                          {cancellation.status.charAt(0).toUpperCase() +
                            cancellation.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={cancellation.productImage}
                        alt={cancellation.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/80x80?text=Product";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-[#ffad33] font-medium mb-1">
                          {cancellation.productName}
                        </h3>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p>
                            Quantity:{" "}
                            <span className="text-white font-medium">
                              {cancellation.quantity}
                            </span>
                          </p>
                          <p className="">
                            Price:{" "}
                            <span className="text-white font-medium">
                              ${cancellation.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Details */}
                    <div className=" p-4 space-y-3">
                      <div>
                        <span className="text-sm text-gray-400">
                          Reason for Cancellation:
                        </span>
                        <p className="text-white mt-1">{cancellation.reason}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Request Date:</span>
                          <p className="text-white">
                            {new Date(
                              cancellation.requestDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        {cancellation.status === "approved" && (
                          <>
                            <div>
                              <span className="text-gray-400">
                                Refund Amount:
                              </span>
                              <p className="text-green-400 font-semibold">
                                ${cancellation.refundAmount}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400">
                                Refund Date:
                              </span>
                              <p className="text-white">
                                {new Date(
                                  cancellation.refundDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </>
                        )}
                        {cancellation.status === "rejected" && (
                          <div className="col-span-2">
                            <span className="text-gray-400">
                              Rejection Reason:
                            </span>
                            <p className="text-red-400 mt-1">
                              {cancellation.rejectionReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {cancellation.status === "pending" && (
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() =>
                            toast.show(
                              "Contact support to modify your request",
                              { type: "info" }
                            )
                          }
                          className="px-4 py-2 bg-[#fd4444] text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Contact Support
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <aside className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-black/5 backdrop-blur-sm rounded-lg border border-[#ffad33] p-4 md:p-6 lg:sticky lg:top-24 mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold text-[#ffad33] mb-4">
                Cancellation Summary
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-300 mb-1">
                    Total Requests
                  </div>
                  <div className="text-3xl font-bold text-gray-200">
                    {stats.total}
                  </div>
                </div>

                <div className="border-t border-gray-400 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdCheckCircle className="text-green-500" />
                      <span className="text-sm text-gray-300">Approved</span>
                    </div>
                    <span className="text-green-500 font-medium">
                      {stats.approved}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdPending className="text-yellow-500" />
                      <span className="text-sm text-gray-300">Pending</span>
                    </div>
                    <span className="text-yellow-500 font-medium">
                      {stats.pending}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineCancel className="text-red-500" />
                      <span className="text-sm text-gray-300">Rejected</span>
                    </div>
                    <span className="text-red-500 font-medium">
                      {stats.rejected}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-400 pt-4">
                  <div className="text-sm text-gray-300 mb-1">
                    Total Refunded
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    ${stats.totalRefunded}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-400">
                <p className="text-xs text-gray-300">
                  Refunds are typically processed within 5-7 business days after
                  approval.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
