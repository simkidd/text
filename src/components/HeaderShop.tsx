"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Mail, Menu, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { navlist } from "./Navbar";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import {Badge} from "@nextui-org/react";

const HeaderShop = () => {
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
    <div className="w-full font-dmsans sticky top-0 left-0 z-50 light bg-white dark:bg-[#222327] shadow">
      {/* top header */}
      <div className="w-full h-14 hidden lg:flex">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center container mx-auto px-2 w-full h-full">
          <div className="flex items-center gap-4 mr-auto text-sm">
            <span className="flex items-center">
              <Mail className="text-primary mr-2" size={18} />
              gosolardotng@gmail.com
            </span>
            <span className="flex items-center">
              <Phone className="text-primary mr-2" size={18} />
              0706 276 2879
            </span>
          </div>

          <div className=" ml-auto flex gap-8">
            <ThemeSwitcher />
            <ul className="flex items-center gap-4 ">
              <li className="light bg-[#f1f1f1] dark:bg-[#2a2b2f] size-7 rounded-full flex items-center justify-center">
                <Link
                  href="https://www.facebook.com/Gosolar.ng"
                  className="text-sm hover:text-primary flex items-center justify-center w-full h-full"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li className="light bg-[#f1f1f1] dark:bg-[#2a2b2f] size-7 rounded-full flex items-center justify-center">
                <Link
                  href="https://twitter.com/Gosolarng"
                  className="text-sm hover:text-primary flex items-center justify-center w-full h-full"
                >
                  <FaXTwitter />
                </Link>
              </li>
              <li className="light bg-[#f1f1f1] dark:bg-[#2a2b2f] size-7 rounded-full flex items-center justify-center">
                <Link
                  href="#"
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
          <div
            className="cursor-pointer lg:hidden size-10 flex items-center justify-center mr-2"
            onClick={toggleShowMenu}
          >
            <Menu size={32} />
          </div>

          {/* logo */}
          <div className="flex items-center justify-center mr-auto lg:mr-0">
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

          <div className="flex h-full">
            <button className="w-20 h-full justify-center items-center px-4 py-2 flex">
              <HiOutlineUser size={24} />
            </button>
            <button className="bg-primary text-white w-20 h-full justify-center items-center px-4 py-2 flex">
            <Badge content="5" color="danger" size="sm">
              <HiOutlineShoppingBag size={24} />
            </Badge>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderShop;
