import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ui/Toast";
import AddressBook from "../components/account/AddressBook";
import PaymentOptions from "../components/account/PaymentOptions";
import { BiLogOut, BiTrash } from "react-icons/bi";

export default function Account() {
  const { user, updateProfile, logout } = useAuth();
  const toast = useToast();
  const { section } = useParams();
  const navigate = useNavigate();
  const activeSection = section || "profile";
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        toast.show("Please enter your current password", { type: "error" });
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.show("New passwords do not match", { type: "error" });
        return;
      }
    }

    try {
      const updateData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
      };

      await updateProfile(updateData);
      toast.show("Profile updated successfully!", { type: "success" });

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.show(err.message || "Failed to update profile", { type: "error" });
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      address: user?.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    logout();
    toast.show("Logged out successfully", { type: "success" });
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    toast.show("Account deleted successfully", { type: "success" });
    logout();
    setShowDeleteModal(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
            <h2 className="text-3xl font-extrabold text-[#fd4444] mb-8">
              Edit Your Profile
            </h2>
            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#ffad33] focus:text-gray-900"
                    placeholder="Md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#ffad33] focus:text-gray-900"
                    placeholder="Rimel"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#ffad33] focus:text-gray-900"
                    placeholder="rimel1111@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#ffad33] focus:text-gray-900"
                    placeholder="Kingston, 5236, United State"
                  />
                </div>
              </div>
              <div className="pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Password Changes
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/80 focus:text-gray-900"
                    placeholder="Current Password"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/80 focus:text-gray-900"
                    placeholder="New Password"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/80 focus:text-gray-900"
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      case "addressbook":
        return <AddressBook />;
      case "paymentoptions":
        return <PaymentOptions />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 min-h-screen mt-12">
      <div className="mb-8 md:mb-14 text-sm flex flex-col sm:flex-row gap-4 sm:gap-2 text-yellow-400/60 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <Link to="/home" className="text-[#ffad33]/70 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#ffad33]">Account</span>
        </div>
        <div className="text-white font-medium text-xl md:text-2xl lg:text-3xl">
          Welcome!{" "}
          <span className="text-[#fd4444] font-extrabold">
            {user?.name || "User"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <aside className="lg:col-span-1">
          <div className="space-y-4 md:space-y-6 bg-black/5 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-white/10">
            <div>
              <h3 className="text-[#ffad33] font-medium mb-4">
                Manage My Account
              </h3>
              <div className="space-y-2 ml-6">
                <button
                  onClick={() => navigate("/account/profile")}
                  className={`block w-full text-left transition-colors ${
                    activeSection === "profile"
                      ? "text-[#fd4444]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/account/addressbook")}
                  className={`block w-full text-left transition-colors ${
                    activeSection === "addressbook"
                      ? "text-[#fd4444]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Address Book
                </button>
                <button
                  onClick={() => navigate("/account/paymentoptions")}
                  className={`block w-full text-left transition-colors ${
                    activeSection === "paymentoptions"
                      ? "text-[#fd4444]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  My Payment Options
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate("/account/orders")}
                className={`block w-full text-left font-medium mb-4 transition-colors ${
                  activeSection === "orders"
                    ? "text-[#fd4444]"
                    : "text-[#ffad33] "
                }`}
              >
                My Orders
              </button>
              <div className="space-y-2 ml-6">
                <button
                  onClick={() => navigate("/account/returns")}
                  className={`block w-full text-left transition-colors ${
                    activeSection === "returns"
                      ? "text-[#fd4444]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  My Returns
                </button>
                <button
                  onClick={() => navigate("/account/cancellations")}
                  className={`block w-full text-left transition-colors ${
                    activeSection === "cancellations"
                      ? "text-[#fd4444]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  My Cancellations
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate("/wishlist")}
                className={`font-medium transition-colors ${
                  activeSection === "wishlist"
                    ? "text-[#fd4444]"
                    : "text-[#ffad33] hover:text-[#ffad33]/80"
                }`}
              >
                My Wishlist
              </button>
            </div>

            {/* Logout and Delete Account */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 bg-[#ffad33] text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <BiLogOut className="w-6 h-6" />
                Logout
              </button>

              <button
                onClick={handleDeleteAccount}
                className="w-full text-left px-4 py-2.5 bg-[#fd4444] text-white rounded-lg hover:bg-red-500 transition-colors duration-200 font-medium flex items-center gap-2 border border-[#fd4444]/80"
              >
                <BiTrash className="w-6 h-6" />
                Delete My Account
              </button>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">{renderContent()}</div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete your account? This will
                permanently remove:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 ml-2">
                <li>Your profile information</li>
                <li>Order history</li>
                <li>Saved addresses</li>
                <li>Payment methods</li>
                <li>Wishlist items</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
