import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateSoftware from "./pages/CreateSoftware";
import RequestAccess from "./pages/RequestAccess";
import PendingRequests from "./pages/PendingRequests";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/create-software"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <CreateSoftware />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-access"
        element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <RequestAccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pending-requests"
        element={
          <ProtectedRoute allowedRoles={["Manager"]}>
            <PendingRequests />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
