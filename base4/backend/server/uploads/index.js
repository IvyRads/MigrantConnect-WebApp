import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
  }
});

// In-memory storage for user data (in production, use a database)
const userData = new Map();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'User Registration API Server' });
});

// Save user data
app.post('/api/save-user-data', (req, res) => {
  try {
    const userInfo = req.body;
    const userId = userInfo.id || uuidv4();
    
    userData.set(userId, {
      ...userInfo,
      id: userId,
      lastUpdated: new Date().toISOString()
    });
    
    res.json({ 
      success: true, 
      message: 'User data saved successfully',
      userId: userId 
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving user data' 
    });
  }
});

// Get user data
app.get('/api/get-user-data/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const user = userData.get(userId);
    
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving user data' 
    });
  }
});

// Upload documents
app.post('/api/upload-documents', upload.array('documents', 10), (req, res) => {
  try {
    const { userId, documentType } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No files uploaded' 
      });
    }
    
    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      uploadDate: new Date().toISOString()
    }));
    
    // Update user data with document information
    if (userData.has(userId)) {
      const user = userData.get(userId);
      if (!user.uploadedDocuments) {
        user.uploadedDocuments = {};
      }
      
      if (!user.uploadedDocuments[documentType]) {
        user.uploadedDocuments[documentType] = [];
      }
      
      user.uploadedDocuments[documentType].push(...uploadedFiles);
      userData.set(userId, user);
    }
    
    res.json({ 
      success: true, 
      message: 'Documents uploaded successfully',
      files: uploadedFiles 
    });
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading documents' 
    });
  }
});

// Get all users (for admin purposes)
app.get('/api/get-all-users', (req, res) => {
  try {
    const allUsers = Array.from(userData.values());
    res.json({ 
      success: true, 
      data: allUsers,
      count: allUsers.length 
    });
  } catch (error) {
    console.error('Error retrieving all users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving users' 
    });
  }
});

// Download document
app.get('/api/download-document/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'File not found' 
      });
    }
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error downloading document' 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File size too large. Maximum size is 10MB.' 
      });
    }
  }
  
  res.status(500).json({ 
    success: false, 
    message: error.message || 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});