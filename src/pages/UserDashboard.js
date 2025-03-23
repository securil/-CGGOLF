// src/pages/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 공통 컴포넌트 임포트
import ProfileSummary from '../components/dashboard/ProfileSummary';
import ScoreTrendChart from '../components/dashboard/ScoreTrendChart';
import ParticipationHeatmap from '../components/dashboard/ParticipationHeatmap';
import HandicapChart from '../components/dashboard/HandicapChart';
import ComparisonChart from '../components/dashboard/ComparisonChart';
import ScoreTable from '../components/dashboard/ScoreTable';

const UserDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allMembersData, setAllMembersData] = useState([]);
  
  // 인증 상태 확인 및 리다이렉트
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  }, [isAuthenticated, navigate]);
  
  // 사용자 데이터 로드
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        // 회원 데이터 로드
        const response = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        const data = await response.json();
        
        // 모든 회원 데이터 저장 (비교 차트용)
        setAllMembersData(data.members);
        
        // 현재 로그인한 사용자의 데이터 찾기
        const userDetails = data.members.find(member => member.name === currentUser.name);
        
        if (userDetails) {
          setUserData(userDetails);
        } else {
          setError('사용자 데이터를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('데이터 로드 에러:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser]);
  
  // 로딩 상태 표시
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  // 에러 처리
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // 데이터가 없는 경우
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>사용자 데이터를 불러올 수 없습니다. 다시 로그인해주세요.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-emerald-600">마이페이지</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 프로필 요약 */}
        <div className="lg:col-span-1">
          <ProfileSummary userData={userData} />
        </div>
        
        {/* 차트 영역 */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 스코어 트렌드 차트 */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-navy-600">스코어 트렌드</h2>
              <ScoreTrendChart userData={userData} />
            </div>
            
            {/* 핸디캡 변화 차트 */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-navy-600">핸디캡 변화</h2>
              <HandicapChart userData={userData} />
            </div>
          </div>
          
          {/* 참가 기록 히트맵 */}
          <div className="bg-white shadow rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-navy-600">참가 기록</h2>
            <ParticipationHeatmap userData={userData} />
          </div>
          
          {/* 평균 비교 차트 */}
          <div className="bg-white shadow rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-navy-600">전체 평균과 비교</h2>
            <ComparisonChart userData={userData} allMembersData={allMembersData} />
          </div>
        </div>
      </div>
      
      {/* 상세 기록 테이블 */}
      <div className="mt-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-navy-600">상세 기록</h2>
        <ScoreTable userData={userData} />
      </div>
    </div>
  );
};

export default UserDashboard;
