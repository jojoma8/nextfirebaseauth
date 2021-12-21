import { useState, useEffect, useContext } from "react";
import db, { useAuth } from "../firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  setDoc,
  doc,
  where,
  limit,
} from "firebase/firestore";
import Post from "./Post";
import {
  EditPostContext,
  PassDocIDContext,
  PassUserIDContext,
  SignInContext,
} from "../utilities/Context";
import PostHeader from "./PostHeader";
import { getAuth } from "@firebase/auth";

function Posts() {
  // const [postData, setPostData] = useState([
  //   { title: "Loading data...", id: "initiate" },
  // ]);

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
    postFilteredByAuthor,
    setPostFilteredByAuthor,
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

  useEffect(() => {
    const collectionRef = collection(db, "post");
    // const q = query(collectionRef, orderBy("timestamp", "desc"));
    const q = query(collectionRef);
    const unsub = onSnapshot(q, (snapshot) =>
      setPostData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  // const auth = getAuth();
  // const currentUser = useAuth();
  // const currentUser = useAuth();

  useEffect(() => {
    const collectionRef = collection(db, "post");

    const q = query(
      collectionRef,
      // where("user", "==", "bg4QniXXEldJBGKUvTXA5GDeoSK2")
      // where("user", "==", currentUserID)
      orderBy("timestamp", "desc")
      // limit(5)
    );
    const unsub = onSnapshot(q, (snapshot) =>
      setPostFilterData(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    return unsub;
  }, []);

  const handleDistinctAuthor = () => {
    const picked = [...new Set(postData.map((item) => item.displayName))];
    setDistinctAuthor(picked);
    // console.log(distinctAuthor);
  };

  useEffect(() => {
    handleDistinctAuthor();
  }, [postData]);

  return (
    <div className=" ">
      <div className=" ">
        {/* {postFilterData.map((post) => ( */}
        {postFilteredByAuthor.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            codeSnippet={post.codeSnippet}
            description={post.description}
            timestamp={post.timestamp}
            user={post.user}
            displayName={post.displayName}
          />
        ))}
        {/* {postFilterData.length === 0 && ( */}
        {postFilteredByAuthor.length === 0 && (
          <span className="flex  p-10">
            No records found matching search term
          </span>
        )}
      </div>
    </div>
  );
}

export default Posts;
