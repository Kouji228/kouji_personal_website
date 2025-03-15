'use client'; // 🔥 確保這是 Client Component

import React from 'react';
import Head from 'next/head'; // ✅ 確保 Head 正確導入
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

const animatedTexts = [
  'Coming Soon...',
  'Stay Tuned!',
  'Something Awesome is on the Way!',
];

const Resume = () => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Coming Soon..</title>
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-4xl font-bold text-gray-800'>
          <Typewriter
            options={{
              strings: animatedTexts,
              autoStart: true,
              loop: true,
              deleteSpeed: 10,
            }}
          />
        </h1>
      </div>
    </>
  );
};

export default Resume;
