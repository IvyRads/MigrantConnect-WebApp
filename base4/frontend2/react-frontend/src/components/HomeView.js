import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FiFolderPlus, FiCalendar, FiGlobe } from 'react-icons/fi';
import mapImg from './images/map.png';
import profilePic from './images/profilepic.jpg';
import homeBg from './images/homebg.jpg';

function HomeView() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [quickNotes, setQuickNotes] = useState(() => localStorage.getItem('quickNotes') || '');

  useEffect(() => {
    localStorage.setItem('quickNotes', quickNotes);
  }, [quickNotes]);

  const toggle = (setter) => setter(prev => !prev);
  const closeAllPopups = () => {
    setSidebarOpen(false);
    setShowLanguagePopup(false);
  };

  const sharedButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  };

  const iconCardStyle = {
    borderRadius: '50%',
    padding: '15px',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    color: 'white'
  };

  const gridItemStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '1 / 1', // Ensures square container
  minWidth: '280px',
  maxWidth: '360px',
  width: '100%',
  height: 'auto',
  padding: '1rem',
  boxSizing: 'border-box',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out'
};


  const captionStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    color: '#133764',
    marginBottom: '0.5rem',
    textAlign: 'center'
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Roboto', sans-serif",
        color: '#001f3f',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FECBCC',
        position: 'relative',
        overflowX: 'hidden'
      }}
      onClick={closeAllPopups}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: '#001f3f',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          position: 'relative',
          zIndex: 1000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => toggle(setSidebarOpen)} style={sharedButtonStyle}>☰</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); toggle(setShowLanguagePopup); }}
            style={{ ...sharedButtonStyle, color: '#28a745' }}
            aria-label="Translate"
          >
            <FiGlobe size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggle(setProfileOpen); }}
            style={{ ...sharedButtonStyle, color: '#ffc107' }}
            aria-label="Profile"
          >
            👤
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <nav
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#001f3f',
          width: '250px',
          height: '100%',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 999,
          paddingTop: '4rem'
        }}
      >
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <img src={profilePic} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} />
        </div>
        {[
          { label: 'Job Offers', path: '/page1' },
          { label: 'Rent near me', path: '/page2' },
          { label: 'Emergency Services', path: '/emergency' },
          { label: 'Childcare Services', path: '/childcare' },
          { label: 'Scholarships', path: '/scholarships' },
          { label: 'Government Benefits', path: '/benefits' },
          { label: 'News', path: '/news' },
        ].map(({ label, path }) => (
          <a key={path} href={path} style={navLinkStyle}>{label}</a>
        ))}
      </nav>

      {/* Profile Menu */}
      {profileOpen && (
        <div style={popupStyle}>
          <p style={dropdownItemStyle} onClick={() => navigate("/ProfileView")}>My Profile</p>
          <p style={dropdownItemStyle} onClick={() => navigate("/EditProfile")}>Edit Profile</p>
          <p style={dropdownItemStyle} onClick={() => navigate("/")}>Logout</p>
        </div>
      )}

      {/* Language Selection */}
      {showLanguagePopup && (
        <div style={{ ...popupStyle, right: '3.5rem', fontFamily: '"Comic Sans MS", cursive' }}>
          {['English', 'Hindi', 'Bengali', 'Marathi', 'Telugu', 'Tamil'].map(lang => (
            <div key={lang} style={{ padding: '0.4rem', cursor: 'pointer' }}>{lang}</div>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    padding: '2rem',
    justifyItems: 'center',
    alignItems: 'center',
    flexGrow: 1
  }}
>

        {/* Grid Items */}
        <div style={gridItemStyle}>
          <p style={captionStyle}>🧭 Navigate Nearby</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <img src={mapImg} alt="Map" style={{ width: "50%", height: "50%", objectFit: 'contain', borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }} />
          </a>
        </div>

        <div style={gridItemStyle}>
          <p style={captionStyle}>📣 Notifications</p>
          <p style={{ textAlign: 'center' }}>No new notifications</p>
        </div>

        <div style={gridItemStyle}>
          <p style={captionStyle}>📝 Quick Notes</p>
          <textarea
            value={quickNotes}
            onChange={(e) => setQuickNotes(e.target.value)}
            placeholder="Type your notes here..."
            style={{
              width: '90%',
              height: '90%',
              padding: '0.8rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={gridItemStyle}>
          <p style={captionStyle}>🎉 Welcome!</p>
          <img src={homeBg} alt="Home Background" style={{ width: "90%", height: "90%", objectFit: 'contain', borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }} />
        </div>
      </div>

      {/* Floating Buttons */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
        <button onClick={() => window.open('https://calendar.google.com', '_blank')} style={{ ...iconCardStyle, backgroundColor: '#f39c12' }}>
          <FiCalendar size={24} />
        </button>
        <button onClick={() => navigate('/wallet')} style={{ ...iconCardStyle, backgroundColor: '#133764' }}>
          <FiFolderPlus size={24} />
        </button>
      </div>
    </div>
  );
}

const navLinkStyle = {
  display: 'block',
  color: 'white',
  textDecoration: 'none',
  padding: '1rem',
  fontSize: '1.1rem',
  transition: 'background 0.2s'
};

const dropdownItemStyle = {
  padding: '0.75rem 1rem',
  color: '#001f3f',
  backgroundColor: 'white',
  margin: 0,
  cursor: 'pointer',
  borderBottom: '1px solid #eee'
};

const popupStyle = {
  position: 'absolute',
  top: '60px',
  right: '1rem',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  overflow: 'hidden',
  minWidth: '160px',
  zIndex: 1000
};

export default HomeView;
