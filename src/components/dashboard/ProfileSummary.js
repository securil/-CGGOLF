// src/components/dashboard/ProfileSummary.js
import React from 'react';

const ProfileSummary = ({ userData }) => {
  if (!userData) return null;
  
  // 모든 연도의 기록 데이터
  const records = userData.records || {};
  
  // 최신 연도 찾기
  const years = Object.keys(records).map(Number).sort((a, b) => b - a);
  const latestYear = years.length > 0 ? years[0].toString() : null;
  
  // 최신 핸디캡 - 가장 최근 연도의 핸디캡 사용
  const latestHandicap = latestYear && records[latestYear] && records[latestYear].handicap
    ? records[latestYear].handicap
    : '정보 없음';
  
  // 최근 평균 스코어 - 가장 최근 연도의 평균 스코어 사용
  const latestAvgScore = latestYear && records[latestYear] && records[latestYear].average_score
    ? records[latestYear].average_score
    : '정보 없음';
  
  // 최근 베스트 스코어 - 가장 최근 연도의 베스트 스코어 사용
  const latestBestScore = latestYear && records[latestYear] && records[latestYear].best_score
    ? records[latestYear].best_score
    : '정보 없음';
  
  // 총 참여 횟수 계산
  const totalParticipation = Object.values(records).reduce((total, yearRecord) => {
    return total + (yearRecord.participation || 0);
  }, 0);
  
  // 최근 참여 날짜 찾기
  const getLastParticipationDate = () => {
    let lastDate = null;
    let lastMonth = null;
    let lastYear = null;
    
    for (const year of years) {
      const yearStr = year.toString();
      const yearData = records[yearStr];
      
      if (yearData && yearData.scores) {
        const months = Object.keys(yearData.scores);
        if (months.length > 0) {
          // 해당 연도의 마지막 참여 월 찾기
          const sortedMonths = months.sort((a, b) => {
            const monthA = getMonthNumber(a);
            const monthB = getMonthNumber(b);
            return monthB - monthA;
          });
          
          if (!lastYear || year > lastYear) {
            lastYear = year;
            lastMonth = sortedMonths[0];
          }
        }
      }
    }
    
    if (lastYear && lastMonth) {
      return `${lastYear}년 ${lastMonth}`;
    }
    
    return '참여 기록 없음';
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
            <span className="font-semibold">{latestHandicap}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">최근 평균 스코어</span>
            <span className="font-semibold">{latestAvgScore}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">최근 베스트 스코어</span>
            <span className="font-semibold">{latestBestScore}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">참여 횟수</span>
            <span className="font-semibold">{totalParticipation}회</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">최근 참여일</span>
            <span className="font-semibold">{getLastParticipationDate()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 월 이름을 숫자로 변환하는 함수
const getMonthNumber = (monthName) => {
  const monthMap = {
    '1월': 1, '2월': 2, '3월': 3, '4월': 4, '5월': 5, '6월': 6,
    '7월': 7, '8월': 8, '9월': 9, '10월': 10, '11월': 11, '12월': 12
  };
  
  return monthMap[monthName] || 0;
};

export default ProfileSummary;
