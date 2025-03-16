'use client'; // 🔥 確保這是 Client Component

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { skills } from '../../content_option';

const About = () => {
  return (
    <div className=' min-h-screen flex flex-col items-center p-6'>
      {/* About 區塊 */}
      <div className='p-8 rounded-lg shadow-lg max-w-xl w-full'>
        <header className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>About Me</h1>
        </header>
        <section className='mt-8'>
          <h2 className='text-2xl'>簡介</h2>
          <p className='mt-4'>
            Hi, I&apos;m Kouji Song.
            <br />
            前端技術精進中，以 Next.js 為主，以精通 React 為學習目標。
            <br />
            本網站是為了學習 Next.js 而建立的，仍有很多需要進步的地方。
            <br />
            這個網站將記錄未來的學習歷程，進行中的專案與前端/後端技能樹。
            <br />
            2025.2 Kouji in Taipei.
          </p>
          <Link href='/' className='mt-6 text-blue-500'>
            返回首頁
          </Link>
        </section>
      </div>

      {/* 技能區塊 */}
      <motion.div
        className='p-8 rounded-lg shadow-lg max-w-3xl w-full mt-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className='text-2xl font-semibold text-gray-800'>Skills</h2>
        <ul className='mt-4 space-y-3'>
          {skills.map(({ name, value }, index) => (
            <motion.li
              key={name}
              className='p-2  rounded-lg text-center text-lg font-medium'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {name} - {value}%
              <div className='w-full bg-gray-200 h-2 rounded-lg mt-2'>
                <motion.div
                  className='bg-blue-500 h-2 rounded-lg'
                  style={{ width: `${value}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default About;
