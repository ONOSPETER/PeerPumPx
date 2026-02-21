import React from "react";

const Search: React.FC = () => {
  return (
    <div className="feed" style={{padding: '16px'}}>
      <div className="post-box">
        <input placeholder="Search tokens..." />
      </div>
      <h3>Trending for you</h3>
      <div className="card"><p>#SolanaSummer</p></div>
      <div className="card"><p>#PepeToTheMoon</p></div>
      <div className="card"><p>#LexLuthorCalls</p></div>
    </div>
  );
};

export default Search;