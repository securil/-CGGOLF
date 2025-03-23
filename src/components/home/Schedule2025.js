import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTrophy, FaInfoCircle } from 'react-icons/fa';
import Button from '../common/Button';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const Schedule2025 = () => {
  const { events } = useData();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // 2025년 예정된 이벤트 데이터 (실제론 events에서 필터링해서 사용)
  const scheduledEvents = [
    {
      id: 1,
      month: '3',
      date: '2025-03-15',
      title: '3월 월례회',
      location: '레이크사이드 CC',
      type: 'monthly',
      description: '2025년 첫 월례회'
    },
    {
      id: 2,
      month: '4',
      date: '2025-04-19',
      title: '4월 월례회',
      location: '파인밸리 CC',
      type: 'monthly',
      description: '봄 시즌 특별대회'
    },
    {
      id: 3,
      month: '5',
      date: '2025-05-17',
      title: '5월 월례회',
      location: '블루원 디아너스 CC',
      type: 'monthly',
      description: '5월 가정의 달 기념 이벤트'
    },
    {
      id: 4,
      month: '6',
      date: '2025-06-21',
      title: '6월 월례회',
      location: '남서울 CC',
      type: 'monthly',
      description: '여름 시즌 개막전'
    },
    {
      id: 5,
      month: '7',
      date: '2025-07-05',
      title: '여름 특별 대회',
      location: '해슬리 나인브릿지',
      type: 'special',
      description: '여름 맞이 특별 이벤트 대회'
    },
    {
      id: 6,
      month: '8',
      date: '2025-08-16',
      title: '8월 월례회',
      location: '세인트 포 CC',
      type: 'monthly',
      description: '무더위를 날려버리는 8월 정기 모임'
    },
    {
      id: 7,
      month: '9',
      date: '2025-09-20',
      title: '9월 월례회',
      location: '이스트밸리 CC',
      type: 'monthly',
      description: '가을 시즌 개막전'
    },
    {
      id: 8,
      month: '10',
      date: '2025-10-18',
      title: '10월 월례회',
      location: '남촌 CC',
      type: 'monthly',
      description: '가을 단풍 시즌 라운딩'
    },
    {
      id: 9,
      month: '11',
      date: '2025-11-08',
      title: '연말 챔피언십',
      location: '잭 니클라우스 GC',
      type: 'special',
      description: '2025 연말 챔피언십 대회'
    },
    {
      id: 10,
      month: '12',
      date: '2025-12-13',
      title: '송년회',
      location: '그랜드 호텔',
      type: 'event',
      description: '2025년 활동 결산 및 송년 모임'
    }
  ];

  // 필터링 된 이벤트
  const filteredEvents = activeTab === 'all' 
    ? scheduledEvents 
    : scheduledEvents.filter(event => event.type === activeTab);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <section id="schedule" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">2025년 스케줄</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            2025년 한 해 동안 진행될 정기 모임과 특별 이벤트 일정입니다.
            매월 셋째 주 토요일에 정기 월례회가 진행됩니다.
          </p>
        </div>

        {/* 탭 필터 */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          <Button 
            variant={activeTab === 'all' ? 'primary' : 'ghost'} 
            onClick={() => setActiveTab('all')}
          >
            전체 일정
          </Button>
          <Button 
            variant={activeTab === 'monthly' ? 'primary' : 'ghost'} 
            onClick={() => setActiveTab('monthly')}
          >
            월례회
          </Button>
          <Button 
            variant={activeTab === 'special' ? 'primary' : 'ghost'} 
            onClick={() => setActiveTab('special')}
          >
            특별 대회
          </Button>
          <Button 
            variant={activeTab === 'event' ? 'primary' : 'ghost'} 
            onClick={() => setActiveTab('event')}
          >
            기타 행사
          </Button>
        </div>

        {/* 일정 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="reveal bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* 월 표시 */}
              <div className="bg-navy text-white text-center py-3">
                <span className="text-3xl font-bold">{event.month}</span>
                <span className="text-xl">월</span>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-navy mb-3">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2 text-emerald" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-emerald" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-start text-gray-600">
                    <FaInfoCircle className="mr-2 text-emerald mt-1" />
                    <span>{event.description}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  {isAuthenticated ? (
                    <Button to="/registration" variant="outline" className="w-full">
                      참가 신청
                    </Button>
                  ) : (
                    <Button to="/login" variant="outline" className="w-full">
                      로그인 후 신청 가능
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 일정 다운로드 버튼 */}
        <div className="text-center mt-12">
          <Button variant="secondary">
            <FaCalendarAlt className="mr-2" /> 전체 일정 다운로드
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Schedule2025;
