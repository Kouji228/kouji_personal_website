'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { dataportfolio } from '../../content_option';
import ProjectCard from '../../components/projectcard';
import styles from './page.module.css';

const Project = () => {
  const [activeTab, setActiveTab] = useState('all');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    { id: 'all', label: '全部專案', icon: '📂' },
    { id: 'frontend', label: '前端專案', icon: '⚛️' },
    { id: 'fullstack', label: '全端專案', icon: '🔧' },
  ];

  // 分類專案
  const frontendProjects = dataportfolio.filter(
    (project) =>
      project.description.includes('Next.js') ||
      project.description.includes('React') ||
      project.description.includes('TypeScript'),
  );

  const fullstackProjects = dataportfolio.filter(
    (project) =>
      project.description.includes('Node.js') ||
      project.description.includes('MySQL') ||
      project.description.includes('PHP'),
  );

  const renderProjects = (
    projects: typeof dataportfolio,
    sectionId: string,
  ) => (
    <motion.section
      id={sectionId}
      className='p-8 rounded-lg mb-12'
      style={{ backgroundColor: 'var(--background)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          >
            {/* ✅ 使用 GSAP 驅動的 ProjectCard 組件 */}
            <ProjectCard
              img={project.img}
              description={project.description}
              link={project.link}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );

  return (
    <div className='min-h-screen p-6 md:p-12'>
      <div className='max-w-7xl mx-auto'>
        {/* 頁面標題 */}
        <motion.header
          className='text-center mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className='text-4xl md:text-5xl font-bold mb-4'
            style={{ color: 'var(--text-color)' }}
          >
            My Projects
          </h1>
          <p
            className='text-lg'
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            精選專案作品集 - 從學習到實戰的成長軌跡
          </p>
        </motion.header>

        {/* 全部專案 */}
        {renderProjects(dataportfolio, 'all')}

        {/* 返回首頁按鈕 */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link href='/'>
            <div className={`${styles.backBtn} btn`}>
              ← 返回首頁
              <div className={styles.ringOne}></div>
              <div className={styles.ringTwo}></div>
              <div className={styles.ringThree}></div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
