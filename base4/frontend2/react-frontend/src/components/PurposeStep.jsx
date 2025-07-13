import React from 'react';
import { Briefcase, Home, Search } from 'lucide-react';

const PurposeStep = ({ data, onChange, errors }) => {
  const handleCheckboxChange = (field, checked) => {
    onChange(field, checked);
  };

  const boxContainer = {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
  };

  /*const boxHoverStyle = {
    borderColor: '#1e3a8a',
  };
*/
  function checkboxBoxStyle(active) {
    return ({
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid',
      borderColor: active ? '#1e3a8a' : '#d1d5db',
      borderRadius: '0.375rem',
      marginRight: '0.75rem',
      backgroundColor: active ? '#1e3a8a' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  }

  const iconTextContainer = {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Search size={48} style={{ color: '#1e3a8a', marginBottom: '0.5rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e3a8a' }}>
          Are you looking for?
        </h3>
        <p style={{ color: '#4b5563' }}>
          Select what you're searching for (you can choose both)
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
        }}
      >
        {/* Job Option */}
        <div
          style={boxContainer}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1e3a8a'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        >
          <Briefcase size={32} style={{ color: '#1e3a8a', marginRight: '1rem' }} />
          <label style={iconTextContainer}>
            <input
              type="checkbox"
              checked={data.job}
              onChange={(e) => handleCheckboxChange('job', e.target.checked)}
              style={{ display: 'none' }}
            />
            <div style={checkboxBoxStyle(data.job)}>
              {data.job && (
                <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                Job Opportunities
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                Find employment opportunities that match your skills
              </p>
            </div>
          </label>
        </div>

        {/* Housing Option */}
        <div
          style={boxContainer}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1e3a8a'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        >
          <Home size={32} style={{ color: '#1e3a8a', marginRight: '1rem' }} />
          <label style={iconTextContainer}>
            <input
              type="checkbox"
              checked={data.housing}
              onChange={(e) => handleCheckboxChange('housing', e.target.checked)}
              style={{ display: 'none' }}
            />
            <div style={checkboxBoxStyle(data.housing)}>
              {data.housing && (
                <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                Housing
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                Find rental or purchase housing options
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Error Message */}
      {errors.purpose && (
        <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>
          {errors.purpose}
        </p>
      )}

      {/* Info Box */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          borderLeft: '4px solid #60a5fa',
          padding: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'start' }}>
          <svg
            style={{ flexShrink: 0, color: '#60a5fa', marginRight: '0.75rem' }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p style={{ fontSize: '0.875rem', color: '#1d4ed8' }}>
            <strong>Note:</strong> You can select both options if you're looking for both job opportunities and housing. This will help us provide you with comprehensive assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurposeStep;
