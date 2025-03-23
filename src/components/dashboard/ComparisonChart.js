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

const ComparisonChart = ({ userData, allMembersData }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    if (!userData || !userData.records || Object.keys(userData.records).length === 0 || !allMembersData) {
      setIsDataAvailable(false);
      return;
    }

    // 최근 3년 데이터만 사용
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2].filter(year => 
      userData.records[year] !== undefined
    ).map(String);
    
    // 데이터가 없으면 종료
    if (years.length === 0) {
      setIsDataAvailable(false);
      return;
    }

    // 사용자 데이터 계산
    const userYearlyAverages = years.map(year => {
      const yearData = userData.records[year];
      return yearData && yearData.average_score ? yearData.average_score : null;
    });

    // 전체 평균 계산
    const groupYearlyAverages = years.map(year => {
      // 해당 연도에 기록이 있는 모든 회원 필터링
      const membersWithData = allMembersData.filter(member => 
        member.records && member.records[year] && member.records[year].average_score
      );
      
      if (membersWithData.length === 0) return null;
      
      // 평균 계산
      const sum = membersWithData.reduce((total, member) => 
        total + member.records[year].average_score, 0
      );
      
      return (sum / membersWithData.length).toFixed(1);
    });

    // 차트 데이터 구성
    const data = {
      labels: years,
      datasets: [
        {
          label: '내 평균',
          data: userYearlyAverages,
          backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500
          borderWidth: 1
        },
        {
          label: '전체 평균',
          data: groupYearlyAverages,
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
          borderWidth: 1
        }
      ]
    };

    setChartData(data);
    setIsDataAvailable(true);
  }, [userData, allMembersData]);

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
            return value ? `${label}: ${value}타` : `${label}: 데이터 없음`;
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
