import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { accessService } from '../services/accessService';
import '../styles/pendingRequests.css';

const RequestStatus = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
}

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const data = await accessService.getPendingRequests();
      setRequests(data.requests);
    } catch (error) {
      toast.error('Failed to load pending requests', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    try {
      await accessService.updateRequestStatus(requestId, status);

      status === RequestStatus.APPROVED ? 
      toast.success(`Request approved ccessfully`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      }) :
      toast.warning(`Request rejected successfully`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      })
      fetchPendingRequests();
    } catch (error) {
      toast.error('Failed to update request status', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
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
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.software.name}</td>
                <td>{request.accessType}</td>
                <td>{request.reason}</td>
                <td>{request.user.username}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className={`status-button accepted`}
                      onClick={() => handleStatusChange(request.id, 'Approved')}
                    >
                      Accept
                    </button>
                    <button
                      className={`status-button rejected`}
                      onClick={() => handleStatusChange(request.id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;
