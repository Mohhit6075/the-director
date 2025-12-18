import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useToast } from "../components/ui/Toast";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Cart() {
  const { user, getCart, updateCartItem, removeFromCart, clearCart, addOrder } =
    useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => getCart());
  const [processing, setProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0),
    [cart]
  );
  const shipping = subtotal > 140 ? 0 : 15;
  const total = useMemo(
    () => +(subtotal + shipping).toFixed(2),
    [subtotal, shipping]
  );

  function changeQty(id, qty) {
    const updated = updateCartItem(id, qty);
    setCart(updated);
  }

  function removeItem(id) {
    const updated = removeFromCart(id);
    setCart(updated);
  }

  async function checkout() {
    if (!user) return navigate("/login");
    setProcessing(true);
    try {
      const order = {
        items: cart,
        total,
        date: new Date().toLocaleDateString(),
        status: "pending",
      };
      await addOrder(order);
      clearCart();
      setCart([]);
      toast.show("Order placed — thank you!", { type: "success" });
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      toast.show("Checkout failed: " + (err.message || ""), { type: "error" });
    } finally {
      setProcessing(false);
    }
  }

  function applyCoupon() {
    if (couponCode.trim()) {
      toast.show("Coupon applied successfully!", { type: "success" });
    } else {
      toast.show("Please enter a coupon code", { type: "error" });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-8 md:mb-14 text-sm flex gap-2 text-yellow-400/60">
        <Link to="/home" className="text-[#ffad33]/70 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#ffad33]">Cart</span>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <p className="text-[#ffad33] text-2xl md:text-3xl mb-4 font-bold">
            Your cart is empty.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Browse the site and add items to start your order.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#fd4444] text-white px-6 md:px-8 py-3 rounded hover:bg-[#c93e3e] transition-all text-sm md:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* Desktop Table Header */}
          <div className="hidden md:block shadow-md">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium text-[#ffad33] bg-white rounded-md px-6 lg:px-12">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 md:space-y-0">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-md p-4 md:p-6 lg:px-12 md:py-6 shadow-md md:shadow-none hover:bg-gray-50 transition-colors"
              >
                {/* Mobile Card Layout */}
                <div className="md:hidden space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image || "/images/product-placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-bold mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-900 font-semibold">
                        ${(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white bg-[#fd4444] hover:bg-[#c93e3e] rounded-full p-1 transition-colors"
                    >
                      <IoCloseOutline size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm">Quantity:</span>
                      <input
                        type="number"
                        value={item.qty || 1}
                        onChange={(e) =>
                          changeQty(item.id, parseInt(e.target.value || 1))
                        }
                        className="w-16 text-center border border-gray-400 p-2 text-gray-900 font-medium rounded-md focus:outline-none focus:border-2 focus:border-gray-500"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">Subtotal</p>
                      <p className="text-gray-900 font-bold">
                        ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center gap-4 relative">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-2 -left-2 text-white bg-[#fd4444] hover:bg-[#c93e3e] rounded-full transition-colors"
                    >
                      <IoCloseOutline size={20} />
                    </button>
                    <img
                      src={item.image || "/images/product-placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-[#ffad33] font-medium text-sm lg:text-base">
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-2 text-center text-gray-900">
                    ${(item.price || 0).toFixed(2)}
                  </div>
                  <div className="col-span-3 flex justify-center items-center">
                    <input
                      type="number"
                      value={item.qty || 1}
                      onChange={(e) =>
                        changeQty(item.id, parseInt(e.target.value))
                      }
                      className="w-16 text-center border border-gray-400 p-2 text-gray-900 font-medium rounded-md focus:outline-none focus:border-2 focus:border-gray-500"
                    />
                  </div>
                  <div className="col-span-2 text-right text-gray-900 font-medium">
                    ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center gap-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 sm:w-auto px-6 md:px-8 py-3 bg-[#fd4444] text-white rounded hover:bg-[#fd4444]/80 transition-all font-medium text-center text-sm md:text-base"
            >
              <FaArrowLeftLong /> Return To Shop
            </Link>
            <button
              onClick={() => {
                clearCart();
                setCart([]);
              }}
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-[#fd4444] text-white rounded hover:bg-[#fd4444]/80 transition-all font-medium text-sm md:text-base"
            >
              Clear Cart
            </button>
          </div>

          <div className="w-full flex justify-center lg:justify-end mt-8 md:mt-12">
            <div className="w-full lg:w-1/2 border border-white/20 bg-black/5 backdrop-blur-sm shadow-md rounded px-4 md:px-8 py-8 md:py-12 flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-[#ffad33] mb-4 md:mb-6">
                Cart Total
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-white">
                  <span className="text-[#ffad33] text-sm md:text-base">
                    Subtotal:
                  </span>
                  <span className="text-white font-medium text-sm md:text-base">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between pb-4 border-b border-white">
                  <span className="text-[#ffad33] text-sm md:text-base">
                    Shipping:
                  </span>
                  <span className="text-white font-medium text-sm md:text-base">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between pt-2">
                  <span className="text-[#ffad33] font-semibold text-sm md:text-base">
                    Total:
                  </span>
                  <span className="text-white font-bold text-base md:text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 items-stretch mt-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 md:px-6 py-3 border border-white rounded text-white placeholder:text-gray-300 focus:outline-none focus:border-[#fd4444] text-sm md:text-base bg-transparent"
                />
                <button
                  onClick={applyCoupon}
                  className="px-6 md:px-8 py-3 bg-[#ffad33] text-white rounded hover:bg-[#ffad33]/90 transition-all font-medium whitespace-nowrap text-sm md:text-base"
                >
                  Apply Coupon
                </button>
              </div>

              <button
                onClick={checkout}
                disabled={processing}
                className="w-full mt-2 px-6 md:px-8 py-3 bg-[#fd4444] text-white rounded hover:bg-[#c93e3e] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {processing ? "Processing…" : "Proceed to checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
