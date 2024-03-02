import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import AOS from "aos";

const fontFam = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const [scrolledOneThirdvw, setScrolledOneThirdvw] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 50,
    });
  });

  useEffect(() => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos !== 0) {
      if (currentScrollPos >= window.innerWidth / 2.8) {
        setScrolledOneThirdvw(true);
      } else {
        setScrolledOneThirdvw(false);
      }
    }
  }, []);

  useEffect(() => {
    const changeShadow = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos >= window.innerWidth / 2.8) {
        setScrolledOneThirdvw(true);
      } else {
        setScrolledOneThirdvw(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", changeShadow);

    return () => window.removeEventListener("scroll", changeShadow);
  }, [prevScrollPos]);

  return (
    <SessionProvider baseUrl={process.env.BASE_URL} session={session}>
      <NextNProgress options={{ showSpinner: false }} />
      <div
        className={`transition-all duration-500 ${
          router.pathname === "/" && !scrolledOneThirdvw
            ? "bg-gradient-to-t from-black to-[#242828] text-slate-100"
            : "bg-slate-100 text-slate-900"
        }`}
      >
        <main
          className={`flex min-h-screen flex-col items-center justify-between mx-auto overflow-x-clip ${fontFam.className}`}
        >
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}
