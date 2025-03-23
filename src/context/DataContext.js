import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // members.json 데이터 로드
        const membersResponse = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        if (!membersResponse.ok) {
          throw new Error('멤버 데이터를 불러오는데 실패했습니다.');
        }
        const membersData = await membersResponse.json();
        setMembers(membersData.members);

        // 이벤트와 갤러리 데이터도 유사하게 처리
        // events.json과 gallery.json 파일이 준비되면 주석을 해제하세요
        /*
        const eventsResponse = await fetch(`${process.env.PUBLIC_URL}/data/events.json`);
        if (!eventsResponse.ok) {
          throw new Error('이벤트 데이터를 불러오는데 실패했습니다.');
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events);

        const galleryResponse = await fetch(`${process.env.PUBLIC_URL}/data/gallery.json`);
        if (!galleryResponse.ok) {
          throw new Error('갤러리 데이터를 불러오는데 실패했습니다.');
        }
        const galleryData = await galleryResponse.json();
        setGallery(galleryData.images);
        */

        // 임시 데이터 설정
        setEvents([
          {
            id: 1,
            title: '3월 월례회',
            date: '2025-03-15',
            location: '레이크사이드 CC',
            description: '2025년 첫 월례회'
          },
          {
            id: 2,
            title: '4월 월례회',
            date: '2025-04-19',
            location: '파인밸리 CC',
            description: '봄 시즌 특별대회'
          },
          {
            id: 3,
            title: '5월 월례회',
            date: '2025-05-17',
            location: '블루원 디아너스 CC',
            description: '5월 가정의 달 기념 이벤트'
          }
        ]);

        setGallery([
          {
            id: 1,
            title: '2024 송년회',
            imageUrl: 'https://placehold.co/600x400?text=골프모임+송년회',
            date: '2024-12-20'
          },
          {
            id: 2,
            title: '가을 라운딩',
            imageUrl: 'https://placehold.co/600x400?text=가을+라운딩',
            date: '2024-10-15'
          },
          {
            id: 3,
            title: '여름 특별대회',
            imageUrl: 'https://placehold.co/600x400?text=여름+특별대회',
            date: '2024-07-20'
          }
        ]);

      } catch (err) {
        setError(err.message);
        console.error('데이터 로딩 에러:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 회원 데이터 가공
  const getMemberStats = () => {
    if (!members.length) return {};

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

    return {
      totalMembers: members.length,
      genderDistribution,
      cohortDistribution,
      participationStats
    };
  };

  // 특정 회원 찾기
  const findMemberByName = (name) => {
    return members.find(member => member.name === name);
  };

  const value = {
    members,
    events,
    gallery,
    loading,
    error,
    getMemberStats,
    findMemberByName
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
