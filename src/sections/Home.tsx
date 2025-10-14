'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap, Draggable } from '../components/gsap';
import { introdata, socialprofils } from '../content_option';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from '../app/page.module.css';

// 動態載入 Typewriter，禁用 SSR
const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

const Home: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // 拼圖排列狀態
  const [puzzleCells, setPuzzleCells] = useState<Array<{
    y: number; // 邏輯位置（決定背景切片）
    x: number; // 邏輯位置（決定背景切片）
    positionY: number; // 實際位置（決定在拼圖中的位置）
    positionX: number; // 實際位置（決定在拼圖中的位置）
    empty?: boolean;
  }> | null>(null);

  const animatedTexts = [
    introdata.animated.first,
    introdata.animated.second,
    introdata.animated.third,
    introdata.animated.forth ?? '',
  ];

  // 生成隨機拼圖排列（僅在客戶端 Hydration 完成後）
  useEffect(() => {
    const generateRandomPuzzle = () => {
      // 創建所有可能的拼圖塊位置（包括空塊）
      const allPositions: Array<{ y: number; x: number; empty?: boolean }> = [
        { y: 1, x: 1 },
        { y: 1, x: 2 },
        { y: 1, x: 3 },
        { y: 2, x: 1 },
        { y: 2, x: 2 },
        { y: 2, x: 3 },
        { y: 3, x: 1 },
        { y: 3, x: 2 },
        { y: 3, x: 3 },
      ];

      // Fisher-Yates 洗牌算法 - 洗牌所有位置
      for (let i = allPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
      }

      // 隨機選擇一個位置作為空塊
      const emptyIndex = Math.floor(Math.random() * allPositions.length);
      allPositions[emptyIndex].empty = true;

      // 重新排列，讓拼圖塊按照洗牌後的位置分配
      const shuffledCells = allPositions.map((pos, index) => ({
        // 拼圖塊的邏輯位置（決定背景切片）
        y: Math.floor(index / 3) + 1,
        x: (index % 3) + 1,
        // 拼圖塊的實際位置（決定在拼圖中的位置）
        positionY: pos.y,
        positionX: pos.x,
        empty: pos.empty,
      }));

      return shuffledCells;
    };

    setPuzzleCells(generateRandomPuzzle());
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // 監聽視窗大小變化，重新計算拼圖大小
    const handleResize = () => {
      const puzzle = document.getElementById('puzzle');
      if (!puzzle) return;

      const newContainerWidth = puzzle.offsetWidth;
      const newPieceSize = Math.floor((newContainerWidth - 6) / 3);
      const currentPieceSize = Math.floor((puzzle.offsetWidth - 6) / 3);

      if (newPieceSize !== currentPieceSize) {
        console.log(
          '視窗大小變化，重新計算拼圖:',
          newContainerWidth,
          newPieceSize,
        );

        const pieces = puzzle.getElementsByClassName('piece');
        const gap = 3;
        const gridSize = 3;

        // 重新設置拼圖容器大小
        gsap.set(puzzle, {
          width: gridSize * (newPieceSize + gap) - gap,
          height: gridSize * (newPieceSize + gap) - gap,
        });

        // 重新設置所有拼圖塊位置
        for (let i = 0; i < pieces.length; i++) {
          const piece = pieces[i] as HTMLElement;
          const { positionLeft, positionTop } = piece.dataset;

          const x = (parseInt(positionLeft || '1') - 1) * (newPieceSize + gap);
          const y = (parseInt(positionTop || '1') - 1) * (newPieceSize + gap);

          gsap.set(piece, {
            width: newPieceSize,
            height: newPieceSize,
            transform: `translate(${x}px, ${y}px)`,
          });
        }
      }
    };

    const ctx = gsap.context(() => {
      // 頁面載入時的進場動畫
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

      // 拼圖遊戲初始化 - 完全重寫
      const puzzle = document.getElementById('puzzle');
      const pieces = puzzle?.getElementsByClassName('piece');

      if (puzzle && pieces) {
        console.log('拼圖初始化開始，找到拼圖塊數量:', pieces.length);

        // 動態計算拼圖塊大小，基於容器寬度
        const containerWidth = puzzle.offsetWidth || 520;
        const pieceSize = Math.floor((containerWidth - 6) / 3); // 減去間距
        const gap = 3;
        const gridSize = 3;

        console.log('拼圖容器寬度:', containerWidth, '拼圖塊大小:', pieceSize);

        window.addEventListener('resize', handleResize);

        // 設置拼圖容器
        gsap.set(puzzle, {
          width: gridSize * (pieceSize + gap) - gap,
          height: gridSize * (pieceSize + gap) - gap,
        });

        // 創建位置映射
        const positions: { [key: string]: { x: number; y: number } } = {};

        // 延遲初始化，確保 DOM 完全渲染
        setTimeout(() => {
          console.log('開始設置拼圖塊位置');

          // 初始化所有拼圖塊位置
          for (let i = 0; i < pieces.length; i++) {
            const piece = pieces[i] as HTMLElement;
            const { positionLeft, positionTop } = piece.dataset;

            const x = (parseInt(positionLeft || '1') - 1) * (pieceSize + gap);
            const y = (parseInt(positionTop || '1') - 1) * (pieceSize + gap);

            positions[`${positionLeft}-${positionTop}`] = { x, y };

            // 設置位置 - 使用 CSS transform 而不是 x, y
            gsap.set(piece, {
              width: pieceSize,
              height: pieceSize,
              transform: `translate(${x}px, ${y}px)`,
            });

            console.log(
              `拼圖塊 ${i}: 位置(${positionLeft}, ${positionTop}) -> 坐標(${x}, ${y})`,
            );
          }

          // 設置拖拽功能
          setupDraggable();
        }, 100);

        // 設置拖拽功能的函數
        const setupDraggable = () => {
          console.log('設置拖拽功能');

          // 完全簡化的拖拽邏輯 - 允許所有拼圖塊拖拽
          const draggablePieces = Array.from(pieces).filter(
            (piece) => !piece.classList.contains('empty'),
          );

          console.log('開始設置拖拽，拼圖塊數量:', draggablePieces.length);

          draggablePieces.forEach((piece) => {
            // 獲取拼圖塊的實際位置信息
            const pieceElement = piece as HTMLElement;
            const { positionLeft, positionTop } = pieceElement.dataset;
            const pieceIndex = Array.from(pieces).indexOf(piece);
            console.log(
              `設置拼圖塊 ${pieceIndex} (位置 ${positionLeft}, ${positionTop}) 的拖拽`,
            );

            Draggable.create(piece, {
              type: 'x,y',
              bounds: puzzle,
              inertia: false,
              snap: {
                x: function (endValue) {
                  const currentPieceSize = Math.floor(
                    (puzzle.offsetWidth - 6) / 3,
                  );
                  const currentGap = 3;
                  const gridSize = currentPieceSize + currentGap;
                  return Math.round(endValue / gridSize) * gridSize;
                },
                y: function (endValue) {
                  const currentPieceSize = Math.floor(
                    (puzzle.offsetWidth - 6) / 3,
                  );
                  const currentGap = 3;
                  const gridSize = currentPieceSize + currentGap;
                  return Math.round(endValue / gridSize) * gridSize;
                },
              },
              onPressInit: function () {
                // 直接從 DOM 元素獲取 transform 值
                const element = this.target as HTMLElement;
                const transform = getComputedStyle(element).transform;
                if (transform && transform !== 'none') {
                  const matrix = new DOMMatrix(transform);
                  this.startX = matrix.m41;
                  this.startY = matrix.m42;
                } else {
                  this.startX = 0;
                  this.startY = 0;
                }
                console.log(
                  `開始拖拽拼圖塊 ${pieceIndex} (位置 ${positionLeft}, ${positionTop})，起始位置:`,
                  this.startX,
                  this.startY,
                );
              },
              onDragEnd: function () {
                console.log(
                  `結束拖拽拼圖塊 ${pieceIndex} (位置 ${positionLeft}, ${positionTop})`,
                );
                const emptyPiece = puzzle.querySelector(
                  '.empty',
                ) as HTMLElement;
                if (emptyPiece) {
                  // 獲取當前拖拽元素的位置
                  const currentElement = this.target as HTMLElement;
                  const currentTransform =
                    getComputedStyle(currentElement).transform;
                  let currentX = 0,
                    currentY = 0;
                  if (currentTransform && currentTransform !== 'none') {
                    const currentMatrix = new DOMMatrix(currentTransform);
                    currentX = currentMatrix.m41;
                    currentY = currentMatrix.m42;
                  }

                  // 獲取空塊的位置
                  const emptyTransform = getComputedStyle(emptyPiece).transform;
                  let emptyX = 0,
                    emptyY = 0;
                  if (emptyTransform && emptyTransform !== 'none') {
                    const emptyMatrix = new DOMMatrix(emptyTransform);
                    emptyX = emptyMatrix.m41;
                    emptyY = emptyMatrix.m42;
                  }

                  console.log('拖拽後位置:', currentX, currentY);
                  console.log('空位位置:', emptyX, emptyY);

                  const diffX = Math.abs(currentX - emptyX);
                  const diffY = Math.abs(currentY - emptyY);

                  // 動態計算網格大小
                  const currentPieceSize = Math.floor(
                    (puzzle.offsetWidth - 6) / 3,
                  );
                  const currentGap = 3;
                  const gridSize = currentPieceSize + currentGap;

                  console.log('位置差:', diffX, diffY, '網格大小:', gridSize);

                  // 檢查是否拖拽到了空位（位置差為 0 或很小）
                  const tolerance = Math.max(20, gridSize * 0.1); // 動態容錯範圍
                  const isOnEmpty = diffX <= tolerance && diffY <= tolerance;

                  // 檢查是否與空位相鄰
                  const isAdjacent =
                    (Math.abs(diffX - gridSize) <= tolerance &&
                      Math.abs(diffY) <= tolerance) ||
                    (Math.abs(diffY - gridSize) <= tolerance &&
                      Math.abs(diffX) <= tolerance);

                  if (isOnEmpty || isAdjacent) {
                    console.log('可以交換位置');
                    // 交換位置
                    gsap.to(this.target, 0.3, {
                      transform: `translate(${emptyX}px, ${emptyY}px)`,
                      ease: 'power2.out',
                    });
                    gsap.to(emptyPiece, 0.3, {
                      transform: `translate(${this.startX}px, ${this.startY}px)`,
                      ease: 'power2.out',
                    });
                  } else {
                    console.log('回到原位置');
                    // 回到原位置
                    gsap.to(this.target, 0.3, {
                      transform: `translate(${this.startX}px, ${this.startY}px)`,
                      ease: 'back.out(1.7)',
                    });
                  }
                }
              },
            });
          });
        };
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id='home'
      ref={sectionRef}
      className='home'
      data-testid='home-section'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div
              className={`${styles.introSec} d-block d-lg-flex align-items-center`}
            >
              <div
                ref={galleryContainerRef}
                className={`${styles.hBgImage} order-1 order-lg-2 h-100`}
              >
                {/* 拼圖遊戲容器 */}
                <div id='puzzle' className={styles.puzzleContainer}>
                  {puzzleCells
                    ? puzzleCells.map((c, idx) => {
                        const isEmpty = !!c.empty;
                        // 0..2 座標（決定背景切片）- 使用邏輯位置
                        const bx = c.x - 1;
                        const by = c.y - 1;

                        return (
                          <div
                            key={idx}
                            className={`piece absolute p-[3px] ${
                              isEmpty ? 'empty' : ''
                            }`}
                            data-position-left={c.positionX}
                            data-position-top={c.positionY}
                            style={
                              {
                                width: 'calc(33.3333% - 6px)',
                                height: 'calc(33.3333% - 6px)',
                                '--x': bx,
                                '--y': by,
                              } as React.CSSProperties
                            }
                          >
                            {!isEmpty && (
                              <div
                                className='piece-inner w-full h-full bg-no-repeat'
                                style={{
                                  backgroundImage: "url('/picture/cat1.jpg')",
                                  backgroundSize: '300% 300%',
                                  backgroundPosition: `calc(var(--x) * 50%) calc(var(--y) * 50%)`,
                                }}
                              />
                            )}
                          </div>
                        );
                      })
                    : // 載入中的預設排列（確保 SSR 一致性）
                      [
                        { y: 1, x: 1, empty: true },
                        { y: 1, x: 2 },
                        { y: 1, x: 3 },
                        { y: 2, x: 1 },
                        { y: 2, x: 2 },
                        { y: 2, x: 3 },
                        { y: 3, x: 1 },
                        { y: 3, x: 2 },
                        { y: 3, x: 3 },
                      ].map((c, idx) => {
                        const isEmpty = !!c.empty;
                        const bx = c.x - 1;
                        const by = c.y - 1;

                        return (
                          <div
                            key={idx}
                            className={`piece absolute p-[3px] ${
                              isEmpty ? 'empty' : ''
                            }`}
                            data-position-left={c.x}
                            data-position-top={c.y}
                            style={
                              {
                                width: 'calc(33.3333% - 6px)',
                                height: 'calc(33.3333% - 6px)',
                                '--x': bx,
                                '--y': by,
                              } as React.CSSProperties
                            }
                          >
                            {!isEmpty && (
                              <div
                                className='piece-inner w-full h-full bg-no-repeat'
                                style={{
                                  backgroundImage: "url('/picture/cat2.JPG')",
                                  backgroundSize: '300% 300%',
                                  backgroundPosition: `calc(var(--x) * 50%) calc(var(--y) * 50%)`,
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                </div>
              </div>

              <div
                className={`${styles.text} order-2 order-lg-1 h-100 d-lg-flex justify-content-start`}
              >
                <div className='align-self-center w-100'>
                  <div className={`${styles.intro}`}>
                    <h2 ref={titleRef} className='mb-4'>
                      {introdata.title}
                    </h2>
                    <h1 ref={typewriterRef} className='mb-4'>
                      <Typewriter
                        options={{
                          strings: animatedTexts,
                          autoStart: true,
                          loop: true,
                          deleteSpeed: 10,
                        }}
                      />
                    </h1>
                    <p ref={descRef} className='lead mb-4'>
                      {introdata.description}
                    </p>

                    <div className='intro_btn-action pb-5'>
                      <div ref={buttonsRef} className={styles.buttonContainer}>
                        <div className={styles.buttonsRow}>
                          <a href='#about'>
                            <div id='buttonP' className={`${styles.acBtn} btn`}>
                              About Me
                              <div className={styles.ringOne}></div>
                              <div className={styles.ringTwo}></div>
                              <div className={styles.ringThree}></div>
                            </div>
                          </a>

                          <a href='#contact'>
                            <div id='buttonH' className={`${styles.acBtn} btn`}>
                              Contact Me
                              <div className={styles.ringOne}></div>
                              <div className={styles.ringTwo}></div>
                              <div className={styles.ringThree}></div>
                            </div>
                          </a>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
