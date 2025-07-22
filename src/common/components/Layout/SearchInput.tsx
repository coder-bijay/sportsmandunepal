"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const POPULAR_SEARCHES = ["jersey", "shoes", "track"];

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [openSearchContainer, setOpenSearchContainer] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navigateToSearch = useCallback((searchTerm: string) => {
    const origin = window.location.origin;
    const searchParams = new URLSearchParams();
    searchParams.set("search", searchTerm.trim());
    const newUrl = `${origin}?${searchParams.toString()}`;
    window.location.href = newUrl;
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setOpenSearchContainer(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigateToSearch(inputValue);
    }
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <div className="flex items-center border border-gray-200 hover:border-gray-400 rounded-md w-full">
        <input
          type="text"
          value={inputValue}
          onFocus={() => setOpenSearchContainer(true)}
          onBlur={() => setOpenSearchContainer(false)}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products..."
          className="flex-1 px-3 py-2 outline-none"  
        />
        <button
          onClick={() => navigateToSearch(inputValue)}
          className="px-3 text-blue-400"
        >
          <FiSearch />
        </button>
      </div>

      {openSearchContainer && (
        <div className="absolute w-full mt-1 p-2 flex flex-col gap-2 h-[100px] bg-white rounded-md border shadow-md border-gray-200">
          <span className="font-semibold text-[14px]">Popular Search</span>
          <div className="flex items-center gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <span
                key={term}
                onClick={() => navigateToSearch(term)}
                className="cursor-pointer border capitalize border-blue-600 rounded-md text-blue-600 text-[12px] lg:text-[14px] font-medium px-2"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
