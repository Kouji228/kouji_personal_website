'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { contactConfig, socialprofils } from '../../content_option';
import styles from './page.module.css';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('info');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    { id: 'info', label: '聯絡資訊', icon: '📞' },
    { id: 'social', label: '社群連結', icon: '🌐' },
    { id: 'form', label: '聯絡表單', icon: '📝' },
  ];

  return (
    <div className='min-h-screen flex flex-col items-center p-6 md:p-12'>
      <div className='max-w-5xl w-full'>
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
            Contact Me
          </h1>
          <p
            className='text-lg'
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            歡迎與我聯繫討論前端開發、技術合作或任何有趣的專案
          </p>
        </motion.header>

        {/* 標籤導航 */}
        <motion.div
          className='flex justify-center mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div
            className='rounded-lg shadow-lg p-2 flex space-x-2'
            style={{ backgroundColor: 'var(--background)' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  activeTab === tab.id ? 'shadow-md' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor:
                    activeTab === tab.id
                      ? 'var(--secondary-color)'
                      : 'transparent',
                  color:
                    activeTab === tab.id
                      ? 'var(--text-color-2)'
                      : 'var(--text-color)',
                }}
              >
                <span className='mr-2'>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 聯絡資訊區塊 */}
        <motion.section
          id='info'
          className='bg-white p-8 rounded-lg shadow-lg mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
            <span className='mr-2'>💬</span>
            聯絡資訊
          </h2>
          <div className='space-y-6'>
            <div className='flex items-center space-x-4'>
              <div className='bg-blue-100 p-3 rounded-full'>
                <span className='text-2xl'>📧</span>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800'>Email</h3>
                <a
                  href={`mailto:${contactConfig.YOUR_EMAIL}`}
                  className='text-blue-600 hover:text-blue-800 transition-colors'
                >
                  {contactConfig.YOUR_EMAIL}
                </a>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-700 leading-relaxed'>
                {contactConfig.description}
              </p>
            </div>
          </div>
        </motion.section>

        {/* 社群連結區塊 */}
        <motion.section
          id='social'
          className='bg-white p-8 rounded-lg shadow-lg mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
            <span className='mr-2'>🌐</span>
            社群連結
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <a
              href={socialprofils.github}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <div className='bg-gray-800 p-3 rounded-full'>
                <span className='text-white text-xl'>🐙</span>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800'>GitHub</h3>
                <p className='text-gray-600 text-sm'>查看我的程式碼與專案</p>
              </div>
            </a>

            <a
              href={socialprofils.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <div className='bg-blue-600 p-3 rounded-full'>
                <span className='text-white text-xl'>💼</span>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800'>LinkedIn</h3>
                <p className='text-gray-600 text-sm'>專業網路與職涯發展</p>
              </div>
            </a>
          </div>
        </motion.section>

        {/* 聯絡表單區塊 */}
        <motion.section
          id='form'
          className='bg-white p-8 rounded-lg shadow-lg mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
            <span className='mr-2'>📝</span>
            聯絡表單
          </h2>
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <div className='flex items-center space-x-3'>
              <span className='text-2xl'>🚧</span>
              <div>
                <h3 className='font-semibold text-yellow-800'>功能開發中</h3>
                <p className='text-yellow-700'>
                  聯絡表單功能正在開發中，目前請透過 Email 或手機直接聯繫我！
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 返回首頁按鈕 */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
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

export default Contact;
