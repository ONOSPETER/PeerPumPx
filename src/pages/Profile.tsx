import React, { useState } from "react";
import { getRating, getPosts, endorse, vote } from "../blockchain/chain";

const user = "LexLuthor";
const profilePic = "https://emerald-genetic-marten-256.replit.app/nft_money_ape.png"; // Placeholder for the NFT image

const Profile: React.FC = () => {
  const [posts, setPosts] = useState(getPosts());
  
  // Filter posts by user and those endorsed (retweeted) by user
  const userContent = posts.filter(p => p.poster === user || p.endorsements.includes(user));

  return (
    <div className="profile">
      <div className="profile-header">
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="banner" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="profile-avatar" style={{ overflow: 'hidden' }}>
          <img 
            src="https://i.ibb.co/vYm0f4k/ape.png" 
            alt="Lex Luthor NFT" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/pixel-art/svg?seed=LexLuthor";
            }}
          />
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-name">Lex Luthor</div>
        <div className="profile-handle">@{user}</div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{getRating(user)}</span>
            <span className="stat-label"> Rating</span>
          </div>
        </div>
      </div>

      <div className="profile-feed" style={{marginTop: '20px'}}>
        <div style={{padding: '16px', borderBottom: '1px solid var(--x-border)', fontWeight: 'bold'}}>Posts & Reposts</div>
        {userContent.map(post => (
          <div key={post.id} className="card">
            {post.endorsements.includes(user) && post.poster !== user && (
              <div style={{fontSize: '13px', color: 'var(--x-text-dim)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span>🔁</span> You Reposted
              </div>
            )}
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
                </div>
              ) : (
                <><b>CA:</b> {post.contractAddress}</>
              )}
            </div>
            <div className="card-actions">
              <button className="action-btn" onClick={() => { vote(post.id, user, "like"); setPosts([...getPosts()]); }}>
                <span>👍</span> {post.likes.length}
              </button>
              <button className="action-btn" onClick={() => { vote(post.id, user, "dislike"); setPosts([...getPosts()]); }}>
                <span>👎</span> {post.dislikes.length}
              </button>
              <button className="action-btn" onClick={() => { endorse(post.id, user); setPosts([...getPosts()]); }}>
                <span>🔁</span> {post.endorsements.length}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;