import SearchBar from "./SearchBar";
import { useState } from "react";
const Navbar = ({ onSearchCoffee, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    if (searchQuery) {
      onSearchCoffee(searchQuery);
    }
  };
  const onClearSearch = () => {
    console.log("Clearing search:", searchQuery); // Debugging
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg flex items-start justify-between gap-4">
      <p className="text-xl font-mono">
        {" "}
        <span className="font-cursive text-primary/90">CoffeeGo</span> Admin
        Panel
      </p>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
    </div>
  );
};

export default Navbar;
