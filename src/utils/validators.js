export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password) => password.length >= 6;
export const validateOTP = (otp) => otp.length === 6;