import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import LoginButton from "./LoginButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHome, GoCopilot } from "react-icons/go";
import { IoMdBook } from "react-icons/io";
import { RiGroupLine } from "react-icons/ri";

const NavListDesktop = ({
  href,
  routerPathname,
  lable,
}: {
  href: string;
  routerPathname: string;
  lable: string;
}) => (
  <Link href={href} className="hidden md:block h-full">
    <p
      className={
        routerPathname === href
          ? "border-b-2 border-gray-400"
          : "hover:brightness-110 hover:border-b-2 border-gray-400"
      }
    >
      <span className="text-[16px]">{lable}</span>
    </p>
  </Link>
);

const Navbar = () => {
  const router = useRouter();

  const [scrollDirection, setScrollDirection] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [shadow, setShadow] = useState(false);
  const [scrolledOneThirdvw, setScrolledOneThirdvw] = useState(false);
  const [navMobile, setNavMobile] = useState(false);

  const handleNav = (bool: boolean) => {
    setNavMobile(bool);
  };

  const getTextColor = () => {
    return router.pathname === "/" && !scrolledOneThirdvw
      ? "text-gray-200 hover:text-white"
      : "text-gray-900 hover:text-gray-700";
  };

  useEffect(() => {
    const changeShadow = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos === 0) {
        setScrollDirection(true);
        setShadow(false);
      } else if (prevScrollPos > currentScrollPos) {
        setScrollDirection(true);
        setShadow(true);
        if (currentScrollPos >= window.innerWidth / 2.8) {
          setScrolledOneThirdvw(true);
        } else {
          setScrolledOneThirdvw(false);
        }
      } else {
        setScrollDirection(false);
        setShadow(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", changeShadow);

    return () => window.removeEventListener("scroll", changeShadow);
  }, [prevScrollPos]);

  useEffect(() => {
    const currentScrollPos = window.scrollY;
    setScrollDirection(true);
    if (currentScrollPos === 0) {
      setShadow(false);
    } else {
      setShadow(true);
    }
  }, []);

  return (
    <>
      <header
        className={`sticky left-0 top-0 z-50 flex w-full items-center px-0 duration-500 ease-in-out ${
          router.pathname === "/" ? "border-slate-700" : "border-slate-200"
        } ${scrollDirection ? "translate-y-0" : "-translate-y-24"} ${shadow ? "border-0 shadow-lg" : "border-b-2"} ${
          router.pathname === "/" && !scrolledOneThirdvw
            ? "bg-[#181b1b] "
            : "bg-slate-100"
        }`}
      >
        <div className="w-full px-2">
          <div className="relative flex items-center justify-between">
            <Link href="/" className="w-fit h-[4.5rem] flex items-center gap-2">
              <div
                className={`h-4 min-h-full py-2 transition-all duration-300 ${
                  router.pathname === "/" && !scrolledOneThirdvw
                    ? "w-0 scale-0"
                    : "scale-100 w-auto"
                }`}
              >
                <Image
                  src="https://utfs.io/f/7648af4a-e902-454b-b937-b7433ef9aa2b-vbi1vd.svg"
                  className={`w-full h-full cursor-pointer object-contain mix-blend-multiply`}
                  height={30}
                  width={30}
                  alt="Logo STEI-K 23"
                  blurDataURL="https://utfs.io/f/7648af4a-e902-454b-b937-b7433ef9aa2b-vbi1vd.svg"
                  priority
                />
              </div>
              <h1
                className={`font-extrabold text-4xl duration-100 ease-in tracking-wider ${getTextColor()}`}
              >
                Syntax
              </h1>
            </Link>

            {/* Navigation list */}
            <div className="flex md:gap-4 items-center">
              {/* Desktop navigation list */}
              <div
                className={`flex gap-0 py-1 text-[#6B778C] md:gap-4 lg:py-5 xl:gap-6 items-center ${getTextColor()}`}
              >
                <NavListDesktop
                  href="/"
                  routerPathname={router.pathname}
                  lable="Home"
                />
                <NavListDesktop
                  href="/tentang-bpa"
                  routerPathname={router.pathname}
                  lable="BPA"
                />
                <NavListDesktop
                  href="/akademik"
                  routerPathname={router.pathname}
                  lable="Akademik"
                />
                <NavListDesktop
                  href="/acara-kemahasiswaan"
                  routerPathname={router.pathname}
                  lable="Acara Kemahasiswaan"
                />
              </div>

              {/* Mobile Nav Button */}
              <LoginButton />
              <button
                className="block md:hidden hover:brightness-95 p-2 rounded-md ml-2"
                onClick={() => handleNav(true)}
              >
                <RxHamburgerMenu size={30} />
              </button>

              {/* Mobile Nav List */}
              <div
                onClick={() => handleNav(false)}
                className={`text-slate-800 ${navMobile ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""}`}
              >
                <div
                  className={
                    navMobile
                      ? "fixed right-0 top-0 w-[240px] h-screen bg-slate-50 p-4 pt-10 ease-in duration-500 flex flex-col gap-4"
                      : "fixed right-[-150%] w-[240px] h-screen bg-slate-50 top-0 p-4 pt-10 ease-in duration-500 flex flex-col gap-4 items-start"
                  }
                >
                  <section className="space-y-2">
                    <p className="text-3xl font-bold leading-none">SYNTAX</p>
                    <p className="font-bold">STEI-K 23</p>
                    <p className="text-sm font-bold italic leading-none mb-10">
                      Code, Create, Connect!
                    </p>
                  </section>

                  <section className="flex flex-col gap-1">
                    <Link
                      href="/"
                      className="bg-slate-50 hover:brightness-95 pl-2 py-1 flex items-center gap-2"
                    >
                      <GoHome size={19} /> Home
                    </Link>
                    <Link
                      href="/tentang-bpa"
                      className="bg-slate-50 hover:brightness-95 pl-2 py-1 flex items-center gap-2"
                    >
                      <GoCopilot size={19} /> BPA
                    </Link>
                    <Link
                      href="/akademik"
                      className="bg-slate-50 hover:brightness-95 pl-2 py-1 flex items-center gap-2"
                    >
                      <IoMdBook size={19} /> Akademik
                    </Link>
                    <Link
                      href="/acara-kemahasiswaan"
                      className="bg-slate-50 hover:brightness-95 pl-2 py-1 flex items-center gap-2"
                    >
                      <RiGroupLine size={19} /> Acara Kemahasiswaan
                    </Link>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
