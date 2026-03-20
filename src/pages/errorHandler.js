export const handleAPIError = (error, setError) => {
  if (error.message === 'Failed to fetch') {
    setError('Cannot connect to server. Please check your internet connection.');
  } else if (error.status === 401) {
    setError('Session expired. Please login again.');
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else if (error.status === 403) {
    setError('You do not have permission to perform this action.');
  } else if (error.status === 404) {
    setError('Resource not found.');
  } else if (error.status >= 500) {
    setError('Server error. Please try again later.');
  } else {
    setError(error.message || 'An unexpected error occurred.');
  }
};

export const showToast = (message, type = 'error') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
    type === 'error' ? 'bg-red-500' : 'bg-green-500'
  } text-white`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};