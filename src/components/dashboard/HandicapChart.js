// src/components/dashboard/HandicapChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HandicapChart = ({ userData }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    if (!userData || !userData.records || Object.keys(userData.records).length === 0) {
      setIsDataAvailable(false);
      return;
    }

    // 핸디캡 데이터 수집
    const handicapData = [];
    
    // 연도별 핸디캡 데이터 추출
    Object.entries(userData.records).forEach(([year, yearData]) => {
      if (yearData.handicap) {
        // 각 연도의 마지막 날을 날짜로 설정
        const date = new Date(parseInt(year), 11, 31);
        
        handicapData.push({
          date,
          handicap: yearData.handicap,
          year
        });
      }
    });
    
    // 날짜순으로 정렬
    handicapData.sort((a, b) => a.date - b.date);
    
    if (handicapData.length === 0) {
      setIsDataAvailable(false);
      return;
    }

    // 차트 데이터 구성
    const labels = handicapData.map(item => item.year);
    const handicaps = handicapData.map(item => item.handicap);

    const data = {
      labels,
      datasets: [
        {
          label: '핸디캡',
          data: handicaps,
          borderColor: 'rgb(245, 158, 11)', // gold-500
          backgroundColor: 'rgba(245, 158, 11, 0.5)',
          tension: 0.1
        }
      ]
    };

    setChartData(data);
    setIsDataAvailable(true);
  }, [userData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `핸디캡: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '핸디캡'
        }
      }
    }
  };

  if (!isDataAvailable) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">핸디캡 데이터가 없습니다.</p>
      </div>
    );
  }

  return <Line data={chartData} options={options} />;
};

export default HandicapChart;
