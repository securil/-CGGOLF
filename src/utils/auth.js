/**
 * 인증 관련 유틸리티 함수들
 */

/**
 * 회원 로그인 처리
 * @param {string} name - 회원 이름
 * @param {string} phone - 전화번호 (마지막 4자리만 사용)
 * @param {Array} members - 회원 데이터 배열
 * @returns {Object|null} 로그인 성공 시 회원 정보, 실패 시 null
 */
export const loginMember = (name, phone, members) => {
  if (!name || !phone || !members) {
    return null;
  }
  
  // 전화번호 마지막 4자리만 추출
  const lastFourDigits = phone.slice(-4);
  
  // 회원 찾기
  const member = members.find(
    m => m.name === name && m.phone.slice(-4) === lastFourDigits
  );
  
  if (member) {
    // 로그인 정보 저장
    const userData = {
      name: member.name,
      cohort: member.cohort,
      isAdmin: false
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return userData;
  }
  
  return null;
};

/**
 * 관리자 로그인 처리
 * @param {string} id - 관리자 ID
 * @param {string} password - 관리자 비밀번호
 * @returns {Object|null} 로그인 성공 시 관리자 정보, 실패 시 null
 */
export const loginAdmin = (id, password) => {
  // 관리자 계정 확인 (실제 환경에서는 더 안전한 방법 사용)
  if (id === 'admin' && password === '132400admin') {
    const adminData = {
      name: 'admin',
      isAdmin: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(adminData));
    return adminData;
  }
  
  return null;
};

/**
 * 로그인 처리 (회원 또는 관리자)
 * @param {string} nameOrId - 회원 이름 또는 관리자 ID
 * @param {string} phoneOrPassword - 전화번호 또는 관리자 비밀번호
 * @param {Array} members - 회원 데이터 배열
 * @returns {Object|null} 로그인 성공 시 사용자 정보, 실패 시 null
 */
export const login = (nameOrId, phoneOrPassword, members) => {
  // 관리자 로그인 시도
  if (nameOrId === 'admin') {
    return loginAdmin(nameOrId, phoneOrPassword);
  }
  
  // 회원 로그인 시도
  return loginMember(nameOrId, phoneOrPassword, members);
};

/**
 * 로그아웃 처리
 */
export const logout = () => {
  localStorage.removeItem('currentUser');
};

/**
 * 현재 로그인된 사용자 정보 조회
 * @returns {Object|null} 로그인된 사용자 정보, 없으면 null
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * 로그인 상태 확인
 * @returns {boolean} 로그인 상태 여부
 */
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

/**
 * 관리자 여부 확인
 * @returns {boolean} 관리자 여부
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.isAdmin === true;
};
