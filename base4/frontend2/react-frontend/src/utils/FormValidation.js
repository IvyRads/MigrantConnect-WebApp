const FormValidation = {
  validatePersonalDetails: (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!data.age) {
      errors.age = 'Age is required';
    } else if (data.age < 1 || data.age > 120) {
      errors.age = 'Please enter a valid age';
    }

    if (!data.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(data.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  },

  validateAddresses: (data) => {
    const errors = {};

    if (!data.permanentAddress.trim()) {
      errors.permanentAddress = 'Permanent address is required';
    }

    if (!data.temporaryAddress.trim()) {
      errors.temporaryAddress = 'Current address is required';
    }

    if (!data.originalState) {
      errors.originalState = 'Original state is required';
    }

    if (!data.currentState) {
      errors.currentState = 'Current state is required';
    }

    return errors;
  },

  validatePurpose: (data) => {
    const errors = {};

    if (!data.job && !data.housing) {
      errors.purpose = 'Please select at least one option (job or housing)';
    }

    return errors;
  },

  validateDocuments: (data) => {
    const errors = {};

    // Documents are optional, but we can add validation if needed
    // For now, we'll just ensure the structure is correct

    return errors;
  },
};

export default FormValidation;