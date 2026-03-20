const API_URL = 'https://educore-backend-7p4o.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, message: data.message || 'Request failed' };
  }
  return data;
};

export const authAPI = {
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  },
  
  register: async (fullName, email, password, role) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role })
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  }
};

export const coursesAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/courses`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  },
  
  create: async (title, description, category) => {
    try {
      const res = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, description, category })
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  },
  
  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  }
};

export const lessonsAPI = {
  getAll: async (courseId) => {
    try {
      const res = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  },
  
  create: async (courseId, title, contentType, contentUrl, contentBody) => {
    try {
      const res = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, contentType, contentUrl, contentBody })
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  }
};

export const progressAPI = {
  get: async (courseId) => {
    try {
      const res = await fetch(`${API_URL}/progress/${courseId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  },
  
  markComplete: async (courseId, lessonId) => {
    try {
      const res = await fetch(`${API_URL}/progress/${courseId}/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return handleResponse(res);
    } catch (err) {
      throw err;
    }
  }
};