'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { VscGrabber, VscClose } from 'react-icons/vsc';
import { logotext, socialprofils } from '../../content_option';
import Themetoggle from '../../components/themetoggle';
import TabNavigation from '../../components/tabnavigation';
import styles from './index.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Headermain: FC = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);

    if (typeof window !== 'undefined') {
      document.body.classList.toggle('ovhidden');
    }
  };

  return (
    <>
      <header className={`fixed-top ${styles.siteHeader}`}>
        <div
          className={`d-flex align-items-center justify-content-between ${styles.headerInner}`}
        >
          <Link href='/' className={`navbar-brand ${styles.navAc}`}>
            {logotext}
          </Link>

          <div className={`d-flex align-items-center ${styles.headerActions}`}>
            <Themetoggle />

            <button
              className={`${styles.menuButton} ${styles.navAc}`}
              onClick={handleToggle}
            >
              {!isActive ? <VscGrabber /> : <VscClose />}
            </button>
          </div>
        </div>

        <div
          className={
            isActive
              ? `${styles.siteNavigation} ${styles.menuOpend}`
              : styles.siteNavigation
          }
        >
          <div className={`${styles.bgMenu} h-100`}>
            <div className={styles.menuWrapper}>
              <div className={`${styles.menuContainer} p-3`}>
                <ul className={styles.theMenu}>
                  <li className={styles.menuItem}>
                    <Link href='/' className='my-3' onClick={handleToggle}>
                      Home
                    </Link>
                  </li>
                  <li className={styles.menuItem}>
                    <Link
                      href='/project'
                      className='my-3'
                      onClick={handleToggle}
                    >
                      Project
                    </Link>
                  </li>
                  <li className={styles.menuItem}>
                    <Link href='/about' className='my-3' onClick={handleToggle}>
                      About
                    </Link>
                  </li>
                  <li className={styles.menuItem}>
                    <Link
                      href='/contact'
                      className='my-3'
                      onClick={handleToggle}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`${styles.menuFooter} d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3`}
          >
            <div className='d-flex'>
              <a href={socialprofils.github}>
                <FaGithub />
              </a>
              <a href={socialprofils.linkedin}>
                <FaLinkedin />
              </a>
            </div>
            <p className='m-0'>copyright __ {logotext}</p>
          </div>
        </div>
      </header>

      {/* 標籤導航 */}
      <TabNavigation />
    </>
  );
};

export default Headermain;
