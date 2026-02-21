import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import { addPost } from "./blockchain/chain";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ca, setCa] = useState("");
  const currentUser = "LexLuthor";

  const handlePost = async () => {
    if (!ca) return;
    await addPost(ca, currentUser);
    setCa("");
    setIsModalOpen(false);
    window.location.reload(); // Simple way to refresh feed for now
  };

  return (
    <BrowserRouter>
      <div className="layout">
        <header className="header">
          <h2>PeerPump</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<Search />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>

        <button className="floating-post-btn" onClick={() => setIsModalOpen(true)}>+</button>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={() => setIsModalOpen(false)}>✕</button>
                <button className="post-confirm-btn" onClick={handlePost}>Post</button>
              </div>
              <textarea 
                placeholder="What's the CA?" 
                value={ca} 
                onChange={(e) => setCa(e.target.value)}
              />
            </div>
          </div>
        )}

        <nav className="bottom-nav">
          <Link to="/" className="nav-item">🏠</Link>
          <Link to="/search" className="nav-item">🔍</Link>
          <Link to="/notifications" className="nav-item">🔔</Link>
          <Link to="/messages" className="nav-item">✉️</Link>
        </nav>
      </div>
    </BrowserRouter>
  );
};

export default App;