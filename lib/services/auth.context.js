import React, {useState, createContext, useEffect, useMemo, useContext} from "react";
import {auth} from "../firebase";
import LogIn from "../../components/adminUI/auth/Login";
import VerifyEmail from "../../components/adminUI/auth/VerifyEmail";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
      console.log("user> ", user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * render given component
   * @param {object} children
   */
  const renderAuth = (children) => <div className={"AuthContainer"}>
    {children}
  </div>;


  // if not authenticated, render Login
  if (!user) return renderAuth(<LogIn/>);

  // if email not verifid, render VerifyEmail
  const hasPassword = user && user.providerData.find((provider) => provider.providerId === "password");
  if (user && hasPassword && !user.emailVerified) return renderAuth(<VerifyEmail />);

  return <AuthContext.Provider value={{
    user,
    setUser,
    isLoding,
    setIsLoading,
    error,
    setError}}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
