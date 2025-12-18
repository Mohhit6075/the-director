import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { getOrders } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, [getOrders]);

  const statusColor = (s) => {
    switch (s) {
      case "pending":
        return "bg-yellow-300/50 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mt-28 mx-auto p-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700 font-semibold">
              You have no orders yet.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              When you place orders they'll appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <section className="order-2 lg:order-0 lg:col-span-3 space-y-4">
              {orders.map((o) => (
                <article
                  key={o.id}
                  className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-medium">
                        Order #{" "}
                        <span className="text-yellow-600 font-semibold">
                          {o.id}
                        </span>
                      </h2>
                      <span
                        className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Placed on <span className="font-semibold">{o.date}</span>{" "}
                      <span className="ml-2 text-gray-700 font-semibold">
                        • {o.items?.length || 0} items
                      </span>
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                      {o.items?.map((it, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <img
                            src={it.image || "/images/product-placeholder.svg"}
                            alt={it.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="font-bold ">{it.name}</div>
                            <div className="text-xs text-gray-700 mt-1">
                              {it.qty} × ${(it.price || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 flex justify-between items-center gap-4">
                    <div className="text-left md:text-right">
                      <div className="text-sm text-gray-600">Total</div>
                      <div className="font-bold text-lg">
                        ${o.total?.toFixed(2) || "0.00"}
                      </div>
                    </div>
                    <button className="px-8 md:px-4 py-2 bg-[#ffad33] text-white rounded-md">
                      View
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="lg:col-span-1 lg:sticky lg:top-28 bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-800">
                Filter & summary
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                You can filter orders in future iterations. For now this area
                summarizes recent activity.
              </p>
              <div className="mt-4">
                <div className="text-sm text-gray-800">Total orders</div>
                <div className="text-2xl font-bold">{orders.length}</div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
