import React, { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import './MagicLogin.css';
import { useNavigate } from "react-router-dom";

const magic = new Magic("pk_live_845610B169B276D7");

function MagicLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Prevent double clicks

  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const userMetadata = await magic.user.getInfo();
        setUser(userMetadata);
        fetchUserProfileFromBackend(userMetadata.email);
      }
    })();
  }, []);

  const fetchUserProfileFromBackend = async (userEmail) => {
    try {
      console.log(`REACT: Attempting to fetch profile for ${userEmail}`);
      const res = await fetch(`http://localhost:5001/user-profile?email=${userEmail}`);

      if (res.ok) {
        const data = await res.json();
        console.log("REACT: User profile loaded from backend:", data);
        setName(data.name);
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${data.imageUrl}`;
        setImageUrl(ipfsUrl);
        setIsRegistered(true);
      } else {
        console.warn("REACT: User profile not found or error.");
        setIsRegistered(false);
      }
    } catch (err) {
      console.error("REACT ERROR: Error fetching user profile:", err);
      setIsRegistered(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.getInfo();
      setUser(userMetadata);
      await fetchUserProfileFromBackend(userMetadata.email);
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToBackend = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("REACT: Attempting image upload to backend...");
      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data?.ipfsHash) {
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${data.ipfsHash}`;
        console.log("📦 Uploaded to:", ipfsUrl);
        return ipfsUrl;
      } else {
        console.error("Upload error:", data);
        alert("Image upload failed: " + (data?.error || "Unknown error"));
        return null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error during image upload.");
      return null;
    }
  };

  const registerIdentity = async (ipfsUrl) => {
    if (!user || !user.email) {
      alert("Please log in before registering.");
      return;
    }

    try {
      console.log("REACT: Attempting to register identity with backend...");
      const res = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name,
          ipfsHash: ipfsUrl.split("/").pop(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Identity registered:", data);
        localStorage.setItem(user.email, JSON.stringify({ name, imageUrl: ipfsUrl }));
        setImageUrl(ipfsUrl);
        setIsRegistered(true);
        alert("✅ Identity registered successfully!");
        navigate("/HomeView");
      } else {
        console.error("❌ Registration error:", data.error);
        alert("Registration failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert("Error registering identity.");
    }
  };

  const handleRegister = async () => {
    if (!name || !file) {
      alert("Please enter your name and upload an image.");
      return;
    }

    setIsLoading(true);
    const ipfsUrl = await uploadToBackend();
    if (ipfsUrl) {
      await registerIdentity(ipfsUrl);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    const emailToRemove = user?.email;
    try {
      await magic.user.logout();
      setUser(null);
      setEmail("");
      setName("");
      setFile(null);
      setImageUrl(null);
      setIsRegistered(false);
      if (emailToRemove) {
        localStorage.removeItem(emailToRemove);
      }
      console.log("REACT: Logged out.");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (user) {
    return (
      <div className="magic-container">
        <h1 className="app-title">MIGRANT CONNECT</h1>
        <div className="login-box">
          <p><strong>Logged in as:</strong> {user.email}</p>
          <p><strong>Public Address:</strong> {user.publicAddress}</p>

          {isRegistered ? (
            <>
              <h3>Your Registered Identity</h3>
              <p><strong>Name:</strong> {name}</p>
              {imageUrl && (
                <>
                  <p><strong>Uploaded Image:</strong></p>
                  <img src={imageUrl} alt="Uploaded Identity" width="200" />
                </>
              )}
              <br /><br />
              <p>Want to update your identity?</p>
              <input
                type="text"
                placeholder="Enter new name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              /><br />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input"
              /><br />
              <button onClick={handleRegister} className="button" disabled={isLoading} style={{ marginRight: "8px" }}>
                Update Identity
              </button>
              <button onClick={handleLogout} className="button" disabled={isLoading}>Logout</button>
            </>
          ) : (
            <>
              <h3>Register Your Identity</h3>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              /><br />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input"
              /><br />
              <button onClick={handleRegister} className="button" disabled={isLoading} style={{ marginRight: "8px" }}>
                Register Identity
              </button>
              <button onClick={handleLogout} className="button" disabled={isLoading}>Logout</button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="magic-container">
      <h1 className="app-title">MIGRANT IDENTITY APP</h1>
      <div className="login-box">
        <h3>Login with Magic Link</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <button onClick={handleLogin} className="button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default MagicLogin;
