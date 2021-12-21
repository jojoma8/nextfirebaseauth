import { useContext } from "react";
import { EditPostContext, PassDocIDContext } from "../utilities/Context";
import Author from "./Author";

function FilterPostModal() {
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
    distinctAuthor,
    setDistinctAuthor,
  } = useContext(EditPostContext);

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

  return (
    <div
      className="fixed min-h-screen flex justify-center bg-gray-200 items-center 
    bg-opacity-70 z-50 w-screen pb-60 md:px-0"
      onClick={() => {
        setFilterPostModal(false);
      }}
    >
      <div
        className="w-3/4 bg-white rounded-lg p-4 text-center shadow-lg "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-3xl p-5 font-bold">Filter Posts</div>
        {/* Filter by Author */}
        <div>
          <div>
            <div className="font-semibold p-2 text-xl">Author</div>
          </div>
          <div>
            <div className="flex flex-wrap mx-5 mb-5 mt-2">
              {/* {postFilterData.map((post) => ( */}
              {/* {postFilterData.map((post) => ( */}
              {/* {distinctAuthor.map((post) => (
                <Author
                  key={post.id}
                  // id={post.id}
                  // title={post.title}
                  // codeSnippet={post.codeSnippet}
                  // description={post.description}
                  // timestamp={post.timestamp}
                  // user={post.user}
                  displayName={post.displayName}
                />
              ))} */}
              {distinctAuthor.map(
                (post) => (
                  <Author key={post} displayName={post} />
                )
                // console.log(distinctAuthor)
              )}
            </div>
          </div>
        </div>
        {/* Filter by Tag */}
      </div>
    </div>
  );
}

export default FilterPostModal;
