import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 로고 및 간단 소개 */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-emerald">G</span>olf <span className="text-emerald">C</span>lub
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              우리 골프 모임은 함께 즐기고 성장하는 건전한 골프 문화를 만들어갑니다.
              매월 정기 라운딩과 다양한 이벤트를 통해 골프를 사랑하는 분들과 교류하세요.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold transition-colors duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-xl font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-emerald transition-colors duration-300">
                  홈
                </Link>
              </li>
              <li>
                <a href="#schedule" className="text-gray-300 hover:text-emerald transition-colors duration-300">
                  2025년 스케줄
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-emerald transition-colors duration-300">
                  갤러리
                </a>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-emerald transition-colors duration-300">
                  로그인
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-xl font-bold mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="mr-2 text-emerald" />
                <span>010-1234-5678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-emerald" />
                <span>contact@golfclub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Golf Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
