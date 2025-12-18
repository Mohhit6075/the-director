import { useState } from "react";
import { useToast } from "../../components/ui/Toast";
import { useAuth } from "../../context/AuthContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function PaymentOptions() {
  const { user } = useAuth();
  const toast = useToast();
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "VISA",
      cardNumber: "4532",
      fullNumber: "4532123456789012",
      holderName: user?.name || "JOHN DOE",
      expiryMonth: "12",
      expiryYear: "25",
      cvv: "123",
      isDefault: true,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      type: "Mastercard",
      cardNumber: "8976",
      fullNumber: "5412345678908976",
      holderName: user?.name || "JOHN DOE",
      expiryMonth: "08",
      expiryYear: "26",
      cvv: "456",
      isDefault: false,
      gradient: "from-orange-500 to-red-600",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    holderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isDefault: false,
  });

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "VISA";
    if (cleaned.startsWith("5")) return "Mastercard";
    if (cleaned.startsWith("3")) return "American Express";
    return "Card";
  };

  const getCardGradient = (type) => {
    switch (type) {
      case "VISA":
        return "from-blue-500 to-blue-700";
      case "Mastercard":
        return "from-orange-500 to-red-600";
      case "American Express":
        return "from-green-500 to-teal-600";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const handleAddNew = () => {
    setEditingCard(null);
    setFormData({
      cardNumber: "",
      holderName: user?.name?.toUpperCase() || "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    });
    setShowModal(true);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      cardNumber: card.fullNumber,
      holderName: card.holderName,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: card.cvv,
      isDefault: card.isDefault,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const cardToDelete = cards.find((c) => c.id === id);
    if (cardToDelete?.isDefault && cards.length > 1) {
      toast.show(
        "Cannot delete default card. Set another card as default first.",
        { type: "error" }
      );
      return;
    }
    setCards(cards.filter((c) => c.id !== id));
    toast.show("Card deleted successfully", { type: "success" });
  };

  const handleSetDefault = (id) => {
    setCards(
      cards.map((c) => ({
        ...c,
        isDefault: c.id === id,
      }))
    );
    toast.show("Default card updated", { type: "success" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleaned = formData.cardNumber.replace(/\s/g, "");

    if (cleaned.length < 13 || cleaned.length > 19) {
      toast.show("Invalid card number", { type: "error" });
      return;
    }

    if (
      !formData.holderName ||
      !formData.expiryMonth ||
      !formData.expiryYear ||
      !formData.cvv
    ) {
      toast.show("Please fill in all required fields", { type: "error" });
      return;
    }

    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      toast.show("Invalid CVV", { type: "error" });
      return;
    }

    const cardType = detectCardType(cleaned);
    const lastFour = cleaned.slice(-4);

    if (editingCard) {
      setCards(
        cards.map((c) =>
          c.id === editingCard.id
            ? {
                ...c,
                type: cardType,
                cardNumber: lastFour,
                fullNumber: cleaned,
                holderName: formData.holderName.toUpperCase(),
                expiryMonth: formData.expiryMonth,
                expiryYear: formData.expiryYear,
                cvv: formData.cvv,
                isDefault: formData.isDefault,
                gradient: getCardGradient(cardType),
              }
            : c
        )
      );
      toast.show("Card updated successfully", { type: "success" });
    } else {
      const newCard = {
        id: Date.now(),
        type: cardType,
        cardNumber: lastFour,
        fullNumber: cleaned,
        holderName: formData.holderName.toUpperCase(),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cvv: formData.cvv,
        isDefault: cards.length === 0 ? true : formData.isDefault,
        gradient: getCardGradient(cardType),
      };

      if (newCard.isDefault) {
        setCards([newCard, ...cards.map((c) => ({ ...c, isDefault: false }))]);
      } else {
        setCards([...cards, newCard]);
      }
      toast.show("Card added successfully", { type: "success" });
    }

    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 19) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 4) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else if (name === "expiryMonth" || name === "expiryYear") {
      const cleaned = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
      {!showModal ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#fd4444]">
              My Payment Options
            </h2>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-all font-medium"
            >
              + Add New Card
            </button>
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No payment methods saved yet</p>
              <button
                onClick={handleAddNew}
                className="px-6 py-3 bg-[#fd4444] text-white rounded hover:bg-red-500 transition-all font-medium"
              >
                Add Your First Card
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`border-2 border-gray-200 rounded-lg p-6 hover:border-[#fd4444] transition-colors bg-gradient-to-br ${card.gradient} text-white`}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-sm opacity-80 mb-1">Credit Card</p>
                        <p className="text-2xl font-bold">{card.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(card)}
                          className="text-white hover:text-gray-200 text-sm font-medium bg-white/20 px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="text-white hover:text-gray-200 text-sm font-medium bg-white/20 px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xl tracking-wider font-mono">
                        •••• •••• •••• {card.cardNumber}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs opacity-80">Card Holder</p>
                          <p className="font-medium">{card.holderName}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80">Expires</p>
                          <p className="font-medium">
                            {card.expiryMonth}/{card.expiryYear}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      {card.isDefault ? (
                        <span className="text-xs bg-green-500 px-2 py-1 rounded">
                          Default
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSetDefault(card.id)}
                          className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add New Card */}
                <div
                  onClick={handleAddNew}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:border-[#fd4444] transition-colors cursor-pointer min-h-[200px]"
                >
                  <div className="text-center">
                    <div className="text-4xl text-gray-400 mb-2">+</div>
                    <p className="text-gray-600 font-medium">
                      Add New Payment Method
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <IoInformationCircleOutline className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Secure Payment Information
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Your payment information is encrypted and stored securely.
                      We never share your card details with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#fd4444]">
              {editingCard ? "Edit Card" : "Add New Card"}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="px-2 py-3 flex items-center text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <FaArrowLeftLong className="w-4 h-4 mr-2" /> Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="w-full flex gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formatCardNumber(formData.cardNumber)}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900 font-mono"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Detected: {detectCardType(formData.cardNumber)}
                </p>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="holderName"
                  value={formData.holderName}
                  onChange={handleChange}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900 uppercase"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Month *
                </label>
                <input
                  type="text"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  placeholder="MM"
                  maxLength="2"
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Year *
                </label>
                <input
                  type="text"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  placeholder="YY"
                  maxLength="2"
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  className="w-full px-4 py-3 text-gray-600 bg-gray-100 rounded border-none focus:outline-none focus:ring-2 focus:ring-[#fd4444]/50 focus:text-gray-900"
                  required
                />
              </div>
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
                Set as default payment method
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
                {editingCard ? "Update Card" : "Add Card"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
