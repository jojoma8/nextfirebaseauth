import { getAuth } from "@firebase/auth";
import {
  BackspaceIcon,
  ThumbUpIcon,
  ChatAltIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useContext } from "react";
import {
  DeletePostContext,
  EditPostContext,
  PassDocIDContext,
} from "../utilities/Context";

function AdminUserEdit() {
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

  return (
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
  );
}

function PostOwnerUserEdit() {
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

  return (
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
  );
}

function EditPost({ name }) {
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
  //   console.log({ user });
  if (auth.currentUser?.uid === { name }) {
    return AdminUserEdit();
  }
}

export default EditPost;
