import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
  DocumentAddIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { useContext } from "react";
import { useAuth } from "../firebase";
import { PassDocIDContext } from "../utilities/Context";

function PostHeader() {
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
    <div className="flex fixed p-5 bg-white rounded-xl ">
      {currentUser && (
        <div className="flex ml-0 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className=" md:inline-flex flex ml-2 items-center bg-transparent 
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
  );
}

export default PostHeader;
