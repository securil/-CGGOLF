import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
        }}
      />

      {/* 컨텐츠 */}
      <div className="container mx-auto px-4 z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            함께하는 <span className="text-emerald">골프</span>, 
            <br />함께 나누는 <span className="text-gold">즐거움</span>
          </h1>
          
          <p className="text-xl mb-8 text-gray-200">
            매월 정기 라운딩과 다양한 이벤트로 골프를 더 즐겁게 즐겨보세요.
            서로의 기술을 나누고 친목을 다지는 모임에 여러분을 초대합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
              size="lg" 
              href="#schedule"
            >
              일정 확인하기
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              to="/login"
              className="text-white border-white hover:bg-white hover:text-navy"
            >
              회원 로그인
            </Button>
          </div>
        </motion.div>
      </div>

      {/* 스크롤 다운 표시 */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
          <span className="text-sm mt-2 block">스크롤 다운</span>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
