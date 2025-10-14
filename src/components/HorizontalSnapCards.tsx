'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from './gsap';
import { useHorizontalScrollTrigger } from '../hooks/useScrollTriggerRefresh';
import styles from './HorizontalSnapCards.module.css';

export interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface HorizontalSnapCardsProps {
  initialCards?: CardData[];
  onCardClick?: (card: CardData) => void;
}

// 模擬資料
const mockCards: CardData[] = [
  {
    id: '1',
    title: 'React 專案',
    description: '使用 React 和 TypeScript 開發的現代化應用',
    image: '/picture/achievement_img_1759460471921.webp',
    category: 'Frontend',
  },
  {
    id: '2',
    title: 'Next.js 網站',
    description: '基於 Next.js 的全端解決方案',
    image: '/picture/achievement_img_1759461756480.webp',
    category: 'Full Stack',
  },
  {
    id: '3',
    title: 'Node.js API',
    description: 'RESTful API 和微服務架構',
    image: '/picture/achievement_img_1759913318760.webp',
    category: 'Backend',
  },
  {
    id: '4',
    title: 'Vue.js 應用',
    description: '響應式 Vue.js 單頁應用',
    image: '/picture/background.JPG',
    category: 'Frontend',
  },
  {
    id: '5',
    title: 'Python 專案',
    description: '數據分析和機器學習專案',
    image: '/picture/cat2.JPG',
    category: 'Data Science',
  },
];

const HorizontalSnapCards: React.FC<HorizontalSnapCardsProps> = ({
  initialCards = mockCards,
  onCardClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [isLoading, setIsLoading] = useState(false);

  // 使用水平滾動專用 Hook
  const { refreshAfterImages, refreshAfterDynamicContent } =
    useHorizontalScrollTrigger(containerRef, {
      onContentChange: () => {
        console.log('水平滾動容器內容變化，觸發 ScrollTrigger refresh');
      },
      debounceDelay: 300,
    });

  // 初始化水平滾動和 snap 效果
  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;

    // 設定水平滾動
    gsap.set(scrollContainer, {
      overflowX: 'auto',
      overflowY: 'hidden',
    });

    // 設定 snap 效果
    gsap.set(scrollContainer, {
      scrollBehavior: 'smooth',
    });

    // 監聽滾動事件，實現 snap 效果
    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = 300; // 卡片寬度 + margin
      const snapPosition = Math.round(scrollLeft / cardWidth) * cardWidth;

      if (Math.abs(scrollLeft - snapPosition) > 10) {
        gsap.to(scrollContainer, {
          scrollLeft: snapPosition,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 載入更多卡片
  const loadMoreCards = async () => {
    setIsLoading(true);

    // 模擬 API 載入
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newCards: CardData[] = [
      {
        id: `${Date.now()}-1`,
        title: '新專案 1',
        description: '動態載入的專案卡片',
        image: '/picture/coke_cam_taxi.JPG',
        category: 'New',
      },
      {
        id: `${Date.now()}-2`,
        title: '新專案 2',
        description: '另一個動態載入的專案',
        image: '/picture/background.JPG',
        category: 'New',
      },
    ];

    // 動態添加內容後 refresh ScrollTrigger
    await refreshAfterDynamicContent(async () => {
      setCards((prev) => [...prev, ...newCards]);
      console.log('載入了新的卡片');
    });

    setIsLoading(false);
  };

  // 移除卡片
  const removeCard = async (cardId: string) => {
    await refreshAfterDynamicContent(async () => {
      setCards((prev) => prev.filter((card) => card.id !== cardId));
      console.log(`移除了卡片: ${cardId}`);
    });
  };

  // 重新排列卡片
  const shuffleCards = async () => {
    await refreshAfterDynamicContent(async () => {
      setCards((prev) => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
      console.log('重新排列了卡片');
    });
  };

  return (
    <div className={styles.container} data-testid='horizontal-cards-container'>
      <div className={styles.header}>
        <h3>水平滾動卡片容器</h3>
        <div className={styles.controls}>
          <button
            onClick={loadMoreCards}
            disabled={isLoading}
            className='btn btn-sm btn-primary'
          >
            {isLoading ? '載入中...' : '載入更多'}
          </button>
          <button
            onClick={shuffleCards}
            className='btn btn-sm btn-outline-secondary'
          >
            重新排列
          </button>
        </div>
      </div>

      <div ref={containerRef} className={styles.scrollContainer}>
        <div ref={scrollRef} className={styles.scrollContent}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={styles.card}
              onClick={() => onCardClick?.(card)}
              data-testid={`card-${card.id}`}
            >
              <div className={styles.cardImage}>
                <img
                  src={card.image}
                  alt={card.title}
                  onLoad={() => {
                    // 圖片載入完成後 refresh
                    refreshAfterImages();
                  }}
                  onError={() => {
                    // 即使載入失敗也要 refresh
                    refreshAfterImages();
                  }}
                />
                <div className={styles.category}>{card.category}</div>
              </div>
              <div className={styles.cardContent}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCard(card.id);
                  }}
                  className={styles.removeBtn}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p>總共 {cards.length} 張卡片</p>
        <p>滾動查看所有卡片，支援 snap 效果</p>
      </div>
    </div>
  );
};

export default HorizontalSnapCards;
