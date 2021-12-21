import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
  DocumentAddIcon,
  BookOpenIcon,
  FilterIcon,
} from "@heroicons/react/outline";
import { useContext, useEffect, useRef } from "react";
import { useAuth } from "../firebase";
import { EditPostContext, PassDocIDContext } from "../utilities/Context";
import HeaderIcon from "./HeaderIcon";

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
    lowerCaseValue,
    setLowerCaseValue,
    filterPostModal,
    setFilterPostModal,
    distinctAuthor,
    setDistinctAuthor,
    authorListFilter,
    setAuthorListFilter,
  } = useContext(EditPostContext);

  const excludeColumns = ["id", "timestamp", "user"];

  const handleSearchChange = (value) => {
    // console.log(value);
    // setSearchTerm(value);
    filterSearchData(value);
    // handleDistinctAuthor();
    // setLowerCaseValue(value.toLowerCase().trim());
    // console.log(lowerCaseValue);
  };

  const handleDistinctAuthor = () => {
    // const distinctAuthorList = postData.reduce((group, post) => {
    // setDistinctAuthor(
    //   postData.reduce((group, post) => {
    //     const displayName = post.displayName;
    //     if (group[displayName] == null) group[displayName] = [];
    //     group[displayName].push(post);
    //     return group;
    //   }, {})
    // );
    // const picked = postData.reduce((group, item) => {
    //   const displayName = item.displayName;
    //   if (group[displayName] == null) group[displayName] = [];
    //   group[displayName].push(item);
    //   return group;
    // }, {});
    // setDistinctAuthor(Object.keys(picked));
    // console.log(Object.keys(picked));
    const picked = [...new Set(postData.map((item) => item.displayName))];
    // const picked = [...new Set(postFilterData.map((item) => item.displayName))];
    // console.log(picked);
    setDistinctAuthor(picked);
    console.log(distinctAuthor);

    // setDistinctAuthor(distinctAuthorList);
    // console.log(postData);
    // };
    // setDistinctAuthor(
    //   postData.filter((it) =>
    //     it.title.toString().toLowerCase().trim().includes("r")
    //   )
    // );
    // console.log(distinctAuthorList);
    // console.log(postFilterData);
    // console.log(distinctAuthor);
  };

  // const handleAuthorFilter = () => {
  //   if (lowerCaseValue === "") setPostFilterData(postData);
  //   else if (authorListFilter === []) setAuthorFilter(postFilterData);
  //   else {
  //     const authorListFiltered = postFilterData.filter(({ key }) =>
  //       distinctAuthorFiltered.includes(key)
  //     );
  //   }
  //   console.log(authorListFiltered);
  // };

  useEffect(() => {
    setLowerCaseValue(searchTermInput.current.value);
    // console.log(searchTermInput.current.value);
    // console.log(lowerCaseValue);
    handleDistinctAuthor();
    handleSearchChange(lowerCaseValue);
  }, [lowerCaseValue]);

  const searchTermInput = useRef("");

  // Filter Records by Search Text
  const filterSearchData = (value) => {
    // const lowerCaseValue = value.toLowerCase().trim();
    // const lowerCaseValue = searchTermInput.current.value;
    setLowerCaseValue(searchTermInput.current.value);
    // setLowerCaseValue(value.toLowerCase().trim());
    // console.log(lowerCaseValue);

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
      // setDistinctAuthor(
      //   Array.from(new Set(postData.map(JSON.stringify))).map(JSON.parse)
      // );
      // console.log(filteredSearchData);
    }

    // const userFilteredSearchData = postFilterData.filter((item) => {
    //   return Object.keys(item).some((key) =>
    //     item[key]
    //       .toString()
    //       .toLowerCase()
    //       .includes(currentUser?.uid.toLowerCase())
    //   );
    // });
    // console.log(userFilteredSearchData);
    // setPostFilterData(userFilteredSearchData);

    // const fieldFilteredSearchData = postFilterData.filter((item) => {
    //   return item.user
    //     .toString()
    //     .toLowerCase()
    //     .includes(currentUser?.uid.toLowerCase());
    // });
    // console.log(fieldFilteredSearchData);
  };

  return (
    <div className="flex fixed p-5 bg-white rounded-xl shadow-lg ">
      <div
        className="flex justify-center pr-4"
        onClick={() => setNewPostModal(true)}
      >
        <HeaderIcon Icon={DocumentAddIcon} />
      </div>
      {currentUser && (
        <div className="flex ml-0 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600 " />
          <input
            className=" md:inline-flex flex ml-2 items-center bg-transparent 
        outline-none placeholder-gray-500 flex-grow"
            type="text"
            placeholder="search pyNotes"
            ref={searchTermInput}
            onChange={(event) => {
              // setSearchTerm(event.target.value);
              // setLowerCaseValue(searchTermInput.current.value);
              setLowerCaseValue(event.target.value);
              handleSearchChange(event.target.value);
              // handleDistinctAuthor();
              // console.log(event.target.value);
              // setLowerCaseValue(event.target.value.toLowerCase().trim());
              // console.log(lowerCaseValue);
            }}
          />
        </div>
      )}
      <div
        className="flex justify-center pl-4"
        onClick={() => setFilterPostModal(true)}
      >
        <HeaderIcon Icon={FilterIcon} />
      </div>
    </div>
  );
}

export default PostHeader;
