import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const BACKEND_URLS = {
  local: "http://localhost:5000",
  render: "https://react-chat-app-node-js-server.onrender.com",
  aws: "https://your-aws-endpoint.amazonaws.com",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getInitialBackend = () => {
    const saved = localStorage.getItem("selectedBackend");
    const defaultBackend = window.location.hostname === "localhost" ? "local" : "render";
    return saved || defaultBackend;
  };

  const [backendKey, setBackendKey] = useState(getInitialBackend());
  const [apiUrl, setApiUrl] = useState(BACKEND_URLS[getInitialBackend()]);

  const changeBackend = (key) => {
    localStorage.setItem("selectedBackend", key);
    setBackendKey(key);
    setApiUrl(BACKEND_URLS[key]);
  };

  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser,
    apiUrl,
    backendKey,
    changeBackend,
  }), [currentUser, apiUrl, backendKey]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
