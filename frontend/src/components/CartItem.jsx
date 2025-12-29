import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, incQuantity, decQuantity, removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartItem = ({item}) => {
    
  const dispatch = useDispatch();

  const handleDecrease = () => {
    dispatch(decQuantity(item?.id));
  }
  const handleIncrease = () => {
    dispatch(incQuantity(item?.id));
  }
  const handleDelete = () => {
    dispatch(removeFromCart(item?.id))
  }

  return (
    <div className="w-[75vw] h-50 max-w-125 shadow-md rounded-2xl">
      <Link to={`/products/details/${item.id}`} className="h-1/2 w-full flex gap-2 p-2 hover:text-amber-800 transition-all">
        <div className="w-fit overflow-hidden">
            <img src={item.image} alt="" className="h-full rounded-2xl"/>
        </div>
        <h4 className=" w-4/5 p-2 font-extralight multiline-ellipsis">{item.name}</h4>
      </Link>

      {/* quantity */}
      <div className="flex flex-row gap-3 justify-center items-center">
        <span className="font-semibold">quantity:</span>
        <div className="flex flex-row gap-4 items-center">
            <button onClick={handleDecrease} className="border border-slate-400 w-7 bg-slate-200 rounded h-10 text-2xl hover:cursor-pointer">-</button>
            <span>{item.quantity}</span>
            <button onClick={handleIncrease} className="border border-slate-400 w-7 bg-slate-200 rounded h-10 text-2xl hover:cursor-pointer">+</button>
        </div>
      </div>
      
      <div className="flex justify-end px-10">
        <button onClick={handleDelete} className="text-xl text-red-800 p-1 rounded-sm cursor-pointer "><AiOutlineDelete /></button>
      </div>
    </div>
  );
};

export default CartItem;
