import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useAuth } from "../firebase";
import UserAuthentication from "./UserAuthentication";

function Header() {
  const currentUser = useAuth();
  return (
    <div
      className="sticky top-0 z-50 bg-white flex items-center p-2 
      lf:px-5 shadow-md"
    >
      <h1>pyNotes</h1>

      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo-500x313.png"
          width={60}
          height={40}
          layout="fixed"
        />
        {currentUser && (
          <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
            <SearchIcon className="h-6 text-gray-600" />
            <input
              className="hidden md:inline-flex flex ml-2 items-center bg-transparent outline-none
            placeholder-gray-500 flex-shrink"
              type="text"
              placeholder="search pyNotes"
            />
          </div>
        )}
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        {currentUser && (
          <div className="flex space-x-6 md:space-x-2">
            <HeaderIcon Icon={HomeIcon} />
            <HeaderIcon Icon={FlagIcon} />
            <HeaderIcon Icon={PlayIcon} />
            <HeaderIcon Icon={ShoppingCartIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
          </div>
        )}
      </div>
      {/* Right */}

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Pic */}

        <p className="whitepace-nowrap font-semibold pr-3">
          {currentUser?.email}
        </p>

        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
        <UserAuthentication />
      </div>
    </div>
  );
}

export default Header;
