'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { gsap } from './gsap';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleLoadingComplete = useCallback(() => {
    // 載入完成動畫
    const tl = gsap.timeline();

    tl.to('.loading-content', {
      duration: 0.8,
      opacity: 0,
      y: -30,
      ease: 'power2.inOut',
    }).to(
      '.loading-screen',
      {
        duration: 1.2,
        opacity: 0,
        scale: 1.1,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsLoading(false);
          onLoadingComplete?.();
        },
      },
      '-=0.4',
    );
  }, [onLoadingComplete]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12 + 3; // 更平滑的進度
        return Math.min(newProgress, 100);
      });
    }, 150);

    // 確保至少載入 2.5 秒，讓動畫有足夠時間展示
    const minLoadingTime = setTimeout(() => {
      setProgress(100);
    }, 2500);

    // 監聽頁面載入狀態
    const handleLoad = () => {
      setTimeout(() => {
        setProgress(100);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minLoadingTime);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // 監聽進度變化
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, handleLoadingComplete]);

  // 載入完成後不渲染
  if (!isLoading) return null;

  return (
    <div className={`${styles.loadingScreen} loading-screen`}>
      <div className={styles.loadingContainer}>
        <div className={`${styles.loadingContent} loading-content`}>
          {/* 主要載入動畫 */}
          <div className={styles.loadingAnimation}>
            <div className={styles.circle}>
              <div className={styles.innerCircle}></div>
            </div>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing}></div>
          </div>

          {/* 載入文字 */}
          <div className={styles.loadingText}>
            <h2 className={styles.title}>Kouji Song</h2>
            <p className={styles.subtitle}>Front-End Developer</p>
          </div>

          {/* 進度條 */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>
              {Math.round(Math.min(progress, 100))}%
            </span>
          </div>

          {/* 載入點動畫 */}
          <div className={styles.loadingDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
