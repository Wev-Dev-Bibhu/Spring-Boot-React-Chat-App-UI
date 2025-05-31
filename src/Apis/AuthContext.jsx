import React, { createContext, useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser]
  ); useContext(AuthContext)

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
