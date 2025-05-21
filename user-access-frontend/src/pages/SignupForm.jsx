import React, { useState } from 'react';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await authService.login(formData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Signup successful! Redirecting to login...', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: '#10B981',
          color: 'white'
        }
      });
      switch(userData.role){
        case 'Admin':
          navigate('/create-software');
          break;
        case 'Employee':
          navigate('/request-access');
          break;
        case 'Manager':
          navigate('/pending-requests');
          break;
      }
    } catch (err) {
      let errorMessage = 'Signup failed. Please try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: '#EF4444',
          color: 'white'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-heading">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="signup-input"
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="signup-input"
          disabled={loading}
        />

        <button
          type="submit"
          className="signup-button"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
