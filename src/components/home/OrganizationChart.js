import React from 'react';
import { FaUser, FaUserTie, FaUsers } from 'react-icons/fa';

const OrganizationChart = () => {
  // 실제 환경에서는 API나 Context에서 데이터를 가져오세요
  const organization = {
    president: {
      name: '홍길동',
      position: '회장',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80',
      intro: '2023년부터 현재까지 회장직을 맡고 있으며, 모임의 발전과 회원들의 친목 도모를 위해 노력하고 있습니다.'
    },
    vicePresidents: [
      {
        name: '김철수',
        position: '부회장',
        area: '총무',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      },
      {
        name: '이영희',
        position: '부회장',
        area: '재정',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
      }
    ],
    directors: [
      {
        name: '박민수',
        position: '이사',
        area: '경기',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
      },
      {
        name: '정수진',
        position: '이사',
        area: '행사',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80'
      },
      {
        name: '강동원',
        position: '이사',
        area: '홍보',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
      },
      {
        name: '최지현',
        position: '이사',
        area: '회원관리',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80'
      }
    ]
  };

  return (
    <section id="organization" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">조직도</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            우리 골프 모임을 이끌어가는 임원진을 소개합니다.
            회원들의 즐거운 골프 라이프를 위해 항상 노력하고 있습니다.
          </p>
        </div>

        <div className="mt-12">
          {/* 회장 */}
          <div className="reveal mb-16">
            <div className="max-w-md mx-auto text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-navy shadow-lg">
                  <img 
                    src={organization.president.image} 
                    alt={organization.president.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -right-2 -bottom-2 bg-gold text-white rounded-full p-2">
                  <FaUserTie size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy">{organization.president.name}</h3>
              <p className="text-lg text-emerald font-medium">{organization.president.position}</p>
              <p className="mt-3 text-gray-600">{organization.president.intro}</p>
            </div>
          </div>

          {/* 부회장 */}
          <div className="reveal mb-16">
            <h3 className="text-xl font-bold text-navy text-center mb-8">부회장단</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {organization.vicePresidents.map((vp, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mr-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald">
                        <img 
                          src={vp.image} 
                          alt={vp.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -right-2 -bottom-2 bg-emerald text-white rounded-full p-1.5">
                        <FaUser size={14} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy">{vp.name}</h4>
                    <p className="text-emerald font-medium">{vp.position}</p>
                    <p className="text-sm text-gray-600">담당: {vp.area}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 이사진 */}
          <div className="reveal">
            <h3 className="text-xl font-bold text-navy text-center mb-8">이사진</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {organization.directors.map((director, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="p-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-emerald mb-4">
                      <img 
                        src={director.image} 
                        alt={director.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-navy">{director.name}</h4>
                    <p className="text-emerald font-medium">{director.position}</p>
                    <p className="text-sm text-gray-600">담당: {director.area}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
