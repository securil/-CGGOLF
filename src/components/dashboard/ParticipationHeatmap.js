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
    if (!userData || !userData.scores || userData.scores.length === 0) {
      return;
    }

    // 모든 참여 날짜를 Date 객체로 변환하고 정렬
    const participationDates = userData.scores
      .map(score => new Date(score.date))
      .sort((a, b) => a - b);

    // 시작 날짜 (가장 오래된 참여일로부터 1년 전)
    const firstDate = new Date(participationDates[0]);
    firstDate.setFullYear(firstDate.getFullYear() - 1);
    setStartDate(firstDate);

    // 종료 날짜 (현재 날짜 또는 가장 최근 참여일로부터 1개월 후)
    const lastDate = new Date(participationDates[participationDates.length - 1]);
    lastDate.setMonth(lastDate.getMonth() + 1);
    const today = new Date();
    setEndDate(lastDate > today ? lastDate : today);

    // 참여일별로 스코어 및 코스 정보를 데이터 포인트로 변환
    const data = userData.scores.map(score => {
      return {
        date: score.date,
        count: 1, // 참여 횟수
        score: score.score,
        course: score.course || '코스 정보 없음'
      };
    });

    setHeatmapData(data);
  }, [userData]);

  // 툴팁에 표시할 내용
  const getTooltipDataAttrs = value => {
    if (!value || !value.date) {
      return { 'data-tip': '참여 기록 없음' };
    }
    
    const date = new Date(value.date);
    const dateStr = date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return {
      'data-tip': `${dateStr} - ${value.course} (${value.score}타)`
    };
  };

  // 히트맵 색상 지정 (참여한 날은 emerald 색상)
  const getClassForValue = value => {
    if (!value || !value.count) {
      return 'color-empty';
    }
    return 'color-filled';
  };

  if (!userData || !userData.scores || userData.scores.length === 0) {
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

export default ParticipationHeatmap;
