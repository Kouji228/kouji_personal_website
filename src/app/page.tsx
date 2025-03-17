'use client'; // 🔥 確保這個組件只在客戶端運行

import React from 'react';
import Head from 'next/head'; //
import dynamic from 'next/dynamic';
import { introdata, meta } from '../content_option';
import Link from 'next/link'; // ✅ react-router-dom 替換為 next/link
import styles from './page.module.css';

// ✅ 動態載入 Typewriter，禁用 SSR
const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

export default function Home() {
  const animatedTexts = [
    introdata.animated.first,
    introdata.animated.second,
    introdata.animated.third,
    introdata.animated.forth ?? '', // 避免 undefined
  ];

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
      </Head>

      <section id='home' className='home'>
        <div
          className={`${styles.introSec} d-block d-lg-flex align-items-center`}
        >
          <div
            className={`${styles.hBgImage} order-1 order-lg-2 h-100`}
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>

          <div
            className={`${styles.text} order-2 order-lg-1 h-100 d-lg-flex justify-content-center`}
          >
            <div className='align-self-center'>
              <div className={`${styles.intro} mx-auto`}>
                <h2 className='mb-1x'>{introdata.title}</h2>
                <h1 className='fluidz-48 mb-1x'>
                  <Typewriter
                    options={{
                      strings: animatedTexts,
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className='mb-1x'>{introdata.description}</p>

                <div className='intro_btn-action pb-5'>
                  <Link href='/about'>
                    <div id='buttonP' className={`${styles.acBtn} btn`}>
                      About Me
                      <div className={styles.ringOne}></div>
                      <div className={styles.ringTwo}></div>
                      <div className={styles.ringThree}></div>
                    </div>
                  </Link>

                  <Link href='/contact'>
                    <div id='buttonH' className={`${styles.acBtn} btn`}>
                      Contact Me
                      <div className={styles.ringOne}></div>
                      <div className={styles.ringTwo}></div>
                      <div className={styles.ringThree}></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
