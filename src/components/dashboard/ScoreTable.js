// src/components/dashboard/ScoreTable.js
import React, { useState, useEffect } from 'react';

const ScoreTable = ({ userData }) => {
  const [scores, setScores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const recordsPerPage = 10;

  useEffect(() => {
    if (!userData || !userData.records) {
      setScores([]);
      return;
    }

    // 모든 기록 데이터 수집
    const allScores = [];
    
    // 연도별, 월별 스코어 데이터 추출
    Object.entries(userData.records).forEach(([year, yearData]) => {
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
            course: '-', // 코스 정보가 없으므로 기본값 설정
            notes: '월례회'
          });
        });
      }
    });
    
    // 정렬 적용
    applySort(allScores, sortConfig);
    
    setScores(allScores);
  }, [userData, sortConfig]);

  // 정렬 처리
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 배열에 정렬 적용
  const applySort = (array, config) => {
    array.sort((a, b) => {
      if (config.key === 'date') {
        return config.direction === 'asc' 
          ? a.date - b.date 
          : b.date - a.date;
      } else if (config.key === 'score') {
        return config.direction === 'asc' 
          ? a.score - b.score 
          : b.score - a.score;
      } else if (config.key === 'year') {
        return config.direction === 'asc' 
          ? a.year.localeCompare(b.year)
          : b.year.localeCompare(a.year);
      }
      return 0;
    });
    return array;
  };

  // 정렬 방향에 따른 화살표 표시
  const getSortDirectionArrow = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // 페이지네이션 관련 계산
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = scores.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(scores.length / recordsPerPage);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!userData || !userData.records || scores.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-center text-gray-500">기록이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('date')}
              >
                날짜{getSortDirectionArrow('date')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('year')}
              >
                연도{getSortDirectionArrow('year')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('score')}
              >
                스코어{getSortDirectionArrow('score')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                비고
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.map((score, index) => (
              <tr key={`${score.year}-${score.month}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {score.dateStr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {score.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {score.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {score.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              이전
            </button>
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              다음
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                총 <span className="font-medium">{scores.length}</span> 건 중{' '}
                <span className="font-medium">{indexOfFirstRecord + 1}</span>-
                <span className="font-medium">
                  {Math.min(indexOfLastRecord, scores.length)}
                </span> 건
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* 처음 페이지로 */}
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">처음</span>
                  {'<<'}
                </button>
                {/* 이전 페이지로 */}
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">이전</span>
                  {'<'}
                </button>
                
                {/* 페이지 번호 */}
                {[...Array(totalPages).keys()].map(number => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === number + 1
                        ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                {/* 다음 페이지로 */}
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">다음</span>
                  {'>'}
                </button>
                {/* 마지막 페이지로 */}
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">마지막</span>
                  {'>>'}
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
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

export default ScoreTable;
