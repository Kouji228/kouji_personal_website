'use client';

import React from 'react';
import HorizontalSnapCards, {
  type CardData,
} from '../../components/HorizontalSnapCards';

const HorizontalCardsPage: React.FC = () => {
  const handleCardClick = (card: CardData) => {
    console.log('點擊了卡片:', card);
    alert(`您點擊了: ${card.title}`);
  };

  return (
    <div className='container py-5'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='text-center mb-5'>水平滾動卡片容器示範</h1>
          <p className='text-center text-muted mb-5'>
            這個範例展示了如何使用 useHorizontalScrollTrigger hook
            來管理水平滾動容器的 ScrollTrigger refresh。
          </p>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <HorizontalSnapCards onCardClick={handleCardClick} />
        </div>
      </div>

      <div className='row mt-5'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h5>功能說明</h5>
            </div>
            <div className='card-body'>
              <ul className='list-unstyled'>
                <li>
                  ✅ <strong>水平滾動</strong>: 支援水平滾動查看所有卡片
                </li>
                <li>
                  ✅ <strong>Snap 效果</strong>: 滾動時自動對齊到最近的卡片
                </li>
                <li>
                  ✅ <strong>動態內容</strong>: 支援動態添加/移除卡片
                </li>
                <li>
                  ✅ <strong>圖片載入</strong>: 圖片載入完成後自動 refresh
                  ScrollTrigger
                </li>
                <li>
                  ✅ <strong>尺寸監聽</strong>: 容器尺寸變化時自動 refresh
                </li>
                <li>
                  ✅ <strong>內容監聽</strong>: 卡片內容變化時自動 refresh
                </li>
                <li>
                  ✅ <strong>響應式設計</strong>: 在不同螢幕尺寸下都能正常運作
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h5>技術實作</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded'>
                {`// 使用 useHorizontalScrollTrigger hook
const { refreshAfterImages, refreshAfterDynamicContent } = useHorizontalScrollTrigger(
  containerRef,
  {
    onContentChange: () => {
      console.log('內容變化，觸發 ScrollTrigger refresh');
    },
    debounceDelay: 300,
  }
);

// 動態添加內容後 refresh
await refreshAfterDynamicContent(async () => {
  setCards(prev => [...prev, ...newCards]);
});

// 圖片載入完成後 refresh
<img onLoad={() => refreshAfterImages()} />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardsPage;
