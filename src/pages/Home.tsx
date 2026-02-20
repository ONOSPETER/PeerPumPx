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
          placeholder="What's the CA?"
          value={ca}
          onChange={e => setCa(e.target.value)}
        />
        <button onClick={createPost}>Post</button>
      </div>

      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-header">
            <div className="avatar" />
            <div className="user-info">
              <span className="user-name">{post.poster}</span>
              <span className="user-handle">@{post.poster.toLowerCase()}</span>
            </div>
          </div>
          <div className="ca-text">
            <b>Contract Address:</b> {post.contractAddress}
          </div>
          <div className="card-actions">
            <button className="action-btn" onClick={() => { vote(post.id, currentUser, "like"); setPosts([...getPosts()]); }}>
              <span>👍</span> {post.likes.length}
            </button>
            <button className="action-btn" onClick={() => { vote(post.id, currentUser, "dislike"); setPosts([...getPosts()]); }}>
              <span>👎</span> {post.dislikes.length}
            </button>
            <button className="action-btn" onClick={() => { endorse(post.id, currentUser); setPosts([...getPosts()]); }}>
              <span>🔁</span> {post.endorsements.length}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;