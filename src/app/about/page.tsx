import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex justify-center items-center p-6 '>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-xl w-full'>
        <header className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>About me</h1>
        </header>
        <section className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>簡介</h2>
          <p className='mt-4 text-gray-600'>
            我是Kouji
            <br />
            前端技術精進中，以Next.js為主，以精通React為學習目標
            <br />
            力求程式遵從Solid原則，並研讀Cleancode一書， 培養好的程式習慣。
            <br />
            目前仍有很多需要進步的地方，
            <br />
            這個網站將記錄未來的學習歷程，進行中的專案與前端/後端技能樹。
            <br />
            2025.2 Kouji in Taipei.
          </p>
          <Link href='/' className='mt-6 text-blue-500 hover:underline'>
            Go back to Home Page
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
