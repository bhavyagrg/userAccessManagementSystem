import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { accessService } from '../services/accessService';
import '../styles/pendingRequests.css';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const data = await accessService.getPendingRequests();
      setRequests(data.requests);
      console.log(data.requests[0])
      console.log(typeof data.requests)
    } catch (error) {
      toast.error('Failed to load pending requests', {
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

  const handleStatusChange = async (requestId, status) => {
    try {
      await accessService.updateRequestStatus(requestId, status);
      toast.success(`Request ${status === 'accepted' ? 'accepted' : 'rejected'} successfully`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: status === 'accepted' ? '#10B981' : '#EF4444',
          color: 'white',
        }
      });
      fetchPendingRequests();
    } catch (error) {
      toast.error('Failed to update request status', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
        style: {
          backgroundColor: '#EF4444',
          color: 'white',
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="pending-requests-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="pending-requests-container">
      <h2>Pending Access Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests at the moment.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Software</th>
              <th>Access Level</th>
              <th>Reason</th>
              <th>Requested By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.softwareName}</td>
                <td>{request.accessLevel}</td>
                <td>{request.reason}</td>
                <td>{request.requestedBy}</td>
                <td>
                  <div className="status-toggle">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={request.status === 'accepted'}
                        onChange={(e) =>
                          handleStatusChange(request.id, e.target.checked ? 'accepted' : 'rejected')
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </td>
              </tr>
            ))} */}

            
              <tr key="1">
                <td>1234</td>
                <td>bhavya</td>
                <td>Read</td>
                <td>dcwqvrf3g</td>
                <td>verqg</td>
                <td>
                  <div className="status-toggle">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={(e) =>
                          handleStatusChange('rejected')
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </td>
              </tr>
            ))
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;
