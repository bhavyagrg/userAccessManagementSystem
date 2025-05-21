export const API_URL = 'http://localhost:3000/api';

export const authService = {
  signup: async (userData: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.errors)) {
          const errorMessages = data.errors
            .map(error => `${error.field}: ${error.message}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        if (data.message) {
          throw new Error(data.message);
        }
        throw new Error('Signup failed. Please try again.');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  login: async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.errors)) {
          const errorMessages = data.errors
            .map(error => `${error.field}: ${error.message}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        if (data.message) {
          throw new Error(data.message);
        }
        throw new Error('Login failed. Please try again.');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }
};
