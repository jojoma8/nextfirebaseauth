import { useContext, useRef } from "react";
import { EditPostContext, PassDocIDContext } from "../utilities/Context";
import { handleEdit } from "../utilities/PostUtils";

function EditPostModal() {
  const titleRef = useRef("");
  const codeSnippetRef = useRef("");
  const descriptionRef = useRef("");

  const {
    editPostModal,
    setEditPostModal,
    editPostTitleModal,
    setEditPostTitleModal,
    editPostCodeSnippetModal,
    setEditPostCodeSnippetModal,
    editPostDescriptionModal,
    setEditPostDescriptionModal,
  } = useContext(EditPostContext);

  const { docID, setDocID } = useContext(PassDocIDContext);

  const editValue = () => {
    // console.log(docID);
    handleEdit(
      docID,
      titleRef.current.value,
      codeSnippetRef.current.value,
      descriptionRef.current.value
    );
  };

  return (
    <div
      className="fixed min-h-screen flex justify-center bg-gray-200 items-center 
        bg-opacity-70 z-50 w-screen pb-60 md:px-0"
      onClick={() => {
        setEditPostModal(false);
      }}
    >
      <div
        className="w-3/4 bg-white rounded-lg p-4 text-center shadow-lg "
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="text-3xl p-5 font-bold">Edit Post</div>
        </div>
        <div className="">
          <input
            ref={titleRef}
            defaultValue={editPostTitleModal}
            className="w-3/4  border-2 p-4 rounded-l resize-y "
            rows="2"
            type="text"
            placeholder="Descriptive title or search term"
          />
          <input
            ref={codeSnippetRef}
            defaultValue={editPostCodeSnippetModal}
            className="w-3/4  border-2 p-4 rounded-l resize-y "
            rows="1"
            type="text"
            placeholder="Code snippet"
            spellCheck="false"
          />
          <input
            ref={descriptionRef}
            defaultValue={editPostDescriptionModal}
            className="w-3/4  border-2 p-4 rounded-l resize-y "
            rows="3"
            type="text"
            placeholder="Short description"
          />
        </div>
        <div className="   ">
          <div className=" flex justify-center mt-3   ">
            {/* Save Changes Button */}
            <button
              className="px-10 py-3  bg-blue-500 rounded-lg text-white
              font-bold "
              onClick={() => {
                setEditPostModal(false);
                editValue();
              }}
            >
              Save
            </button>
            {/* Cancel Changes Button */}
            <button
              className="px-10 py-3 bg-red-500 rounded-lg text-white
              font-bold sm:ml-5 md:ml-20 lg:ml-48"
              onClick={() => setEditPostModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
