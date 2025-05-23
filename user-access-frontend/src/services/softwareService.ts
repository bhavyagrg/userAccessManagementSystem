export const API_URL = 'http://localhost:3000/api';

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

export const softwareService = {
  createSoftware: async (softwareData: {
    name: string;
    description: string;
    accessLevels: string[];
  }) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/software`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(softwareData),
      });

      return handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  getAllSoftware: async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/software/list-softwares`, {
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
  }
};
