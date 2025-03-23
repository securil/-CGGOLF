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
    if (!userData || !userData.handicapHistory || userData.handicapHistory.length === 0) {
      setIsDataAvailable(false);
      return;
    }

    // 날짜로 정렬
    const sortedHistory = [...userData.handicapHistory].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // 차트 데이터 가공
    const labels = sortedHistory.map(record => {
      const date = new Date(record.date);
      return `${date.getFullYear()}.${date.getMonth() + 1}`;
    });

    const handicaps = sortedHistory.map(record => record.handicap);

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

  // 핸디캡 데이터가 없는 경우 임시 데이터 생성
  useEffect(() => {
    if (!userData || userData.handicapHistory) return;
    
    // 점수 데이터가 있으면 임시 핸디캡 히스토리 생성
    if (userData.scores && userData.scores.length > 0) {
      const sortedScores = [...userData.scores].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      // 간단한 핸디캡 계산 (실제로는 더 복잡한 공식 사용)
      const handicapHistory = sortedScores.map(score => {
        const handicap = ((score.score - 72) * 0.8).toFixed(1);
        return {
          date: score.date,
          handicap: Math.max(0, handicap) // 최소 0
        };
      });
      
      const data = {
        labels: handicapHistory.map(record => {
          const date = new Date(record.date);
          return `${date.getFullYear()}.${date.getMonth() + 1}`;
        }),
        datasets: [
          {
            label: '핸디캡 (추정)',
            data: handicapHistory.map(record => record.handicap),
            borderColor: 'rgb(245, 158, 11)',
            backgroundColor: 'rgba(245, 158, 11, 0.5)',
            tension: 0.1
          }
        ]
      };
      
      setChartData(data);
      setIsDataAvailable(true);
    }
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
