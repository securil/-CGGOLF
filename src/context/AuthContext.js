// src/context/AuthContext.js 업데이트
// 기존 members.json 구조에 맞게 로그인 로직 수정

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
  const login = async (name, phone) => {
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
    
    // 일반 회원 로그인
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
      const data = await response.json();
      
      // 전화번호 뒷자리 추출 및 비교
      // 현재 JSON 구조는 "010-0000-0000" 형식이므로 마지막 4자리 추출
      let lastFourDigits = phone;
      // 이미 4자리만 입력한 경우와 전체 번호를 입력한 경우 모두 처리
      if (phone.length > 4) {
        lastFourDigits = phone.replace(/-/g, '').slice(-4);
      }
      
      const user = data.members.find(
        member => member.name === name && 
        (member.phone.replace(/-/g, '').slice(-4) === lastFourDigits || member.phone === phone)
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
    } catch (error) {
      console.error('로그인 에러:', error);
      return false;
    }
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
