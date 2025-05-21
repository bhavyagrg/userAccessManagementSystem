import React, { useState } from 'react';
import '../styles/auth.css';
import { toast } from 'react-toastify';
import { softwareService } from '../services/softwareService';

const accessOptions = ['Read', 'Write', 'Admin'];

const CreateSoftwareForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accessLevels: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccessLevelAdd = (level) => {
    if (!formData.accessLevels.includes(level)) {
      setFormData(prev => ({
        ...prev,
        accessLevels: [...prev.accessLevels, level],
      }));
    }
  };

  const handleAccessLevelRemove = (level) => {
    setFormData(prev => ({
      ...prev,
      accessLevels: prev.accessLevels.filter(l => l !== level),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await softwareService.createSoftware(formData);
      toast.success('Software created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: '#10B981',
          color: 'white',
        }
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create software.';
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
        <h2 className="auth-heading">Create Software</h2>

        <input
          type="text"
          name="name"
          placeholder="Software Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="auth-input"
          disabled={loading}
        />

        <textarea
          name="description"
          placeholder="Software Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="auth-input"
          rows="3"
          disabled={loading}
        />

        <div className="auth-input">
          <label>Access Levels:</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {accessOptions.map(level => (
              <button
                key={level}
                type="button"
                onClick={() => handleAccessLevelAdd(level)}
                disabled={formData.accessLevels.includes(level)}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #007bff',
                  backgroundColor: formData.accessLevels.includes(level) ? '#ccc' : '#fff',
                  color: '#007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {level}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {formData.accessLevels.map(level => (
              <span
                key={level}
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
                {level}
                <button
                  type="button"
                  onClick={() => handleAccessLevelRemove(level)}
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

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Software'}
        </button>
      </form>
    </div>
  );
};

export default CreateSoftwareForm;
