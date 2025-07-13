import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const supabaseUrl = 'https://gqxgsgxvgutktndosfah.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY'; // NEVER expose this in a real app
const headers = {
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
};

const primaryColor = '#133764';
//const accentColor = '#F2B6B3';
const secondaryColor = '#788DA0';
const darkAccentColor = '#0D3466';
const lightBackgroundColor = '#FECBCC';
const whiteColor = '#FFFFFF';

const WalletScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${supabaseUrl}/rest/v1/documents?select=*`, {
        headers,
      });
      setDocuments(response.data);
    } catch (e) {
      setMessage(`Error fetching documents: ${e.message}`);
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (documentType) => {
    if (documents.some((doc) => doc.document_type === documentType)) {
      setMessage(`You can only upload one ${documentType}.`);
      return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();

      reader.onload = async () => {
        //const base64File = reader.result;
        const fileExtension = file.name.split('.').pop();
        const uniqueFileName = `${uuidv4()}.${fileExtension}`;
        const bucketMap = {
          'Education Certificate': 'education',
          'PAN Card': 'pan',
          "Driver's License": 'driver',
        };
        const bucket = bucketMap[documentType];
        const path = `${documentType}/${uniqueFileName}`;

        try {
          setIsLoading(true);

          await axios.post(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, file, {
            headers: {
              ...headers,
              'Content-Type': file.type,
            },
          });

          const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;

          await axios.post(`${supabaseUrl}/rest/v1/documents`, {
            document_type: documentType,
            supabase_file_path: path,
            supabase_bucket: bucket,
            public_url: publicUrl,
            uploaded_at: new Date().toISOString(),
          }, { headers });

          setMessage(`Successfully uploaded ${documentType}!`);
          fetchDocuments();
        } catch (error) {
          setMessage(`Error: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    };
    fileInput.click();
  };

  const renderUploadButton = (documentType) => {
    const alreadyUploaded = documents.some(doc => doc.document_type === documentType);
    return (
      <button
        style={{
          backgroundColor: alreadyUploaded ? secondaryColor : primaryColor,
          color: whiteColor,
          padding: '15px',
          borderRadius: '10px',
          marginBottom: '10px',
          fontSize: '16px',
          border: 'none',
          cursor: alreadyUploaded ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
        onClick={() => !alreadyUploaded && handleFileUpload(documentType)}
        disabled={alreadyUploaded || isLoading}
      >
        {alreadyUploaded ? `${documentType} Uploaded` : `Upload ${documentType}`}
      </button>
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Education Certificate': return '🎓';
      case 'PAN Card': return '💳';
      case "Driver's License": return '🚗';
      default: return '📄';
    }
  };

  return (
    <div style={{ backgroundColor: lightBackgroundColor, minHeight: '100vh', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: primaryColor }}>My Permanent Document Wallet</h2>

      {/* Upload Card */}
      <div style={{ backgroundColor: whiteColor, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', margin: '20px 0' }}>
        <h3 style={{ color: darkAccentColor }}>Upload New Document</h3>
        {renderUploadButton('Education Certificate')}
        {renderUploadButton('PAN Card')}
        {renderUploadButton("Driver's License")}
        {isLoading && <p>Uploading...</p>}
        {message && <p style={{ color: message.includes('Error') ? 'red' : darkAccentColor }}>{message}</p>}
      </div>

      {/* Document List */}
      <h3 style={{ color: primaryColor }}>My Uploaded Documents</h3>
      {documents.length === 0 ? (
        <p style={{ color: secondaryColor }}>No documents uploaded yet.</p>
      ) : (
        documents.map((doc, index) => {
          const uploadedAt = new Date(doc.uploaded_at);
          const dateStr = `${uploadedAt.getDate()}/${uploadedAt.getMonth() + 1}/${uploadedAt.getFullYear()}`;
          return (
            <div
              key={index}
              style={{
                backgroundColor: whiteColor,
                marginBottom: '10px',
                padding: '15px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => navigate(`/view-document?url=${encodeURIComponent(doc.public_url)}&type=${encodeURIComponent(doc.document_type)}`)}
            >
              <div style={{ fontSize: '30px', marginRight: '15px' }}>{getIcon(doc.document_type)}</div>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold', color: darkAccentColor }}>{doc.document_type}</p>
                <p style={{ margin: 0, fontSize: '14px', color: secondaryColor }}>Uploaded: {dateStr}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default WalletScreen;