import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
  image,
  name,
  slug,
  price,
}: {
  image: string;
  slug: string;
  name: string;
  price: string | number;
}) => {
  return (
    <div className="w-[90%] md:w-[260px] p-2">
      <div className="duration-300 transition-shadow hover:shadow-2xl rounded-md bg-white">
        <Link className="cursor-pointer" href={`/products/${slug}`}>
          <Image
            height={240}
            width={240}
            src={image}
            alt={name}
            className="w-full h-60 p-1 object-cover rounded"
          />
        </Link>
        <div className="p-2 lg:p-4 flex flex-col gap-1">
          <h3 className="text-xs capitalize lg:text-sm font-bold min-h-[2rem] lg:min-h-fit line-clamp-2">
            {name}
          </h3>
          <p className="text-xs lg:text-sm text-red-600 font-semibold">
            NPR {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProductCardForSearch = ({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: string | number;
}) => {
  return (
    <div className="flex items-center gap-1 transition-shadow cursor-pointer rounded-md bg-gray-50 hover:bg-gray-100 w-full p-2">
      <Image
        height={100}
        width={100}
        src={image}
        alt={name}
        className="object-cover rounded bg-white px-2"
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
