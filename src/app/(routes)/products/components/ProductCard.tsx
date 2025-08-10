import Image from "next/image";
import Link from "next/link";

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
}: {
  coverImage: string;
  name: string;
  price: string | number;
}) => {
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
        <p className="text-xs text-red-600 font-semibold">NPR {price}</p>
      </div>
    </div>
  );
};
