import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Login = () => {
  const [loginType, setLoginType] = useState('member'); // 'member' or 'admin'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      let success;
      
      if (loginType === 'member') {
        // 회원 로그인
        if (!name || !phone) {
          throw new Error('이름과 전화번호를 모두 입력하세요.');
        }
        
        success = await login(name, phone);
      } else {
        // 관리자 로그인
        if (!adminId || !adminPassword) {
          throw new Error('관리자 ID와 비밀번호를 모두 입력하세요.');
        }
        
        success = login(adminId, adminPassword);
      }
      
      if (success) {
        // 로그인 성공 시 메인 페이지로 이동
        navigate('/');
      } else {
        // 로그인 실패
        if (loginType === 'member') {
          throw new Error('회원 정보를 찾을 수 없습니다.');
        } else {
          throw new Error('관리자 ID 또는 비밀번호가 잘못되었습니다.');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <Link to="/" className="text-emerald hover:text-navy flex items-center mb-6">
            <FaArrowLeft className="mr-2" /> 홈으로 돌아가기
          </Link>
          
          <h2 className="text-center text-3xl font-bold text-navy">
            {loginType === 'member' ? '회원 로그인' : '관리자 로그인'}
          </h2>
          <p className="mt-2 text-center text-gray-600">
            골프 모임 웹사이트에 오신 것을 환영합니다.
          </p>
        </div>
        
        {/* 로그인 유형 선택 토글 */}
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-3 ${
              loginType === 'member'
                ? 'bg-emerald text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } transition-colors duration-200`}
            onClick={() => setLoginType('member')}
          >
            회원 로그인
          </button>
          <button
            type="button"
            className={`flex-1 py-3 ${
              loginType === 'admin'
                ? 'bg-navy text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } transition-colors duration-200`}
            onClick={() => setLoginType('admin')}
          >
            관리자 로그인
          </button>
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
          >
            {error}
          </motion.div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loginType === 'member' ? (
            // 회원 로그인 폼
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald focus:border-emerald"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호 뒤 4자리
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    maxLength={4}
                    pattern="[0-9]{4}"
                    className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald focus:border-emerald"
                    placeholder="1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  전화번호 뒤 4자리만 입력하세요. 예) 1234
                </p>
              </div>
            </>
          ) : (
            // 관리자 로그인 폼
            <>
              <div>
                <label htmlFor="adminId" className="block text-sm font-medium text-gray-700 mb-1">
                  관리자 ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="adminId"
                    name="adminId"
                    type="text"
                    required
                    className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy focus:border-navy"
                    placeholder="admin"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  관리자 비밀번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    required
                    className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy focus:border-navy"
                    placeholder="비밀번호"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          
          <div>
            <Button
              type="submit"
              variant={loginType === 'member' ? 'primary' : 'secondary'}
              className="w-full flex justify-center py-3"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </form>
        
        {loginType === 'member' && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              회원이 아니신가요? 회장 또는 총무에게 문의하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
