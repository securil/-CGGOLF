import React, { useState } from 'react';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ActivityVideos = () => {
  // 샘플 비디오 데이터 (실제 환경에서는 DataContext에서 가져오거나 API로 로드)
  const videos = [
    {
      id: 1,
      title: '2024 여름 골프 대회 하이라이트',
      thumbnail: 'https://images.unsplash.com/photo-1608138278545-366680accc66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: '지난 6월에 진행된 여름 특별 대회의 흥미진진한 순간들을 담았습니다.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // 예시 URL
    },
    {
      id: 2,
      title: '골프 스윙 팁 & 트릭',
      thumbnail: 'https://images.unsplash.com/photo-1622833135011-928e5433faba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80',
      description: '모임 멤버들이 공유하는 실전에서 유용한 스윙 팁과 트릭을 알아보세요.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // 예시 URL
    },
    {
      id: 3,
      title: '신입회원 환영 라운딩',
      thumbnail: 'https://images.unsplash.com/photo-1580236045809-bb01b37e8784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: '신입회원들을 환영하는 특별 라운딩 행사의 즐거운 순간들입니다.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // 예시 URL
    }
  ];

  const [activeVideo, setActiveVideo] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // 비디오 이동 함수
  const nextVideo = () => {
    setActiveVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setActiveVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  // 현재 비디오
  const currentVideo = videos[activeVideo];

  return (
    <section id="activity-videos" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">활동 영상</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            우리 모임의 다양한 활동과 이벤트를 영상으로 만나보세요.
            즐거운 추억과, 유용한 팁을 공유합니다.
          </p>
        </div>

        <div className="mt-12 reveal">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            {/* 메인 비디오 섬네일 */}
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
              {/* 플레이 버튼 */}
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald bg-opacity-80 text-white transition-transform hover:transform hover:scale-110">
                  <FaPlay size={30} />
                </div>
              </div>
              {/* 내비게이션 버튼 */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button 
                  onClick={prevVideo}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-r-md hover:bg-opacity-70 transition-all"
                >
                  <FaChevronLeft size={24} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  onClick={nextVideo}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-l-md hover:bg-opacity-70 transition-all"
                >
                  <FaChevronRight size={24} />
                </button>
              </div>
            </div>
            
            {/* 비디오 정보 */}
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{currentVideo.title}</h3>
              <p className="text-gray-300">{currentVideo.description}</p>
            </div>
          </div>

          {/* 비디오 썸네일 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className={`
                  cursor-pointer rounded-lg overflow-hidden shadow-md 
                  transition-all duration-300 hover:shadow-lg 
                  ${activeVideo === index ? 'ring-2 ring-emerald' : ''}
                `}
                onClick={() => setActiveVideo(index)}
              >
                <div className="relative aspect-w-16 aspect-h-9">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <FaPlay className="text-white opacity-80" />
                  </div>
                </div>
                <div className="p-3 bg-gray-100">
                  <h4 className="font-semibold text-navy truncate">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 비디오 모달 */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">{currentVideo.title}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white bg-red-600 px-4 py-2 rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivityVideos;
