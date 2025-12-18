import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/ui/Toast";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function AddressBook() {
  const { user } = useAuth();
  const toast = useToast();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      name: user?.name || "John Doe",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      name: user?.name || "John Doe",
      street: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zip: "10002",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    isDefault: false,
  });

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      label: "",
      name: user?.name || "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
      isDefault: false,
    });
    setShowModal(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const addressToDelete = addresses.find((a) => a.id === id);
    if (addressToDelete?.isDefault && addresses.length > 1) {
      toast.show(
        "Cannot delete default address. Set another address as default first.",
        { type: "error" }
      );
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.show("Address deleted successfully", { type: "success" });
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.show("Default address updated", { type: "success" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.label ||
      !formData.street ||
      !formData.city ||
      !formData.zip
    ) {
      toast.show("Please fill in all required fields", { type: "error" });
      return;
    }

    if (editingAddress) {
      setAddresses(
        addresses.map((a) =>
          a.id === editingAddress.id ? { ...formData, id: a.id } : a
        )
      );
      toast.show("Address updated successfully", { type: "success" });
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
        isDefault: addresses.length === 0 ? true : formData.isDefault,
      };

      if (newAddress.isDefault) {
        setAddresses([
          newAddress,
          ...addresses.map((a) => ({ ...a, isDefault: false })),
        ]);
      } else {
        setAddresses([...addresses, newAddress]);
      }
      toast.show("Address added successfully", { type: "success" });
    }

    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
      {!showModal ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#fd4444]">
              Address Book
            </h2>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors duration-200 font-medium"
            >
              + Add New Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No addresses saved yet</p>
              <button
                onClick={handleAddNew}
                className="px-6 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-all font-medium"
              >
                Add Your First Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#fd4444] transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {address.label}
                      </h3>
                      {address.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(address)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm">{address.street}</p>
                    <p className="text-sm">
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p className="text-sm">{address.country}</p>
                    <p className="text-sm mt-2">Phone: {address.phone}</p>
                  </div>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="mt-4 text-sm text-[#fd4444] hover:text-[#c93e3e] font-medium"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              ))}

              {/* Add New Address Card */}
              <div
                onClick={handleAddNew}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:border-[#fd4444] transition-colors cursor-pointer min-h-[200px]"
              >
                <div className="text-center">
                  <div className="text-4xl text-gray-400 mb-2">+</div>
                  <p className="text-gray-600 font-medium">Add New Address</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#fd4444]">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="px-2 py-3 flex items-center text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <FaArrowLeftLong className="w-4 h-4 mr-2" /> Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Address Label *
              </label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                placeholder="e.g., Home, Office, etc."
                className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street address, apartment, suite, etc."
                className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4 text-[#fd4444] focus:ring-[#fd4444]"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-8 py-3 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-colors font-medium"
              >
                {editingAddress ? "Update Address" : "Add Address"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
