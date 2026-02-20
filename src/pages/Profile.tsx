import React from "react";
import { getRating } from "../blockchain/chain";

const user = "anon_profile";

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <h3>Anon Profile</h3>
      <p>Username: {user}</p>
      <p>Rating: {getRating(user)}</p>
    </div>
  );
};

export default Profile;