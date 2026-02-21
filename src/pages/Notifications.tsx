import React from "react";

const Notifications: React.FC = () => {
  return (
    <div className="feed" style={{padding: '16px'}}>
      <h2>Notifications</h2>
      <div className="card">
        <p>SatoshiN liked your post</p>
      </div>
      <div className="card">
        <p>ElonMusk endorsed your CA call</p>
      </div>
      <div className="card">
        <p>VitalikB started following you</p>
      </div>
    </div>
  );
};

export default Notifications;