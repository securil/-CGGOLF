// src/components/dashboard/ScoreTrendChart.js
import React, { useEffect, useState } from 'react';
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

const ScoreTrendChart = ({ userData }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    if (!userData || !userData.scores || userData.scores.length === 0) {
      setIsDataAvailable(false);
      return;
    }

    // 날짜로 정렬
    const sortedScores = [...userData.scores].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // 차트 데이터 가공
    const labels = sortedScores.map(score => {
      const date = new Date(score.date);
      return `${date.getFullYear()}.${date.getMonth() + 1}`;
    });

    const scores = sortedScores.map(score => score.score);

    // 이동 평균 계산 (3개 데이터 기준)
    const movingAverages = scores.map((_, index, array) => {
      if (index < 2) return null; // 처음 2개는 계산 불가
      
      const sum = array[index] + array[index - 1] + array[index - 2];
      return (sum / 3).toFixed(1);
    });

    const data = {
      labels,
      datasets: [
        {
          label: '스코어',
          data: scores,
          borderColor: 'rgb(16, 185, 129)', // emerald-500
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          tension: 0.1
        },
        {
          label: '3개월 평균',
          data: movingAverages,
          borderColor: 'rgb(30, 64, 175)', // navy-600
          backgroundColor: 'rgba(30, 64, 175, 0.5)',
          borderDash: [5, 5],
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
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          }
        }
      }
    },
    scales: {
      y: {
        reverse: true, // 골프 스코어는 낮을수록 좋으므로 Y축 역전
        min: function(context) {
          const min = Math.min(...context.chart.data.datasets[0].data) - 5;
          return Math.floor(min / 5) * 5; // 5단위로 내림
        },
        max: function(context) {
          const max = Math.max(...context.chart.data.datasets[0].data) + 5;
          return Math.ceil(max / 5) * 5; // 5단위로 올림
        }
      }
    }
  };

  if (!isDataAvailable) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">스코어 데이터가 없습니다.</p>
      </div>
    );
  }

  return <Line data={chartData} options={options} />;
};

export default ScoreTrendChart;
