import React from 'react';
import AccessRequestForm from '../pages/AccessRequestForm';
import PendingRequests from '../pages/PendingRequests';

const AccessRequestRoute = () => {
  return (
    <AccessRequestForm />
  );
};

const PendingRequestsRoute = () => {
  return (
    <PendingRequests />
  );
};


export { AccessRequestRoute, PendingRequestsRoute };