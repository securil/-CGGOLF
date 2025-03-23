/**
 * 데이터 처리 및 분석을 위한 유틸리티 함수들
 */

/**
 * 회원 데이터에서 통계를 계산합니다.
 * @param {Array} members - 회원 데이터 배열
 * @returns {Object} 회원 통계 정보
 */
export const calculateMemberStats = (members) => {
  if (!members || !members.length) {
    return {
      totalMembers: 0,
      genderDistribution: {},
      cohortDistribution: {},
      participationStats: { participatingMembers: 0, totalParticipations: 0 }
    };
  }

  // 성별 분포
  const genderDistribution = members.reduce((acc, member) => {
    acc[member.gender] = (acc[member.gender] || 0) + 1;
    return acc;
  }, {});

  // 기수별 회원 수
  const cohortDistribution = members.reduce((acc, member) => {
    if (member.cohort > 0) {
      acc[member.cohort] = (acc[member.cohort] || 0) + 1;
    }
    return acc;
  }, {});

  // 참여 횟수 분석
  const participationStats = members.reduce((acc, member) => {
    let totalParticipation = 0;
    
    if (member.records) {
      Object.values(member.records).forEach(yearData => {
        if (yearData.participation) {
          totalParticipation += yearData.participation;
        }
      });
    }
    
    if (totalParticipation > 0) {
      acc.participatingMembers += 1;
      acc.totalParticipations += totalParticipation;
    }
    
    return acc;
  }, { participatingMembers: 0, totalParticipations: 0 });

  // 핸디캡 평균
  let handicapSum = 0;
  let handicapCount = 0;

  members.forEach(member => {
    if (member.records) {
      const years = Object.keys(member.records);
      if (years.length > 0) {
        // 가장 최근 연도의 핸디캡 사용
        const latestYear = Math.max(...years.map(Number));
        const yearData = member.records[latestYear];
        
        if (yearData && yearData.handicap) {
          handicapSum += yearData.handicap;
          handicapCount++;
        }
      }
    }
  });

  const averageHandicap = handicapCount > 0 
    ? (handicapSum / handicapCount).toFixed(1) 
    : 'N/A';

  return {
    totalMembers: members.length,
    genderDistribution,
    cohortDistribution,
    participationStats,
    averageHandicap
  };
};

/**
 * 회원의 참여 기록을 히트맵 데이터 형식으로 변환합니다.
 * @param {Object} memberRecords - 회원의 기록 객체
 * @returns {Array} 히트맵 데이터 형식의 배열
 */
export const transformParticipationToHeatmap = (memberRecords) => {
  if (!memberRecords) return [];

  const data = [];
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  
  // 연도별 기록 처리
  Object.entries(memberRecords).forEach(([year, yearData]) => {
    // scores 객체가 있는 경우
    if (yearData.scores) {
      Object.entries(yearData.scores).forEach(([month, score]) => {
        // 월 이름에서 월 숫자 추출 (예: '3월' -> 2)
        const monthIndex = monthNames.indexOf(month);
        if (monthIndex !== -1) {
          const date = new Date(parseInt(year), monthIndex, 15);
          
          data.push({
            date: date.toISOString().split('T')[0],
            count: 1,
            score
          });
        }
      });
    }
  });
  
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * 회원의 스코어 기록을 차트 데이터 형식으로 변환합니다.
 * @param {Object} memberRecords - 회원의 기록 객체
 * @returns {Object} 차트 데이터 객체
 */
export const transformScoresToChartData = (memberRecords) => {
  if (!memberRecords) return { labels: [], data: [] };

  const chartData = {
    labels: [],
    data: [],
    handicaps: []
  };
  
  // 연도별 기록 처리
  Object.entries(memberRecords)
    .sort(([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB))
    .forEach(([year, yearData]) => {
      // scores 객체가 있는 경우
      if (yearData.scores) {
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        
        // 월별로 정렬
        Object.entries(yearData.scores)
          .sort(([monthA], [monthB]) => {
            return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
          })
          .forEach(([month, score]) => {
            chartData.labels.push(`${year}.${month}`);
            chartData.data.push(score);
            
            // 해당 연도의 핸디캡 추가
            if (yearData.handicap) {
              chartData.handicaps.push(yearData.handicap);
            } else {
              // 핸디캡이 없는 경우 null 추가하여 위치 유지
              chartData.handicaps.push(null);
            }
          });
      }
    });
  
  return chartData;
};

/**
 * 회원 조편성을 처리합니다.
 * @param {Array} participants - 참가자 배열
 * @param {string} groupingMethod - 조편성 방법 ('random', 'byHandicap', 'byCohort', 'mixed')
 * @param {number} groupSize - 각 조의 크기
 * @returns {Array} 조편성 결과 배열
 */
export const groupParticipants = (participants, groupingMethod = 'random', groupSize = 4) => {
  if (!participants || participants.length === 0) {
    return [];
  }
  
  // 참가자 배열 복사
  let shuffled = [...participants];
  
  // 조편성 방법에 따라 정렬
  switch (groupingMethod) {
    case 'byHandicap':
      // 핸디캡 순으로 정렬
      shuffled.sort((a, b) => {
        return (a.handicap || 999) - (b.handicap || 999);
      });
      break;
      
    case 'byCohort':
      // 기수별로 정렬
      shuffled.sort((a, b) => a.cohort - b.cohort);
      break;
      
    case 'mixed':
      // 핸디캡 섞기 (비슷한 실력자들이 다른 조에 배치되도록)
      const byHandicap = [...shuffled].sort((a, b) => (a.handicap || 999) - (b.handicap || 999));
      shuffled = [];
      
      // A, B, C, D, ... 순서로 재배치
      const groupCount = Math.ceil(byHandicap.length / groupSize);
      for (let i = 0; i < groupSize; i++) {
        for (let j = 0; j < groupCount; j++) {
          const index = j * groupSize + i;
          if (index < byHandicap.length) {
            shuffled.push(byHandicap[index]);
          }
        }
      }
      break;
      
    case 'random':
    default:
      // 랜덤 섞기
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      break;
  }
  
  // 조 만들기
  const groups = [];
  for (let i = 0; i < shuffled.length; i += groupSize) {
    groups.push(shuffled.slice(i, i + groupSize));
  }
  
  return groups;
};

/**
 * 특정 회원을 이름으로 찾습니다.
 * @param {Array} members - 회원 데이터 배열
 * @param {string} name - 검색할 회원 이름
 * @returns {Object|null} 찾은 회원 객체 또는 null
 */
export const findMemberByName = (members, name) => {
  if (!members || !name) return null;
  return members.find(member => member.name === name) || null;
};

/**
 * 특정 회원을 이름과 전화번호로 찾습니다.
 * @param {Array} members - 회원 데이터 배열
 * @param {string} name - 회원 이름
 * @param {string} phone - 전화번호 뒤 4자리
 * @returns {Object|null} 찾은 회원 객체 또는 null
 */
export const findMemberByNameAndPhone = (members, name, phone) => {
  if (!members || !name || !phone) return null;
  return members.find(
    member => member.name === name && member.phone.slice(-4) === phone
  ) || null;
};

/**
 * 회원 데이터를 필터링합니다.
 * @param {Array} members - 회원 데이터 배열
 * @param {Object} filters - 필터 조건 객체
 * @returns {Array} 필터링된 회원 배열
 */
export const filterMembers = (members, filters = {}) => {
  if (!members) return [];
  
  return members.filter(member => {
    // 이름 검색
    if (filters.name && !member.name.includes(filters.name)) {
      return false;
    }
    
    // 기수 필터링
    if (filters.cohort && member.cohort !== parseInt(filters.cohort)) {
      return false;
    }
    
    // 성별 필터링
    if (filters.gender && member.gender !== filters.gender) {
      return false;
    }
    
    // 참여 여부 필터링
    if (filters.hasParticipated !== undefined) {
      const hasRecords = member.records && Object.keys(member.records).length > 0;
      if (filters.hasParticipated && !hasRecords) {
        return false;
      }
      if (!filters.hasParticipated && hasRecords) {
        return false;
      }
    }
    
    return true;
  });
};
