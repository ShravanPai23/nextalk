import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ searchQuery, setSearchQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-[4px] py-[6px]">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full">
          <label className="flex items-center w-full gap-2 border border-gray-600 rounded px-2 py-1">
            <input
              type="search"
              className="flex-grow bg-transparent text-white focus:outline-none focus:ring-0 focus:border-none w-full"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-white hover:text-gray-300">
              <FiSearch />
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Search;
