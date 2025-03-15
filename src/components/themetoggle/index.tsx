'use client';

import React, { FC, useEffect, useState } from 'react';
import { WiMoonAltWaningCrescent4 } from 'react-icons/wi';
import styles from './index.module.css';

const Themetoggle: FC = () => {
  // 初始化主題值，如果本地 localStorage 有記錄，則使用它；否則預設 "light"
  const [theme, setTheme] = useState<string>(
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') || 'light'
      : 'light',
  );

  // 切換按鈕：若目前是 dark 就變 light，反之亦然
  const themetoggle = () => {
    // 新增一行 console.log
    console.log('button clicked');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 將主題值套用到 <html data-theme="xxx"> 上，並保存到 localStorage
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <div
      className={`${styles.menuButton} ${styles.navAc}`}
      onClick={themetoggle}
    >
      <WiMoonAltWaningCrescent4 />
    </div>
  );
};

export default Themetoggle;
