import React, { useState } from 'react';
import '../styles/auth.css';
import { toast } from 'react-toastify';
import { accessService } from '../services/accessService';

const accessOptions = ['Read', 'Write', 'Admin'];

const AccessRequestForm = () => {
  const [formData, setFormData] = useState({
    software: '',
    accessTypes: [],
    reason: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccessTypeAdd = (type) => {
    if (!formData.accessTypes.includes(type)) {
      setFormData(prev => ({
        ...prev,
        accessTypes: [...prev.accessTypes, type],
      }));
    }
  };

  const handleAccessTypeRemove = (type) => {
    setFormData(prev => ({
      ...prev,
      accessTypes: prev.accessTypes.filter(t => t !== type),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await accessService.requestAccess(formData);
      toast.success('Access request submitted!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: '#10B981',
          color: 'white',
        }
      });
      setFormData({ software: '', accessTypes: [], reason: '' });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to request access.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: '#EF4444',
          color: 'white',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-heading">Request Access</h2>

        <input
          type="text"
          name="software"
          placeholder="Enter Software Name"
          value={formData.software}
          onChange={handleChange}
          required
          className="auth-input"
          disabled={loading}
        />

        <div className="auth-input">
          <label>Access Types:</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {accessOptions.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handleAccessTypeAdd(type)}
                disabled={formData.accessTypes.includes(type)}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #007bff',
                  backgroundColor: formData.accessTypes.includes(type) ? '#ccc' : '#fff',
                  color: '#007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {formData.accessTypes.map(type => (
              <span
                key={type}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {type}
                <button
                  type="button"
                  onClick={() => handleAccessTypeRemove(type)}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <textarea
          name="reason"
          placeholder="Reason for Access"
          value={formData.reason}
          onChange={handleChange}
          required
          className="auth-input"
          rows="3"
          disabled={loading}
        />

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Request Access'}
        </button>
      </form>
    </div>
  );
};

export default AccessRequestForm;
