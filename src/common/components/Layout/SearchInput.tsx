"use client";
import { ProductCardForSearch } from "@/src/app/(routes)/products/components/ProductCard";
import { IProduct } from "@/src/app/(routes)/products/interface";
import { getProducts } from "@/src/libs/products";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const POPULAR_SEARCHES = ["jersey", "shoes", "track"];

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [openSearchContainer, setOpenSearchContainer] = useState(false);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

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
      setInputValue("");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (!value) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      const results = await getProducts({ query: "search", value });
      setSearchResults(results?.data || []);
      setIsSearching(false);
    }, 500);
  };

  const handleProductClick = (slug: string) => {
    setInputValue("");
    setOpenSearchContainer(false);
    router.push(`/products/${slug}`);
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <div className="flex items-center border border-gray-200 hover:border-gray-400 rounded-md w-full">
        <input
          type="text"
          value={inputValue}
          onFocus={() => setOpenSearchContainer(true)}
          onChange={handleInputChange}
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
        <div className="absolute w-full mt-1 p-2 flex flex-col gap-2 bg-white rounded-md border shadow-md border-gray-200 z-50">
          <span className="font-semibold text-[14px]">Popular Search</span>
          <div className="flex items-center gap-2 flex-wrap">
            {POPULAR_SEARCHES.map((term) => (
              <span
                key={term}
                onClick={() => navigateToSearch(term)}
                className="cursor-pointer border capitalize border-blue-400 rounded-md text-blue-400 text-[12px] lg:text-[14px] font-medium px-2 py-1"
              >
                {term}
              </span>
            ))}
          </div>

          <div className="py-2 border-t-[2px] border-blue-400">
            <span className="font-semibold text-[14px]">Search Results</span>
            <div className="flex flex-col gap-2 justify-center items-center overflow-y-auto mt-1">
              {isSearching ? (
                <div className="text-gray-500 text-sm w-full justify-start">
                  Searching...
                </div>
              ) : searchResults.length === 0 && !isSearching ? (
                <div className="text-gray-500 text-sm w-full justify-start">
                  No products found.
                </div>
              ) : (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="w-full cursor-pointer flex flex-col gap-2"
                  >
                    <ProductCardForSearch
                      coverImage={product.coverImage}
                      name={product.name}
                      price={product.price}
                    />
                    <div className="h-[1px] w-full bg-gray-100" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
