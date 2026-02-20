import React from "react";
import { getRating } from "../blockchain/chain";

const user = "LexLuthor";
const profilePic = "https://emerald-genetic-marten-256.replit.app/nft_money_ape.png"; // Placeholder for the NFT image

const Profile: React.FC = () => {
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
    </div>
  );
};

export default Profile;