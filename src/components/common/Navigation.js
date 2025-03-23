import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navigation = ({ mobile = false }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  // 현재 활성화된 링크 확인
  const isActive = (path) => {
    return location.pathname === path;
  };

  // 네비게이션 링크 스타일
  const linkClass = mobile
    ? 'block py-2 hover:text-emerald transition-colors duration-200'
    : 'hover:text-emerald transition-colors duration-200';

  // 활성화된 링크 스타일
  const activeLinkClass = mobile
    ? 'block py-2 text-emerald font-semibold'
    : 'text-emerald font-semibold';

  return (
    <nav className={mobile ? 'flex flex-col' : 'flex items-center space-x-8'}>
      <Link
        to="/"
        className={isActive('/') ? activeLinkClass : linkClass}
      >
        홈
      </Link>

      {/* 인증된 사용자만 볼 수 있는 링크 */}
      {isAuthenticated && (
        <>
          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? activeLinkClass : linkClass}
          >
            마이페이지
          </Link>
          
          <Link
            to="/registration"
            className={isActive('/registration') ? activeLinkClass : linkClass}
          >
            참가신청
          </Link>
        </>
      )}

      {/* 관리자만 볼 수 있는 링크 */}
      {isAdmin && (
        <Link
          to="/admin"
          className={isActive('/admin') ? activeLinkClass : linkClass}
        >
          관리자
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
