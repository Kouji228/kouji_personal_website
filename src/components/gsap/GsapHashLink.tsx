'use client';

import React from 'react';
import { gsap } from './gsap-plugins';

interface GsapHashLinkProps {
  to: string;
  children: React.ReactNode;
  offset?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
}

const GsapHashLink: React.FC<GsapHashLinkProps> = ({
  to,
  children,
  offset = 72,
  duration = 1.2,
  className = '',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const targetElement = document.getElementById(to);
    if (!targetElement) return;

    // 更新 URL hash
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${to}`);
    }

    // 執行平滑滾動
    gsap.to(window, {
      duration,
      scrollTo: {
        y: targetElement,
        offsetY: offset,
      },
      ease: 'power2.inOut',
    });

    // 執行自定義點擊處理
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default GsapHashLink;
