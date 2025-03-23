/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald': '#10B981', // 메인 컬러: 에메랄드 그린
        'navy': '#1E40AF',    // 보조 컬러: 딥 네이비
        'gold': '#F59E0B',    // 강조 컬러: 골드
        'dark': '#374151',    // 기본 텍스트: 다크 그레이
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'noto': ['Noto Sans KR', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}
