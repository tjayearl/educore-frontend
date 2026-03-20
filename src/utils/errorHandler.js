export const handleAPIError = (error, setError) => {
  console.error("API Error:", error);
  
  let message = 'An unexpected error occurred. Please try again.';

  if (!error) {
    setError(message);
    return;
  }

  // Network errors
  if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
    message = 'Cannot connect to server. Please check your internet connection.';
  } 
  // HTTP Status errors
  else if (error.status === 401) {
    message = 'Invalid credentials or session expired.';
  } else if (error.status === 403) {
    message = 'Access denied. You do not have permission to perform this action.';
  } else if (error.status === 404) {
    message = 'The requested resource was not found.';
  } else if (error.status >= 500) {
    message = 'Server error. Our team has been notified.';
  } else if (error.message) {
    message = error.message;
  }

  if (setError) {
    setError(message);
  } else {
    showToast(message, 'error');
  }
};

export const showToast = (message, type = 'error') => {
  const existingToast = document.querySelector('.educore-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `educore-toast fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 animate-fade-in-down ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  }`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};