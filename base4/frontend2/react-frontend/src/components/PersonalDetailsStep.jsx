import React from 'react';
import { User, Phone, Mail, Calendar, Users } from 'lucide-react';

const PersonalDetailsStep = ({ data, onChange, errors }) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem',
    display: 'block',
  };

  const inputBaseStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    outline: 'none',
    border: '1px solid',
    transition: 'box-shadow 0.2s',
    fontSize: '1rem',
  };

  const errorTextStyle = {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: '0.25rem',
  };

  const subtitleStyle = {
    color: '#4b5563',
    fontSize: '1rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <User size={48} style={{ color: '#1e3a8a', margin: '0 auto 0.5rem' }} />
        <h3 style={titleStyle}>Personal Details</h3>
        <p style={subtitleStyle}>Please provide your basic information</p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {/* First Name */}
        <div>
          <label style={labelStyle}>First Name *</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter your first name"
            style={{
              ...inputBaseStyle,
              borderColor: errors.firstName ? '#ef4444' : '#d1d5db',
              boxShadow: errors.firstName ? '0 0 0 2px #ef4444' : undefined,
            }}
          />
          {errors.firstName && <p style={errorTextStyle}>{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label style={labelStyle}>Last Name *</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter your last name"
            style={{
              ...inputBaseStyle,
              borderColor: errors.lastName ? '#ef4444' : '#d1d5db',
            }}
          />
          {errors.lastName && <p style={errorTextStyle}>{errors.lastName}</p>}
        </div>

        {/* Age */}
        <div>
          <label style={labelStyle}>Age *</label>
          <input
            type="number"
            value={data.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Enter your age"
            min="1"
            max="120"
            style={{
              ...inputBaseStyle,
              borderColor: errors.age ? '#ef4444' : '#d1d5db',
            }}
          />
          {errors.age && <p style={errorTextStyle}>{errors.age}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label style={labelStyle}>
            <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Date of Birth *
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            style={{
              ...inputBaseStyle,
              borderColor: errors.dateOfBirth ? '#ef4444' : '#d1d5db',
            }}
          />
          {errors.dateOfBirth && (
            <p style={errorTextStyle}>{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label style={labelStyle}>
            <Phone size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder="Enter your phone number"
            style={{
              ...inputBaseStyle,
              borderColor: errors.phoneNumber ? '#ef4444' : '#d1d5db',
            }}
          />
          {errors.phoneNumber && (
            <p style={errorTextStyle}>{errors.phoneNumber}</p>
          )}
        </div>

        {/* Guardian */}
        <div>
          <label style={labelStyle}>
            <Users size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Guardian/Emergency Contact
          </label>
          <input
            type="text"
            value={data.guardian}
            onChange={(e) => handleInputChange('guardian', e.target.value)}
            placeholder="Enter guardian or emergency contact name"
            style={{
              ...inputBaseStyle,
              borderColor: '#d1d5db',
            }}
          />
        </div>

        {/* Email (Full width if possible) */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>
            <Mail size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            style={{
              ...inputBaseStyle,
              borderColor: errors.email ? '#ef4444' : '#d1d5db',
            }}
          />
          {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
