import React, { useState } from 'react';
import { FileText, Download, Eye, ArrowLeft, File, Image, FileType } from 'lucide-react';

const DocumentWallet = ({ documents, onBackToProfile }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getFileIcon = (fileName) => {
    if (!fileName) return <File style={{ width: 24, height: 24 }} />;
    
    const extension = fileName.split('.').pop().toLowerCase();
    
    const baseStyle = { width: 24, height: 24 };

    switch (extension) {
      case 'pdf':
        return <FileText style={{ ...baseStyle, color: '#ef4444' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image style={{ ...baseStyle, color: '#22c55e' }} />;
      default:
        return <FileType style={{ ...baseStyle, color: '#3b82f6' }} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderDocumentCard = (title, docData, type) => {
    if (!docData) return null;

    const isArray = Array.isArray(docData);
    const docs = isArray ? docData : [docData];
    
    if (docs.length === 0) return null;

    return (
      <div key={type} style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            {getFileIcon(docs[0]?.name)}
            <span style={{ marginLeft: 8 }}>{title}</span>
          </h3>
          <span style={styles.badge}>
            {docs.length} file{docs.length > 1 ? 's' : ''}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {docs.map((doc, index) => (
            <div key={index} style={styles.documentItem}>
              <div style={styles.docInfo}>
                {getFileIcon(doc?.name)}
                <div style={{ marginLeft: 12, flex: 1 }}>
                  <p style={styles.docName}>{doc?.name || `${title} ${index + 1}`}</p>
                  <p style={styles.docMeta}>
                    {formatFileSize(doc?.size)} • Uploaded {doc?.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setSelectedDocument({ ...doc, title, type })}
                  style={styles.iconButton('blue')}
                  title="View Document"
                >
                  <Eye style={{ width: 16, height: 16 }} />
                </button>
                <button
                  onClick={() => {
                    alert(`Download functionality would be implemented here for: ${doc?.name}`);
                  }}
                  style={styles.iconButton('green')}
                  title="Download Document"
                >
                  <Download style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const documentCategories = [
    { title: 'PAN Card', data: documents.panCard, type: 'panCard' },
    { title: 'Driver\'s License', data: documents.driversLicense, type: 'driversLicense' },
    { title: 'Educational Qualifications', data: documents.educationalQualifications, type: 'educationalQualifications' },
    { title: 'Other Documents', data: documents.otherDocuments, type: 'otherDocuments' },
  ];

  const totalDocuments = documentCategories.reduce((total, category) => {
    if (!category.data) return total;
    return total + (Array.isArray(category.data) ? category.data.length : 1);
  }, 0);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ ...styles.card, marginBottom: 24 }}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button onClick={onBackToProfile} style={styles.backButton}>
              <ArrowLeft style={{ width: 16, height: 16, marginRight: 8 }} />
              Back to Profile
            </button>
            <div>
              <h2 style={styles.title}>
                <FileText style={{ width: 32, height: 32, marginRight: 12 }} />
                Document Wallet
              </h2>
              <p style={styles.subtitle}>Manage and view your uploaded documents</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={styles.totalDocs}>{totalDocuments}</p>
            <p style={styles.subtitle}>Total Documents</p>
          </div>
        </div>
      </div>

      {/* Document Categories */}
      {totalDocuments === 0 ? (
        <div style={{ ...styles.card, textAlign: 'center', padding: 48 }}>
          <FileText style={{ width: 64, height: 64, color: '#d1d5db', marginBottom: 16 }} />
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#4b5563', marginBottom: 8 }}>No Documents Uploaded</h3>
          <p style={{ color: '#6b7280' }}>Your uploaded documents will appear here once you submit the form.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {documentCategories.map(category =>
            renderDocumentCard(category.title, category.data, category.type)
          )}
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {selectedDocument.title} - {selectedDocument.name}
              </h3>
              <button onClick={() => setSelectedDocument(null)} style={styles.closeButton}>×</button>
            </div>
            <div style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>{getFileIcon(selectedDocument.name)}</div>
              <h4 style={{ fontSize: 18, marginBottom: 8 }}>{selectedDocument.name}</h4>
              <p style={{ color: '#6b7280', marginBottom: 16 }}>
                Size: {formatFileSize(selectedDocument.size)}
              </p>
              <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>
                Document preview would be displayed here in a real application. For security reasons, actual file content is not shown in this demo.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                <button
                  onClick={() => {
                    alert(`Download functionality would be implemented here for: ${selectedDocument.name}`);
                  }}
                  style={styles.primaryButton}
                >
                  <Download style={{ width: 16, height: 16, marginRight: 8 }} />
                  Download
                </button>
                <button
                  onClick={() => setSelectedDocument(null)}
                  style={styles.secondaryButton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div style={styles.tips}>
        <div style={{ display: 'flex' }}>
          <FileText style={{ width: 20, height: 20, color: '#60a5fa' }} />
          <div style={{ marginLeft: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1e40af' }}>Document Management Tips</h3>
            <ul style={{ marginTop: 8, fontSize: 14, color: '#1e3a8a', paddingLeft: 16 }}>
              <li>Keep your documents organized and easily accessible</li>
              <li>Ensure all uploaded documents are clear and readable</li>
              <li>Update your documents when they expire or change</li>
              <li>Download copies of your documents for offline access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: 24,
    border: '1px solid #e5e7eb',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    color: '#1e3a8a',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1e3a8a',
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  totalDocs: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1e3a8a',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: '#1e3a8a',
  },
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 12,
  },
  documentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  docInfo: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  docName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#111827',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  docMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  iconButton: (color) => ({
    padding: 8,
    borderRadius: 8,
    border: 'none',
    backgroundColor: color === 'blue' ? '#eff6ff' : '#ecfdf5',
    color: color === 'blue' ? '#2563eb' : '#059669',
    cursor: 'pointer',
  }),
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    maxWidth: 640,
    maxHeight: '90vh',
    overflow: 'hidden',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottom: '1px solid #e5e7eb',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e3a8a',
  },
  closeButton: {
    fontSize: 24,
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 24px',
    backgroundColor: '#1e3a8a',
    color: '#fff',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '8px 24px',
    backgroundColor: '#e5e7eb',
    color: '#111827',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  tips: {
    marginTop: 32,
    backgroundColor: '#eff6ff',
    borderLeft: '4px solid #60a5fa',
    padding: 24,
    borderRadius: 8,
  },
};

export default DocumentWallet;
