import React from "react";
import { getRating } from "../blockchain/chain";

const user = "anon_profile";

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar" />
      </div>
      <div className="profile-info">
        <div className="profile-name">Anon Profile</div>
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