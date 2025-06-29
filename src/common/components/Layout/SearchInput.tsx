import { FiSearch } from "react-icons/fi";

export const SearchInput = () => {
  return (
    <div className="flex items-center border border-gray-200 hover:border-gray-400 rounded-md w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-1 px-3 py-2 outline-none"
      />
      <button className="px-3 text-blue-400">
        <FiSearch />
      </button>
    </div>
  );
};
