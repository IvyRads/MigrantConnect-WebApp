class DocumentStorage {
  constructor() {
    this.documents = new Map();
  }

  addDocument(type, file) {
    if (!this.documents.has(type)) {
      this.documents.set(type, []);
    }

    if (Array.isArray(file)) {
      this.documents.get(type).push(...file);
    } else {
      this.documents.get(type).push(file);
    }
  }

  getDocument(type) {
    return this.documents.get(type) || [];
  }

  getAllDocuments() {
    const allDocs = {};
    for (const [type, files] of this.documents) {
      allDocs[type] = files;
    }
    return allDocs;
  }

  removeDocument(type, index) {
    if (this.documents.has(type)) {
      const files = this.documents.get(type);
      files.splice(index, 1);
      if (files.length === 0) {
        this.documents.delete(type);
      }
    }
  }

  clearAllDocuments() {
    this.documents.clear();
  }

  getDocumentCount(type) {
    return this.documents.has(type) ? this.documents.get(type).length : 0;
  }

  getTotalDocumentCount() {
    let total = 0;
    for (const files of this.documents.values()) {
      total += files.length;
    }
    return total;
  }
}

// ✅ Fix: assign to a named variable before exporting
const documentStorageInstance = new DocumentStorage();
export default documentStorageInstance;
