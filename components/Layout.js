import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import Image from "next/image";

import { useAuth } from "../firebase";
// import Header from "../components/Header";
import Posts from "../components/Posts";
import CreatePostModal from "../components/CreatePostModal";
import { useState } from "react";
import EditPostModal from "../components/EditPostModal";
import {
  DeletePostContext,
  EditPostContext,
  PassUserIDContext,
  PassDocIDContext,
  SignInContext,
} from "../utilities/Context";
import DeletePostModal from "../components/DeletePostModal";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import UserDetailsModal from "../components/UserDetailsModal";
// import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const [newPostModal, setNewPostModal] = useState(false);
  const [filterPostModal, setFilterPostModal] = useState(false);

  const [editPostModal, setEditPostModal] = useState(false);
  const [editPostTitleModal, setEditPostTitleModal] = useState(false);
  const [editPostCodeSnippetModal, setEditPostCodeSnippetModal] =
    useState(false);
  const [editPostDescriptionModal, setEditPostDescriptionModal] =
    useState(false);
  const [lowerCaseValue, setLowerCaseValue] = useState("");
  const [distinctAuthor, setDistinctAuthor] = useState();
  const [authorListFilter, setAuthorListFilter] = useState([]);

  const [deletePostModal, setDeletePostModal] = useState(false);

  const [docID, setDocID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [postFilterData, setPostFilterData] = useState([
    { title: "Loading data...", id: "initiate" },
  ]);
  const [postData, setPostData] = useState([
    { title: "Loading data...", id: "initiate" },
  ]);
  const [postFilteredByAuthor, setPostFilteredByAuthor] = useState([{}]);

  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(false);

  return (
    <SignInContext.Provider
      value={{
        signInModal,
        setSignInModal,
        signUpModal,
        setSignUpModal,
        userDetailsModal,
        setUserDetailsModal,
        forgotPasswordModal,
        setForgotPasswordModal,
        currentUserID,
        setCurrentUserID,
      }}
    >
      <PassDocIDContext.Provider
        value={{
          docID,
          setDocID,
          searchTerm,
          setSearchTerm,
          postFilterData,
          setPostFilterData,
          postData,
          setPostData,
        }}
      >
        <DeletePostContext.Provider
          value={{ deletePostModal, setDeletePostModal }}
        >
          <EditPostContext.Provider
            value={{
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
              postFilteredByAuthor,
              setPostFilteredByAuthor,
            }}
          >
            <div>
              <Header />
              {children}
              <Footer />
            </div>
          </EditPostContext.Provider>
        </DeletePostContext.Provider>
      </PassDocIDContext.Provider>
    </SignInContext.Provider>
  );
};

export default Layout;
