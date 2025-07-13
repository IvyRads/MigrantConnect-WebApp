import React from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

const FormNavigation = ({ 
  currentStep, 
  onNext, 
  onPrevious, 
  isSubmitting, 
  totalSteps 
}) => {
  const buttonBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const prevDisabledStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6', // gray-100
    color: '#9ca3af', // gray-400
    cursor: 'not-allowed',
    border: 'none',
  };

  const prevActiveStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#ffffff',
    color: '#1e3a8a', // dark-blue
    border: '2px solid #1e3a8a',
    cursor: 'pointer',
  };

  const nextDisabledStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#9ca3af', // gray-400
    color: '#ffffff',
    cursor: 'not-allowed',
    border: 'none',
  };

  const nextActiveStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    cursor: 'pointer',
    border: 'none',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1.5rem',
        borderTop: '1px solid #e5e7eb', // gray-200
      }}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1}
        style={currentStep === 1 ? prevDisabledStyle : prevActiveStyle}
      >
        <ChevronLeft size={16} style={{ marginRight: '8px' }} />
        Previous
      </button>

      <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
        Step {currentStep} of {totalSteps}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        style={isSubmitting ? nextDisabledStyle : nextActiveStyle}
      >
        {isSubmitting ? (
          <>
            <div
              style={{
                width: '16px',
                height: '16px',
                marginRight: '8px',
                borderBottom: '2px solid white',
                borderRadius: '9999px',
                animation: 'spin 1s linear infinite',
              }}
            />
            Submitting...
          </>
        ) : currentStep === totalSteps ? (
          <>
            <Save size={16} style={{ marginRight: '8px' }} />
            Submit
          </>
        ) : (
          <>
            Next
            <ChevronRight size={16} style={{ marginLeft: '8px' }} />
          </>
        )}
      </button>

      {/* Add keyframes animation manually if not using a CSS file */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FormNavigation;
