import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/ui/Toast";

export default function Checkout() {
  const toast = useToast();
  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [couponCode, setCouponCode] = useState("");
  const cartItems = [
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "/images/products/p1.jpg",
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 1100,
      quantity: 1,
      image: "/images/products/p2.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast.show("Coupon applied successfully!", { type: "success" });
    } else {
      toast.show("Please enter a coupon code", { type: "error" });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    toast.show("Order placed successfully!", { type: "success" });
    console.log("Order data:", { formData, paymentMethod, cartItems, total });
  };

  return (
    <div className="min-h-screen py-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm mb-8 md:mb-12 text-yellow-600">
          <Link to="/" className="hover:text-[#ffad33] transition-colors">
            Account
          </Link>
          <span>/</span>
          <Link
            to="/account"
            className="hover:text-[#ffad33] transition-colors"
          >
            My Account
          </Link>
          <span>/</span>
          <Link
            to="/product/1"
            className="hover:text-[#ffad33] transition-colors"
          >
            Product
          </Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-[#ffad33] transition-colors">
            View Cart
          </Link>
          <span>/</span>
          <span className="text-[#ffad33]">CheckOut</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Billing Details Form */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ffad33] mb-8 md:mb-12">
              Billing Details
            </h1>

            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* First Name */}
              <div>
                <label
                  htmlFor="Name"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Name<span className="text-[#fd4444]">*</span>
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  placeholder="xyz"
                  value={formData.Name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="abcxyz"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                />
              </div>

              {/* Street Address */}
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Street Address<span className="text-[#fd4444]">*</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  placeholder="AB street"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                  required
                />
              </div>

              {/* Apartment */}
              <div>
                <label
                  htmlFor="apartment"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  placeholder="00"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                />
              </div>

              {/* Town/City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Town/City<span className="text-[#fd4444]">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New Delhi"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Phone Number<span className="text-[#fd4444]">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+91 1234567890"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#ffad33] text-sm mb-2"
                >
                  Email Address<span className="text-[#fd4444]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 border-none rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#ffad33] placeholder:text-black"
                  required
                />
              </div>

              {/* Save Information Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-5 h-5 bg-[#fd4444] border-none rounded accent-[#fd4444] cursor-pointer"
                />
                <label
                  htmlFor="saveInfo"
                  className="text-white text-sm cursor-pointer"
                >
                  Save this information for faster check-out next time
                </label>
              </div>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:py-12 xl:py-20 h-fit px-4 md:px-6 lg:px-8 py-6 md:py-8 rounded-lg bg-black/5 backdrop-blur-sm">
            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/56x56?text=Product";
                      }}
                    />
                    <span className="text-[#ffad33]">{item.name}</span>
                  </div>
                  <span className="text-white">${item.price}</span>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="space-y-2 pb-6 ">
              <div className="flex items-center justify-between text-white py-3 border-b border-gray-400">
                <span className="text-[#ffad33]">Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-white py-3 border-b border-gray-400">
                <span className="text-[#ffad33]">Shipping:</span>
                <span className="text-[#00ff41]">Free</span>
              </div>
              <div className="flex items-center justify-between text-white py-3 font-bold ">
                <span className="text-[#ffad33]">Total:</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4 space-y-4">
              {/* Bank Payment */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="bank"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                  <label htmlFor="bank" className="text-white cursor-pointer">
                    Bank
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/payment/bkash.png"
                    alt="bKash"
                    className="h-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <img
                    src="/images/payment/visa.png"
                    alt="Visa"
                    className="h-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <img
                    src="/images/payment/mastercard.png"
                    alt="Mastercard"
                    className="h-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <img
                    src="/images/payment/nagad.png"
                    alt="Nagad"
                    className="h-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              </div>

              {/* Cash on Delivery */}
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-black cursor-pointer"
                />
                <label htmlFor="cash" className="text-white cursor-pointer">
                  Cash on delivery
                </label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="flex gap-3 md:gap-4 mt-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 md:px-6 py-3 border border-white rounded text-white placeholder:text-gray-300 focus:outline-none focus:border-[#fd4444] text-sm md:text-base bg-transparent"
              />
              <button className="px-6 md:px-8 py-3 bg-[#ffad33] text-white rounded hover:bg-[#ffad33]/90 transition-all font-medium whitespace-nowrap text-sm md:text-base">
                Apply Coupon
              </button>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 px-12 py-3 bg-[#fd4444] text-white rounded hover:bg-red-600 transition-colors font-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
