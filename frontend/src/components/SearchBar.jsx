import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
  const navigate = useNavigate();

  const [keyword, setkeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?keyword=${keyword}`)
  }
  
  return (
    <form onSubmit={handleSearch} className="relative h-full flex items-center w-6/12 md:w-3/12 ">
      <input
        name="keyword"
        type="text"
        placeholder="Search"
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => setkeyword(e.target.value)}
        className="p-2 pr-10 border outline-none border-slate-400 rounded-2xl h-[70%] w-full bg-slate-200 "
      />
      <button className="absolute right-4 hover:cursor-pointer">
        <HiMagnifyingGlass className="hover:cursor-pointer scale-125" />
      </button>
    </form>
  );
};

export default SearchBar;
