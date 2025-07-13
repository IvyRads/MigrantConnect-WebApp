import React, { useState, useEffect, useCallback } from 'react';
import UserDetailsForm from './UserDetailsForm';
import ProfileView from './ProfileView';
import DocumentWallet from './DocumentWallet'
import DocumentStorage from '../utils/DocumentStorage';
import '../App.css';

function App() {
  const [userData, setUserData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      age: '',
      dateOfBirth: '',
      phoneNumber: '',
      guardian: '',
      email: '',
    },
    addresses: {
      permanentAddress: '',
      temporaryAddress: '',
      originalState: '',
      currentState: '',
    },
    purpose: {
      job: false,
      housing: false,
    },
    documents: {
      educationalQualifications: [],
      skills: '',
      workExperience: '',
      panCard: null,
      driversLicense: null,
      otherDocuments: [],
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('form'); // 'form', 'profile', 'documents'
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const autoSave = setTimeout(() => {
      saveData();
    }, 30000);
    return () => clearTimeout(autoSave);
  }, [userData]);

  const saveData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/save-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log('Data auto-saved successfully');
        const result = await response.json();
        if (result.userId && !userId) {
          setUserId(result.userId);
        }
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataChange = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleDocumentUpload = (documentType, file) => {
    DocumentStorage.addDocument(documentType, file);
    setUserData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file,
      },
    }));
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/save-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, id: userId }),
      });
      if (response.ok) {
        const result = await response.json();
        setUserId(result.userId);
        setIsSubmitted(true);
        setCurrentView('profile');
        alert('Your information has been submitted successfully!');
      }
    } catch (error) {
      console.error('Submit failed:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <ProfileView
            userData={userData}
            onEditProfile={() => setCurrentView('form')}
            onViewDocuments={() => setCurrentView('documents')}
          />
        );
      case 'documents':
        return (
          <DocumentWallet
            documents={userData.documents}
            onBackToProfile={() => setCurrentView('profile')}
          />
        );
      default:
        return (
          <UserDetailsForm
            userData={userData}
            onDataChange={handleDataChange}
            onDocumentUpload={handleDocumentUpload}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onSave={saveData}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        );
    }
  };

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#ffe5e0',
    },
    container: {
      maxWidth: '960px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s, color 0.3s',
    },
    activeButton: {
      backgroundColor: '#1e3a8a',
      color: '#ffffff',
    },
    inactiveButton: {
      backgroundColor: '#ffffff',
      color: '#1e3a8a',
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#374151',
    },
    loadingText: {
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: '#2563eb',
    },
    icon: {
      marginRight: '0.5rem',
      width: '1.25rem',
      height: '1.25rem',
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerTop}>
            <h1 style={styles.title}>User Registration Portal</h1>
            {isSubmitted && (
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => setCurrentView('profile')}
                  style={{
                    ...styles.button,
                    ...(currentView === 'profile' ? styles.activeButton : styles.inactiveButton),
                  }}
                >
                  <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={() => setCurrentView('documents')}
                  style={{
                    ...styles.button,
                    ...(currentView === 'documents' ? styles.activeButton : styles.inactiveButton),
                  }}
                >
                  <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                  </svg>
                  Document Wallet
                </button>
              </div>
            )}
          </div>
          <p style={styles.subtitle}>
            {currentView === 'form'
              ? 'Complete your profile to access job and housing opportunities'
              : currentView === 'profile'
              ? 'Your Profile Information'
              : 'Your Document Wallet'}
          </p>
          {isLoading && <div style={styles.loadingText}>💾 Auto-saving your data...</div>}
        </header>

        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;