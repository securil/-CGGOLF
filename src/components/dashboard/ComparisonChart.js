// src/components/dashboard/ComparisonChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonChart = ({ userData }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [averageData, setAverageData] = useState(null);

  // 전체 회원 평균 데이터 로드
  useEffect(() => {
    const fetchAverageData = async () => {
      try {
        // 실제 구현 시 API 호출로 대체
        const response = await fetch(`${process.env.PUBLIC_URL}/data/averages.json`);
        const data = await response.json();
        setAverageData(data);
      } catch (err) {
        console.error('평균 데이터 로드 에러:', err);
        // 임시 평균 데이터 생성 (실제 구현 시 삭제)
        setAverageData({
          monthlyAverages: {
            "2025-01": 85.2,
            "2025-02": 84.8,
            "2025-03": 84.5,
            "2025-04": 83.9,
            "2025-05": 83.6,
            "2025-06": 83.2
          }
        });
      }
    };
    
    fetchAverageData();
  }, []);

  // 차트 데이터 준비
  useEffect(() => {
    if (!userData || !userData.scores || userData.scores.length === 0 || !averageData) {
      setIsDataAvailable(false);
      return;
    }

    // 사용자의 최근 스코어 계산 (최근 6개월)
    const lastSixMonths = [];
    const today = new Date();
    
    for (let i = 0; i < 6; i++) {
      const monthDate = new Date(today);
      monthDate.setMonth(today.getMonth() - i);
      const monthStr = `${monthDate.getFullYear()}-${(monthDate.getMonth() + 1).toString().padStart(2, '0')}`;
      lastSixMonths.unshift(monthStr);
    }

    // 사용자의 월별 평균 스코어 계산
    const userMonthlyScores = lastSixMonths.map(monthStr => {
      const yearMonth = monthStr.split('-');
      const year = parseInt(yearMonth[0]);
      const month = parseInt(yearMonth[1]);
      
      const monthScores = userData.scores.filter(score => {
        const scoreDate = new Date(score.date);
        return scoreDate.getFullYear() === year && scoreDate.getMonth() + 1 === month;
      });
      
      if (monthScores.length === 0) return null;
      
      const sum = monthScores.reduce((total, score) => total + score.score, 0);
      return sum / monthScores.length;
    });

    // 전체 평균 스코어 추출
    const groupAverages = lastSixMonths.map(monthStr => 
      averageData.monthlyAverages[monthStr] || null
    );

    // 차트 레이블 (간단한 월 표시)
    const labels = lastSixMonths.map(monthStr => {
      const parts = monthStr.split('-');
      return `${parts[1]}월`;
    });

    // 차트 데이터 구성
    const data = {
      labels,
      datasets: [
        {
          label: '내 평균',
          data: userMonthlyScores,
          backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500
          borderWidth: 1
        },
        {
          label: '전체 평균',
          data: groupAverages,
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
          borderWidth: 1
        }
      ]
    };

    setChartData(data);
    setIsDataAvailable(true);
  }, [userData, averageData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return value ? `${label}: ${value.toFixed(1)}타` : `${label}: 데이터 없음`;
          }
        }
      }
    },
    scales: {
      y: {
        reverse: true, // 골프 스코어는 낮을수록 좋으므로 Y축 역전
        title: {
          display: true,
          text: '평균 스코어'
        }
      }
    }
  };

  if (!isDataAvailable) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">비교 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return <Bar data={chartData} options={options} />;
};

export default ComparisonChart;
