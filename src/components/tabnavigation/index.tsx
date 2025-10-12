'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialprofils } from '../../content_option';
import styles from './index.module.css';

interface TabItem {
  id: string;
  label: string;
  href: string;
}

const TabNavigation: FC = () => {
  const [activeTab, setActiveTab] = useState('');
  const pathname = usePathname();

  const tabs: TabItem[] = [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'about', label: 'ABOUT', href: '/about' },
    { id: 'project', label: 'PROJECT', href: '/project' },
    { id: 'contact', label: 'CONTACT', href: '/contact' },
  ];

  useEffect(() => {
    // 根據當前路徑設置活動標籤
    const currentPath = pathname;
    const matchingTab = tabs.find((tab) => tab.href === currentPath);
    if (matchingTab) {
      setActiveTab(matchingTab.id);
    } else {
      setActiveTab('home'); // 默認選中首頁
    }
  }, [pathname]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <nav className={styles.tabNavigation}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`${styles.tabItem} ${
              activeTab === tab.id ? styles.active : ''
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
            {activeTab === tab.id && <div className={styles.tabIndicator} />}
          </Link>
        ))}
      </div>

      {/* 社群連結 */}
      <div className={styles.socialLinks}>
        <a
          href={socialprofils.github}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.socialLink}
          title='GitHub'
        >
          <FaGithub />
        </a>
        <a
          href={socialprofils.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.socialLink}
          title='LinkedIn'
        >
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
};

export default TabNavigation;
