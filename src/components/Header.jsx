import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../public/logoheader.png";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Header = () => {
  return (
    <header className="left-0 right-0 top-0 z-10 flex h-14 items-center justify-between bg-slate-950 px-8 text-sm text-white sm:text-lg lg:h-20">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-1 sm:gap-8">
        <Link to={"/"}>
          <img src={logo} alt="netflix" className="w-8 sm:w-10" />
        </Link>
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

      <div className="flex items-center gap-2 sm:gap-[100px]">
        {/* Search Icon */}
        <Tooltip id="my-tooltip" />
        <a
          className="w-5"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Tìm kiếm"
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="cursor-pointer text-white sm:mr-20"
          />
        </a>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
