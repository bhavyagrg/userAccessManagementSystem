import React from 'react';
import CreateSoftwareForm from '../pages/CreateSoftwareForm';
import SoftwareList from '../pages/SoftwareList';

const CreateSoftwareRoute = () => {
  return (
    <CreateSoftwareForm />
  );
};

const SoftwareListRoute = () => {
    return (
        <SoftwareList />
    );
};

export { CreateSoftwareRoute, SoftwareListRoute };