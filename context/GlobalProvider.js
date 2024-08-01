import React, {createContext, useContext, useEffect, useState} from "react";
import {getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(null); // Mulai dengan null
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then((res) => {
        if (isMounted) {
          if (res) {
            setIsLogged(true);
            setUser(res);
          } else {
            setIsLogged(false);
            setUser(null);
          }
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log(error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
