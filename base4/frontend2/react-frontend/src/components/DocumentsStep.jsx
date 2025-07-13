import React from 'react';
import { FileText, Upload, Award, Briefcase } from 'lucide-react';

const DocumentsStep = ({ data, onChange, onDocumentUpload, errors }) => {
  const handleFileUpload = (documentType, eventOrFiles) => {
    const files = Array.isArray(eventOrFiles)
      ? eventOrFiles
      : Array.from(eventOrFiles.target.files);

    if (files.length > 0) {
      onDocumentUpload(documentType, files.length === 1 ? files[0] : files);
    }
  };

  const handleTextChange = (field, value) => {
    onChange(field, value);
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.375rem',
    outline: 'none',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  };

  const sectionStyle = {
    backgroundColor: '#F9FAFB',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
  };

  const infoBoxStyle = {
    backgroundColor: '#FFFBEB',
    borderLeft: '4px solid #FACC15',
    padding: '1rem',
    marginTop: '1.5rem',
  };

  const gridContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <FileText size={48} color="#1E3A8A" style={{ margin: '0 auto 0.5rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1E3A8A' }}>
          Documents & Qualifications
        </h3>
        <p style={{ color: '#4B5563' }}>
          Upload your documents and provide details about your qualifications
        </p>
      </div>

      {/* Identity Documents */}
      <div style={sectionStyle}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '1rem' }}>
          Identity Documents
        </h4>
        <div style={gridContainer}>
          <div>
            <label style={labelStyle}>PAN Card</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('panCard', e)}
              style={inputStyle}
            />
            {data.panCard && (
              <p style={{ fontSize: '0.875rem', color: '#059669', marginTop: '0.25rem' }}>
                ✓ {data.panCard.name}
              </p>
            )}
          </div>

          <div>
            <label style={labelStyle}>Driver's License</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('driversLicense', e)}
              style={inputStyle}
            />
            {data.driversLicense && (
              <p style={{ fontSize: '0.875rem', color: '#059669', marginTop: '0.25rem' }}>
                ✓ {data.driversLicense.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Educational Qualifications */}
      <div style={sectionStyle}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '1rem' }}>
          <Award size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Educational Qualifications
        </h4>
        <label style={labelStyle}>Upload Educational Certificates</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={(e) => handleFileUpload('educationalQualifications', e)}
          style={inputStyle}
        />
        {data.educationalQualifications?.length > 0 && (
          <p style={{ fontSize: '0.875rem', color: '#059669', marginTop: '0.25rem' }}>
            ✓ {data.educationalQualifications.length} file(s) uploaded
          </p>
        )}
      </div>

      {/* Skills */}
      <div>
        <label style={labelStyle}>Skills & Abilities</label>
        <textarea
          value={data.skills}
          onChange={(e) => handleTextChange('skills', e.target.value)}
          placeholder="List your skills, abilities, and what you can do (e.g., cooking, cleaning, driving, computer skills, etc.)"
          rows="4"
          style={textareaStyle}
        />
      </div>

      {/* Work Experience */}
      <div>
        <label style={labelStyle}>
          <Briefcase size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
          Work Experience
        </label>
        <textarea
          value={data.workExperience}
          onChange={(e) => handleTextChange('workExperience', e.target.value)}
          placeholder="Describe your work experience, previous jobs, or any work you have done"
          rows="4"
          style={textareaStyle}
        />
      </div>

      {/* Other Documents */}
      <div>
        <label style={labelStyle}>Other Documents (Optional)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={(e) => handleFileUpload('otherDocuments', e)}
          style={inputStyle}
        />
        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
          Upload any other relevant documents (Aadhaar, passport, bank statements, etc.)
        </p>
        {data.otherDocuments?.length > 0 && (
          <p style={{ fontSize: '0.875rem', color: '#059669', marginTop: '0.25rem' }}>
            ✓ {data.otherDocuments.length} file(s) uploaded
          </p>
        )}
      </div>

      {/* Upload Guidelines */}
      <div style={infoBoxStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Upload size={20} color="#F59E0B" style={{ flexShrink: 0 }} />
          <div style={{ marginLeft: '0.75rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#92400E' }}>
              <strong>File Upload Guidelines:</strong><br />
              • Supported formats: PDF, JPG, PNG<br />
              • Maximum file size: 10MB per file<br />
              • Ensure documents are clear and readable<br />
              • You can upload multiple files for educational qualifications and other documents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;
