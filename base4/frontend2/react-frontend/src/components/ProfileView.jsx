import React, { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import {
  User,
  MapPin,
  Search,
  FileText,
  Edit,
  Eye
} from "lucide-react";

const magic = new Magic("pk_live_845610B169B276D7");

const ProfileView = ({ onEditProfile, onViewDocuments }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (!isLoggedIn) {
          alert("Please log in first.");
          return;
        }

        const info = await magic.user.getInfo(); // email, publicAddress, issuer
        setUserInfo(info);

        const res = await fetch(`https://teamrocket-2.onrender.com/user-profile?email=${info.email}`);
        if (res.ok) {
          const data = await res.json();
          setExtraInfo(data);
        } else {
          console.warn("No extended profile found.");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    loadProfile();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString();
  };

  const formatPurpose = (purpose) => {
    const purposes = [];
    if (purpose?.job) purposes.push("Job Opportunities");
    if (purpose?.housing) purposes.push("Housing");
    return purposes.length ? purposes.join(", ") : "Not specified";
  };

  const getDocumentCount = (documents = {}) => {
    let count = 0;
    Object.values(documents).forEach((doc) => {
      if (Array.isArray(doc)) {
        count += doc.length;
      } else if (doc) {
        count += 1;
      }
    });
    return count;
  };

  if (!userInfo) return <p>Loading profile...</p>;

  const pd = extraInfo?.personalDetails || {};
  const addresses = extraInfo?.addresses || {};
  const documents = extraInfo?.documents || {};
  const purpose = extraInfo?.purpose || {};

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          overflow: "hidden",
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)"
        }}
      >
        {/* Header */}
        <div
          style={{ backgroundColor: "#1e3a8a", color: "white", padding: "1.5rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <User style={{ width: 48, height: 48, marginRight: "1rem" }} />
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {pd.firstName || ""} {pd.lastName || ""}
                </h2>
                <p style={{ color: "#bfdbfe" }}>{userInfo.email}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={onEditProfile}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  backgroundColor: "white",
                  color: "#1e3a8a",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  border: "none"
                }}
              >
                <Edit style={{ width: 16, height: 16, marginRight: "0.5rem" }} />
                Edit Profile
              </button>
              <button
                onClick={onViewDocuments}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <Eye style={{ width: 16, height: 16, marginRight: "0.5rem" }} />
                View Documents ({getDocumentCount(documents)})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Uploaded Image */}
          {extraInfo?.imageUrl && (
            <img
              src={extraInfo.imageUrl}
              alt="User Upload"
              width="150"
              style={{ borderRadius: "8px", alignSelf: "center" }}
            />
          )}

          {/* Personal Info */}
          <Section title="Personal Information" icon={<User />}>
            {[
              { label: "First Name", value: pd.firstName },
              { label: "Last Name", value: pd.lastName },
              { label: "Age", value: pd.age },
              { label: "Date of Birth", value: formatDate(pd.dateOfBirth) },
              { label: "Phone Number", value: pd.phoneNumber },
              { label: "Email", value: pd.email || userInfo.email }
            ].map((item, idx) => (
              <FieldCard key={idx} label={item.label} value={item.value} />
            ))}
            {pd.guardian && (
              <FieldCard label="Guardian/Emergency Contact" value={pd.guardian} full />
            )}
          </Section>

          {/* Address */}
          <Section title="Address Information" icon={<MapPin />}>
            {[
              { label: "Permanent Address", value: addresses.permanentAddress },
              { label: "Current Address", value: addresses.temporaryAddress },
              { label: "Original State", value: addresses.originalState },
              { label: "Current State", value: addresses.currentState }
            ].map((item, idx) => (
              <FieldCard key={idx} label={item.label} value={item.value} />
            ))}
          </Section>

          {/* Purpose */}
          <Section title="Looking For" icon={<Search />}>
            <FieldCard value={formatPurpose(purpose)} />
          </Section>

          {/* Skills & Experience */}
          <Section title="Skills & Experience" icon={<FileText />}>
            <FieldCard label="Skills" value={documents.skills} />
            <FieldCard label="Work Experience" value={documents.workExperience} />
          </Section>

          {/* Documents */}
          <Section title="Documents" icon={<FileText />} actionButton={
            <button
              onClick={onViewDocuments}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 1rem",
                backgroundColor: "#1e3a8a",
                color: "white",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer"
              }}
            >
              <Eye style={{ width: 16, height: 16, marginRight: "0.5rem" }} />
              Open Document Wallet
            </button>
          }>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "1rem", textAlign: "center"
            }}>
              {[
                { label: "Total Documents", value: getDocumentCount(documents), color: "#1e3a8a" },
                { label: "PAN Card", value: documents.panCard ? "1" : "0", color: "#16a34a" },
                { label: "Driver's License", value: documents.driversLicense ? "1" : "0", color: "#2563eb" },
                {
                  label: "Educational Docs",
                  value: Array.isArray(documents.educationalQualifications)
                    ? documents.educationalQualifications.length
                    : 0,
                  color: "#7c3aed"
                }
              ].map((item, idx) => (
                <div key={idx}>
                  <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: item.color }}>{item.value}</p>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

// Reusable section component
const Section = ({ title, icon, children, actionButton }) => (
  <section>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {React.cloneElement(icon, { width: 24, height: 24, color: "#1e3a8a", style: { marginRight: "0.5rem" } })}
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1e3a8a" }}>{title}</h3>
      </div>
      {actionButton}
    </div>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1rem"
    }}>
      {children}
    </div>
  </section>
);

// Reusable field display card
const FieldCard = ({ label, value, full }) => (
  <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "0.5rem", gridColumn: full ? "span 2" : "auto" }}>
    {label && (
      <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#4b5563" }}>
        {label}
      </label>
    )}
    <p style={{ fontSize: "1.125rem", color: "#1f2937", whiteSpace: "pre-wrap" }}>
      {value || "Not provided"}
    </p>
  </div>
);

export default ProfileView;
