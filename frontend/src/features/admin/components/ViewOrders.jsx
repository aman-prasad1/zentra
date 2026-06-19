import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../slices/adminSlice";
import { FaCheck } from "react-icons/fa";

const ViewOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminSlice);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }))
    .then(() => {
      dispatch(getAllOrders());
    })
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Order ID: {order._id}</h2>
              <div className="text-sm text-gray-600">
                Placed: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>

            <p className="text-sm">
              <strong>User ID:</strong> {order.user}
            </p>
            <p className="text-sm">
              <strong>Payment:</strong> {order.paymentMethod}{" "}
              {order.paidAt ? "(Paid)" : "(Not Paid)"}
            </p>
            <p className="text-sm">
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>

            <div>
              <strong>Shipping:</strong>{" "}
              {order.shippingInfo.address}, {order.shippingInfo.city} -{" "}
              {order.shippingInfo.pinCode}, {order.shippingInfo.state},{" "}
              {order.shippingInfo.country} | 📞 {order.shippingInfo.phoneNo}
            </div>

            <div className="pt-2">
              <strong>Items:</strong>
              <ul className="pl-4 list-disc space-y-1">
                {order.orderItems.map((item) => (
                  <li key={item._id} className="flex items-center gap-2">
                    <img
                      src={item.image.public_url}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="truncate max-w-xs" title={item.name}>
                      {item.name.slice(0, 50)}...
                    </span>{" "}
                    × {item.quantity} @ ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label htmlFor={`status-${order._id}`} className="font-medium">
                Status:
              </label>
              <select
                id={`status-${order._id}`}
                value={order.orderStatus}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                className="border border-gray-300 rounded p-1"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <span className="text-sm text-green-600 flex items-center gap-1">
                <FaCheck /> Updated
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
