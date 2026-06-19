import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getProducts } from "../slices/productSlice";
import { toggleWishlist } from "../slices/wishlistSlice";
import RatingsStar from "../../../components/ui/RatingsStar";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { HiOutlineChevronRight } from "react-icons/hi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";

const categories = ["Mens", "Womens", "Accessories", "Electronics", "Home"];

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, productCount, resultPerPage, loading } = useSelector(
    (state) => state.productSlice
  );
  const wishlistItems = useSelector((state) => state.wishlistSlice.items);

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || 1);
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  // Local state for price inputs to prevent fetching on every keystroke
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync local inputs when URL params change (e.g. on clear all)
  useEffect(() => {
    setLocalMinPrice(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    dispatch(getProducts({ keyword, page, category, minPrice, maxPrice }));
  }, [dispatch, keyword, page, category, minPrice, maxPrice]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category, minPrice, maxPrice, keyword]);

  const updateFilters = (newParams) => {
    const params = new URLSearchParams(searchParams);
    // Reset page to 1 on filter change
    params.set("page", "1");
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const handleCategoryClick = (catName) => {
    if (category === catName) {
      updateFilters({ category: "" }); // toggle off
    } else {
      updateFilters({ category: catName });
    }
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    updateFilters({ minPrice: localMinPrice, maxPrice: localMaxPrice });
  };

  const handleClearAll = () => {
    setSearchParams(new URLSearchParams());
    setLocalMinPrice("");
    setLocalMaxPrice("");
  };

  const goToPage = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());
    setSearchParams(params);
  };

  const activeFiltersCount = [
    keyword ? 1 : 0,
    category ? 1 : 0,
    minPrice ? 1 : 0,
    maxPrice ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-(--main-bg) px-4 sm:px-8 lg:px-20 pt-6 pb-16 min-h-screen">
      
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
            <Link to="/" className="hover:text-black transition">Home</Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 font-semibold">Shop</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {keyword ? `Search Results for "${keyword}"` : category ? `${category} Collection` : "All Products"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {!loading && `${productCount} products found`}
          </p>
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-sm font-medium hover:cursor-pointer transition"
        >
          <LuSlidersHorizontal className="text-base" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Filter Sidebar (Desktop Always Visible, Mobile Drawer) */}
        <aside className={`
          fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto
          ${isMobileFilterOpen ? "flex" : "hidden lg:block"}
          flex-col bg-black/40 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none
          lg:w-64 shrink-0
        `}>
          {/* Mobile Overlay Content Box */}
          <div className="
            ml-auto lg:ml-0 w-80 lg:w-full h-full lg:h-auto bg-white lg:bg-transparent
            p-6 lg:p-0 flex flex-col gap-8 shadow-2xl lg:shadow-none overflow-y-auto lg:overflow-visible
          ">
            {/* Sidebar Mobile Header */}
            <div className="flex items-center justify-between lg:hidden border-b border-gray-100 pb-4">
              <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 hover:cursor-pointer transition"
              >
                <IoCloseOutline className="text-xl text-gray-500" />
              </button>
            </div>

            {/* Active Filters Summary Header */}
            {activeFiltersCount > 0 && (
              <div className="hidden lg:flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm font-semibold text-gray-900">Filters Active ({activeFiltersCount})</span>
                <button
                  onClick={handleClearAll}
                  className="text-xs font-medium text-gray-500 hover:text-black hover:cursor-pointer transition underline decoration-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Categories Filter Block */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</h4>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((catName) => {
                  const isActive = category === catName;
                  return (
                    <button
                      key={catName}
                      onClick={() => handleCategoryClick(catName)}
                      className={`
                        px-4 py-2 lg:px-3 lg:py-2 rounded-xl text-sm text-left font-medium transition duration-200 hover:cursor-pointer
                        ${isActive 
                          ? "bg-black text-white shadow-sm font-semibold" 
                          : "bg-gray-50 lg:bg-transparent text-gray-600 hover:bg-gray-100 lg:hover:text-black"}
                      `}
                    >
                      {catName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Block */}
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</h4>
              <form onSubmit={handlePriceSubmit} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">Min Price</label>
                    <input
                      type="number"
                      placeholder="₹ Min"
                      value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">Max Price</label>
                    <input
                      type="number"
                      placeholder="₹ Max"
                      value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 hover:cursor-pointer transition"
                >
                  Apply Filter
                </button>
              </form>
            </div>

            {/* Mobile Footer Clear Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  handleClearAll();
                  setIsMobileFilterOpen(false);
                }}
                className="lg:hidden mt-auto w-full py-3 border border-gray-200 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:cursor-pointer transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid Section */}
        <main className="flex-1">
          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl p-4 border border-gray-100">
                  <div className="bg-gray-100 rounded-xl h-[16em] w-full mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded h-4 w-3/4"></div>
                    <div className="bg-gray-100 rounded h-4 w-1/2"></div>
                    <div className="bg-gray-100 rounded h-6 w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            /* Real Products Grid */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/products/details/${product._id}`)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative overflow-hidden h-[16em] bg-gray-50 shrink-0">
                      <img
                        src={product?.images?.[0]?.public_url}
                        alt={product?.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      {/* Wishlist button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleWishlist(product));
                        }}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 hover:cursor-pointer"
                      >
                        {wishlistItems.some((item) => item._id === product._id) ? (
                          <AiFillHeart className="text-xl text-red-500 animate-scaleIn" />
                        ) : (
                          <CiHeart className="text-xl text-gray-700" />
                        )}
                      </button>

                      {/* Category Badge */}
                      {product?.category && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {product.category}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 multiline-ellipsis leading-snug mb-2">
                          {product?.name}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <RatingsStar ratings={product?.ratings} />
                          {product?.numberOfReviews > 0 && (
                            <span className="text-xs text-gray-400">({product.numberOfReviews})</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-base font-semibold text-gray-900">
                          ₹{product?.price?.toLocaleString()}
                        </span>
                        {product?.stock > 0 ? (
                          <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-xs text-red-500 font-semibold bg-red-50 px-2.5 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Elegant Pagination */}
              {productCount > resultPerPage && (
                <div className="flex justify-center items-center gap-2 mt-12 pt-6 border-t border-gray-100">
                  {/* Prev Button */}
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition hover:cursor-pointer"
                  >
                    Prev
                  </button>

                  {/* Page Numbers */}
                  {[...Array(Math.ceil(productCount / resultPerPage))].map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === page;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`
                          w-10 h-10 rounded-xl text-sm font-semibold transition hover:cursor-pointer
                          ${isActive 
                            ? "bg-black text-white shadow-sm" 
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"}
                        `}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={products?.length < resultPerPage}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition hover:cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <LuSlidersHorizontal className="text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
              <p className="text-sm text-gray-500 max-w-xs text-center mb-6">
                Try modifying your filters or clear them completely to view all products.
              </p>
              <button
                onClick={handleClearAll}
                className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition hover:cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>

      </div>

    </div>
  );
};

export default Products;
