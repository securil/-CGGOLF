import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navigation from './Navigation';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // 페이지 변경 시 모바일 메뉴 닫기
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* 로고 */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-navy">
            <span className="text-emerald">G</span>olf <span className="text-emerald">C</span>lub
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center space-x-8">
          <Navigation />

          {/* 인증 상태에 따른 버튼 표시 */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-navy font-medium">
                <FaUser className="inline-block mr-1" /> {currentUser?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <FaSignOutAlt className="mr-1" /> 로그아웃
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              로그인
            </Link>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <button
            className="text-navy focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Navigation mobile={true} />
            
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <span className="text-navy font-medium">
                  <FaUser className="inline-block mr-1" /> {currentUser?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <FaSignOutAlt className="mr-1" /> 로그아웃
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-center mt-2">
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
