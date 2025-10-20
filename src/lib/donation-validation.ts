export interface DonationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isAnonymous: boolean;
  dedicateGift: boolean;
  dedicationType: 'honor' | 'memory';
  dedicateName: string;
  dedicateMessage: string;
  receiveUpdates: boolean;
  amount: number;
  donationType: 'one-time' | 'monthly';
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

export function validateZipCode(zipCode: string, country: string): boolean {
  if (country === 'United States') {
    const usZipRegex = /^\d{5}(-\d{4})?$/;
    return usZipRegex.test(zipCode);
  } else if (country === 'Canada') {
    const caPostalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    return caPostalRegex.test(zipCode);
  }
  // For other countries, just check it's not empty
  return zipCode.trim().length > 0;
}

export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return undefined;
}

export function validateAmount(amount: number): string | undefined {
  if (!amount || amount < 5) {
    return 'Minimum donation amount is $5';
  }
  if (amount > 10000) {
    return 'Maximum donation amount is $10,000. Please contact us for larger donations.';
  }
  return undefined;
}

export function validateDonationForm(data: DonationFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Required field validations
  const requiredFields = [
    { field: 'firstName', name: 'First name' },
    { field: 'lastName', name: 'Last name' },
    { field: 'email', name: 'Email address' },
    { field: 'address', name: 'Street address' },
    { field: 'city', name: 'City' },
    { field: 'state', name: 'State/Province' },
    { field: 'zipCode', name: 'ZIP/Postal code' },
  ];

  requiredFields.forEach(({ field, name }) => {
    const error = validateRequired(data[field as keyof DonationFormData] as string, name);
    if (error) {
      errors[field] = error;
    }
  });

  // Email validation
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional but must be valid if provided)
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // ZIP code validation
  if (data.zipCode && !validateZipCode(data.zipCode, data.country)) {
    if (data.country === 'United States') {
      errors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
    } else if (data.country === 'Canada') {
      errors.zipCode = 'Please enter a valid postal code (e.g., A1A 1A1)';
    } else {
      errors.zipCode = 'Please enter a valid postal code';
    }
  }

  // Amount validation
  const amountError = validateAmount(data.amount);
  if (amountError) {
    errors.amount = amountError;
  }

  // Name length validations
  if (data.firstName && data.firstName.length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
  }

  if (data.lastName && data.lastName.length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
  }

  // Address length validations
  if (data.address && data.address.length > 100) {
    errors.address = 'Address must be less than 100 characters';
  }

  if (data.city && data.city.length > 50) {
    errors.city = 'City must be less than 50 characters';
  }

  if (data.state && data.state.length > 50) {
    errors.state = 'State/Province must be less than 50 characters';
  }

  // Dedication validations
  if (data.dedicateGift) {
    if (!data.dedicateName || data.dedicateName.trim().length === 0) {
      errors.dedicateName = 'Please enter the name for the dedication';
    } else if (data.dedicateName.length > 100) {
      errors.dedicateName = 'Dedication name must be less than 100 characters';
    }

    if (data.dedicateMessage && data.dedicateMessage.length > 500) {
      errors.dedicateMessage = 'Dedication message must be less than 500 characters';
    }
  }

  return errors;
}

export function sanitizeFormData(data: DonationFormData): DonationFormData {
  return {
    ...data,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.replace(/[\s\-\(\)]/g, ''),
    address: data.address.trim(),
    city: data.city.trim(),
    state: data.state.trim(),
    zipCode: data.zipCode.trim().toUpperCase(),
    dedicateName: data.dedicateName.trim(),
    dedicateMessage: data.dedicateMessage.trim(),
  };
}
