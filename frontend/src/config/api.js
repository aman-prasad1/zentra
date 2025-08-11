// API Base URL configuration
const getBaseURL = () => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
  }
  
  // Production URL
  return import.meta.env.VITE_API_URL || 'https://zentra-peach.vercel.app/api/v1';
};

export const BASE_URL = getBaseURL();
