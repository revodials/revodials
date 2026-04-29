"use client";
import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaBarsStaggered } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CartItem } from "@/lib/cart-context";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIslogin, logout } from "@/lib/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Flame, Search } from "lucide-react";
import Socialbtn from "./socialbtn";
import { FadeIn } from "./fadein";
import { fetchCatagory } from "../actions/products";
import Notify from "./notification";

function Navbar() {
  const { carts } = useContext(CartItem);
  const router = useRouter();
  const [box, setBox] = useState({ isOpen: false });
  const { isOpen } = box;
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch auth status with React Query
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkIslogin,
    refetchOnWindowFocus: false,
  });
  const { data: category } = useQuery({
    queryKey: ["catagory"],
    queryFn: fetchCatagory,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      router.push("/login");
    },
  });

  return (
    <div className="sticky top-0 z-[100]">
      {/* Premium Announcement Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-[10px] sm:text-xs md:text-sm font-bold text-center py-2.5 px-4 tracking-[0.15em] sm:tracking-[0.2em] flex items-center justify-center gap-3 border-b border-red-800 shadow-md z-50">

        {/* Subtle shimmer */}
        <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"></div>

        <Flame size={16} className="text-yellow-400 animate-bounce hidden sm:block relative z-10" />

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 uppercase drop-shadow-sm">
          <span className="font-black text-yellow-400 drop-shadow-md">
            FLASH SALE:
          </span>
          <span className="text-white font-extrabold drop-shadow-md">
            50% OFF + FREE DELIVERY & COD IN PAKISTAN!
          </span>
        </div>

        <Flame size={16} className="text-yellow-400 animate-bounce hidden sm:block relative z-10" />
      </div>
      <div className="border-b border-white/10 bg-neutral-950/95 backdrop-blur-md shadow-sm">
        {/* Mobile Hamburger */}
        <div className="md:hidden h-20 flex items-center w-full px-5 relative">
          {isOpen ? (
            <div className="flex justify-end w-full">
              <ImCross
                size={22}
                color="white"
                className="cursor-pointer"
                onClick={() => setBox({ ...box, isOpen: false })}
              />
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <div className="w-6"></div> {/* Spacer to keep logo centered */}

              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <Image
                  src={"/logo-revo.png"}
                  height={140}
                  width={160}
                  priority
                  alt="Logo"
                />
              </Link>

              <div className="flex items-center gap-6 z-10">
                <button
                  className="relative text-white cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => router.push("/cart")}
                >
                  <BsCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white font-black text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center border border-neutral-950 shadow-sm shadow-red-600/50">
                    {carts?.length || 0}
                  </span>
                </button>
                <button
                  className="text-white cursor-pointer hover:text-red-500 transition-colors z-10"
                  onClick={() => setBox({ ...box, isOpen: true })}
                >
                  <FaBarsStaggered size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex w-full z-50">
          {/* Desktop Navbar */}
          <FadeIn className="flex items-center justify-between w-full h-24 px-6 lg:px-12 relative max-w-[1920px] mx-auto">
            {/* Left: Navigation Links */}
            <div className="flex-1 flex items-center justify-start gap-8 text-sm font-bold tracking-[0.15em] text-white">
              <Link href={"/"} className="hover:text-red-500 transition-colors uppercase relative group">
                Home
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center cursor-pointer hover:text-red-500 transition-colors uppercase relative group py-2">
                    <button className="text-inherit font-bold tracking-[0.15em]">Collection</button>
                    <ChevronDown className="text-inherit ml-1 group-hover:rotate-180 transition-transform duration-300" size={16} />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[320px] z-[100] bg-neutral-950/98 backdrop-blur-2xl border border-white/10 text-white p-5 shadow-2xl mt-4 rounded-xl"
                  align="start"
                  sideOffset={10}
                >
                  <div className="mb-4 border-b border-white/10 pb-3">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Shop By Category</p>
                  </div>
                  <DropdownMenuGroup className="grid grid-cols-1 gap-2">
                    {category?.length > 0 ? (
                      category?.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`/collection/${cat._id}?name=${cat.name}`}
                        >
                          <DropdownMenuItem key={cat._id} value={cat._id} className="cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-white transition-all rounded-lg px-4 py-3 group">
                            <div className="flex items-center justify-between font-bold w-full">
                              <span className="uppercase tracking-widest text-sm group-hover:text-red-500 transition-colors">{cat.name}</span>
                              <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 group-hover:text-red-500 transition-all transform group-hover:translate-x-2" />
                            </div>
                          </DropdownMenuItem>
                        </Link>
                      ))
                    ) : (
                      <DropdownMenuItem disabled value="No category" className="opacity-50 py-3">
                        Not found
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={"/tracking"} className="hover:text-red-500 transition-colors uppercase relative group">
                Track Order
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Center: Logo */}
            <div className="flex-none flex justify-center items-center">
              <Link href={"/"}>
                <Image
                  src={"/logo-revo.png"}
                  height={280}
                  width={220}
                  priority
                  alt="Logo"
                  className="hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex items-center justify-end gap-8 text-white">
              {/* User Account */}
              <div className="flex items-center">
                {user ? (
                  <div className="flex items-center gap-6">
                    <Notify />
                    <Link href={"/admin"} className="text-sm font-bold tracking-widest hover:text-red-500 transition-colors uppercase">
                      Admin
                    </Link>
                    <button
                      className="text-sm font-bold tracking-widest text-red-500 hover:text-white transition-colors uppercase"
                      onClick={() => logoutMutation.mutate()}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Button
                    className="text-white hover:text-red-500 bg-transparent hover:bg-transparent p-0 transition-colors"
                    variant="ghost"
                    onClick={() => router.push("/login")}
                  >
                    <FaRegUser size={24} />
                  </Button>
                )}
              </div>

              {/* Cart */}
              <div className="relative">
                <Button
                  className="text-white hover:text-red-500 bg-transparent hover:bg-transparent p-0 transition-colors"
                  variant="ghost"
                  onClick={() => router.push("/cart")}
                >
                  <BsCart size={24} />
                </Button>
                <span className="absolute -top-2 -right-3 bg-red-600 text-white font-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-neutral-950 shadow-lg shadow-red-600/30">
                  {carts?.length || 0}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-neutral-950/98 backdrop-blur-3xl border-t border-white/10 overflow-y-auto pb-32 z-[90] lg:hidden"
            >
              <div className="flex flex-col px-6 py-8 gap-6">
                <Link href={"/"} onClick={() => setBox({ ...box, isOpen: false })}>
                  <p className="text-2xl font-black text-white uppercase tracking-widest hover:text-red-500 transition-colors">Home</p>
                </Link>

                <div className="flex flex-col gap-4">
                  <div
                    className="flex items-center justify-between cursor-pointer text-white hover:text-red-500 transition-colors"
                    onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
                  >
                    <p className="text-2xl font-black uppercase tracking-widest">Collections</p>
                    <ChevronDown className={`transition-transform duration-300 ${mobileCollectionOpen ? "rotate-180 text-red-500" : ""}`} size={24} />
                  </div>

                  <AnimatePresence>
                    {mobileCollectionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex flex-col gap-3 pl-4 overflow-hidden border-l-2 border-red-600/50 ml-2 mt-2"
                      >
                        {category && category.length > 0 ? (
                          category?.map((cat, idx) => (
                            <Link
                              key={idx}
                              href={`/collection/${cat._id}?name=${cat.name}`}
                              onClick={() => setBox({ ...box, isOpen: false })}
                              className="py-2"
                            >
                              <p className="text-lg font-bold text-gray-300 uppercase tracking-wide hover:text-red-500 transition-colors flex items-center justify-between group">
                                <span>{cat.name}</span>
                                <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </p>
                            </Link>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">Not found</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href={"/tracking"} onClick={() => setBox({ ...box, isOpen: false })}>
                  <p className="text-2xl font-black text-white uppercase tracking-widest hover:text-red-500 transition-colors">Track Order</p>
                </Link>
                <Link href={"/contact"} onClick={() => setBox({ ...box, isOpen: false })}>
                  <p className="text-2xl font-black text-white uppercase tracking-widest hover:text-red-500 transition-colors">Contact</p>
                </Link>
                <Link href={"/about"} onClick={() => setBox({ ...box, isOpen: false })}>
                  <p className="text-2xl font-black text-white uppercase tracking-widest hover:text-red-500 transition-colors">About Us</p>
                </Link>
                <Link href={"/refund-policy"} onClick={() => setBox({ ...box, isOpen: false })}>
                  <p className="text-xl font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Refund Policy</p>
                </Link>
                <Link href={"/privacy-policy"} onClick={() => setBox({ ...box, isOpen: false })}>
                  <p className="text-xl font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Privacy Policy</p>
                </Link>

                <div className="h-px bg-white/10 w-full my-4"></div>

                {user ? (
                  <>
                    <Link href={"/admin"} onClick={() => setBox({ ...box, isOpen: false })}>
                      <p className="text-xl font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors">Dashboard</p>
                    </Link>
                    <button
                      onClick={() => {
                        logoutMutation.mutate();
                        setBox({ ...box, isOpen: false });
                      }}
                      className="text-left text-xl font-bold text-red-500 uppercase tracking-widest"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href={"/login"} onClick={() => setBox({ ...box, isOpen: false })}>
                    <p className="text-xl font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors">Login / Register</p>
                  </Link>
                )}

                <div className="mt-8">
                  <h1 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">
                    Follow Us
                  </h1>
                  <Socialbtn />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
