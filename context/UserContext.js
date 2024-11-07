// context/UserContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try{
      const savedUserInfo = localStorage.getItem('userInfo');
      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo));
      } 
    }catch (error) {
        console.error('Error parsing user info:', error);
    } finally {
        setLoading(false);
    }
  }, []);
    
  useEffect(() => {
    if (mounted && !loading && userInfo !== null) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else if (mounted && !loading && userInfo === null) {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo, loading, mounted]);
  
  if (!mounted) {
    return <UserContext.Provider value={{userInfo: null, setUserInfo, loading: true}}>{children}</UserContext.Provider>
  }

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo,loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}