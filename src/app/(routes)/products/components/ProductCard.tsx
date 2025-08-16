import Image from "next/image";
import Link from "next/link";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import { IProduct } from "../interface";

export const ProductCard = ({
  coverImage,
  name,
  slug,
  price,
  discount,
}: {
  coverImage: string;
  slug: string;
  name: string;
  price: string | number;
  discount: string | number;
}) => {
  const actualPrice = Number(price) - Number(discount);

  return (
    <div className="w-[90%] md:w-[300px] p-2">
      <div className="duration-300 transition-shadow hover:shadow-2xl rounded-md border border-blue-100 bg-white">
        <Link className="cursor-pointer" href={`/products/${slug}`}>
          <Image
            height={240}
            width={240}
            src={coverImage}
            alt={name}
            className="w-full h-44 p-2 object-cover"
          />
        </Link>
        <div className="p-2 lg:p-4 flex flex-col gap-1">
          <h3 className="text-xs capitalize lg:text-sm font-semibold min-h-[2rem] lg:min-h-fit line-clamp-2">
            {name}
          </h3>
          <div>
            {price && (
              <div className="text-xs flex flex-col mt-1 h-full w-fit ">
                <div className="flex items-center text-red-600  gap-1">
                  <span className="font-bold">RS.</span>
                  <span className="font-semibold"> {actualPrice}</span>
                </div>
                <div className="flex items-center line-through text-red-600  font-light gap-1">
                  <span>RS.</span>
                  <span> {price}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCardForSearch = ({
  coverImage,
  name,
  price,
  discount,
}: {
  coverImage: string;
  name: string;
  price: string | number;
  discount: string | number;
}) => {
  const actualPrice = Number(price) - Number(discount);
  return (
    <div className="flex items-center gap-1 transition-shadow cursor-pointer rounded-md bg-gray-50 hover:bg-gray-100 w-full p-2">
      <Image
        height={60}
        width={120}
        src={coverImage}
        alt={name}
        className="object-cover h-[60px] w-[120px] rounded-md bg-white p-1"
      />

      <div className="p-2 flex flex-col w-full gap-1">
        <h3 className="text-xs capitalize font-bold min-h-[2rem] lg:min-h-fit line-clamp-4">
          {name}
        </h3>

        <div>
          {price && (
            <div className="text-xs flex flex-col mt-1 h-full w-fit ">
              <div className="flex items-center text-red-600  gap-1">
                <span className="font-bold">RS.</span>
                <span className="font-semibold"> {actualPrice}</span>
              </div>
              <div className="flex items-center line-through text-red-600  font-light gap-1">
                <span>RS.</span>
                <span> {price}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductCardForCart = ({
  loading,
  productData,
  quantity,
  onDeleteClick,
  onQuantityChange,
}: {
  loading: boolean;
  productData: IProduct;
  quantity: number;
  onDeleteClick: () => void;
  onQuantityChange: ({}: { productId: string; quantity: number }) => void;
}) => {
  const actualPrice =
    Number(productData?.price) - Number(productData?.discount);
  return (
    <div className="flex items-center gap-1 transition-shadow cursor-pointer rounded-md bg-gray-50 hover:bg-gray-100 w-fit p-2 relative">
      <Image
        height={100}
        width={120}
        src={productData?.coverImage}
        alt={productData?.name}
        className="object-cover h-[100px] w-[120px] rounded-md bg-white p-1"
      />

      <div className="p-2 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 w-full">
        <div className="flex flex-col gap-1 w-[300px]">
          <h3 className="text-xs capitalize font-bold min-h-[2rem] lg:min-h-fit line-clamp-4">
            {productData?.name}
          </h3>
          <p className="text-sm text-gray-500">No brand.</p>
        </div>
        <div>
          {productData?.price && (
            <div className="text-xs flex flex-col mt-1 h-full w-fit ">
              <div className="flex items-center text-red-600  gap-1">
                <span className="font-bold">RS.</span>
                <span className="font-semibold"> {actualPrice}</span>
              </div>
              <div className="flex items-center line-through text-red-600  font-light gap-1">
                <span>RS.</span>
                <span> {productData?.price}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center w-[140px] gap-2">
            {/* Decrease Button */}
            <button
              disabled={loading || quantity <= 1}
              onClick={() => {
                const newValue = Math.max(1, quantity - 1);
                onQuantityChange({
                  productId: productData?._id ?? "",
                  quantity: newValue,
                });
              }}
              className={`p-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <BiMinus className="w-4 h-4" />
            </button>

            {/* Quantity Display */}

            <span className="p-2 border border-gray-300 rounded-md min-w-[40px] text-center">
              {loading ? "-" : quantity}
            </span>

            {/* Increase Button */}
            <button
              disabled={loading || quantity >= 2}
              onClick={() => {
                const newValue = Math.min(2, quantity + 1);
                onQuantityChange({
                  productId: productData?._id ?? "",
                  quantity: newValue,
                });
              }}
              className={`p-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <BiPlus className="w-4 h-4" />
            </button>
          </div>
          <IoMdTrash
            onClick={() => onDeleteClick()}
            className="w-5 h-5 hover:text-red-500 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};
