const logotext = 'Kouji';

const meta = {
  title: 'Kouji Song - Front-End Developer',
  description:
    "I'm Kouji Song, Front-End Developer based in New Taipei City, specializing in React.js/Next.js development",
};

const introdata = {
  title: "Hi, I'm Kouji Song",
  animated: {
    first: '資訊工程小白',
    second: '前端工程師',
    third: '日語使用者',
    forth: '貓派！',
  },
  description:
    '正積極轉職為前端工程師，擁有廣告數據分析背景，培養了嚴謹的邏輯思維與問題解決能力。專注於 React.js/Next.js 開發，具備購物車、會員系統與 API 串接經驗，重視使用者體驗與效能優化。持續投入專案實作與新技術學習，期望以跨領域思維與實作力，能為未來的合作團隊帶來價值。',
  your_img_url: '/picture/cat2.JPG',
  gallery: [
    {
      img: '/picture/cat2.JPG',
      title: '前端開發',
      secondary: 'React.js / Next.js',
      text: '專注於現代前端框架開發，使用 React.js 與 Next.js 建立響應式網站，具備購物車、會員系統與 API 串接經驗，重視使用者體驗與效能優化。',
    },
    {
      img: '/picture/background.JPG',
      title: '跨領域背景',
      secondary: '廣告數據分析 → 前端工程師',
      text: '從廣告數據分析背景轉職，培養了嚴謹的邏輯思維與問題解決能力，能將數據洞察轉化為產品優化方案。',
    },
    {
      img: '/picture/achievement_img_1759460471921.webp',
      title: '專案實作',
      secondary: '黑膠電商平台',
      text: '開發黑膠商品販售電商平台，使用 Next.js、Node.js、MySQL，並整合金流串接功能，提供完整的購物體驗。',
    },
    {
      img: '/picture/coke_cam_taxi.JPG',
      title: '醫療科技',
      secondary: 'MedSelect 平台',
      text: '參與開發抗癌藥物臨床前療效測試輔助平台，使用 Next.js、Chart.js、RESTful API，榮獲 2024 台灣醫療科技展創新獎。',
    },
  ],
};

const dataabout = {
  title: 'About ',
  aboutme:
    '我是宋平浩（Kouji Song），擁有廣告數據分析背景，目前正積極投入前端工程師職涯發展。從廣告成效分析工作中，深刻體會到程式設計與前端技術的重要性，驅動我展開轉職之路。透過資展國際半年制 Bootcamp 密集學習與專案開發，紮實建立了 React/Next.js 技術基礎。具備 3 年以上日商體系任職經驗，累積跨部門協作與數據導向的問題解決經驗。擁有英日雙語能力（TOEIC 735、JLPT N1），能有效進行跨文化溝通。擅長將需求有效拆解為可交付任務，並在短週期內持續優化體驗與效能。期待以跨領域思維與實作力，成為能為團隊帶來價值的前端工程師。',
};

const worktimeline = [
  {
    jobtitle: '前端工程師培訓',
    where: '資展國際股份有限公司',
    date: '2025/4 - 2025/9',
  },
  {
    jobtitle: '廣告AE業務',
    where: '台灣博報堂股份有限公司',
    date: '2021/5 - 2025/3',
  },
  {
    jobtitle: '網站編輯實習生',
    where: '菁華出版社',
    date: '2020/7 - 2020/10',
  },
];

// 導入 React Icons
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaAws,
  FaDocker,
  FaCode,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiMysql,
  SiPhp,
  SiFigma,
  SiMongodb,
  SiPostman,
  SiNpm,
  SiPnpm,
  SiPostgresql,
} from 'react-icons/si';

const skills = {
  frontend: [
    { name: 'HTML5', icon: FaHtml5, color: '#FF6B35' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
  ],
  backend: [
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  ],
  tools: [
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
    { name: 'VS Code', icon: FaCode, color: '#007ACC' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'npm', icon: SiNpm, color: '#CB3837' },
    { name: 'pnpm', icon: SiPnpm, color: '#CB3837' },
  ],
  studying: [
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'AWS', icon: FaAws, color: '#FF9900' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'PostgresSQL', icon: SiPostgresql, color: '#3178C6' },
  ],
};

const services = [
  {
    title: '前端開發',
    description:
      '使用 React.js / Next.js 建立響應式網站，具備購物車、會員系統與 API 串接經驗，重視使用者體驗與效能優化。',
  },
  {
    title: '跨文化溝通',
    description:
      '具備英日雙語能力（TOEIC 735、JLPT N1），能有效進行跨文化溝通，適合國際團隊協作或日本市場專案。',
  },
  {
    title: '數據分析思維',
    description:
      '擁有廣告數據分析背景，培養了嚴謹的邏輯思維與問題解決能力，能將數據洞察轉化為產品優化方案。',
  },
];

const dataportfolio = [
  {
    img: '/picture/achievement_img_1759460471921.webp',
    description: '黑膠商品販售電商平台 - Next.js、Node.js、MySQL、金流串接',
    link: '#',
  },
  {
    img: '/picture/achievement_img_1759461756480.webp',
    description:
      'MedSelect 抗癌藥物臨床前療效測試輔助平台 - Next.js、Chart.js、RESTful API',
    link: 'https://innoaward.taiwan-healthcare.org/award_detail.php?REFDOCTYPID=0mge2qqssdm4fd72&num=1&REFDOCID=0sm1tc9ylyod3vh1',
  },
  {
    img: '/picture/achievement_img_1759913318760.webp',
    description: '黑膠販售電商 Dashboard - PHP、MySQL、CKEditor',
    link: 'https://github.com/Kouji228/Vinyl_Shop_Dashboard',
  },
  {
    img: 'https://picsum.photos/400/300?random=4',
    description: '個人網站 - Next.js 15 + TypeScript + Tailwind CSS',
    link: 'https://github.com/Kouji228/kouji_personal_website',
  },
];

const contactConfig = {
  YOUR_EMAIL: 'song24707@gmail.com',
  description:
    '歡迎與我聯繫討論前端開發、技術合作或任何有趣的專案！請以 Email 聯繫我，謝謝！',
  // creat an emailjs.com account
  // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
  YOUR_SERVICE_ID: 'service_id',
  YOUR_TEMPLATE_ID: 'template_id',
  YOUR_USER_ID: 'user_id',
};

const socialprofils = {
  github: 'https://github.com/Kouji228',
  linkedin: 'https://linkedin.com/in/kouji-song/',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
};

export {
  meta,
  dataabout,
  dataportfolio,
  worktimeline,
  skills,
  services,
  introdata,
  contactConfig,
  socialprofils,
  logotext,
};
