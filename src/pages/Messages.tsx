import React from "react";

const Messages: React.FC = () => {
  return (
    <div className="feed" style={{padding: '16px'}}>
      <h2>Messages</h2>
      <div className="card">
        <p><b>VitalikB:</b> Hey Lex, check this new CA</p>
      </div>
      <div className="card">
        <p><b>ElonMusk:</b> X to the moon! 🚀</p>
      </div>
    </div>
  );
};

export default Messages;