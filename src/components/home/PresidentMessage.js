import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const PresidentMessage = () => {
  return (
    <section id="president-message" className="py-20 bg-navy text-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80" 
              alt="회장님 사진" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gold shadow-lg"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-6">회장 인사말</h2>
          
          <div className="relative">
            <FaQuoteLeft className="absolute -top-6 -left-2 text-emerald opacity-30 text-4xl" />
            
            <p className="text-lg leading-relaxed mb-6">
              안녕하세요, 골프 모임 회장 홍길동입니다. 우리 모임은 1984년 창립 이래로 40년이 넘는 시간 동안 
              골프의 즐거움을 함께 나누며 깊은 우정을 쌓아왔습니다. 골프는 단순한 스포츠가 아닌, 
              서로를 이해하고 배려하며 성장하는 소중한 시간입니다.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              2025년에도 우리 모임은 더 많은 회원들이 함께 즐기고 성장할 수 있는 다양한 프로그램을 준비했습니다. 
              초보자부터 숙련자까지 모두가 편안하게 참여할 수 있는 환경을 만들기 위해 노력하고 있으니, 
              언제든지 부담 없이 참여해 주시기 바랍니다.
            </p>
            
            <p className="text-lg leading-relaxed">
              골프장에서 만나는 그 순간이 우리 모두에게 행복한 추억이 되길 바랍니다. 
              항상 건강하시고 멋진 샷 하시길 기원합니다.
            </p>
            
            <FaQuoteRight className="absolute -bottom-6 -right-2 text-emerald opacity-30 text-4xl" />
          </div>
          
          <div className="mt-8">
            <p className="text-xl font-semibold text-gold">홍길동</p>
            <p className="text-emerald">골프 모임 회장</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresidentMessage;
