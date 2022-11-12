import React, { createContext, useState, useContext } from "react";

const Authentication = createContext();

const AuthenticationContext = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  return (
    <Authentication.Provider value={{ isLoggedIn, logIn, logOut }}>
      {props.children}
    </Authentication.Provider>
  );
};

export default AuthenticationContext;

export const AuthContext = () => {
  return useContext(Authentication);
};
