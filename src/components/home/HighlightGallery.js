import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useData } from '../../context/DataContext';

const HighlightGallery = () => {
  const { gallery } = useData();
  const [selectedImage, setSelectedImage] = useState(null);
  
  // 샘플 갤러리 데이터 (실제로는 gallery 데이터를 사용)
  const images = [
    {
      id: 1,
      title: '2024 송년회',
      description: '2024년을 마무리하는 송년회 현장입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1577639668284-7d244775d1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80',
      date: '2024-12-20'
    },
    {
      id: 2,
      title: '가을 라운딩',
      description: '단풍이 아름다운 가을 라운딩 현장입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1591491563481-edb43c515e8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: '2024-10-15'
    },
    {
      id: 3,
      title: '여름 특별대회',
      description: '무더위를 날려버린 특별대회 우승자 시상식입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: '2024-07-20'
    },
    {
      id: 4,
      title: '봄 정기 라운딩',
      description: '봄기운이 완연한 4월 정기 라운딩 단체사진입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1535132011086-b8818f016104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: '2024-04-20'
    },
    {
      id: 5,
      title: '신입회원 환영회',
      description: '2024년 신입회원을 환영하는 자리였습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1623226294133-96db4be3c8a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: '2024-03-15'
    },
    {
      id: 6,
      title: '윈터 골프 캠프',
      description: '겨울에도 멈추지 않는 열정, 윈터 골프 캠프입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1583822815769-2e5bb7228329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: '2024-01-20'
    }
  ];

  // 이미지 클릭 핸들러
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">하이라이트 갤러리</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            우리 모임의 다양한 활동과 이벤트 현장을 사진으로 만나보세요.
            소중한 추억이 담긴 순간들입니다.
          </p>
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {images.map((image) => (
            <div 
              key={image.id}
              className="reveal overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative group">
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaSearch className="text-white text-3xl" />
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold text-navy truncate">{image.title}</h3>
                <p className="text-sm text-gray-600">{formatDate(image.date)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 더 많은 사진 버튼 */}
        <div className="text-center mt-12">
          <button className="btn-outline">
            더 많은 사진 보기
          </button>
        </div>

        {/* 이미지 모달 */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={handleCloseModal}
          >
            <div 
              className="max-w-5xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                <button 
                  className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-300"
                  onClick={handleCloseModal}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-navy mb-2">{selectedImage.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{formatDate(selectedImage.date)}</p>
                <p className="text-gray-700">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HighlightGallery;
