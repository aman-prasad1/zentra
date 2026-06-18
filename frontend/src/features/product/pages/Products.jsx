import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Banner from "../../../assets/images/banner.png";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../slices/productSlice";
import Loader from "../../../components/ui/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const { products, productCount, resultPerPage, loading } = useSelector(
    (state) => state.productSlice
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || 1);
  const totalPages = Math.ceil(productCount / resultPerPage || 1);

  useEffect(() => {
    dispatch(getProducts({ keyword, page }));
  }, [dispatch, keyword, page]);

  const goToPage = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum);
    setSearchParams(params);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  if(loading) return <Loader />
  return (keyword)? (<div className='lg:pt-5'>
      <div className='grid w-full gap-x-0 gap-y-20 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 sm:p-4'>
        {products?.map((product, index) => {
          return <ProductCard key={index}  product={product} />
        })}
      </div>

      {/* Pagination */}
      <div className="flex h-25 justify-center items-center gap-2 mt-10">
        {/* Prev Button */}
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
        >
          « Prev
        </button>

        {/* Current Page */}
        <span className="px-3 py-1 rounded bg-amber-600 text-white font-semibold">
          {page}
        </span>

        {/* Next Button (only clickable if current page has 8 products) */}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={products?.length < resultPerPage}
          className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
        >
          Next »
        </button>
      </div>
    </div>) : (
    <div className="lg:px-50 pt-5 flex flex-col items-center gap-10">
      {/* product banner */}
      <div className="w-screen h-full flex justify-center items-center">
        <img src={Banner} alt="img" className="rounded-2xl" />
      </div>
      {/* Featured products */}
      <div className="w-full mt-4 ">
        <h3 className="p-4 text-2xl font-bold text-slate-700">
          Featured Products
        </h3>
        <div className="grid w-full gap-x-0 gap-y-10 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 sm:p-4">
          {products?.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
      {/* Top Rated */}
      <div className="w-full mt-4 ">
        <h3 className="p-4 text-2xl font-bold text-slate-700">Top Rated</h3>
        <div className="grid w-full gap-x-0 gap-y-10 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 ">
          {products?.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
