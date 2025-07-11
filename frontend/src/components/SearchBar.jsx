import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
  return (
    <form className="relative h-full flex items-center w-6/12 md:w-3/12 ">
      <input
        name="search"
        type="text"
        placeholder="Search"
        spellCheck={false}
        className="p-2 pr-10 border outline-none border-slate-400 rounded-2xl h-[70%] w-full bg-slate-200 "
      />
      <button className="absolute right-4 hover:cursor-pointer">
        <HiMagnifyingGlass className="hover:cursor-pointer scale-125" />
      </button>
    </form>
  );
};

export default SearchBar;
