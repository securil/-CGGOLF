// src/components/dashboard/ProfileSummary.js
import React from 'react';

const ProfileSummary = ({ userData }) => {
  if (!userData) return null;
  
  // 기본 핸디캡 값 (데이터가 없는 경우)
  const handicap = userData.handicap || '정보 없음';
  
  // 최근 스코어 계산 (가장 최근의 3개 스코어 평균)
  const getRecentAverage = () => {
    if (!userData.scores || userData.scores.length === 0) {
      return '정보 없음';
    }
    
    // 날짜로 정렬
    const sortedScores = [...userData.scores].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    // 최근 3개 스코어 (또는 있는 만큼)
    const recentScores = sortedScores.slice(0, 3);
    
    if (recentScores.length === 0) return '정보 없음';
    
    // 평균 계산
    const sum = recentScores.reduce((total, record) => total + record.score, 0);
    return (sum / recentScores.length).toFixed(1);
  };
  
  // 참여 횟수
  const participationCount = userData.scores ? userData.scores.length : 0;
  
  // 최근 참여일
  const getLastParticipation = () => {
    if (!userData.scores || userData.scores.length === 0) {
      return '참여 기록 없음';
    }
    
    const sortedScores = [...userData.scores].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    const lastDate = new Date(sortedScores[0].date);
    return lastDate.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 - 기본 이미지 */}
        <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <span className="text-4xl text-emerald-600">{userData.name.charAt(0)}</span>
        </div>
        
        {/* 회원명 */}
        <h2 className="text-2xl font-bold text-navy-800 mb-1">{userData.name}</h2>
        
        {/* 기수 */}
        <p className="text-md text-gray-600 mb-4">{userData.cohort}기</p>
        
        {/* 구분선 */}
        <div className="w-full border-t border-gray-200 my-4"></div>
        
        {/* 통계 정보 */}
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">핸디캡</span>
            <span className="font-semibold">{handicap}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">최근 평균 스코어</span>
            <span className="font-semibold">{getRecentAverage()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">참여 횟수</span>
            <span className="font-semibold">{participationCount}회</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">최근 참여일</span>
            <span className="font-semibold">{getLastParticipation()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
