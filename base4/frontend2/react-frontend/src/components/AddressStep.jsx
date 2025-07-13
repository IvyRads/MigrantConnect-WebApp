import React from 'react';
import { MapPin, Home } from 'lucide-react';

const AddressStep = ({ data, onChange, errors }) => {
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem',
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: `1px solid ${hasError ? '#EF4444' : '#D1D5DB'}`,
    borderRadius: '0.375rem',
    outline: 'none',
    resize: 'vertical',
  });

  const errorStyle = {
    color: '#EF4444',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  };

  const sectionStyle = {
    marginBottom: '1.5rem',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
  };

  const headingStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1E3A8A',
  };

  const subtextStyle = {
    color: '#4B5563',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={headerStyle}>
        <MapPin size={48} color="#1E3A8A" style={{ margin: '0 auto 0.5rem' }} />
        <h3 style={headingStyle}>Address Information</h3>
        <p style={subtextStyle}>Please provide your address details</p>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          <Home size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
          Permanent Address *
        </label>
        <textarea
          value={data.permanentAddress}
          onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
          placeholder="Enter your permanent address"
          rows="3"
          style={inputStyle(errors.permanentAddress)}
        />
        {errors.permanentAddress && (
          <p style={errorStyle}>{errors.permanentAddress}</p>
        )}
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          <Home size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
          Temporary Address (Current Address) *
        </label>
        <textarea
          value={data.temporaryAddress}
          onChange={(e) => handleInputChange('temporaryAddress', e.target.value)}
          placeholder="Enter your current/temporary address"
          rows="3"
          style={inputStyle(errors.temporaryAddress)}
        />
        {errors.temporaryAddress && (
          <p style={errorStyle}>{errors.temporaryAddress}</p>
        )}
      </div>

      <div style={gridStyle}>
        <div>
          <label style={labelStyle}>Original State *</label>
          <select
            value={data.originalState}
            onChange={(e) => handleInputChange('originalState', e.target.value)}
            style={inputStyle(errors.originalState)}
          >
            <option value="">Select your original state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.originalState && (
            <p style={errorStyle}>{errors.originalState}</p>
          )}
        </div>

        <div>
          <label style={labelStyle}>Current State *</label>
          <select
            value={data.currentState}
            onChange={(e) => handleInputChange('currentState', e.target.value)}
            style={inputStyle(errors.currentState)}
          >
            <option value="">Select your current state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.currentState && (
            <p style={errorStyle}>{errors.currentState}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
