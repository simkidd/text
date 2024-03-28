"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface Menu {
  name: string;
  href: string;
}

const navlist: Menu[] = [
  { name: "About Us", href: "/about-us" },
  // { name: "Services", href: "/services" },
  // { name: "Projects", href: "/projects" },
  // { name: "GoShop", href: "/products" },
  // { name: "Blogs", href: "/blogs" },
  // { name: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const isActive = (href: string) => {
    return (
      href === pathname ||
      href === pathname.replace(/\/$/, "") ||
      pathname.startsWith(href + "/")
    );
  };

  return (
    <div className="w-full font-dmsans sticky top-0 left-0 z-50 light bg-white dark:bg-[#222327]">
      {/* top header */}
      <div className="w-full h-14 hidden lg:flex">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center container mx-auto px-2 w-full h-full">
          <div className="flex items-center gap-4 mr-auto text-sm">
            <span>example@gmail.com</span>
            <span>(123) 456 789</span>
          </div>

          <div className=" ml-auto flex gap-8">
            <ThemeSwitcher />
            <ul className="flex items-center gap-4 ">
              <li className="light bg-[#f1f1f1] dark:bg-[#2a2b2f] size-7 rounded-full flex items-center justify-center">
                <Link
                  href=""
                  className="text-sm hover:text-primary flex items-center justify-center w-full h-full"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li className="light bg-[#f1f1f1] dark:bg-[#2a2b2f] size-7 rounded-full flex items-center justify-center">
                <Link
                  href=""
                  className="text-sm hover:text-primary flex items-center justify-center w-full h-full"
                >
                  <FaXTwitter />
                </Link>
              </li>
              <li className="light bg-[#f1f1f1] dark:bg-[#2a2b2f] size-7 rounded-full flex items-center justify-center">
                <Link
                  href=""
                  className="text-sm hover:text-primary flex items-center justify-center w-full h-full"
                >
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* bottom header */}
      <div className=" w-full h-20 light bg-[#f1f1f1] dark:bg-[#2a2b2f]">
        <div className="flex items-center justify-between container mx-auto px-2 w-full h-full">
          {/* <div className="">
            <input type="text" placeholder="Search..." />
          </div> */}

          {/* logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="text-3xl">
              GoSolar.
            </Link>
          </div>

          <ul className="lg:flex hidden items-center space-x-8 h-full">
            {navlist.map(({ href, name }, i) => {
              return (
                <li key={i} className="h-full ">
                  <Link
                    href={href}
                    className={`h-full flex justify-center items-center border-b-4 border-b-transparent hover:text-primary transition-all duration-300 ease-in-out ${
                      isActive(href) ? "!border-b-primary text-primary" : ""
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/get-quote"
            className="bg-primary text-white h-full justify-center items-center px-4 lg:flex hidden"
          >
            Get A Quote
          </Link>

          <div
            className="cursor-pointer lg:hidden size-10 flex items-center justify-center"
            onClick={toggleShowMenu}
          >
            <CgMenuRight size={32} />
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`mob-nav-list lg:hidden ${showMenu && "open"}`}>
        <div className="mob-nav-inner light bg-white dark:bg-[#222327]">
          <div
            onClick={toggleShowMenu}
            className="cursor-pointer ml-auto mx-2 my-2"
          >
            <MdClose size={32} />
          </div>

          <ul className="flex items-center justify-center space-y-6 flex-col w-full">
            {navlist.map(({ href, name }, i) => {
              return (
                <li key={i} className="">
                  <Link
                    href={href}
                    className={` ${isActive(href) ? "text-primary" : ""}`}
                    onClick={toggleShowMenu}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-center w-full my-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
