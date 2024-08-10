import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-xl">
      <input
        type="text"
        placeholder="Search Menus"
        className="w-full text-xs bg-transparent py-[11px] outline-none text-black"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl cursor-pointer text-slate-500 hover:text-black mr-3 "
          onClick={onClearSearch}
        />
      )}
      <a href="/#services">
        <FaMagnifyingGlass
          className="text-slate-400 cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
      </a>
    </div>
  );
};

export default SearchBar;
