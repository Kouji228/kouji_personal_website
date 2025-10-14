'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { gsap, GsapNav, GsapBottomTab } from '../components/gsap';
import { meta } from '../content_option';
import StructuredData from '../components/StructuredData';
import LoadingScreen from '../components/LoadingScreen';
import Home from '../sections/Home';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

export default function SinglePageApp() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // 頁面初次載入時檢查 location.hash 並自動滾動
    const handleInitialHash = () => {
      if (typeof window === 'undefined') return;

      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // 等待 DOM 完全載入後再執行滾動
          setTimeout(() => {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: targetElement,
                offsetY: 72, // 使用 --nav-h 變數值
              },
              ease: 'power2.inOut',
            });
          }, 100);
        }
      }
    };

    // 立即執行一次（如果 DOM 已準備好）
    handleInitialHash();

    // 如果 DOM 還沒準備好，等待 load 事件
    if (document.readyState === 'loading') {
      window.addEventListener('load', handleInitialHash);
      return () => window.removeEventListener('load', handleInitialHash);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
      </Head>

      {/* 載入畫面 */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* 結構化數據 - 提供給搜尋引擎 */}
      {isClient && (
        <>
          <StructuredData type='Person' data={{}} />
          <StructuredData type='WebSite' data={{}} />
          <StructuredData
            type='WebPage'
            data={{
              title: meta.title,
              description: meta.description,
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kouji-song.dev',
            }}
          />
        </>
      )}

      {/* 桌面導航 */}
      <GsapNav />

      {/* 手機底部導航 */}
      <GsapBottomTab />

      {/* 主要內容區域 */}
      <main>
        {/* 首屏語義化內容 - 確保深連結可索引 */}
        <div className='sr-only' aria-hidden='true'>
          <h1>Kouji Song - Front-End Developer</h1>
          <p>
            我是宋平浩（Kouji Song），前端工程師，專精 React.js/Next.js
            開發。擁有廣告數據分析背景，具備購物車、會員系統與 API 串接經驗。
          </p>
          <nav aria-label='主要導航'>
            <ul>
              <li>
                <a href='#home'>首頁</a>
              </li>
              <li>
                <a href='#about'>關於我</a>
              </li>
              <li>
                <a href='#projects'>專案作品</a>
              </li>
              <li>
                <a href='#contact'>聯絡我</a>
              </li>
            </ul>
          </nav>
        </div>

        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
