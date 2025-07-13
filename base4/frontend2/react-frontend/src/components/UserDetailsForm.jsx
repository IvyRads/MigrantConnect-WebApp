import React, { useState } from 'react';
import PersonalDetailsStep from './PersonalDetailsStep';
import AddressStep from './AddressStep';
import PurposeStep from './PurposeStep';
import DocumentsStep from './DocumentsStep';
import FormNavigation from './FormNavigation';
import FormValidation from '../utils/FormValidation';

const UserDetailsForm = ({
  userData,
  onDataChange,
  onDocumentUpload,
  currentStep,
  setCurrentStep,
  onSave,
  onSubmit,
  isLoading,
}) => {
  const [errors, setErrors] = useState({});

  const validateCurrentStep = () => {
    let stepErrors = {};
    switch (currentStep) {
      case 1:
        stepErrors = FormValidation.validatePersonalDetails(userData.personalDetails);
        break;
      case 2:
        stepErrors = FormValidation.validateAddresses(userData.addresses);
        break;
      case 3:
        stepErrors = FormValidation.validatePurpose(userData.purpose);
        break;
      case 4:
        stepErrors = FormValidation.validateDocuments(userData.documents);
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        onSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            data={userData.personalDetails}
            onChange={(field, value) => onDataChange('personalDetails', field, value)}
            errors={errors}
          />
        );
      case 2:
        return (
          <AddressStep
            data={userData.addresses}
            onChange={(field, value) => onDataChange('addresses', field, value)}
            errors={errors}
          />
        );
      case 3:
        return (
          <PurposeStep
            data={userData.purpose}
            onChange={(field, value) => onDataChange('purpose', field, value)}
            errors={errors}
          />
        );
      case 4:
        return (
          <DocumentsStep
            data={userData.documents}
            onChange={(field, value) => onDataChange('documents', field, value)}
            onDocumentUpload={onDocumentUpload}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1e3a8a',
    },
    stepIndicator: {
      display: 'flex',
      gap: '0.5rem',
    },
    stepCircle: (active) => ({
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.875rem',
      fontWeight: 500,
      backgroundColor: active ? '#1e3a8a' : '#e5e7eb',
      color: active ? '#ffffff' : '#4b5563',
    }),
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Step {currentStep} of 4</h2>
          <div style={styles.stepIndicator}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} style={styles.stepCircle(step <= currentStep)}>
                {step}
              </div>
            ))}
          </div>
        </div>

        {renderCurrentStep()}

        <FormNavigation
          currentStep={currentStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isSubmitting={isLoading}
          totalSteps={4}
        />
      </div>
    </div>
  );
};

export default UserDetailsForm;
