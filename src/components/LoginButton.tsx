import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { IoBookmarkSharp } from "react-icons/io5";
import Link from "next/link";
import { MdPerson } from "react-icons/md";

const MenuList = ({ children }: { children: React.ReactNode }) => (
  <li className="bg-slate-50 w-full hover:brightness-95 py-1 flex gap-3 items-center">
    {children}
  </li>
);

export default function LoginButton() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropDown] = useState(false);

  if (session) {
    return (
      <div className="relative w-fit h-fit text-slate-900">
        <button
          onClick={() => setShowDropDown(!showDropdown)}
          className="flex gap-2 hover:brightness-95 duration-75 bg-slate-50/10 p-2 items-center w-12 h-12 justify-center border-2 rounded-full border-slate-500"
        >
          {session.user?.image ? (
            <Image
              src={session.user?.image}
              width={40}
              height={40}
              alt={(session.user?.name as string) || "User"}
              className="object-contain"
            />
          ) : (
            <MdPerson
              size={25}
              style={{ width: "100%", height: "100%" }}
              color="gray"
            />
          )}
        </button>

        {/* Dropdown */}
        <div
          className={`absolute bg-slate-50 py-2 px-[0.6rem] border-2 rounded-md right-0 w-auto delay-75 transition-all ${
            showDropdown
              ? "opacity-100 scale-100 top-[100%] right-0"
              : "opacity-0 scale-0 -top-[100%] -right-[200%]"
          }`}
          onMouseLeave={() => {
            setShowDropDown(false);
          }}
        >
          <div className="flex gap-4 border-b-2 pb-2">
            <div className="inline-block items-end w-fit">
              <p className="w-fit text-sm">{session?.user?.name}</p>
              <p className="text-xs font-thin">{session?.user?.email}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              {session.user?.image ? (
                <Image
                  src={session.user?.image}
                  width={40}
                  height={40}
                  alt={(session.user?.name as string) || "User"}
                  className="object-contain"
                />
              ) : (
                <MdPerson size={25} style={{ width: "100%", height: "100%" }} />
              )}
            </div>
          </div>

          <ul className="flex flex-col border-b-2 py-2 text-sm">
            <MenuList>
              <BsEmojiSunglassesFill size={16} />
              <Link href="/profil">Edit Profil</Link>
            </MenuList>
            <MenuList>
              <FaHeart size={16} />
              <Link href="/materi-favorit">Materi Favorit</Link>
            </MenuList>
            <MenuList>
              <IoBookmarkSharp size={16} />
              <Link href="/bookmarks">Bookmarks</Link>
            </MenuList>
          </ul>

          <div className="pt-2">
            <button
              onClick={() => signOut()}
              className="hover:border-b-2 border-slate-600 ease-in duration-100 py-1 text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        className="hover:brightness-95 border-2 bg-[#fafafa] px-2 py-1 rounded-md text-slate-900"
      >
        Sign in
      </button>
    </>
  );
}
