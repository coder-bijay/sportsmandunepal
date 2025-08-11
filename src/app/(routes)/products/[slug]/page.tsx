import { getProductBySlug } from "@/src/libs/products";
import ImageSelector from "../components/ImageSelector";
import { IProduct } from "../interface";
import QuantitySelector from "@/src/common/components/QuantitySelector";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug({ slug: slug });

  const productData: IProduct = (product && product.data) || [];
  const actualPrice =
    Number(productData?.price) - Number(productData?.discount);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-10 px-6 py-10">
      <ImageSelector
        images={[productData?.coverImage, ...productData?.images]}
      />
      <div className="flex flex-col w-full md:w-1/2 gap-2">
        <h1 className="text-2xl font-bold mb-2 capitalize">
          {productData.name}
        </h1>
        <p className="text-gray-600 text-base text-justify whitespace-pre-line mb-4">
          {productData.description}
        </p>

        <div className="mb-4">
          {productData?.price && (
            <div className="text-xs flex flex-col mt-1 h-full w-fit ">
              <div className="flex items-center text-brand  gap-1">
                <span className="font-bold">RS.</span>
                <span className="font-semibold"> {actualPrice}</span>
              </div>
              <div className="flex items-center line-through text-gray-400  font-light gap-1">
                <span>RS.</span>
                <span> {productData?.price}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 mb-4">
          {productData?.availableSizes?.map((size) => (
            <button
              key={size}
              className="w-fit min-w-6 px-1 h-6 border rounded disabled:opacity-50"
              disabled
            >
              {size}
            </button>
          ))}
        </div>

        <QuantitySelector
          min={1}
          max={5}
          initial={1}
          // onChange={(qty) => console.log("Quantity:", qty)}
        />

        <p
          className={`text-sm ${
            !!productData.stock ? "text-brand" : "text-red-500"
          } mb-2`}
        >
          {!!productData.stock ? "In stock" : "Out of stock"}
        </p>
        <button
          className="bg-brand w-[140px] text-white px-4 py-1 rounded disabled:opacity-50"
          disabled={!productData.stock}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
