import { getProductsBySlug } from "@/src/libs/products";
import { notFound } from "next/navigation";
import ImageSelector from "../components/ImageSelector";
import { IProduct } from "../interface";

interface ProductPageProps {
  params: { slug: string };
}

const ProductDetails = async ({ params }: ProductPageProps) => {
  const product: {
    data: IProduct;
  } = await getProductsBySlug({ slug: params.slug });

  if (!product) {
    notFound();
  }

  const productData = product && product.data;
  console.log("Product Details:", product);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
      <ImageSelector images={[productData?.image, productData?.image]} />
      <div className="flex flex-col max-w-md">
        <h1 className="text-2xl font-bold mb-2">{productData?.name}</h1>
        <p className="text-gray-600 whitespace-pre-line mb-4">
          {productData?.description}
        </p>

        <div className="flex gap-2 mb-4">
          {["XS", "SM", "M", "L", "XL"].map((size: string) => (
            <button
              key={size}
              className="w-10 h-10 border rounded disabled:opacity-50"
              disabled
            >
              {size}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          {productData?.stock ? "In stock" : "Out of stock"}
        </p>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!productData?.stock}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
