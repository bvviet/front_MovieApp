import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import logo from "../../public/logoheader.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="left-0 right-0 top-0 z-10 flex h-14 items-center justify-between bg-slate-950 px-3 text-sm text-white sm:px-8 sm:text-lg lg:h-20">
      <div className="flex items-center gap-1 sm:gap-8">
        <Link to={"/"}>
          <img src={logo} alt="netflix" className="w-8 sm:w-10" />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-white lg:text-xl">
            Phim
          </a>
          <a href="#" className="text-white lg:text-xl">
            Truyền hình
          </a>
          <Link to="/favorite" className="text-white lg:text-xl">
            Yêu thích
          </Link>
        </div>
      </div>
      <SearchBar />

      <div className="flex items-center gap-2 sm:gap-[100px]">
        {/* Tài khoản */}
        <div className="sm:ml:auto hidden sm:block">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-20 flex flex-col items-start bg-slate-950 p-6 text-white transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="mb-4 self-end" onClick={toggleMenu}>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <a href="#" className="mb-4 text-xl" onClick={toggleMenu}>
          Phim
        </a>
        <a href="#" className="mb-4 text-xl" onClick={toggleMenu}>
          Truyền hình
        </a>
        <Link to="/favorite" className="mb-4 text-xl" onClick={toggleMenu}>
          Yêu thích
        </Link>
        <div className="md:hidden">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
