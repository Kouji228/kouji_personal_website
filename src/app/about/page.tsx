'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dataabout, worktimeline, skills } from '../../content_option';
import styles from './page.module.css';

// ✅ 註冊 GSAP ScrollTrigger 插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const [activeTab, setActiveTab] = useState('about');

  // ✅ GSAP refs
  const aboutSectionRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const skillTitlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ✅ 自我介紹區塊：滾動時從左滑入
    gsap.fromTo(
      aboutSectionRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    );

    // ✅ 工作經驗區塊：滾動時從右滑入
    gsap.fromTo(
      experienceSectionRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: experienceSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    );

    // ✅ 技能卡片動畫：參考範例的 scrub 動畫方式
    skillCardsRef.current.forEach((card, index) => {
      if (card) {
        // ✅ 初始狀態：透明，向下偏移
        gsap.set(card, { opacity: 0, y: 50 });

        // ✅ 技能卡片動畫：純粹 ScrollTrigger 控制
        ScrollTrigger.create({
          trigger: card,
          start: 'top 95%', // ✅ 卡片頂部進入視窗 95% 時開始
          end: 'bottom top', // ✅ 卡片底部離開視窗頂部時觸發
          onEnter: () => {
            // ✅ 進入時：正常顏色出現
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.15,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            // ✅ 保持顯示狀態
          },
          onEnterBack: () => {
            // ✅ 向上滾動重新進入：快速恢復
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.1,
              ease: 'power2.out',
            });
          },
        });

        // ✅ 額外的 ScrollTrigger：專門處理向上滾動消失
        ScrollTrigger.create({
          trigger: card,
          start: 'bottom bottom', // ✅ 卡片底部碰到視窗底部時開始
          end: 'top top', // ✅ 卡片頂部離開視窗頂部時結束
          onLeaveBack: () => {
            // ✅ 向上滾動離開：立即向下消失
            gsap.to(card, {
              opacity: 0,
              y: '5rem',
              duration: 0.05,
              ease: 'power2.in',
              immediateRender: true,
            });
          },
        });
      }
    });

    // ✅ 技能標題動畫：與技能卡片同步
    skillTitlesRef.current.forEach((title, index) => {
      if (title) {
        // ✅ 初始狀態：透明，向左偏移
        gsap.set(title, { opacity: 0, x: -50 });

        ScrollTrigger.create({
          trigger: title,
          start: 'top 95%', // ✅ 與技能卡片同步的觸發點
          end: 'bottom 20%',
          onEnter: () => {
            // ✅ 標題從左滑入（直接使用 ScrollTrigger 動畫）
            gsap.to(title, {
              opacity: 1,
              x: 0,
              duration: 0.05,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            // ✅ 保持顯示狀態
          },
          onLeaveBack: () => {
            // ✅ 向上滾動離開：向左消失
            gsap.to(title, {
              opacity: 0,
              x: -50,
              duration: 0.1,
              ease: 'power2.in',
            });
          },
        });
      }
    });

    // ✅ 清理 ScrollTrigger（避免記憶體洩漏）
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    { id: 'about', label: '關於我', icon: '👤' },
    { id: 'experience', label: '工作經驗', icon: '💼' },
    { id: 'skills', label: '技能', icon: '🛠️' },
  ];

  return (
    <div className='min-h-screen flex flex-col items-center p-6 md:p-12'>
      <div className='max-w-5xl w-full'>
        {/* 頁面標題 */}
        <motion.header
          className='text-center mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className='text-4xl md:text-5xl font-bold mb-4'
            style={{ color: 'var(--text-color)' }}
          >
            {dataabout.title}
          </h1>
        </motion.header>

        {/* 自我介紹區塊 */}
        <section
          id='about'
          ref={aboutSectionRef}
          className='p-8 rounded-lg mb-12'
        >
          <h2 className='text-2xl font-bold mb-4 flex items-center'>關於我</h2>
          <p className='leading-relaxed whitespace-pre-line text-base md:text-lg'>
            {dataabout.aboutme}
          </p>
        </section>

        {/* 工作經驗區塊 */}
        <section
          id='experience'
          ref={experienceSectionRef}
          className='p-8 rounded-lg  mb-12'
        >
          <h2
            className='text-2xl font-bold mb-6 flex items-center'
            style={{ color: 'var(--text-color)' }}
          >
            工作經驗
          </h2>
          <div className='space-y-6'>
            {worktimeline.map((work, index) => (
              <div
                key={index}
                className='pl-6 py-2'
                style={{ borderLeft: '4px solid var(--secondary-color)' }}
              >
                <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-2'>
                  <h3
                    className='text-xl font-bold'
                    style={{ color: 'var(--text-color)' }}
                  >
                    {work.jobtitle}
                  </h3>
                  <span
                    className='text-sm mt-1 md:mt-0'
                    style={{ color: 'var(--text-color)', opacity: 0.7 }}
                  >
                    {work.date}
                  </span>
                </div>
                <p
                  className='font-medium'
                  style={{ color: 'var(--text-color)', opacity: 0.8 }}
                >
                  {work.where}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 技能區塊 */}
        <section
          id='skills'
          ref={skillsSectionRef}
          className='p-8 rounded-lg mb-12'
        >
          <h2 className='text-2xl font-bold mb-8 flex items-center '>
            MY STACK
          </h2>

          {/* 技能分類區塊：每個分類包含標題和技能 */}
          <div className='space-y-12'>
            {/* FRONTEND 分類 */}
            <div className='flex flex-col lg:flex-row items-center gap-8'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[0] = el;
                }}
                className='text-2xl font-bold whitespace-nowrap lg:min-w-[120px]'
                style={{ color: 'var(--secondary-color)' }}
              >
                FRONTEND
              </h3>
              <div className='flex flex-wrap gap-4'>
                {skills.frontend.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[index] = el;
                    }}
                    className='flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <skill.icon
                      className='mb-2'
                      style={{
                        fontSize: '4rem',
                        color: skill.color,
                      }}
                    />
                    <span
                      className='text-sm font-medium text-center'
                      style={{ color: 'var(--text-color)' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BACKEND 分類 */}
            <div className='flex flex-col lg:flex-row items-center gap-8'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[1] = el;
                }}
                className='text-2xl font-bold whitespace-nowrap lg:min-w-[120px]'
                style={{ color: 'var(--secondary-color)' }}
              >
                BACKEND
              </h3>
              <div className='flex flex-wrap gap-4'>
                {skills.backend.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[skills.frontend.length + index] =
                        el;
                    }}
                    className='flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <skill.icon
                      className='mb-2'
                      style={{
                        fontSize: '5rem',
                        color: skill.color,
                      }}
                    />
                    <span
                      className='text-sm font-medium text-center'
                      style={{ color: 'var(--text-color)' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TOOLS 分類 */}
            <div className='flex flex-col lg:flex-row items-center gap-8'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[2] = el;
                }}
                className='text-2xl font-bold whitespace-nowrap lg:min-w-[120px]'
                style={{ color: 'var(--secondary-color)' }}
              >
                TOOLS
              </h3>
              <div className='flex flex-wrap gap-4'>
                {skills.tools.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[
                        skills.frontend.length + skills.backend.length + index
                      ] = el;
                    }}
                    className='flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <skill.icon
                      className='mb-2'
                      style={{
                        fontSize: '5rem',
                        color: skill.color,
                      }}
                    />
                    <span
                      className='text-sm font-medium text-center'
                      style={{ color: 'var(--text-color)' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STUDYING 分類 */}
            <div className='flex flex-col lg:flex-row items-center gap-8'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[3] = el;
                }}
                className='text-2xl font-bold whitespace-nowrap lg:min-w-[120px]'
                style={{ color: 'var(--secondary-color)' }}
              >
                STUDYING
              </h3>
              <div className='flex flex-wrap gap-4'>
                {skills.studying.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[
                        skills.frontend.length +
                          skills.backend.length +
                          skills.tools.length +
                          index
                      ] = el;
                    }}
                    className='flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 opacity-70'
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <skill.icon
                      className='mb-2'
                      style={{
                        fontSize: '5rem',
                        color: skill.color,
                      }}
                    />
                    <span
                      className='text-sm font-medium text-center'
                      style={{ color: 'var(--text-color)' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 返回首頁按鈕 */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link href='/'>
            <div className={`${styles.backBtn} btn`}>
              ← 返回首頁
              <div className={styles.ringOne}></div>
              <div className={styles.ringTwo}></div>
              <div className={styles.ringThree}></div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
