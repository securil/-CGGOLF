import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// 페이지 컴포넌트 
import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Registration from './pages/Registration';

// 공통 컴포넌트
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  // 페이지 이동시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 스크롤 애니메이션 적용
  useEffect(() => {
    // 요소가 보이는지 확인하는 함수
    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', reveal);
    // 초기 실행
    reveal();
    
    // 클린업
    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* 인증된 사용자만 접근 가능한 라우트 */}
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/registration" element={<Registration />} />
            </>
          )}
          
          {/* 관리자만 접근 가능한 라우트 */}
          {isAdmin && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
          
          {/* 없는 페이지는 홈으로 리다이렉트 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
