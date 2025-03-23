# 골프 모임 웹사이트

골프 모임 회원들의 참여 현황과 스코어 정보를 시각화하고, 효율적인 모임 관리를 지원하는 웹사이트입니다. 현대적이고 역동적인 디자인으로 사용자 경험을 향상시키고, GitHub Pages를 통해 배포됩니다.

![프로젝트 스크린샷](screenshot.png)

## 🌟 주요 기능

- **회원 데이터 시각화 및 분석**: 회원들의 스코어, 핸디캡, 참여 이력 등을 시각적으로 분석
- **모임 참가 신청 및 조편성 자동화**: 효율적인 모임 관리와 조편성 기능
- **모바일 친화적인 반응형 디자인**: 모든 기기에서 최적화된 경험 제공
- **직관적인 사용자 경험**: 현대적이고 사용하기 쉬운 인터페이스

## 📱 핵심 화면

### 메인 페이지 (비로그인)
- 네비게이션 바 (메뉴 및 로그인 링크)
- 히어로 섹션 (골프 모임 소개)
- 활동 영상 갤러리
- 골프 모임 소개
- 회장 인사말
- 2025년 스케줄 
- 조직도
- 하이라이트 갤러리

### 로그인 시스템
- 일반 회원: 성함 + 전화번호 뒤 4자리
- 관리자: ID(admin) + 비밀번호(132400admin)
- localStorage 기반 세션 관리

### 마이페이지 (로그인 후)
- 개인 프로필 요약
- 개인 스코어 트렌드 차트
- 참여 기록 히트맵
- 핸디캡 변화 추이 그래프
- 전체 평균과의 비교 차트
- 상세 기록 테이블

### 관리자 페이지
- 회원 검색 및 필터링
- 종합 통계 대시보드
- 회원 상세 정보 분석
- 데이터 내보내기 (Excel/PDF)

### 참가 신청 및 조편성
- 월례회 참가 신청 폼
- 조편성 옵션 설정 (명랑/실력/혼성/기수별)
- 교통 정보 입력 (자가차량/픽업)
- 자동 조편성 결과 및 조정
- 결과 공유 기능

## 🛠️ 사용 기술

### 핵심 기술
- **React.js**: 사용자 인터페이스 구축
- **Tailwind CSS**: 스타일링 및 반응형 디자인
- **React Router**: 클라이언트 측 라우팅
- **Context API**: 상태 관리

### 데이터 시각화
- **Chart.js**: 차트 및 그래프 생성
- **React Calendar Heatmap**: 참여 히트맵 시각화

### 애니메이션 및 UI
- **Framer Motion**: 애니메이션 효과
- **React Icons**: 아이콘 라이브러리

### 데이터 처리
- **localStorage**: 클라이언트 측 데이터 저장
- **JSON**: 데이터 구조화 및 처리

## 🚀 시작하기

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/사용자이름/golf-club-website.git

# 프로젝트 디렉토리로 이동
cd golf-club-website

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

### 빌드 및 배포

```bash
# 프로덕션 빌드 생성
npm run build

# GitHub Pages 배포
npm run deploy
```

## 📂 프로젝트 구조

```
golf-club-website/
├── public/               # 정적 파일
├── src/                  # 소스 코드
│   ├── components/       # 공통 컴포넌트
│   ├── context/          # Context API
│   ├── pages/            # 페이지 컴포넌트
│   ├── utils/            # 유틸리티 함수
│   └── styles/           # 스타일 파일
├── package.json          # 프로젝트 메타데이터
└── README.md             # 프로젝트 설명
```

## 📝 라이센스

이 프로젝트는 MIT 라이센스에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 기여하기

1. 이 저장소를 포크합니다
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. 풀 리퀘스트를 생성합니다

## 📞 연락처

프로젝트 관리자 - [이메일 주소](mailto:example@example.com)

프로젝트 링크: [https://github.com/사용자이름/golf-club-website](https://github.com/사용자이름/golf-club-website)
