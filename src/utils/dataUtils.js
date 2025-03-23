// src/utils/dataUtils.js
// 회원 데이터 처리를 위한 유틸리티 함수

/**
 * 월 이름을 숫자로 변환하는 함수 (공통 사용)
 * @param {string} monthName - 월 이름 (예: '1월', '2월', ...)
 * @returns {number} 월 숫자 (1-12)
 */
export const getMonthNumber = (monthName) => {
  const monthMap = {
    '1월': 1, '2월': 2, '3월': 3, '4월': 4, '5월': 5, '6월': 6,
    '7월': 7, '8월': 8, '9월': 9, '10월': 10, '11월': 11, '12월': 12
  };
  
  return monthMap[monthName] || 0;
};

/**
 * 회원 연도별 평균 계산
 * @param {Array} members - 모든 회원 배열
 * @param {number} year - 연도
 * @returns {number} 평균 스코어
 */
export const calculateYearlyAverage = (members, year) => {
  const yearStr = year.toString();
  
  // 해당 연도에 기록이 있는 회원 필터링
  const membersWithData = members.filter(member => 
    member.records && 
    member.records[yearStr] && 
    member.records[yearStr].average_score
  );
  
  if (membersWithData.length === 0) return null;
  
  // 평균 계산
  const sum = membersWithData.reduce((total, member) => 
    total + member.records[yearStr].average_score, 0
  );
  
  return (sum / membersWithData.length).toFixed(1);
};

/**
 * 회원 기수별 평균 계산
 * @param {Array} members - 모든 회원 배열
 * @param {number} cohort - 기수
 * @returns {Object} 평균 스코어 정보
 */
export const calculateCohortAverage = (members, cohort) => {
  // 해당 기수의 회원 필터링
  const cohortMembers = members.filter(member => member.cohort === cohort);
  
  if (cohortMembers.length === 0) return null;
  
  // 모든 유효한 스코어 수집
  let totalScore = 0;
  let count = 0;
  
  cohortMembers.forEach(member => {
    if (!member.records) return;
    
    Object.values(member.records).forEach(yearData => {
      if (yearData.average_score) {
        totalScore += yearData.average_score;
        count++;
      }
    });
  });
  
  if (count === 0) return null;
  
  return {
    average: (totalScore / count).toFixed(1),
    memberCount: cohortMembers.length
  };
};

/**
 * 핸디캡 구간별 평균 계산
 * @param {Array} members - 모든 회원 배열
 * @param {number} minHandicap - 최소 핸디캡
 * @param {number} maxHandicap - 최대 핸디캡
 * @returns {Object} 평균 스코어 정보
 */
export const calculateHandicapRangeAverage = (members, minHandicap, maxHandicap) => {
  // 해당 핸디캡 범위 내 회원들의 최근 핸디캡 찾기
  const membersInRange = [];
  
  members.forEach(member => {
    if (!member.records) return;
    
    // 최근 연도의 핸디캡 찾기
    const years = Object.keys(member.records).map(Number).sort((a, b) => b - a);
    
    for (const year of years) {
      const yearStr = year.toString();
      const yearData = member.records[yearStr];
      
      if (yearData && yearData.handicap) {
        const handicap = yearData.handicap;
        
        if (handicap >= minHandicap && handicap <= maxHandicap) {
          membersInRange.push({
            member,
            handicap,
            averageScore: yearData.average_score
          });
        }
        
        break; // 가장 최근 핸디캡만 확인
      }
    }
  });
  
  if (membersInRange.length === 0) return null;
  
  // 평균 스코어 계산
  const validScores = membersInRange.filter(item => item.averageScore);
  
  if (validScores.length === 0) return null;
  
  const totalScore = validScores.reduce((sum, item) => sum + item.averageScore, 0);
  
  return {
    average: (totalScore / validScores.length).toFixed(1),
    memberCount: membersInRange.length
  };
};

/**
 * 특정 회원의 모든 스코어 기록을 날짜순으로 정렬하여 배열로 변환
 * @param {Object} member - 회원 객체
 * @returns {Array} 스코어 기록 배열
 */
export const getAllScoresArray = (member) => {
  if (!member || !member.records) return [];
  
  const allScores = [];
  
  Object.entries(member.records).forEach(([year, yearData]) => {
    if (yearData.scores) {
      Object.entries(yearData.scores).forEach(([month, score]) => {
        const monthNum = getMonthNumber(month);
        // 각 월의 15일로 날짜 설정 (월의 중간일)
        const date = new Date(parseInt(year), monthNum - 1, 15);
        
        allScores.push({
          date,
          dateStr: `${year}년 ${month}`,
          score,
          year,
          month,
          monthNum,
          course: '-', // 코스 정보가 없으므로 기본값 설정
          notes: '월례회'
        });
      });
    }
  });
  
  // 날짜순으로 정렬
  allScores.sort((a, b) => a.date - b.date);
  
  return allScores;
};
