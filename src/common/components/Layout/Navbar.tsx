import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";
import { SearchInput } from "./SearchInput";
import { NavItems } from "./NavItems";
import { getAllCategory } from "@/src/libs/category";
import Link from "next/link";
import Container from "../../Container";

export const Navbar = async () => {
  const categories = await getAllCategory();

  return (
    <div className="fixed w-screen top-0 bg-white z-50">
      <Container>
        <div className="w-full h-[60px]  flex items-center justify-between px-4 lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sportsmandu.png" alt="logo" width={60} height={60} />
          </Link>

          <div className="hidden lg:flex min-w-[300px] xl:min-w-[400px]">
            <SearchInput />
          </div>

          <div className="flex items-center gap-6 min-w-[120px]">
            <div className="flex items-center gap-6 text-xl">
              <FiShoppingCart className="cursor-pointer" />
              <FaRegUser className="cursor-pointer" />
            </div>
            <MobileMenu categories={categories?.data} />
          </div>
        </div>
      </Container>

      {/* Desktop Nav Items */}
      <div className="hidden lg:flex bg-blue-600 w-full justify-center h-[48px]">
        <div className="w-full max-w-[1920px] h-full">
          <div className="container mx-auto flex gap-8 xl:gap-10 h-full text-md items-center justify-center font-semibold text-white">
            <NavItems categories={categories?.data} />
          </div>
        </div>
      </div>
    </div>
  );
};
