import { useState, useEffect, useContext } from "react";
import db from "../firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import Post from "./Post";
import { PassDocIDContext, PassUserIDContext } from "../utilities/Context";

function Posts() {
  // const [postData, setPostData] = useState([
  //   { title: "Loading data...", id: "initiate" },
  // ]);

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

  console.log(postData);
  useEffect(() => {
    const collectionRef = collection(db, "post");
    // const q = query(collectionRef, orderBy("timestamp", "desc"));
    const q = query(collectionRef);
    const unsub = onSnapshot(q, (snapshot) =>
      setPostData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "post");
    // const q = query(collectionRef, orderBy("timestamp", "desc"));
    const q = query(collectionRef);
    const unsub = onSnapshot(q, (snapshot) =>
      setPostFilterData(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    return unsub;
  }, []);

  return (
    <div className="">
      <div className="">
        {postFilterData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            codeSnippet={post.codeSnippet}
            description={post.description}
            timestamp={post.timestamp}
            user={post.user}
          />
        ))}
        {postFilterData.length === 0 && (
          <span className="flex  p-10">
            No records found matching search term
          </span>
        )}
      </div>
    </div>
  );
}

export default Posts;
