import { useContext, useRef, useState } from "react";
import { EditPostContext } from "../utilities/Context";
import { handleNew } from "../utilities/PostUtils";

function CreatePostModal() {
  const titleRef = useRef("");
  const codeSnippetRef = useRef("");
  const descriptionRef = useRef("");

  const [titleError, setTitleError] = useState(false);
  const [codeSnippetError, setCodeSnippetError] = useState(false);

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
  } = useContext(EditPostContext);

  const sendValue = (e) => {
    e.preventDefault();
    console.log(codeSnippetRef.current.value);
    // handleNew(titleRef, contentRef);
    // return console.log(contentRef);
    // return console.log(title);
    // setTitle(titleRef);
    // setContent(contentRef);
    // return console.log(content.current.value);
    // handleNew(title.current.value, content.current.value);
    setTitleError(false);
    setCodeSnippetError(false);
    if (titleRef.current.value == "") {
      setTitleError(true);
    } else if (codeSnippetRef.current.value == "") {
      setCodeSnippetError(true);
    } else if (!titleError && !codeSnippetError) {
      handleNew(
        titleRef.current.value,
        codeSnippetRef.current.value,
        descriptionRef.current.value
      );
      setNewPostModal(false);
    }
  };

  const showRefContent = () => {
    console.log(titleRef.current.value);
  };

  return (
    <div
      className=" fixed min-h-screen flex justify-center bg-gray-200 items-center 
        bg-opacity-70 z-50 w-screen "
    >
      <div className="w-3/4 bg-white rounded-lg p-4 text-center shadow-lg ">
        <div>
          <div className="text-3xl p-5 font-bold">Add a New Post</div>
        </div>
        <div className="">
          <input
            ref={titleRef}
            // value="some Value"
            className="w-3/4  border-2 p-4 rounded-l resize-y "
            rows="2"
            type="text"
            placeholder="Descriptive title or search term"
          />
          <input
            ref={codeSnippetRef}
            className="w-3/4  border-2 p-4 rounded-l resize-y "
            rows="1"
            type="text"
            placeholder="Code snippet"
            spellCheck="false"
          />
          <input
            ref={descriptionRef}
            className="w-3/4  border-2 p-4 rounded-l resize-y "
            rows="3"
            type="text"
            placeholder="Short description"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-3/4  m-3 flex justify-end ">
            <button
              className="p-3 bg-red-500 rounded-lg "
              onClick={() => setNewPostModal(false)}
            >
              Cancel
            </button>
            <button
              className="ml-3 p-3  bg-blue-500 rounded-lg"
              // onClick={(() => sendValue, setNewPostModal(false))}
              onClick={sendValue}
              // onClick={showRefContent}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
