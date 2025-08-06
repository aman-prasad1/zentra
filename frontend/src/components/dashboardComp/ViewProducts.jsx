import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/admin/adminSlice';
import { FaTrash } from 'react-icons/fa';
import { deleteProduct } from '../../features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';


const ViewProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminSlice);
  const navigate = useNavigate();

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      dispatch(getAllProducts());
    }
  }


  useEffect(() => {
    if(loading === false) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatPrice = (value) =>
    typeof value === "number"
      ? value.toLocaleString("en-IN", { style: "currency", currency: "INR" })
      : value;

  return (
    <div className='w-full'>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="space-y-4">
        {products?.map((product) => {

          return (
            <div
              key={product._id}
              className="flex flex-wrap md:flex-nowrap items-center gap-4 bg-white shadow p-4 rounded-md"
            >
              {/* Image + Info */}
              <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                <img
                  src={product?.images?.[0]?.public_url}
                  alt={product.name}
                  onClick={() => navigate(`/products/details/${product._id}`)}
                  className="w-20 h-20 rounded-md object-cover hover:cursor-pointer"
                />

                <div className="min-w-0">
                  <h2
                    className="text-lg font-semibold hover:text-amber-800 hover:cursor-pointer"
                    title={product.name}
                    onClick={() => navigate(`/products/details/${product._id}`)}
                  >
                    {product.name}
                  </h2>

                  {/* Price */}
                  <p className="text-sm text-gray-600">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>

              {/* Delete */}
              <div className="flex items-center gap-4 ml-auto">
                <button
                  onClick={() => onDelete(product._id)}
                  className="text-red-500 hover:text-red-700 transition hover:cursor-pointer"
                  title="Delete Product"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ViewProducts
