import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/solid";

import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
  DocumentAddIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useAuth } from "../firebase";
import UserAuthentication from "./UserAuthentication";
import { useContext } from "react";
import {
  EditPostContext,
  PassDocIDContext,
  SignInContext,
} from "../utilities/Context";
import { handleSearchChange } from "./Posts";
import Link from "next/link";

function Header() {
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

  const {
    editPostModal,
    setEditPostModal,
    editPostTitleModal,
    setEditPostTitleModal,
    editPostCodeSnippetModal,
    setEditPostCodeSnippetModal,
    editPostDescriptionModal,
    setEditPostDescriptionModal,
    newPostModal,
    setNewPostModal,
    filterPostModal,
    setFilterPostModal,
  } = useContext(EditPostContext);

  const { userDetailsModal, setUserDetailsModal } = useContext(SignInContext);

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
      lf:px-5 shadow-md overflow-hidden font-bold "
    >
      <h1 className="text-blue-500 font-extrabold text-2xl">pyNotes</h1>

      {/* Left */}
      <div className="flex items-center">
        {/* <Image
          src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo-500x313.png"
          width={60}
          height={40}
          layout="fixed"
          alt="logo"
        /> */}
        {/* {currentUser && (
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
        )} */}
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-2 sm:space-x-4">
          <Link href="/">
            <a>
              <HeaderIcon Icon={HomeIcon} />
            </a>
          </Link>

          {/* {currentUser && (
            <div onClick={() => setNewPostModal(true)}>
              <HeaderIcon Icon={DocumentAddIcon} />
            </div>
          )} */}
          <Link href="/python_blog">
            <a>
              <HeaderIcon Icon={BookOpenIcon} />
            </a>
          </Link>
          {currentUser && <HeaderIcon Icon={ShoppingCartIcon} />}
          {currentUser && (
            <div onClick={() => setUserDetailsModal(true)}>
              <HeaderIcon Icon={UserIcon} />
            </div>
          )}
        </div>
      </div>
      {/* Right */}

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Pic */}

        <p className="whitepace-nowrap font-semibold pr-0 hidden sm:block">
          {/* {currentUser?.email} */}
          {currentUser?.displayName}
          {/* {currentUser?.uid} */}
        </p>

        {/* <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" /> */}
        <UserAuthentication />
      </div>
    </div>
  );
}

export default Header;
