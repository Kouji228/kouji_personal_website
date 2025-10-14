'use client';

import React, { useRef } from 'react';
import { gsap } from '../components/gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { dataabout, worktimeline, skills } from '../content_option';
import styles from '../app/about/page.module.css';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillTitlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 創建 ScrollTrigger 動畫
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // 技能標題動畫
      skillTitlesRef.current.forEach((title) => {
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      });

      // 技能卡片動畫 - stagger 效果
      const validCards = skillCardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        timelineRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='about'
      ref={sectionRef}
      className={`py-5 ${styles.sectionWithExtraPadding}`}
      data-testid='about-section'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2 ref={titleRef} className='mb-5'>
              {dataabout.title}
            </h2>
          </div>
        </div>

        {/* 個人介紹 */}
        <div className='row mb-5'>
          <div className='col-12'>
            <div ref={aboutRef}>
              <p className='lead font-accent mb-0'>{dataabout.aboutme}</p>
            </div>
          </div>
        </div>

        {/* 技能展示區塊 */}
        <div ref={skillsRef} className='mb-5'>
          <h2 className='mb-5' style={{ color: 'var(--text-color)' }}>
            My Stack
          </h2>

          {/* 技能分類區塊：每個分類包含標題和技能 */}
          <div className={`${styles.skillsContainer} space-y-8`}>
            {/* FRONTEND 分類 */}
            <div className='grid grid-cols-12 gap-4 items-start'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[0] = el;
                }}
                className='col-span-12 md:col-span-3 whitespace-nowrap'
                style={{
                  color: 'var(--secondary-color)',
                  fontSize: '48px',
                }}
              >
                FRONTEND
              </h3>
              <div className='col-span-12 md:col-span-9 flex flex-wrap gap-4 justify-start'>
                {skills.frontend.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[index] = el;
                    }}
                    className={`${styles.skillCard} flex flex-row items-center justify-start gap-3 p-3 rounded-md`}
                  >
                    {skill.icon && (
                      <skill.icon
                        size={40}
                        style={{
                          color: skill.color,
                          width: '40px',
                          height: '40px',
                          minWidth: '40px',
                          minHeight: '40px',
                        }}
                      />
                    )}
                    <span
                      className=''
                      style={{
                        color: 'var(--text-color)',
                        fontSize: '24px',
                        lineHeight: '1',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BACKEND 分類 */}
            <div className='grid grid-cols-12 gap-4 items-start'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[1] = el;
                }}
                className='col-span-12 md:col-span-3 whitespace-nowrap'
                style={{
                  color: 'var(--secondary-color)',
                  fontSize: '48px',
                }}
              >
                BACKEND
              </h3>
              <div className='col-span-12 md:col-span-9 flex flex-wrap gap-4 justify-start'>
                {skills.backend.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[skills.frontend.length + index] =
                        el;
                    }}
                    className={`${styles.skillCard} flex flex-row items-center justify-start gap-3 p-3 rounded-md`}
                  >
                    {skill.icon && (
                      <skill.icon
                        size={40}
                        style={{
                          color: skill.color,
                          width: '40px',
                          height: '40px',
                          minWidth: '40px',
                          minHeight: '40px',
                        }}
                      />
                    )}
                    <span
                      className=''
                      style={{
                        color: 'var(--text-color)',
                        fontSize: '24px',
                        lineHeight: '1',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TOOLS 分類 */}
            <div className='grid grid-cols-12 gap-4 items-start'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[2] = el;
                }}
                className='col-span-12 md:col-span-3 whitespace-nowrap'
                style={{
                  color: 'var(--secondary-color)',
                  fontSize: '48px',
                }}
              >
                TOOLS
              </h3>
              <div className='col-span-12 md:col-span-9 flex flex-wrap gap-4 justify-start'>
                {skills.tools.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillCardsRef.current[
                        skills.frontend.length + skills.backend.length + index
                      ] = el;
                    }}
                    className={`${styles.skillCard} flex flex-row items-center justify-start gap-3 p-3 rounded-md`}
                  >
                    {skill.icon && (
                      <skill.icon
                        size={40}
                        style={{
                          color: skill.color,
                          width: '40px',
                          height: '40px',
                          minWidth: '40px',
                          minHeight: '40px',
                        }}
                      />
                    )}
                    <span
                      className=''
                      style={{
                        color: 'var(--text-color)',
                        fontSize: '24px',
                        lineHeight: '1',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STUDYING 分類 */}
            <div className='grid grid-cols-12 gap-4 items-start'>
              <h3
                ref={(el) => {
                  skillTitlesRef.current[3] = el;
                }}
                className='col-span-12 md:col-span-3 whitespace-nowrap'
                style={{
                  color: 'var(--secondary-color)',
                  fontSize: '48px',
                }}
              >
                PROCESSING
              </h3>
              <div className='col-span-12 md:col-span-9 flex flex-wrap gap-4 justify-start'>
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
                    className={`${styles.skillStudying} flex flex-row items-center justify-start gap-2 p-2 rounded-md`}
                  >
                    {skill.icon && (
                      <skill.icon
                        size={40}
                        style={{
                          color: skill.color,
                          width: '40px',
                          height: '40px',
                          minWidth: '40px',
                          minHeight: '40px',
                        }}
                      />
                    )}
                    <span
                      className=''
                      style={{
                        color: 'var(--text-color)',
                        fontSize: '24px',
                        lineHeight: '1',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 工作經歷和服務項目 */}
        <div className='row'>
          <div className='col-lg-6'>
            <div ref={timelineRef}>
              <h2 className='mb-4' style={{ color: 'var(--text-color)' }}>
                Experience
              </h2>
              <div className='timeline'>
                {worktimeline.map((work, index) => (
                  <div key={index} className='timeline-item mb-4'>
                    <div className='timeline-marker'></div>
                    <div className='timeline-content'>
                      <h5
                        className='mb-1'
                        style={{ color: 'var(--text-color)' }}
                      >
                        {work.jobtitle}
                      </h5>
                      <p
                        className='mb-1'
                        style={{ color: 'var(--text-color-2)' }}
                      >
                        {work.where}
                      </p>
                      <small style={{ color: 'var(--text-color-2)' }}>
                        {work.date}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
