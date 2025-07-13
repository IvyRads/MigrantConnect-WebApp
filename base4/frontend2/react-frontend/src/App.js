import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MagicLogin from "./MagicLogin";
import HomeView from "./components/HomeView";
import ProfileView from "./components/ProfileView";
import EditProfile from "./components/EditProfile";
import WalletScreen from './components/DocWallet';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MagicLogin />} />
        <Route path="/HomeView" element={<HomeView />} />
        <Route path="/ProfileView" element={<ProfileView />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/wallet" element={<WalletScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
