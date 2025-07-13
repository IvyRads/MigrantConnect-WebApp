export interface PersonalDetails {
  firstName: string;
  lastName: string;
  age: string;
  dateOfBirth: string;
  phoneNumber: string;
  guardian: string;
  email: string;
}

export interface Addresses {
  permanentAddress: string;
  temporaryAddress: string;
  originalState: string;
  currentState: string;
}

export interface Purpose {
  searchingFor: string;
  educationalQualifications: string;
  skills: string;
  workExperience: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  file: File | null;
  uploadedUrl?: string;
}

export interface UserData {
  personalDetails: PersonalDetails;
  addresses: Addresses;
  purpose: Purpose;
  documents: Document[];
}