# 個人網站開發學習紀錄

## 📚 目錄

1. [專案概述與學習目標](#專案概述與學習目標)
2. [技術棧基礎知識](#技術棧基礎知識)
3. [專案架構設計](#專案架構設計)
4. [SEO 優化學習與實作](#seo-優化學習與實作)
5. [字體系統實作學習](#字體系統實作學習)
6. [載入畫面功能開發](#載入畫面功能開發)
7. [單頁式架構設計學習](#單頁式架構設計學習)
8. [ScrollTrigger 動畫系統學習](#scrolltrigger-動畫系統學習)
9. [轉址與深連結功能實作](#轉址與深連結功能實作)
10. [測試策略學習與實作](#測試策略學習與實作)
11. [Bug 修復與學習心得](#bug-修復與學習心得)
12. [部署與維護學習](#部署與維護學習)

---

## 專案概述與學習目標

### 🎯 學習目標

這個專案是我學習現代前端開發技術的實踐作品，主要學習目標包括：

- **掌握 Next.js 15**：學習 App Router、Server Components、Client Components 等新特性
- **深入理解 TypeScript**：在實際專案中學習型別系統和介面設計
- **學習動畫技術**：掌握 GSAP 和 ScrollTrigger 的進階用法
- **SEO 優化實作**：學習搜尋引擎優化的各種技術和最佳實踐
- **測試驅動開發**：使用 Playwright 學習 E2E 測試的撰寫
- **響應式設計**：深入理解 CSS Grid、Flexbox 和媒體查詢

### 🛠️ 技術棧學習重點

#### Next.js 15 學習重點

- **App Router**：新的路由系統，支援巢狀路由和並行渲染
- **Server Components**：服務端渲染組件，提升效能
- **Client Components**：客戶端互動組件，使用 'use client' 指令
- **Middleware**：請求攔截和中間件處理
- **API Routes**：後端 API 開發

#### TypeScript 學習重點

- **型別定義**：介面 (Interface) 和型別別名 (Type Alias)
- **泛型 (Generics)**：可重用的型別組件
- **聯合型別 (Union Types)**：多種型別的組合
- **型別守衛 (Type Guards)**：運行時型別檢查

#### GSAP 動畫學習重點

- **Timeline**：複雜動畫序列管理
- **ScrollTrigger**：滾動觸發動畫
- **Easing Functions**：動畫緩動函數
- **Performance Optimization**：動畫效能優化

### 📚 學習資源

- [Next.js 官方文檔](https://nextjs.org/docs)
- [TypeScript 官方手冊](https://www.typescriptlang.org/docs/)
- [GSAP 學習中心](https://greensock.com/learning/)
- [MDN Web 文檔](https://developer.mozilla.org/)

---

## 技術棧基礎知識

### 🌐 Next.js 15 基礎概念

#### App Router vs Pages Router

```typescript
// App Router (Next.js 13+) - 新架構
app/
├── layout.tsx          // 根佈局
├── page.tsx           // 首頁
├── about/
│   └── page.tsx       // /about 頁面
└── api/
    └── users/
        └── route.ts   // /api/users API

// Pages Router (舊架構)
pages/
├── _app.tsx           // 全域 App 組件
├── index.tsx          // 首頁
├── about.tsx          // /about 頁面
└── api/
    └── users.ts       // /api/users API
```

#### Server Components vs Client Components

```typescript
// Server Component (預設) - 在服務端渲染
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}

// Client Component - 在客戶端渲染，可互動
('use client');
import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 📝 TypeScript 基礎概念

#### 型別定義

```typescript
// 介面定義
interface User {
  id: number;
  name: string;
  email?: string; // 可選屬性
}

// 型別別名
type Status = 'loading' | 'success' | 'error';

// 泛型
interface ApiResponse<T> {
  data: T;
  status: Status;
}

// 聯合型別
type Theme = 'light' | 'dark';
```

#### 型別守衛

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number) {
  if (isString(value)) {
    // TypeScript 知道這裡 value 是 string
    return value.toUpperCase();
  }
  return value.toString();
}
```

### 🎨 CSS 模組化概念

#### CSS Modules vs 全域 CSS

```css
/* styles.module.css - CSS Modules */
.container {
  padding: 20px;
  background: #f5f5f5;
}

.title {
  font-size: 24px;
  color: #333;
}
```

```typescript
// 在組件中使用
import styles from './styles.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>標題</h1>
    </div>
  );
}
```

### 🎬 GSAP 動畫基礎

#### 基本動畫

```typescript
import { gsap } from 'gsap';

// 簡單動畫
gsap.to('.element', {
  x: 100,
  y: 50,
  duration: 1,
  ease: 'power2.out',
});

// 時間軸動畫
const tl = gsap.timeline();
tl.to('.element1', { x: 100, duration: 1 }).to(
  '.element2',
  { y: 50, duration: 1 },
  '-=0.5',
); // 重疊 0.5 秒
```

#### ScrollTrigger 基礎

```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.from('.element', {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
});
```

---

## 專案架構設計

### 📁 檔案結構

```
src/
├── app/
│   ├── layout.tsx              # 根佈局
│   ├── page.tsx                # 主頁面（單頁式）
│   ├── globals.css             # 全域樣式
│   ├── fonts.css               # 字體定義
│   ├── [...slug]/route.ts      # 動態路由（轉址功能）
│   └── horizontal-cards/       # 示範頁面
├── components/
│   ├── gsap/                   # GSAP 相關組件
│   │   ├── GsapNav.tsx         # 桌面導航
│   │   ├── GsapBottomTab.tsx   # 手機底部導航
│   │   └── useGsapSpy.ts       # ScrollTrigger 監控
│   ├── LoadingScreen.tsx       # 載入畫面
│   ├── StructuredData.tsx      # SEO 結構化數據
│   └── HorizontalSnapCards.tsx # 水平滾動卡片
├── sections/                   # 頁面區塊
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── hooks/                      # 自定義 Hooks
│   ├── useIsomorphicLayoutEffect.ts
│   └── useScrollTriggerRefresh.ts
├── utils/                      # 工具函數
│   └── scrollTriggerUtils.ts
└── middleware.ts               # 轉址中間件
```

### 🎨 設計系統

#### CSS 變數定義

```css
:root {
  /* 顏色系統 */
  --background: #ffffff;
  --foreground: #000000;
  --primary-color: #2c3e50;
  --secondary-color: #3498db;

  /* 字體系統 */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
  --font-accent: 'Junicode', 'Times New Roman', serif;
  --font-accent-condensed: 'Junicode Condensed', 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* 間距系統 */
  --nav-h: 72px; /* 導航列高度 */
}
```

---

## SEO 優化學習與實作

### 🔍 什麼是 SEO？

SEO (Search Engine Optimization) 是搜尋引擎優化，目的是讓網站在搜尋結果中排名更高。主要包含：

- **技術 SEO**：網站結構、載入速度、行動友善性
- **內容 SEO**：關鍵字優化、內容品質、結構化數據
- **外部 SEO**：反向連結、社交媒體分享

### 📊 結構化數據學習

#### 什麼是結構化數據？

結構化數據是告訴搜尋引擎網頁內容含義的標準化格式，使用 Schema.org 詞彙表。

#### 常見的 Schema 類型

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Software Engineer",
  "url": "https://johndoe.com"
}
```

### 🔍 結構化數據實作 (StructuredData.tsx)

#### 功能說明

提供三種 Schema.org 結構化數據類型：

1. **Person Schema**：個人資訊和職業
2. **WebSite Schema**：網站資訊和搜尋功能
3. **WebPage Schema**：頁面資訊和麵包屑

#### 使用方式

```tsx
// 在 page.tsx 中使用
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
```

#### 配置環境變數

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://kouji-song.dev
GOOGLE_VERIFICATION=your-google-verification-code
YANDEX_VERIFICATION=your-yandex-verification-code
YAHOO_VERIFICATION=your-yahoo-verification-code
```

### 📊 SEO 特色功能

#### 1. 深連結 SEO 優化

```html
<!-- 首屏語義化內容 -->
<div className="sr-only" aria-hidden="true">
  <h1>Kouji Song - Front-End Developer</h1>
  <p>我是宋平浩（Kouji Song），前端工程師...</p>
  <nav aria-label="主要導航">
    <ul>
      <li><a href="#home">首頁</a></li>
      <li><a href="#about">關於我</a></li>
      <li><a href="#projects">專案作品</a></li>
      <li><a href="#contact">聯絡我</a></li>
    </ul>
  </nav>
</div>
```

#### 2. robots.txt 配置

```
User-agent: *
Allow: /
Allow: /#home
Allow: /#about
Allow: /#projects
Allow: /#contact
Disallow: /test-redirects
Disallow: /api/
Sitemap: https://kouji-song.dev/sitemap.xml
```

#### 3. 自動生成 Sitemap

```typescript
// app/sitemap.ts
export default function sitemap() {
  const baseUrl = 'https://kouji-song.dev';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // ... 其他頁面
  ];
}
```

---

## 字體系統實作學習

### 🎨 字體基礎知識

#### 字體格式比較

- **WOFF2**：最新格式，壓縮率最高，支援最好
- **WOFF**：較舊格式，廣泛支援
- **TTF/OTF**：原始格式，檔案較大
- **EOT**：IE 專用格式，已過時

#### 字體載入策略

```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2'), url('font.woff') format('woff');
  font-display: swap; /* 關鍵：避免文字閃爍 */
  font-weight: 400;
  font-style: normal;
}
```

#### font-display 屬性說明

- `auto`：瀏覽器預設行為
- `block`：隱藏文字直到字體載入完成
- `swap`：立即顯示備用字體，字體載入後替換
- `fallback`：短暫隱藏後顯示備用字體
- `optional`：字體載入失敗時不替換

### 🎨 Junicode 字體整合學習

#### 字體檔案結構

```
public/fonts/
├── junicode-regular-webfont.woff2
├── junicode-bold-webfont.woff2
├── junicode-italic-webfont.woff2
├── junicode-bolditalic-webfont.woff2
├── junicode-regularcondensed-webfont.woff2
└── stylesheet.css
```

#### 字體載入策略

```css
/* fonts.css */
@font-face {
  font-family: 'Junicode';
  src: url('/fonts/junicode-regular-webfont.woff2') format('woff2'), url('/fonts/junicode-regular-webfont.woff')
      format('woff');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Junicode';
  src: url('/fonts/junicode-bold-webfont.woff2') format('woff2'), url('/fonts/junicode-bold-webfont.woff')
      format('woff');
  font-display: swap;
  font-weight: 700;
  font-style: normal;
}
```

#### 全域字體設定

```css
/* globals.css */
/* 全域標題字體設置 - 強制應用 Junicode */
h1,
h2,
h3,
h4,
h5,
h6,
.text-center h1,
.text-center h2,
.text-center h3,
.container h1,
.container h2,
.container h3,
section h1,
section h2,
section h3,
.mb-1x,
.mb-5 {
  font-family: 'Junicode', 'Times New Roman', serif !important;
  font-weight: 700 !important;
}

/* 確保首頁標題使用 Junicode */
.introSec .text h1,
.introSec .text h2,
.introSec .text h3 {
  font-family: 'Junicode', 'Times New Roman', serif !important;
  font-weight: 700 !important;
}
```

---

## 載入畫面功能開發

### ⚡ 載入畫面設計概念

#### 為什麼需要載入畫面？

- **提升用戶體驗**：避免空白頁面造成的焦慮
- **品牌展示**：在載入時展示品牌形象
- **技術需求**：等待資源載入完成
- **動畫效果**：增加視覺吸引力

#### 載入畫面設計原則

- **簡潔明瞭**：避免過於複雜的動畫
- **快速載入**：載入畫面本身要輕量
- **進度指示**：讓用戶知道載入進度
- **品牌一致性**：符合整體設計風格

### ⚡ LoadingScreen 組件實作

#### 功能特色

- **旋轉動畫**：雙層圓圈旋轉效果
- **脈衝波紋**：三層柔和脈衝波紋效果
- **漸變進度條**：動態漸變色彩進度條
- **載入點動畫**：三個跳動的載入點

#### 使用方式

```tsx
import LoadingScreen from '../components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {/* 其他內容 */}
    </>
  );
}
```

#### 動畫時序

1. **0-0.3s**：標題淡入
2. **0.3-0.6s**：副標題淡入
3. **0.6-0.9s**：進度條淡入
4. **0.9-1.2s**：載入點淡入
5. **2.5s+**：載入完成，淡出效果

---

## 單頁式架構設計學習

### 🏗️ 單頁式應用 (SPA) 概念

#### 什麼是 SPA？

單頁式應用是指整個應用只有一個 HTML 頁面，通過 JavaScript 動態更新內容，而不是載入新的頁面。

#### SPA 的優缺點

**優點：**

- 流暢的用戶體驗，無頁面重新載入
- 更快的導航速度
- 更好的動畫效果
- 減少伺服器負載

**缺點：**

- SEO 較困難（需要額外處理）
- 初始載入時間較長
- 瀏覽器歷史記錄管理複雜
- 記憶體使用較多

#### 深連結 (Deep Linking) 挑戰

在 SPA 中，所有內容都在同一頁面，需要特殊處理：

- URL 變化不重新載入頁面
- 瀏覽器前進/後退按鈕
- 直接訪問特定區塊的連結
- SEO 友善的 URL 結構

### 🏗️ 架構設計學習

#### 1. GSAP 插件管理

```typescript
// components/gsap-plugins.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger, ScrollToPlugin };
```

#### 2. 平滑滾動導航

```tsx
// components/GsapHashLink.tsx
const GsapHashLink = ({ href, children, offset = 72 }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: offset,
        },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};
```

#### 3. Scroll Spy 導航高亮

```typescript
// hooks/useGsapSpy.ts
export const useGsapSpy = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
        });
      });
    });

    return () => ctx.revert();
  }, [sections]);

  return activeSection;
};
```

### 📱 響應式導航

#### 桌面導航 (GsapNav.tsx)

```tsx
const GsapNav = () => {
  const activeSection = useGsapSpy(['home', 'about', 'projects', 'contact']);

  return (
    <nav className='desktop-nav'>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <GsapHashLink
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
            >
              {item.label}
            </GsapHashLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

#### 手機底部導航 (GsapBottomTab.tsx)

```tsx
const GsapBottomTab = () => {
  const activeSection = useGsapSpy(['home', 'about', 'projects', 'contact']);

  return (
    <div className='bottom-tab'>
      {navItems.map((item) => (
        <GsapHashLink
          key={item.id}
          href={`#${item.id}`}
          className={`tab-item ${activeSection === item.id ? 'active' : ''}`}
        >
          <span className='icon'>{item.icon}</span>
          <span className='label'>{item.label}</span>
        </GsapHashLink>
      ))}
    </div>
  );
};
```

---

## ScrollTrigger 動畫系統學習

### 🎬 動畫基礎概念

#### 什麼是 ScrollTrigger？

ScrollTrigger 是 GSAP 的插件，讓動畫可以根據滾動位置觸發，是現代網頁動畫的重要工具。

#### 動畫觸發時機

```typescript
scrollTrigger: {
  trigger: '.element',        // 觸發元素
  start: 'top center',        // 開始觸發位置
  end: 'bottom center',       // 結束觸發位置
  toggleActions: 'play none none reverse' // 觸發動作
}
```

#### toggleActions 說明

- `play`：向下滾動進入時播放
- `pause`：向下滾動離開時暫停
- `resume`：向上滾動重新進入時恢復
- `reverse`：向上滾動離開時反向播放
- `restart`：重新開始播放
- `none`：不執行任何動作

#### 動畫效能優化

- 使用 `will-change` CSS 屬性
- 避免動畫過多元素
- 使用 `transform` 和 `opacity` 屬性
- 合理使用 `force3D: true`

### 🎬 動畫工具類別學習

#### ScrollTriggerUtils 核心功能

```typescript
// utils/scrollTriggerUtils.ts
export class ScrollTriggerUtils {
  private static debounceTimer: NodeJS.Timeout | null = null;

  // 防抖 refresh（推薦）
  static refreshDebounced(delay = 100) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, delay);
  }

  // 等待圖片載入後 refresh
  static async refreshAfterImagesLoad(container?: HTMLElement) {
    const images = container
      ? container.querySelectorAll('img')
      : document.querySelectorAll('img');

    const promises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(img);
        } else {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
        }
      });
    });

    await Promise.all(promises);
    this.refreshDebounced();
  }

  // 等待字體載入後 refresh
  static async refreshAfterFontsLoad() {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
    this.refreshDebounced();
  }
}
```

#### React Hook 整合

```typescript
// hooks/useScrollTriggerRefresh.ts
export const useScrollTriggerRefresh = (options = {}) => {
  const containerRef = useRef<HTMLElement>(null);

  const refresh = useCallback(() => {
    ScrollTriggerUtils.refreshImmediate();
  }, []);

  const refreshDebounced = useCallback(() => {
    ScrollTriggerUtils.refreshDebounced();
  }, []);

  const refreshAfterImages = useCallback(async () => {
    await ScrollTriggerUtils.refreshAfterImagesLoad(containerRef.current);
  }, []);

  const refreshAfterFonts = useCallback(async () => {
    await ScrollTriggerUtils.refreshAfterFontsLoad();
  }, []);

  return {
    refresh,
    refreshDebounced,
    refreshAfterImages,
    refreshAfterFonts,
  };
};
```

### 🎨 Section 動畫範例

```tsx
// sections/Projects.tsx
const Projects = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const { refreshAfterImages } = useScrollTriggerRefresh();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 卡片進場動畫
      gsap.fromTo(
        '.project-card',
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id='projects' ref={cardsRef}>
      <div className='project-cards'>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onImageLoad={refreshAfterImages}
          />
        ))}
      </div>
    </section>
  );
};
```

---

## 轉址與深連結功能實作

### 🔄 轉址系統學習

#### 什麼是轉址？

轉址是指將一個 URL 重新導向到另一個 URL 的技術，常用於：

- 舊網址重定向到新網址
- 單頁式應用的路由處理
- SEO 友善的 URL 結構

#### 轉址狀態碼

- **301 永久重定向**：告訴搜尋引擎這是永久性變更
- **302 臨時重定向**：告訴搜尋引擎這是臨時性變更
- **307 臨時重定向**：保持原始 HTTP 方法
- **308 永久重定向**：保持原始 HTTP 方法

#### Next.js 轉址方式

1. **Middleware 轉址**：在請求處理前進行轉址
2. **API Route 轉址**：在 API 路由中進行轉址
3. **重寫 (Rewrite)**：內部重寫 URL 而不改變瀏覽器地址

### 🔄 轉址系統實作

#### 1. Middleware 轉址

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const redirectMap: Record<string, string> = {
  '/about': '/#about',
  '/projects': '/#projects',
  '/project': '/#projects',
  '/contact': '/#contact',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (redirectMap[pathname]) {
    const redirectUrl = new URL(redirectMap[pathname], request.url);
    return NextResponse.redirect(redirectUrl, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/about', '/projects', '/project', '/contact'],
};
```

#### 2. 動態路由轉址

```typescript
// app/[...slug]/route.ts
const redirectMap: Record<string, string> = {
  about: '/#about',
  projects: '/#projects',
  project: '/#projects',
  contact: '/#contact',
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0];

  if (redirectMap[slug]) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL(redirectMap[slug], baseUrl), {
      status: 301,
    });
  }

  return new NextResponse('Not Found', { status: 404 });
}
```

### 🔗 深連結滾動

```typescript
// page.tsx - 初次載入 hash 檢查
useEffect(() => {
  const handleInitialHash = () => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
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

  handleInitialHash();

  if (document.readyState === 'loading') {
    window.addEventListener('load', handleInitialHash);
    return () => window.removeEventListener('load', handleInitialHash);
  }
}, []);
```

---

## 測試策略學習與實作

### 🧪 測試基礎概念

#### 為什麼需要測試？

- **品質保證**：確保程式碼按預期工作
- **回歸測試**：避免新功能破壞現有功能
- **文檔作用**：測試本身就是活文檔
- **重構信心**：安全地重構程式碼
- **團隊協作**：減少 bug 和溝通成本

#### 測試金字塔

```
    /\
   /  \     E2E Tests (少量)
  /____\
 /      \   Integration Tests (適量)
/________\
           Unit Tests (大量)
```

#### 測試類型

- **單元測試 (Unit Tests)**：測試個別函數或組件
- **整合測試 (Integration Tests)**：測試多個組件協作
- **端到端測試 (E2E Tests)**：測試完整用戶流程

### 🧪 Playwright 測試學習

#### 什麼是 Playwright？

Playwright 是微軟開發的端到端測試框架，支援多種瀏覽器：

- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

#### Playwright 優勢

- **跨瀏覽器支援**：一次編寫，多瀏覽器運行
- **自動等待**：智能等待元素出現
- **調試工具**：豐富的調試和截圖功能
- **並行執行**：支援並行測試執行
- **TypeScript 支援**：原生 TypeScript 支援

### 📚 Playwright 基礎語法解釋

#### 核心概念理解

**1. Test vs Test.describe**

```typescript
// test.describe：測試群組，用於組織相關的測試案例
test.describe('導航功能測試', () => {
  // test：單個測試案例，測試特定的功能點
  test('點擊導航連結應該跳轉到對應頁面', async ({ page }) => {
    // 測試邏輯
  });
});
```

**2. Page Object 模式**

```typescript
// page 是 Playwright 的核心對象，代表瀏覽器頁面
test('測試案例', async ({ page }) => {
  // page 提供的方法：
  await page.goto('/'); // 導航到指定 URL
  await page.click('button'); // 點擊元素
  await page.fill('input', 'text'); // 填寫表單
  await page.screenshot(); // 截圖
});
```

**3. Locator 元素定位**

```typescript
// Locator 是元素定位器，用於找到頁面上的元素
const element = page.getByTestId('button-id'); // 通過 data-testid 定位
const element2 = page.locator('.css-class'); // 通過 CSS 選擇器定位
const element3 = page.getByRole('button'); // 通過角色定位

// Locator 是懶加載的，只有當被使用時才會真正查找元素
await element.click(); // 這時才會在頁面上查找元素
```

**4. Expect 斷言系統**

```typescript
// expect 用於驗證測試結果是否符合預期
await expect(element).toBeVisible(); // 元素可見
await expect(element).toBeHidden(); // 元素隱藏
await expect(element).toHaveText('文字'); // 元素包含特定文字
await expect(element).toHaveClass('class'); // 元素有特定 CSS 類
await expect(page).toHaveURL('/about'); // 頁面 URL 符合預期
```

#### 常用 API 詳細說明

**1. 頁面導航**

```typescript
// 基本導航
await page.goto('https://example.com'); // 導航到指定 URL
await page.goto('/relative-path'); // 相對路徑導航
await page.goto('/#section'); // 帶 hash 的 URL

// 等待頁面載入完成
await page.waitForLoadState('networkidle'); // 等待網路活動停止
await page.waitForLoadState('domcontentloaded'); // 等待 DOM 載入完成
await page.waitForLoadState('load'); // 等待所有資源載入完成
```

**2. 元素查找方法**

```typescript
// 通過 data-testid 屬性（推薦方式）
const element = page.getByTestId('unique-id');

// 通過文字內容
const button = page.getByRole('button', { name: '提交' });
const heading = page.getByRole('heading', { name: '標題' });

// 通過 CSS 選擇器
const card = page.locator('.card');
const input = page.locator('input[type="email"]');

// 通過 XPath
const title = page.locator('//h1[contains(@class, "title")]');

// 組合查找
const submitBtn = page.locator('form').getByRole('button', { name: '提交' });
```

**3. 元素互動操作**

```typescript
// 點擊操作
await element.click(); // 左鍵點擊
await element.click({ button: 'right' }); // 右鍵點擊
await element.dblclick(); // 雙擊

// 文字輸入
await input.fill('文字內容'); // 清空並填入文字
await input.type('逐字輸入'); // 逐字輸入（模擬真實打字）
await input.press('Enter'); // 按下特定按鍵

// 拖拽操作
await element.dragTo(targetElement); // 拖拽到目標元素
await element.dragTo(targetElement, {
  // 拖拽到特定位置
  targetPosition: { x: 100, y: 200 },
});

// 懸停操作
await element.hover(); // 滑鼠懸停
await element.hover({ position: { x: 10, y: 20 } }); // 懸停到特定位置
```

**4. 等待策略**

```typescript
// 智能等待（推薦）
await expect(element).toBeVisible(); // 等待元素可見
await expect(element).toBeHidden(); // 等待元素隱藏
await expect(element).toHaveText('文字'); // 等待元素包含文字

// 固定時間等待
await page.waitForTimeout(2000); // 等待 2 秒

// 條件等待
await page.waitForFunction(() => {
  return document.querySelector('.loading') === null;
}); // 等待載入動畫消失

// 等待 URL 變化
await page.waitForURL('**/about'); // 等待 URL 包含 /about
```

**5. 斷言方法詳解**

```typescript
// 可見性斷言
await expect(element).toBeVisible(); // 元素可見
await expect(element).toBeHidden(); // 元素隱藏
await expect(element).toBeAttached(); // 元素存在於 DOM 中
await expect(element).toBeDetached(); // 元素不存在於 DOM 中

// 文字內容斷言
await expect(element).toHaveText('精確文字'); // 完全匹配
await expect(element).toContainText('包含文字'); // 包含文字
await expect(element).toHaveValue('input 的值'); // input 元素的值

// 屬性斷言
await expect(element).toHaveAttribute('href', '/about'); // 屬性值
await expect(element).toHaveClass('active'); // CSS 類
await expect(element).toHaveCSS('color', 'rgb(255, 0, 0)'); // CSS 樣式

// 頁面狀態斷言
await expect(page).toHaveURL('/about'); // URL 匹配
await expect(page).toHaveTitle('頁面標題'); // 頁面標題
await expect(page).toHaveScreenshot('screenshot.png'); // 截圖比較
```

**6. 視窗和視口操作**

```typescript
// 視口大小設定
await page.setViewportSize({ width: 1280, height: 720 });

// 滾動操作
await page.evaluate(() => {
  window.scrollTo(0, 1000); // 滾動到指定位置
});

await page.evaluate(() => {
  document.getElementById('section').scrollIntoView(); // 滾動到元素
});

// 鍵盤操作
await page.keyboard.press('Enter'); // 按下 Enter 鍵
await page.keyboard.type('Hello World'); // 輸入文字
await page.keyboard.down('Shift'); // 按住 Shift 鍵
await page.keyboard.up('Shift'); // 釋放 Shift 鍵
```

**7. 截圖和調試**

```typescript
// 截圖功能
await page.screenshot({ path: 'screenshot.png' }); // 全頁截圖
await element.screenshot({ path: 'element.png' }); // 元素截圖
await page.screenshot({ path: 'full.png', fullPage: true }); // 完整頁面截圖

// 調試功能
await page.pause(); // 暫停測試，進入調試模式
console.log(await element.textContent()); // 輸出元素文字內容
console.log(await page.url()); // 輸出當前 URL
```

### 🧪 Playwright 測試實作

#### 測試檔案結構

```
tests/
├── navigation.spec.ts           # 主要導航功能測試
├── responsive-navigation.spec.ts # 響應式導航測試
├── scroll-trigger.spec.ts      # ScrollTrigger 功能測試
├── loading-screen.spec.ts      # 載入畫面測試
├── puzzle-game.spec.ts         # 拼圖遊戲測試
├── animations.spec.ts          # 動畫效果測試
├── projects-display.spec.ts    # 專案展示測試
└── integration.spec.ts         # 整合測試
```

#### Playwright 測試基礎做法

**1. 基本測試結構**

```typescript
import { test, expect } from '@playwright/test';

test.describe('功能測試群組', () => {
  test.beforeEach(async ({ page }) => {
    // 每個測試前的準備工作
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // 等待載入畫面完成
  });

  test('測試案例描述', async ({ page }) => {
    // 測試步驟
    const element = page.getByTestId('element-id');
    await expect(element).toBeVisible();
  });
});
```

**2. 元素選擇策略**

```typescript
// 使用 data-testid 屬性（推薦）
const element = page.getByTestId('nav-link-home');

// 使用文字內容
const button = page.getByRole('button', { name: '載入更多' });

// 使用 CSS 選擇器
const cards = page.locator('.project-card');

// 使用 XPath
const title = page.locator('//h1[contains(text(), "標題")]');
```

**3. 等待策略**

```typescript
// 等待網路活動停止
await page.waitForLoadState('networkidle');

// 等待元素可見
await expect(element).toBeVisible();

// 等待特定時間
await page.waitForTimeout(2000);

// 等待 URL 變化
await expect(page).toHaveURL(/#about$/);
```

**4. 斷言 (Assertions)**

```typescript
// 可見性檢查
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// 文字內容檢查
await expect(element).toContainText('預期文字');

// CSS 類別檢查
await expect(element).toHaveClass(/active/);

// URL 檢查
await expect(page).toHaveURL(/#about$/);

// 元素數量檢查
const count = await elements.count();
expect(count).toBeGreaterThan(0);
```

**5. 互動操作**

```typescript
// 點擊
await element.click();

// 輸入文字
await input.fill('文字內容');

// 拖拽
await element.dragTo(targetElement, {
  targetPosition: { x: 50, y: 50 },
});

// 懸停
await element.hover();

// 滾動
await page.evaluate(() => {
  document.getElementById('section').scrollIntoView();
});
```

**6. 響應式測試**

```typescript
// 設定視窗大小
await page.setViewportSize({ width: 375, height: 667 });

// 測試不同裝置
test('手機版測試', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  // 測試邏輯
});
```

**7. 測試配置**

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

#### 導航功能測試

```typescript
// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('導航功能', () => {
  test('進入首頁時導覽高亮 HOME', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const homeLink = page.getByTestId('nav-link-home');
    await expect(homeLink).toHaveClass(/active/);
  });

  test('點擊 ABOUT 導覽 → URL 變為 /#about，且 about 內容可見', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const aboutLink = page.getByTestId('nav-link-about');
    await aboutLink.click();

    await expect(page).toHaveURL(/#about/);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
  });
});
```

#### 響應式測試

```typescript
// tests/responsive-navigation.spec.ts
test.describe('響應式導航', () => {
  test('桌面版 (>= 992px) 顯示桌面導航，隱藏底部導航', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');

    const desktopNav = page.locator('.desktop-nav');
    const bottomTab = page.locator('.bottom-tab');

    await expect(desktopNav).toBeVisible();
    await expect(bottomTab).toBeHidden();
  });

  test('手機版 (< 768px) 隱藏桌面導航，顯示底部導航', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const desktopNav = page.locator('.desktop-nav');
    const bottomTab = page.locator('.bottom-tab');

    await expect(desktopNav).toBeHidden();
    await expect(bottomTab).toBeVisible();
  });
});
```

#### ScrollTrigger 測試

```typescript
// tests/scroll-trigger.spec.ts
test.describe('ScrollTrigger 功能', () => {
  test('滾動時導航高亮正確更新', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 滾動到 About 區塊
    await page.evaluate(() => {
      document.getElementById('about')?.scrollIntoView();
    });

    await page.waitForTimeout(500);

    const aboutLink = page.getByTestId('nav-link-about');
    await expect(aboutLink).toHaveClass(/active/);
  });
});
```

### 🚀 運行測試

```bash
# 運行所有測試
npm run test

# 使用 UI 模式運行測試（視覺化界面）
npm run test:ui

# 調試模式（逐步執行）
npm run test:debug

# 特定瀏覽器測試
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# 運行特定測試檔案
npx playwright test navigation.spec.ts

# 運行特定測試案例
npx playwright test -g "導航功能"

# 生成測試報告
npx playwright show-report

# 清理測試結果
rm -rf test-results/ playwright-report/

# 安裝瀏覽器
npx playwright install

# 檢查測試配置
npx playwright test --list
```

### 📊 測試最佳實踐

**1. 測試命名規範**

```typescript
// ✅ 好的測試命名
test('點擊 ABOUT 導覽 → URL 變為 /#about，且 about 內容可見', async ({
  page,
}) => {
  // 測試邏輯
});

// ❌ 不好的測試命名
test('test1', async ({ page }) => {
  // 測試邏輯
});
```

**2. 測試資料隔離**

```typescript
test.describe('功能測試群組', () => {
  test.beforeEach(async ({ page }) => {
    // 每個測試前重置狀態
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });
});
```

**3. 等待策略選擇**

```typescript
// ✅ 優先使用智能等待
await expect(element).toBeVisible();

// ✅ 必要時使用固定等待
await page.waitForTimeout(2000);

// ❌ 避免過度使用固定等待
await page.waitForTimeout(10000); // 太長
```

**4. 錯誤處理**

```typescript
test('測試案例', async ({ page }) => {
  try {
    await page.goto('/');
    await expect(page.getByTestId('element')).toBeVisible();
  } catch (error) {
    console.error('測試失敗:', error);
    throw error;
  }
});
```

---

## Bug 修復與學習心得

### 🐛 常見問題與學習過程

#### 學習過程中的挑戰

在開發過程中遇到許多問題，每個問題都是學習的機會：

1. **CSS Module 語法錯誤**：學習 CSS 模組化的正確使用方式
2. **Hydration Mismatch**：理解服務端渲染和客戶端渲染的差異
3. **Next.js 15 動態 API**：學習新版本 API 的變化
4. **ScrollTrigger 生命週期**：掌握動畫的記憶體管理
5. **TypeScript 型別錯誤**：提升型別系統的理解

#### 問題解決的心態

- **不要害怕錯誤**：錯誤是學習的最佳機會
- **閱讀錯誤訊息**：仔細分析錯誤訊息，通常會指向解決方向
- **查閱官方文檔**：官方文檔是最準確的資訊來源
- **搜尋社群討論**：GitHub Issues、Stack Overflow 等
- **逐步除錯**：使用 console.log 和斷點除錯

### 🐛 常見問題與解決方案學習

#### 1. CSS Module 語法錯誤

**問題**：在 CSS Module 中使用全域選擇器

```css
/* ❌ 錯誤：在 CSS Module 中使用全域選擇器 */
body {
  margin: 0;
}
```

**解決方案**：將全域樣式移至 `globals.css`

```css
/* ✅ 正確：在 globals.css 中定義全域樣式 */
body {
  margin: 0;
}
```

#### 2. Hydration Mismatch 錯誤

**問題**：服務端渲染和客戶端渲染內容不匹配

```typescript
// ❌ 錯誤：使用瀏覽器 API
const url = typeof window !== 'undefined' ? window.location.href : '';
```

**解決方案**：使用環境變數和客戶端條件渲染

```typescript
// ✅ 正確：使用環境變數
const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// ✅ 正確：客戶端條件渲染
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

return isClient ? <Component /> : null;
```

#### 3. Next.js 15 動態 API 錯誤

**問題**：Next.js 15 要求 await `params`

```typescript
// ❌ 錯誤：直接使用 params
export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const slug = params.slug[0]; // 會報錯
}
```

**解決方案**：使用 await params

```typescript
// ✅ 正確：await params
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0];
}
```

### 📋 最佳實踐

#### 1. CSS Module 使用

```css
/* ✅ 正確：只使用局部選擇器 */
.localClass {
  color: red;
}

/* ❌ 錯誤：使用全域選擇器 */
body {
  margin: 0;
}
```

#### 2. 避免 Hydration Mismatch

```typescript
// ✅ 正確：使用 useState 控制渲染
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

return isClient ? <Component /> : null;
```

#### 3. ScrollTrigger 生命週期管理

```typescript
// ✅ 正確：使用 gsap.context() 管理動畫
useEffect(() => {
  const ctx = gsap.context(() => {
    // 動畫代碼
  }, containerRef);

  return () => ctx.revert();
}, []);
```

---

## 部署與維護學習

### 🚀 部署基礎概念

#### 什麼是部署？

部署是將開發完成的應用程式發布到生產環境，讓用戶可以訪問的過程。

#### 部署方式比較

- **靜態部署**：將建置後的靜態檔案部署到 CDN
- **伺服器部署**：部署到伺服器，支援 SSR
- **容器化部署**：使用 Docker 容器部署
- **雲端平台部署**：使用 Vercel、Netlify 等平台

#### 部署流程

1. **建置 (Build)**：將原始碼編譯成可執行的檔案
2. **測試 (Test)**：運行測試確保品質
3. **部署 (Deploy)**：將檔案上傳到生產環境
4. **監控 (Monitor)**：監控應用程式運行狀態

### 🚀 部署準備學習

#### 1. 環境變數設定

```env
# .env.production
NEXT_PUBLIC_SITE_URL=https://kouji-song.dev
NEXT_PUBLIC_BASE_URL=https://kouji-song.dev
GOOGLE_VERIFICATION=your-google-verification-code
YANDEX_VERIFICATION=your-yandex-verification-code
YAHOO_VERIFICATION=your-yahoo-verification-code
```

#### 2. 建置檢查

```bash
# 檢查建置是否成功
npm run build

# 檢查 TypeScript 類型
npm run type-check

# 檢查 ESLint
npm run lint

# 運行測試
npm run test
```

### 📊 監控與分析

#### 1. SEO 監控

- Google Search Console 提交 sitemap
- 監控搜尋排名變化
- 檢查結構化數據有效性

#### 2. 效能監控

- Google PageSpeed Insights
- GTmetrix 效能測試
- Lighthouse SEO 評分

#### 3. 用戶體驗監控

- Google Analytics 追蹤流量
- 社交媒體分享追蹤
- 頁面載入速度監控

### 🔧 維護建議

#### 1. 定期更新

- 保持 Next.js 和依賴套件最新
- 定期更新內容和專案作品
- 監控搜尋排名變化

#### 2. 效能優化

- 持續優化圖片和程式碼
- 監控 Core Web Vitals
- 優化載入速度

#### 3. 內容維護

- 定期更新個人資訊
- 添加新的專案作品
- 更新技能和經驗

---

## 🎯 學習總結與心得

### 📚 學習成果

通過這個專案，我深入學習了現代前端開發的核心技術：

1. **Next.js 15 深度學習**：掌握了 App Router、Server/Client Components 等新特性
2. **TypeScript 實戰應用**：在實際專案中學習型別系統和介面設計
3. **動畫技術掌握**：深入理解 GSAP 和 ScrollTrigger 的進階用法
4. **SEO 優化實作**：學習搜尋引擎優化的各種技術和最佳實踐
5. **測試驅動開發**：使用 Playwright 學習 E2E 測試的撰寫
6. **響應式設計精通**：深入理解 CSS Grid、Flexbox 和媒體查詢

### 💡 學習心得

#### 技術學習心得

- **理論與實踐結合**：光看文檔不夠，必須動手實作才能真正理解
- **問題解決能力**：遇到錯誤不要慌張，仔細分析錯誤訊息
- **持續學習**：技術更新很快，要保持學習的熱忱
- **社群資源**：善用 GitHub、Stack Overflow 等社群資源

#### 專案管理心得

- **版本控制**：使用 Git 進行版本控制，記錄每個階段的變化
- **文檔記錄**：詳細記錄學習過程和解決方案
- **測試驅動**：先寫測試再寫功能，確保程式碼品質
- **漸進式開發**：不要一次做太多，逐步完善功能

### 🚀 未來學習方向

1. **效能優化**：深入學習 Core Web Vitals 和效能優化技巧
2. **無障礙設計**：學習 WCAG 指南和無障礙設計原則
3. **PWA 技術**：學習 Progressive Web App 開發
4. **微前端架構**：了解微前端架構的設計模式
5. **雲端服務**：學習 AWS、Azure 等雲端服務的使用

### 📖 推薦學習資源

- [Next.js 官方文檔](https://nextjs.org/docs)
- [TypeScript 官方手冊](https://www.typescriptlang.org/docs/)
- [GSAP 學習中心](https://greensock.com/learning/)
- [MDN Web 文檔](https://developer.mozilla.org/)
- [Web.dev 學習資源](https://web.dev/)

---

## 📚 參考資源

### 官方文檔

- [Next.js 官方文檔](https://nextjs.org/docs)
- [TypeScript 官方手冊](https://www.typescriptlang.org/docs/)
- [GSAP 官方文檔](https://greensock.com/docs/)
- [Playwright 官方文檔](https://playwright.dev/)
- [Schema.org 結構化數據](https://schema.org/)

### 學習資源

- [MDN Web 文檔](https://developer.mozilla.org/)
- [Web.dev 學習資源](https://web.dev/)
- [CSS-Tricks](https://css-tricks.com/)
- [Smashing Magazine](https://www.smashingmagazine.com/)
- [A List Apart](https://alistapart.com/)

### 社群資源

- [GitHub](https://github.com/)
- [Stack Overflow](https://stackoverflow.com/)
- [Reddit r/webdev](https://www.reddit.com/r/webdev/)
- [Dev.to](https://dev.to/)
- [Medium](https://medium.com/)

---

_最後更新：2025 年 1 月_

---

## 📝 學習筆記

這份文檔記錄了我學習現代前端開發技術的完整過程，從基礎概念到實際應用，從問題解決到最佳實踐。希望這份學習紀錄能幫助其他學習者，也作為我自己未來回顧和參考的資料。

**學習是一個持續的過程，技術在不斷更新，但學習的方法和心態是相通的。保持好奇心，勇於嘗試，從錯誤中學習，這是我在這個專案中最大的收穫。**
