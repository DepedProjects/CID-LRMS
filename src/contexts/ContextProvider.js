import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export function ContextProvider({ children }) {
  const storedAuth = localStorage.getItem("auth");

  const [auth, setAuth] = useState(JSON.parse(storedAuth) || null);

  const [page, setPage] = useState("");

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
      page,
      setPage,
    }),
    [auth, setAuth, page, setPage]
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
