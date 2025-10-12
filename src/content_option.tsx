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
    '正積極轉職為前端工程師，擁有廣告數據分析背景，培養了嚴謹的邏輯思維與問題解決能力。專注於 React.js/Next.js 開發，具備購物車、會員系統與 API 串接經驗，重視使用者體驗與效能優化。持續投入專案實作與新技術學習，期望以跨領域思維與實作力，成為能為團隊帶來價值的前端工程師。',
  your_img_url: '/picture/cat2.JPG',
};

const dataabout = {
  title: 'About Myself',
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

const skills = [
  {
    name: 'HTML5',
    value: 85,
  },
  {
    name: 'CSS3',
    value: 80,
  },
  {
    name: 'JavaScript (ES6+)',
    value: 80,
  },
  {
    name: 'React.js',
    value: 75,
  },
  {
    name: 'Next.js',
    value: 75,
  },
  {
    name: 'Node.js / Express',
    value: 65,
  },
  {
    name: 'Bootstrap',
    value: 70,
  },
  {
    name: 'Git / GitHub',
    value: 80,
  },
  {
    name: 'MySQL / MariaDB',
    value: 65,
  },
  {
    name: 'Python',
    value: 60,
  },
  {
    name: 'PHP',
    value: 55,
  },
];

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
  YOUR_FONE: '0965-740-673',
  description:
    '歡迎與我聯繫討論前端開發、技術合作或任何有趣的專案！平日 9:00-18:00 可手機或 Email 聯絡，18:00 後及週末建議以 Email 聯繫。',
  // creat an emailjs.com account
  // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
  YOUR_SERVICE_ID: 'service_id',
  YOUR_TEMPLATE_ID: 'template_id',
  YOUR_USER_ID: 'user_id',
};

const socialprofils = {
  github: 'https://github.com/Kouji228',
  linkedin: 'https://linkedin.com',
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
