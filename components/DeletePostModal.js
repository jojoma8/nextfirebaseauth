import { useContext } from "react";
import { DeletePostContext, PassDocIDContext } from "../utilities/Context";
import { handleDelete } from "../utilities/PostUtils";

export const deleteContent = (docID) => {
  //   console.log(userID);
  handleDelete(docID);
};

function DeletePostModal() {
  const { deletePostModal, setDeletePostModal } = useContext(DeletePostContext);
  const { docID, setDocID } = useContext(PassDocIDContext);

  return (
    <div
      className=" fixed min-h-screen flex justify-center bg-gray-200 items-center 
          bg-opacity-70 z-50 w-screen pb-60"
      onClick={() => setDeletePostModal(false)}
    >
      <div
        className="w-3/4 bg-white rounded-lg p-4 text-center shadow-lg "
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="text-3xl p-5 font-bold">Delete the Post?</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-3/4  m-3 flex justify-center ">
            <button
              className="px-10 py-3 bg-red-500 rounded-lg "
              onClick={() => {
                deleteContent(docID);
                setDeletePostModal(false);
              }}
              //   onClick={() => console.log(userID)}
            >
              Yes
            </button>
            <button
              className="ml-20 px-10 py-3 bg-blue-500 rounded-lg"
              onClick={() => setDeletePostModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePostModal;
