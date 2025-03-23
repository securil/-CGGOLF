import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 확인
  useEffect(() => {
    const checkLoggedIn = () => {
      const storedUser = localStorage.getItem('currentUser');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsAdmin(user.isAdmin === true);
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // 로그인 처리
  const login = (name, phone) => {
    // 관리자 로그인
    if (name === 'admin' && phone === '132400admin') {
      const adminUser = {
        name: 'admin',
        isAdmin: true
      };
      
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      setCurrentUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      
      return true;
    }
    
    // 일반 회원 로그인 (회원 데이터를 fetch해서 비교하는 로직 필요)
    // 지금은 테스트를 위해 간단히 회원 찾는 로직만 구현
    return fetch('/data/members.json')
      .then(response => response.json())
      .then(data => {
        const lastFourDigits = phone.slice(-4);
        const user = data.members.find(
          member => member.name === name && member.phone.slice(-4) === lastFourDigits
        );
        
        if (user) {
          const userData = {
            name: user.name,
            cohort: user.cohort,
            isAdmin: false
          };
          
          localStorage.setItem('currentUser', JSON.stringify(userData));
          setCurrentUser(userData);
          setIsAuthenticated(true);
          setIsAdmin(false);
          
          return true;
        }
        
        return false;
      })
      .catch(error => {
        console.error('로그인 에러:', error);
        return false;
      });
  };

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
