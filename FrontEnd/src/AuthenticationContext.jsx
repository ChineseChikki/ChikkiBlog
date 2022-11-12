import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";

const Authentication = createContext();

const AuthenticationContext = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAuth") || false
  );
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  useEffect(() => {
    localStorage.setItem("isAuth", isLoggedIn);
  }, [isLoggedIn]);
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
