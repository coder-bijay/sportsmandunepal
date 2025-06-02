import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: string | number;
}) => {
  return (
    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5 p-2">
      <div className="duration-300 bg-white">
        <Link className="cursor-pointer" href={`/products/${title}`}>
          <Image
            height={240}
            width={240}
            src={image}
            alt={title}
            className="w-full h-48 md:h-60 bg-gray-200 transition-shadow hover:shadow-lg object-cover rounded"
          />
        </Link>
        <div className="p-2 lg:p-4 flex flex-col gap-1">
          <h3 className="text-xs lg:text-sm font-bold min-h-[2rem] lg:min-h-fit line-clamp-2">
            {title}
          </h3>
          <p className="text-xs lg:text-sm text-red-600 font-semibold">
            NPR {price}
          </p>
        </div>
      </div>
    </div>
  );
};
