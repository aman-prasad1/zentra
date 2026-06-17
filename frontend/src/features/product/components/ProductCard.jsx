import { useNavigate } from 'react-router-dom';
import RatingsStar from '../../../components/ui/RatingsStar';

const ProductCard = ({product}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/details/${product?._id}`);
  }

  return (
    <div onClick={handleClick} className='w-60 h-fit max-h-77.75 px-2 rounded-2xl shadow-xl hover:scale-105 hover:cursor-pointer transition-all'>

      {/* Image div */}
      <div className='h-8/12 lg:h-7/12 max-h-45 w-full rounded-2xl flex justify-center overflow-hidden'>
        <img src={product?.images[0].public_url} alt="img" className='w-full' />
      </div>

      {/* name and ratings */}
      <div className='flex flex-col gap-2 mb-2'>
        <span className='multiline-ellipsis h-18 w-full '>{product?.name}</span>
        <RatingsStar ratings={product?.ratings} />
      </div>

      {/* Price */}
      <div>
        <span className='text-slate-700 font-light'>Rs.{product?.price}</span>
      </div>
    </div>
  )
}

export default ProductCard
