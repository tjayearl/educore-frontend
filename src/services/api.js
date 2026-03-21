const API_URL = 'https://educore-backend-7p4o.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (!response.ok) {
      throw { 
        status: response.status, 
        message: data.message || data.error || 'Request failed' 
      };
    }
    return data;
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw { 
        status: response.status, 
        message: text || 'Request failed' 
      };
    }
    return { message: text };
  }
};

export const authAPI = {
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  },
  
  register: async (fullName, email, password, role) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password, role })
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    }
  }
};

export const coursesAPI = {
  getAll: async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Get courses error:', err);
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
      return await handleResponse(res);
    } catch (err) {
      console.error('Create course error:', err);
      throw err;
    }
  },
  
  update: async (id, title, description, category) => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, description, category })
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Update course error:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Delete course error:', err);
      throw err;
    }
  },
  
  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Get course by ID error:', err);
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
      return await handleResponse(res);
    } catch (err) {
      console.error('Get lessons error:', err);
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
      return await handleResponse(res);
    } catch (err) {
      console.error('Create lesson error:', err);
      throw err;
    }
  },

  delete: async (courseId, lessonId) => {
    try {
      const res = await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Delete lesson error:', err);
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
      return await handleResponse(res);
    } catch (err) {
      console.error('Get progress error:', err);
      throw err;
    }
  },
  
  getAllProgress: async () => {
    try {
      const res = await fetch(`${API_URL}/progress/all`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Get all progress error:', err);
      throw err;
    }
  },
  
  markComplete: async (courseId, lessonId) => {
    try {
      const res = await fetch(`${API_URL}/progress/${courseId}/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Mark complete error:', err);
      throw err;
    }
  }
};

export const activitiesAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/activities/all`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return await handleResponse(res);
    } catch (err) {
      console.error('Get activities error:', err);
      throw err;
    }
  }
};