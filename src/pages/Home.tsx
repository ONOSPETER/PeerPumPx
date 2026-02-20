import React, { useState, useEffect } from "react";
import { addPost, getPosts, endorse, vote, simulateLifecycle } from "../blockchain/chain";

const currentUser = "anon_" + Math.floor(Math.random() * 1000);

const Home: React.FC = () => {
  const [posts, setPosts] = useState(getPosts());
  const [ca, setCa] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      simulateLifecycle();
      setPosts([...getPosts()]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const createPost = () => {
    if (!ca) return;
    addPost(ca, currentUser);
    setPosts([...getPosts()]);
    setCa("");
  };

  return (
    <div className="feed">
      <div className="post-box">
        <input
          placeholder="Enter Contract Address"
          value={ca}
          onChange={e => setCa(e.target.value)}
        />
        <button onClick={createPost}>Post CA</button>
      </div>

      {posts.map(post => (
        <div key={post.id} className="card">
          <p><b>CA:</b> {post.contractAddress}</p>
          <p>Poster: {post.poster}</p>
          <button onClick={() => { endorse(post.id, currentUser); setPosts([...getPosts()]); }}>🔁 Endorse ({post.endorsements.length})</button>
          <button onClick={() => { vote(post.id, currentUser, "like"); setPosts([...getPosts()]); }}>👍 {post.likes.length}</button>
          <button onClick={() => { vote(post.id, currentUser, "dislike"); setPosts([...getPosts()]); }}>👎 {post.dislikes.length}</button>
        </div>
      ))}
    </div>
  );
};

export default Home;