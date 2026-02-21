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

  const createPost = async () => {
    if (!ca) return;
    await addPost(ca, currentUser);
    setPosts([...getPosts()]);
    setCa("");
  };

  return (
    <div className="feed">
      <div className="trending-bar">
        <div className="trending-content">
          <span className="trending-item"><span className="trending-label">1</span> $PEPE +12.5%</span>
          <span className="trending-item"><span className="trending-label">2</span> $DOGE +5.2%</span>
          <span className="trending-item"><span className="trending-label">3</span> $SHIB -2.1%</span>
          <span className="trending-item"><span className="trending-label">4</span> $FLOKI +18.7%</span>
          <span className="trending-item"><span className="trending-label">5</span> $BONK +9.3%</span>
        </div>
      </div>
      
      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-header">
            <div className="avatar">
              {post.metadata?.image && <img src={post.metadata.image} alt="token" style={{width: '100%', borderRadius: '50%'}} />}
            </div>
            <div className="user-info">
              <span className="user-name">{post.poster}</span>
              <span className="user-handle">@{post.poster.toLowerCase()}</span>
            </div>
          </div>
          
          <div className="ca-text">
            {post.metadata ? (
              <div className="token-details" style={{border: '1px solid var(--x-border)', borderRadius: '12px', padding: '12px', marginTop: '8px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '18px', fontWeight: 'bold'}}>{post.metadata.name} (${post.metadata.symbol})</span>
                  <a href={`https://dexscreener.com/search?q=${post.contractAddress}`} target="_blank" rel="noreferrer" style={{backgroundColor: 'var(--x-blue)', color: 'white', padding: '4px 12px', borderRadius: '16px', textDecoration: 'none', fontSize: '12px'}}>Swap Now</a>
                </div>
                <div style={{display: 'flex', gap: '16px', marginTop: '8px', fontSize: '14px', color: 'var(--x-text-dim)'}}>
                  <span>Price: ${post.metadata.price.toFixed(6)}</span>
                  <span>MCap: ${(post.metadata.mcap / 1000).toFixed(2)}K</span>
                </div>
                <div style={{marginTop: '8px', fontSize: '12px', wordBreak: 'break-all', opacity: 0.7}}>
                  CA: {post.contractAddress}
                </div>
              </div>
            ) : (
              <><b>Contract Address:</b> {post.contractAddress}</>
            )}
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