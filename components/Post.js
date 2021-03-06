import { getAuth } from "@firebase/auth";
import {
  BackspaceIcon,
  ThumbUpIcon,
  ChatAltIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useContext } from "react";
import { useAuth } from "../firebase";
import {
  DeletePostContext,
  EditPostContext,
  PassDocIDContext,
} from "../utilities/Context";

import { handleDelete, handleEdit } from "../utilities/PostUtils";
import EditPost from "./EditPost";
// import { deleteContent } from "./DeletePostModal";

function Post({
  id,
  title,
  codeSnippet,
  description,
  timestamp,
  user,
  displayName,
}) {
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
  const auth = getAuth();

  const { deletePostModal, setDeletePostModal } = useContext(DeletePostContext);
  const { docID, setDocID } = useContext(PassDocIDContext);
  // const name = user;
  // const deleteContent = (id) => {
  //   // console.log(id);
  //   handleDelete(id);
  // };
  const currentUser = useAuth();

  return (
    <div
      className="flex flex-col mx-5 bg-white mb-5 sm:mt-5  rounded-2xl 
      shadow-lg "
    >
      <div className="pt-4 px-4">
        {/* Header of Post */}
        <div>
          {/* <p className="font-medium">{user}</p> */}
          <p className="text-xl font-bold">{displayName}</p>
          <p className="text-xs text-gray-400">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </p>
        </div>

        {/* Content of Post */}
        <div className="p-5">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="py-2">
            <code className="bg-gray-200 text-sm ml-2 py-1 px-4">
              {codeSnippet}
            </code>
          </div>
          <div>
            <p className="text-base">{description}</p>
          </div>
        </div>

        {/* Footer of post */}
        {currentUser && (
          <div
            className="flex justify-between items-center 
      text-gray-500 border-t  "
          >
            <div className="inputIcon">
              <ThumbUpIcon className="h-4" />
              <p className="text-xs sm:text-base:">Like</p>
            </div>

            <div className="inputIcon">
              <ChatAltIcon className="h-4" />
              <p className="text-xs sm:text-base:">Comment</p>
            </div>

            {auth.currentUser?.uid === user && (
              <div
                className="inputIcon"
                onClick={() => {
                  setDocID(id);
                  setEditPostModal(true);
                  setEditPostTitleModal(title);
                  setEditPostCodeSnippetModal(codeSnippet);
                  setEditPostDescriptionModal(description);
                }}
              >
                <PencilIcon className="h-4" />
                <p className="text-xs sm:text-base:">Edit</p>
              </div>
            )}

            {/* {<EditPost name={user} />} */}

            {/* <div className="inputIcon" onClick={() => deleteContent(id)}> */}
            {/* <div className="inputIcon" onClick={() => setDeletePostModal(true)}> */}
            {auth.currentUser?.uid == process.env.REACT_APP_ADMIN_ID && (
              <div
                className="inputIcon"
                onClick={() => {
                  setDeletePostModal(true);
                  setDocID(id);
                }}
              >
                <BackspaceIcon className="h-4" />
                <p className="text-xs sm:text-base:">Delete</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
