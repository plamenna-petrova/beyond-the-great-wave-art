
export const requiredFieldErrorMessage = (type, fieldName) => `The ${type} ${fieldName} is required`;

export const minLengthFieldErrorMessage = (type, fieldName, minLength) => `The ${type} ${fieldName} must be at least ${minLength} characters long`;

export const maxLengthFieldErrorMessage = (type, fieldName, maxLength) => `The ${type} ${fieldName} cannot be longer than ${maxLength} characters`;

