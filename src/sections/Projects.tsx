'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from '../components/gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { dataportfolio } from '../content_option';
import ProjectCard from '../components/projectcard';
import { useScrollTriggerRefresh } from '../hooks/useScrollTriggerRefresh';
import styles from '../app/project/page.module.css';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 使用 ScrollTrigger refresh hook
  const { refreshAfterImages, refreshAfterDynamicContent } =
    useScrollTriggerRefresh({
      containerRef: cardsRef,
      observeResize: true,
      onContentChange: () => {
        console.log('Projects 內容發生變化，觸發 ScrollTrigger refresh');
      },
    });

  // 模擬資料載入完成
  useEffect(() => {
    const loadData = async () => {
      // 模擬 API 載入延遲
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsDataLoaded(true);

      // 資料載入完成後 refresh ScrollTrigger
      await refreshAfterDynamicContent(async () => {
        console.log('Projects 資料載入完成');
      });
    };

    loadData();
  }, [refreshAfterDynamicContent]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 標題動畫
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

      // 卡片進場動畫 - 使用 stagger 效果
      gsap.fromTo(
        cardsRef.current?.children,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.2, // 每個卡片間隔 0.2 秒
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: true, // 只觸發一次
          },
        },
      );

      // 卡片懸停動畫
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          const cardElement = card as HTMLElement;

          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='projects'
      ref={sectionRef}
      className={`py-5 ${styles.sectionWithExtraPadding}`}
      data-testid='projects-section'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2 ref={titleRef} className='mb-5'>
              Projects
            </h2>
          </div>
        </div>

        <div ref={cardsRef}>
          {isDataLoaded ? (
            (() => {
              // 按年份分組專案
              const groupedProjects = dataportfolio.reduce((acc, project) => {
                const year = project.year || 2025;
                if (!acc[year]) {
                  acc[year] = [];
                }
                acc[year].push(project);
                return acc;
              }, {} as Record<number, typeof dataportfolio>);

              // 按年份排序（2025 在前，2024 在後）
              const sortedYears = Object.keys(groupedProjects)
                .map(Number)
                .sort((a, b) => b - a);

              return sortedYears.map((year) => (
                <div key={year} className='mb-5'>
                  {/* 年份標題 */}
                  <div className='row mb-4'>
                    <div className='col-12'>
                      <h3
                        className='mb-0'
                        style={{ color: 'var(--text-color)' }}
                      >
                        {year}
                      </h3>
                      <hr
                        className='mt-2'
                        style={{ borderColor: 'var(--secondary-color)' }}
                      />
                    </div>
                  </div>

                  {/* 該年份的專案 */}
                  <div className='row g-4'>
                    {groupedProjects[year].map((project, index) => (
                      <div key={`${year}-${index}`} className='col-lg-6'>
                        <ProjectCard
                          img={project.img}
                          description={project.description}
                          link={project.link}
                          year={project.year}
                          onImageLoad={refreshAfterImages}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()
          ) : (
            <div className='col-12 text-center py-5'>
              <div
                className='spinner-border'
                style={{ color: 'var(--secondary-color)' }}
                role='status'
              >
                <span className='visually-hidden'>載入中...</span>
              </div>
              <p className='mt-3'>載入專案資料中...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
