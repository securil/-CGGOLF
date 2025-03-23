// src/components/dashboard/ParticipationHeatmap.js
import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

const ParticipationHeatmap = ({ userData }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (!userData || !userData.records) {
      return;
    }

    const participationDates = [];
    
    // 모든 연도와 월의 참여 데이터 추출
    Object.entries(userData.records).forEach(([year, yearData]) => {
      if (yearData.scores) {
        Object.entries(yearData.scores).forEach(([month, score]) => {
          const monthNum = getMonthNumber(month);
          // 각 월의 15일로 날짜 설정 (월의 중간일)
          const date = new Date(parseInt(year), monthNum - 1, 15);
          
          participationDates.push({
            date,
            count: 1,
            score,
            month,
            year
          });
        });
      }
    });
    
    // 날짜순으로 정렬
    participationDates.sort((a, b) => a.date - b.date);
    
    if (participationDates.length === 0) {
      return;
    }

    // 날짜 범위 설정
    // 가장 오래된 참여일로부터 1년 전
    const firstDate = new Date(participationDates[0].date);
    firstDate.setFullYear(firstDate.getFullYear() - 1);
    setStartDate(firstDate);

    // 가장 최근 참여일로부터 1개월 후 또는 현재 날짜
    const lastDate = new Date(participationDates[participationDates.length - 1].date);
    lastDate.setMonth(lastDate.getMonth() + 1);
    const today = new Date();
    setEndDate(lastDate > today ? lastDate : today);

    // 히트맵 데이터 형식으로 변환
    const heatmapItems = participationDates.map(item => {
      return {
        date: formatDate(item.date), // ISO 형식으로 변환
        count: 1,
        score: item.score,
        month: item.month,
        year: item.year
      };
    });

    setHeatmapData(heatmapItems);
  }, [userData]);

  // 툴팁에 표시할 내용
  const getTooltipDataAttrs = value => {
    if (!value || !value.date) {
      return { 'data-tip': '참여 기록 없음' };
    }
    
    return {
      'data-tip': `${value.year}년 ${value.month} - ${value.score}타`
    };
  };

  // 히트맵 색상 지정 (참여한 날은 emerald 색상)
  const getClassForValue = value => {
    if (!value || !value.count) {
      return 'color-empty';
    }
    return 'color-filled';
  };

  if (!userData || !userData.records || Object.keys(userData.records).length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">참여 기록이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <style jsx>{`
        .react-calendar-heatmap .color-empty {
          fill: #f3f4f6;
        }
        .react-calendar-heatmap .color-filled {
          fill: #10B981;
        }
      `}</style>
      
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={getClassForValue}
        tooltipDataAttrs={getTooltipDataAttrs}
        showWeekdayLabels={true}
        monthLabels={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
        weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
      />
      
      <ReactTooltip />
      
      <div className="flex justify-center mt-4 text-sm text-gray-600">
        <span>각 칸은 참여한 날짜를 나타냅니다. 마우스를 올려 상세 정보를 확인하세요.</span>
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

// 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export default ParticipationHeatmap;
