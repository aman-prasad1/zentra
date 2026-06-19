import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?keyword=${keyword}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-5/12 md:w-[38%] "
    >
      {/* Left icon */}
      <HiMagnifyingGlass className="absolute left-3.5 text-gray-400 text-[17px] pointer-events-none" />

      <input
        name="keyword"
        type="text"
        placeholder="Search products, brands, categories"
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full h-[3.3em] pl-10 pr-4 py-2 rounded-full bg-(--searchbar-bg) border-none outline-none text-sm text-gray-700 placeholder-gray-400 shadow-lg"
      />
    </form>
  );
};

export default SearchBar;