export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  coverImage: string;
  images: string[];
  availableSizes: string[];
  category: string;
  stock: number;
}
