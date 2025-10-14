'use client'; // 🔥 確保這個組件只在客戶端運行

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; //
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { introdata, meta, socialprofils } from '../content_option';
import Link from 'next/link'; // ✅ react-router-dom 替換為 next/link
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ImageGallery from '../components/imagegallery';
import styles from './page.module.css';

// ✅ 動態載入 Typewriter，禁用 SSR
const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

export default function Home() {
  // ✅ GSAP: 使用 useRef 來獲取 DOM 元素
  const titleRef = useRef(null);
  const typewriterRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const galleryContainerRef = useRef(null);

  const animatedTexts = [
    introdata.animated.first,
    introdata.animated.second,
    introdata.animated.third,
    introdata.animated.forth ?? '', // 避免 undefined
  ];

  useEffect(() => {
    // ✅ GSAP 動畫：頁面載入時的進場動畫
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      galleryContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1 },
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6',
      )
      .fromTo(
        typewriterRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.4',
      )
      .fromTo(
        descRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.4',
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.4',
      )
      .fromTo(
        socialRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        '-=0.3',
      );
  }, []);

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
            ref={galleryContainerRef}
            className={`${styles.hBgImage} order-1 order-lg-2 h-100`}
          >
            <ImageGallery items={introdata.gallery} />
          </div>

          <div
            className={`${styles.text} order-2 order-lg-1 h-100 d-lg-flex justify-content-center`}
          >
            <div className='align-self-center'>
              <div className={`${styles.intro} mx-auto`}>
                <h2 ref={titleRef} className='mb-1x'>
                  {introdata.title}
                </h2>
                <h1 ref={typewriterRef} className='fluidz-48 mb-1x'>
                  <Typewriter
                    options={{
                      strings: animatedTexts,
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p ref={descRef} className='mb-1x'>
                  {introdata.description}
                </p>

                <div className='intro_btn-action pb-5'>
                  <div ref={buttonsRef} className={styles.buttonContainer}>
                    <div className={styles.buttonsRow}>
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

                    {/* 社群圖標 */}
                    <div ref={socialRef} className={styles.homeSocialLinks}>
                      <a
                        href={socialprofils.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.homeSocialLink}
                        title='GitHub'
                      >
                        <FaGithub />
                      </a>
                      <a
                        href={socialprofils.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.homeSocialLink}
                        title='LinkedIn'
                      >
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
