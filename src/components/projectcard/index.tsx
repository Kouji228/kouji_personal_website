'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ProjectCardProps {
  img: string;
  description: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  img,
  description,
  link,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const button = buttonRef.current;

    // ✅ 滑鼠移入：卡片上升、陰影加深、圖片放大
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -15,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(image, {
        scale: 1.15,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(content, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (button) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'back.out(1.7)',
        });
      }
    };

    // ✅ 滑鼠移出：恢復原狀
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (button) {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className='rounded-lg shadow-md overflow-hidden'
      style={{
        backgroundColor: 'var(--background)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* 專案圖片 */}
      <div
        className='relative h-48 overflow-hidden'
        style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      >
        <div
          ref={imageRef}
          className='w-full h-full'
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* 專案內容 */}
      <div ref={contentRef} className='p-6'>
        <p
          className='text-sm md:text-base leading-relaxed mb-4'
          style={{ color: 'var(--text-color)' }}
        >
          {description}
        </p>

        {/* 連結按鈕 */}
        {link && link !== '#' ? (
          <a
            ref={buttonRef}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-4 py-2 rounded-lg transition-colors duration-300'
            style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color-2)',
            }}
          >
            查看專案 →
          </a>
        ) : (
          <span
            className='inline-block px-4 py-2 rounded-lg cursor-not-allowed'
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              color: 'var(--text-color)',
            }}
          >
            開發中...
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
