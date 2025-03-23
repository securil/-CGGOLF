import React from 'react';
import { useData } from '../../context/DataContext';
import { FaGolfBall, FaUsers, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const ClubIntro = () => {
  const { members, getMemberStats } = useData();
  
  // 회원 통계 정보
  const stats = getMemberStats();
  
  // 소개 카드 정보
  const infoCards = [
    {
      icon: <FaUsers className="text-emerald text-4xl" />,
      title: '회원 수',
      value: stats.totalMembers || 0,
      description: '다양한 연령대와 경력의 골프 애호가들'
    },
    {
      icon: <FaGolfBall className="text-emerald text-4xl" />,
      title: '평균 핸디캡',
      value: '15.8',
      description: '초보부터 고수까지 모두 함께하는 모임'
    },
    {
      icon: <FaCalendarAlt className="text-emerald text-4xl" />,
      title: '연간 정기 모임',
      value: '12+',
      description: '매월 정기 라운딩 및 특별 이벤트'
    },
    {
      icon: <FaTrophy className="text-emerald text-4xl" />,
      title: '창립 연도',
      value: '1984',
      description: '40년 이상의 역사와 전통'
    }
  ];

  return (
    <section id="intro" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">모임 소개</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            우리 골프 모임은 1984년에 창립되어 40년이 넘는 역사와 전통을 가진 모임입니다.
            함께 골프를 즐기며 친목을 다지고, 서로의 기술을 향상시키는 것을 목표로 합니다.
          </p>
        </div>

        {/* 정보 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {infoCards.map((card, index) => (
            <div 
              key={index} 
              className="reveal bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">{card.title}</h3>
              <p className="text-3xl font-semibold text-gold mb-3">{card.value}</p>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* 모임 철학 */}
        <div className="mt-16 reveal">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="골프 모임" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-navy mb-4">우리의 철학</h3>
                <p className="text-gray-600 mb-4">
                  우리 모임은 골프의 본질인 예의와 매너를 중시하며, 건전한 골프 문화를 만들어 나가고 있습니다.
                  경쟁보다는 함께 즐기고 성장하는 것을 추구하며, 모든 회원이 편안하게 참여할 수 있는 환경을 조성합니다.
                </p>
                <p className="text-gray-600">
                  40년이 넘는 시간 동안 쌓아온 노하우와 전통을 바탕으로, 세대를 아우르는 소통과 화합의 장이 되고자 합니다.
                  골프를 통해 신체적 건강뿐만 아니라 정신적 풍요로움을 함께 나누는 것이 우리의 목표입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubIntro;
