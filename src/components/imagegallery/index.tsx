'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import styles from './index.module.css';

gsap.registerPlugin(Flip);

interface GalleryItem {
  img: string;
  title: string;
  secondary: string;
  text: string;
}

interface ImageGalleryProps {
  items: GalleryItem[];
}

export default function ImageGallery({ items }: ImageGalleryProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const detailImageRef = useRef<HTMLImageElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // 初始化：隱藏詳情面板
    if (detailsRef.current) {
      gsap.set(detailsRef.current, { visibility: 'hidden' });
    }

    // 初始化：隱藏詳情內容
    if (detailContentRef.current) {
      gsap.set(detailContentRef.current, { yPercent: -100 });
    }

    // 重置畫廊背景
    if (galleryRef.current) {
      gsap.set(galleryRef.current, { backgroundColor: 'transparent' });
    }

    const galleryItems = itemRefs.current.filter(Boolean);

    // 確保所有圖片項目都已渲染
    if (galleryItems.length === items.length) {
      // 只在第一次時播放進場動畫
      if (!hasAnimatedRef.current) {
        gsap.set(galleryItems, { opacity: 1 });
        gsap.from(galleryItems, {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
        });
        hasAnimatedRef.current = true;
      } else {
        // 重新進入頁面時直接顯示
        gsap.set(galleryItems, { opacity: 1, clearProps: 'all' });
      }
    }

    // 清理函數：重置所有動畫和狀態
    return () => {
      gsap.killTweensOf([
        galleryRef.current,
        detailsRef.current,
        detailContentRef.current,
        detailImageRef.current,
        ...itemRefs.current.filter(Boolean),
      ]);

      // 重置狀態
      setActiveItem(null);
    };
  }, [items.length]);

  const showDetails = (index: number) => {
    if (activeItem !== null) {
      return hideDetails();
    }

    const item = itemRefs.current[index];
    if (!item || !detailsRef.current || !detailImageRef.current) return;

    const itemData = items[index];

    const onLoad = () => {
      if (!detailsRef.current || !detailImageRef.current || !item) return;

      // 將詳情面板定位到選中的項目上（縮小狀態）
      Flip.fit(detailsRef.current, item, {
        scale: true,
        fitChild: detailImageRef.current,
      });

      // 記錄當前狀態
      const state = Flip.getState(detailsRef.current);

      // 設置最終狀態（居中、全尺寸）
      gsap.set(detailsRef.current, { clearProps: true });
      gsap.set(detailsRef.current, {
        xPercent: -50,
        top: '50%',
        yPercent: -50,
        visibility: 'visible',
        overflow: 'hidden',
      });

      // 執行 Flip 動畫
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        scale: true,
        onComplete: () => {
          if (detailsRef.current) {
            gsap.set(detailsRef.current, { overflow: 'auto' });
          }
        },
      }).to(detailContentRef.current, { yPercent: 0 }, 0.2);

      if (detailImageRef.current) {
        detailImageRef.current.removeEventListener('load', onLoad);
      }
    };

    // 更新詳情內容
    if (detailImageRef.current) {
      detailImageRef.current.addEventListener('load', onLoad);
      detailImageRef.current.src = itemData.img;
    }

    // 淡出其他項目
    const galleryItems = itemRefs.current.filter(Boolean);
    gsap
      .to(galleryItems, {
        opacity: 0.3,
        stagger: {
          amount: 0.7,
          from: index,
          grid: 'auto',
        },
      })
      .kill(item);

    // 改變背景色
    gsap.to(galleryRef.current, {
      backgroundColor: 'rgba(136, 136, 136, 0.5)',
      duration: 1,
      delay: 0.3,
    });

    setActiveItem(index);
  };

  const hideDetails = () => {
    if (activeItem === null || !detailsRef.current || !detailImageRef.current)
      return;

    const item = itemRefs.current[activeItem];
    if (!item) return;

    gsap.set(detailsRef.current, { overflow: 'hidden' });

    // 記錄當前狀態
    const state = Flip.getState(detailsRef.current);

    // 將詳情縮小到原始項目位置
    Flip.fit(detailsRef.current, item, {
      scale: true,
      fitChild: detailImageRef.current,
    });

    // 動畫：內容滑出、項目淡入、背景恢復
    const tl = gsap.timeline();
    tl.set(detailsRef.current, { overflow: 'hidden' })
      .to(detailContentRef.current, { yPercent: -100 })
      .to(itemRefs.current.filter(Boolean), {
        opacity: 1,
        stagger: {
          amount: 0.7,
          from: activeItem,
          grid: 'auto',
        },
      })
      .to(galleryRef.current, { backgroundColor: 'transparent' }, '<');

    // Flip 動畫
    Flip.from(state, {
      scale: true,
      duration: 0.5,
      delay: 0.2,
      onInterrupt: () => tl.kill(),
    }).set(detailsRef.current, { visibility: 'hidden' });

    setActiveItem(null);
  };

  return (
    <>
      <div ref={galleryRef} className={styles.gallery}>
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={styles.item}
            onClick={() => showDetails(index)}
          >
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>

      <div ref={detailsRef} className={styles.detail} onClick={hideDetails}>
        <img ref={detailImageRef} alt='' />
        <div ref={detailContentRef} className={styles.content}>
          <div className={styles.title}>
            {activeItem !== null ? items[activeItem].title : ''}
          </div>
          <div className={styles.secondary}>
            {activeItem !== null ? items[activeItem].secondary : ''}
          </div>
          <div className={styles.description}>
            {activeItem !== null ? items[activeItem].text : ''}
          </div>
        </div>
      </div>
    </>
  );
}
