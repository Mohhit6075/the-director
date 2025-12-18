import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineCancel,
  MdCheckCircle,
  MdPending,
  MdLocalShipping,
} from "react-icons/md";
import { BiPackage } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import { useToast } from "../components/ui/Toast";

export default function Returns() {
  const toast = useToast();
  const [filter, setFilter] = useState("all");
  const [returns, setReturns] = useState([
    {
      id: 1,
      orderId: "ORD-2024-005",
      productName: "RGB Liquid CPU Cooler",
      productImage: "/images/products/p5.jpg",
      quantity: 1,
      price: 160,
      reason: "Product not as described",
      detailedReason:
        "The RGB lighting doesn't work as advertised in the product description.",
      requestDate: "2024-01-22",
      status: "approved",
      pickupDate: "2024-01-24",
      pickupStatus: "completed",
      refundAmount: 160,
      refundDate: "2024-01-26",
      returnMethod: "Pickup",
    },
    {
      id: 2,
      orderId: "ORD-2024-007",
      productName: "S-Series Comfort Chair",
      productImage: "/images/products/p7.jpg",
      quantity: 1,
      price: 375,
      reason: "Defective/Damaged",
      detailedReason:
        "Chair arrived with a broken armrest and scratches on the base.",
      requestDate: "2024-01-20",
      status: "pending",
      pickupDate: "2024-01-25",
      pickupStatus: "scheduled",
      refundAmount: null,
      refundDate: null,
      returnMethod: "Pickup",
    },
    {
      id: 3,
      orderId: "ORD-2024-009",
      productName: "Gucci Duffle Bag",
      productImage: "/images/products/p9.jpg",
      quantity: 1,
      price: 960,
      reason: "Wrong item received",
      detailedReason: "Received a different color than what was ordered.",
      requestDate: "2024-01-18",
      status: "rejected",
      rejectionReason: "Return window expired (30 days)",
      refundAmount: null,
      refundDate: null,
      returnMethod: "Pickup",
    },
    {
      id: 4,
      orderId: "ORD-2024-011",
      productName: "Curology Product Set",
      productImage: "/images/products/p11.jpg",
      quantity: 1,
      price: 500,
      reason: "Quality issues",
      detailedReason:
        "Product caused skin irritation, not suitable for sensitive skin.",
      requestDate: "2024-01-15",
      status: "approved",
      pickupDate: "2024-01-17",
      pickupStatus: "completed",
      refundAmount: 500,
      refundDate: "2024-01-19",
      returnMethod: "Drop-off",
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
        return "bg-gray-300/20 text-gray-400";
    }
  };

  const getPickupStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-300";
      case "scheduled":
        return "text-blue-300";
      case "in-transit":
        return "text-yellow-300";
      default:
        return "text-gray-300";
    }
  };

  const filteredReturns = returns.filter((returnItem) => {
    if (filter === "all") return true;
    return returnItem.status === filter;
  });

  const stats = {
    total: returns.length,
    approved: returns.filter((r) => r.status === "approved").length,
    pending: returns.filter((r) => r.status === "pending").length,
    rejected: returns.filter((r) => r.status === "rejected").length,
    totalRefunded: returns
      .filter((r) => r.status === "approved")
      .reduce((sum, r) => sum + (r.refundAmount || 0), 0),
  };

  return (
    <div className="min-h-screen py-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ffad33] mb-2">
            My Returns
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Track your product return requests and refund status
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

            {/* Returns List */}
            {filteredReturns.length === 0 ? (
              <div className="bg-white/95 rounded-lg border border-[#ffad33] p-12 text-center">
                <BiPackage className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No returns found</p>
                <p className="text-gray-500 text-sm">
                  {filter === "all"
                    ? "You haven't requested any product returns."
                    : `You don't have any ${filter} return requests.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReturns.map((returnItem) => (
                  <div
                    key={returnItem.id}
                    className="bg-black/5 backdrop-blur-sm rounded-lg border border-[#ffad33] p-6 hover:border-[#ffad33]/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm">Order ID:</span>
                        <Link
                          to={`/account/orders`}
                          className="text-[#ffad33] font-medium hover:text-yellow-400 transition-colors"
                        >
                          {returnItem.orderId}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(returnItem.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            returnItem.status
                          )}`}
                        >
                          {returnItem.status.charAt(0).toUpperCase() +
                            returnItem.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={returnItem.productImage}
                        alt={returnItem.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/80x80?text=Product";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-[#ffad33] font-medium mb-1">
                          {returnItem.productName}
                        </h3>
                        <div className="text-sm text-gray-400 space-y-1">
                          <p>
                            Quantity:{" "}
                            <span className="text-white font-medium">
                              {returnItem.quantity}
                            </span>
                          </p>
                          <p className="">
                            Price:{" "}
                            <span className="text-white font-medium">
                              ${returnItem.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Return Details */}
                    <div className=" rounded-lg p-4 space-y-3">
                      <div>
                        <span className="text-sm text-gray-400">
                          Reason for Return:
                        </span>
                        <p className="text-white mt-1 font-medium">
                          {returnItem.reason}
                        </p>
                        <p className="text-gray-300 text-sm mt-1">
                          {returnItem.detailedReason}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Request Date:</span>
                          <p className="text-white">
                            {new Date(
                              returnItem.requestDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400">Return Method:</span>
                          <p className="text-white">
                            {returnItem.returnMethod}
                          </p>
                        </div>
                      </div>

                      {/* Pickup/Shipping Status */}
                      {(returnItem.status === "approved" ||
                        returnItem.status === "pending") && (
                        <div className="border-t border-gray-700 pt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <FiTruck
                              className={`w-5 h-5 ${getPickupStatusColor(
                                returnItem.pickupStatus
                              )}`}
                            />
                            <span className="text-sm text-gray-400">
                              {returnItem.returnMethod === "Pickup"
                                ? "Pickup Status:"
                                : "Shipping Status:"}
                            </span>
                            <span
                              className={`text-sm font-medium ${getPickupStatusColor(
                                returnItem.pickupStatus
                              )}`}
                            >
                              {returnItem.pickupStatus.charAt(0).toUpperCase() +
                                returnItem.pickupStatus.slice(1)}
                            </span>
                          </div>
                          {returnItem.pickupDate && (
                            <p className="text-sm text-gray-300">
                              {returnItem.pickupStatus === "completed"
                                ? "Picked up on:"
                                : "Scheduled for:"}{" "}
                              {new Date(
                                returnItem.pickupDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Refund Information */}
                      {returnItem.status === "approved" &&
                        returnItem.refundAmount && (
                          <div className="border-t border-gray-700 pt-3 grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-gray-400 text-sm">
                                Refund Amount:
                              </span>
                              <p className="text-green-400 font-semibold text-lg">
                                ${returnItem.refundAmount}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">
                                Refund Date:
                              </span>
                              <p className="text-white">
                                {new Date(
                                  returnItem.refundDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        )}

                      {/* Rejection Reason */}
                      {returnItem.status === "rejected" && (
                        <div className="border-t border-gray-700 pt-3">
                          <span className="text-gray-400 text-sm">
                            Rejection Reason:
                          </span>
                          <p className="text-red-400 mt-1">
                            {returnItem.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {returnItem.status === "pending" && (
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() =>
                            toast.show(
                              "Pickup reschedule request sent to support",
                              { type: "info" }
                            )
                          }
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Reschedule Pickup
                        </button>
                        <button
                          onClick={() =>
                            toast.show(
                              "Contact support to modify your return request",
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
                Return Summary
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-300 mb-1">
                    Total Returns
                  </div>
                  <div className="text-3xl font-bold text-white">
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
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  Return Policy
                </h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 30-day return window</li>
                  <li>• Free pickup for defective items</li>
                  <li>• Refunds processed in 5-7 days</li>
                  <li>• Original packaging required</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
