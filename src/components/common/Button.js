import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  // 버튼 스타일 결정
  const baseStyle = 'rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center';
  
  // 버튼 색상 스타일
  const variantStyles = {
    primary: 'bg-emerald text-white hover:bg-opacity-90 shadow-md',
    secondary: 'bg-navy text-white hover:bg-opacity-90 shadow-md',
    outline: 'border-2 border-emerald text-emerald hover:bg-emerald hover:text-white',
    gold: 'bg-gold text-white hover:bg-opacity-90 shadow-md',
    ghost: 'text-navy hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md'
  };
  
  // 버튼 크기 스타일
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg'
  };
  
  // 최종 클래스 조합
  const buttonClasses = `
    ${baseStyle} 
    ${variantStyles[variant] || variantStyles.primary} 
    ${sizeStyles[size] || sizeStyles.md} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;
  
  // 링크가 있는 경우 Link 컴포넌트 사용
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  // 외부 링크가 있는 경우 a 태그 사용
  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {children}
      </a>
    );
  }
  
  // 기본 버튼
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
