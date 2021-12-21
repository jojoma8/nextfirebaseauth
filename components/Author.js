import { useContext, useEffect, useRef, useState } from "react";
import { EditPostContext, PassDocIDContext } from "../utilities/Context";

function Author({
  id,
  // title,
  // codeSnippet,
  // description,
  // timestamp,
  // user,
  displayName,
}) {
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
    distinctAuthor,
    setDistinctAuthor,
    authorListFilter,
    setAuthorListFilter,
    postFilteredByAuthor,
    setPostFilteredByAuthor,
  } = useContext(EditPostContext);
  //   console.log({ displayName });

  // const authorName = useRef("");
  const [selectedAuthor, setSelectedAuthor] = useState(false);

  async function updatePostByAuthor(authorName) {
    console.log("1");
    await handleAddAuthorToFilterList(authorName);
    // console.log(authorListFilter);
    await handleAuthorFilter();
    console.log(postFilteredByAuthor);
  }

  const handleAddAuthorToFilterList = (authorName) => {
    const authorList = authorListFilter;
    if (!selectedAuthor) authorList.push(authorName.displayName);
    else if (selectedAuthor) authorList.pop(authorName.displayName);
    // console.log(authorListFilter);
    console.log("2");
  };

  const handleAuthorFilter = () => {
    console.log(authorListFilter);
    // console.log(postFilterData);
    // if (lowerCaseValue === "") setPostFilterData(postData);
    //   else if (authorListFilter === []) setAuthorFilter(postFilterData);
    // else {
    const authorListFiltered = postFilterData.filter((author) =>
      // authorListFilter.includes(author.displayName)
      author.displayName.includes(authorListFilter)
    );
    console.log(authorListFiltered);
    setPostFilteredByAuthor(authorListFiltered);
    // }
    // setPostFilteredByAuthor(
    //   postFilterData.filter(
    //     async (author) => await author.displayName.includes(authorListFilter)
    //   )
    // );
    // console.log(postFilterData);
    // console.log(authorListFilter)
    // console.log(postFilteredByAuthor);
    console.log("3");
  };

  // useEffect(() => {
  //   handleAuthorFilter;
  // }, [authorListFiltered]);

  return (
    <div
      className={`${selectedAuthor ? "bg-gray-800" : "bg-gray-400"} 
      flex justify-center rounded-2xl text-white px-5 py-1 m-1 cursor-pointer`}
      // ref={authorName}
      onClick={() => {
        setSelectedAuthor(!selectedAuthor);
        // handleAddAuthorToFilterList({ displayName });
        updatePostByAuthor({ displayName });
        // handleAuthorFilter();
      }}
    >
      {displayName}
      {/* Hello */}
    </div>
  );
}

export default Author;
