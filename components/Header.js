import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  PlusIcon,
} from "@heroicons/react/solid";

import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useAuth } from "../firebase";
import UserAuthentication from "./UserAuthentication";
import { useContext } from "react";
import { PassDocIDContext } from "../utilities/Context";
import { handleSearchChange } from "./Posts";

function Header({ setNewPostModal }) {
  const currentUser = useAuth();

  const {
    docID,
    setDocID,
    searchTerm,
    setSearchTerm,
    postFilterData,
    setPostFilterData,
    postData,
    setPostData,
  } = useContext(PassDocIDContext);

  const excludeColumns = ["id", "timestamp", "user"];

  const handleSearchChange = (value) => {
    // console.log(value);
    setSearchTerm(value);
    filterSearchData(value);
  };

  // Filter Records by Search Text
  const filterSearchData = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (lowerCaseValue === "") setPostFilterData(postData);
    else {
      const filteredSearchData = postData.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowerCaseValue)
        );
      });
      setPostFilterData(filteredSearchData);
      // setPostData(filteredSearchData);
    }
  };

  return (
    <div
      className="sticky top-0 z-40 bg-white flex items-center  px-5 py-2
      lf:px-5 shadow-md overflow-hidden "
    >
      <h1>pyNotes</h1>

      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo-500x313.png"
          width={60}
          height={40}
          layout="fixed"
          alt="facebook logo"
        />
        {currentUser && (
          <div className="flex ml-0 items-center rounded-full bg-gray-100 p-2">
            <SearchIcon className="h-6 text-gray-600" />
            <input
              className="hidden md:inline-flex flex ml-2 items-center bg-transparent 
              outline-none placeholder-gray-500 flex-shrink"
              type="text"
              placeholder="search pyNotes"
              onChange={(event) => {
                // setSearchTerm(event.target.value);
                handleSearchChange(event.target.value);
              }}
            />
          </div>
        )}
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        {currentUser && (
          <div className="flex space-x-1 md:space-x-2">
            <div>
              <HeaderIcon Icon={HomeIcon} />
            </div>
            <div onClick={() => setNewPostModal(true)}>
              <HeaderIcon Icon={DocumentAddIcon} />
            </div>
            <HeaderIcon Icon={PlayIcon} />
            <HeaderIcon Icon={ShoppingCartIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
          </div>
        )}
      </div>
      {/* Right */}

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Pic */}

        <p className="whitepace-nowrap font-semibold pr-0">
          {/* {currentUser?.email} */}
          {currentUser?.displayName}
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
