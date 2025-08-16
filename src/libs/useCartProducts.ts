// useCartProducts.ts
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/src/utils/axiosInstance";
import { isAuthenticated } from "../utils/isAuthenticated";
import { IProduct } from "../app/(routes)/products/interface";

const fetchCartProducts = async () => {
  const data: {
    data: {
      _id: string;
      quantity: number;
      client: string;
      product: IProduct[];
    }[];
  } = await Axios.get(`cart-product/client`);
  return data;
};

const { authenticated } = isAuthenticated();

export const useCartProducts = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["cartProducts"],
    queryFn: fetchCartProducts,
    enabled: authenticated,
  });
};
