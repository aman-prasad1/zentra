import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../order/slices/orderSlice.js';
import { LuPackageOpen } from 'react-icons/lu';

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oldOrders, status } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const getStatusStyle = (orderStatus) => {
    switch (orderStatus?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700';
      case 'processing':
        return 'bg-amber-50 text-amber-700';
      case 'shipped':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
        <p className="text-xs text-gray-500 mt-1">Manage and track your recent orders</p>
      </div>

      {oldOrders && oldOrders.length > 0 ? (
        <div className="flex flex-col gap-6">
          {oldOrders.map((order) => (
            <div key={order._id} className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm bg-white">
              
              {/* Order Header info block */}
              <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-6 text-xs text-gray-500 font-medium">
                  <div className="flex flex-col gap-0.5">
                    <span>Order Date</span>
                    <span className="text-gray-900 font-semibold">
                      {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span>Total Amount</span>
                    <span className="text-gray-900 font-semibold">₹{order.totalPrize?.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 max-w-[150px] sm:max-w-none">
                    <span>Order ID</span>
                    <span className="text-gray-900 font-semibold truncate">{order._id}</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusStyle(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              {/* Order items list */}
              <div className="divide-y divide-gray-50">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="p-4 flex gap-4 items-center">
                    <Link to={`/products/details/${item._id}`} className="w-16 h-16 border border-gray-100 bg-gray-50 rounded-xl p-1 shrink-0 flex items-center justify-center">
                      <img src={item.image?.public_url || item.image} alt={item.name} className="w-full h-full object-contain rounded-lg" />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/details/${item._id}`} className="text-sm font-semibold text-gray-800 hover:text-black transition truncate block">
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                    </div>

                    <span className="text-sm font-bold text-gray-950 shrink-0">
                      ₹{item.price?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <LuPackageOpen className="text-4xl text-gray-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">No orders placed yet</h3>
            <p className="text-sm text-gray-500 mt-1">Once you buy products, their histories will show up here.</p>
          </div>
          <Link 
            to="/products" 
            className="mt-2 px-6 py-2.5 bg-black text-white hover:bg-gray-900 rounded-xl text-sm font-medium transition"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
