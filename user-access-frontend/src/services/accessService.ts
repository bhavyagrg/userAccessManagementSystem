import { API_URL } from './authService';

const getToken = () => {
  return localStorage.getItem('token') || '';
};

const handleResponse = async (response: Response) => {
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
    throw new Error('Request failed. Please try again.');
  }

  return data;
};

export const accessService = {
  requestAccess: async (requestData: {
    softwareId: string;
    accessLevel: string;
    reason: string;
  }) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(requestData),
      });

      return handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  getPendingRequests: async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/requests/pending-requests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });

      return handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  },


};
