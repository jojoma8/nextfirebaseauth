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
import { PassUserIDContext } from "../utilities/Context";

function Posts() {
  const [post, setPost] = useState([
    { title: "Loading data...", id: "initiate" },
  ]);

  console.log(post);
  useEffect(() => {
    const collectionRef = collection(db, "post");
    // const q = query(collectionRef, orderBy("timestamp", "desc"));
    const q = query(collectionRef);
    const unsub = onSnapshot(q, (snapshot) =>
      setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  return (
    <div className="">
      <div className="">
        {post.map((post) => (
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
      </div>
    </div>
  );
}

export default Posts;
