'use client';

import React, { useState } from 'react';
import { VscGrabber, VscClose } from 'react-icons/vsc';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { logotext, contactConfig, socialprofils } from '../../content_option';
import { useGsapSpy, SectionConfig } from './useGsapSpy';
import GsapHashLink from './GsapHashLink';
import Themetoggle from '../themetoggle';
import styles from '../../app/header/index.module.css';

const sections: SectionConfig[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const GsapNav: React.FC = () => {
  const { activeSection } = useGsapSpy(sections);
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);

    if (typeof window !== 'undefined') {
      document.body.classList.toggle('ovhidden');
    }
  };

  const handleMenuClose = () => {
    setActive(false);
    if (typeof window !== 'undefined') {
      document.body.classList.remove('ovhidden');
    }
  };

  return (
    <>
      <header
        className={`fixed-top ${styles.siteHeader}`}
        data-testid='desktop-nav'
      >
        <div
          className={`d-flex align-items-center justify-content-between ${styles.headerInner}`}
        >
          <GsapHashLink
            to='home'
            className={`navbar-brand ${styles.navAc}`}
            data-testid='nav-logo'
          >
            {logotext}
          </GsapHashLink>

          <div className={`d-flex align-items-center ${styles.headerActions}`}>
            <Themetoggle />

            {/* 漢堡選單按鈕 - 所有螢幕尺寸都顯示 */}
            <button
              className={`${styles.menuButton} ${styles.navAc}`}
              onClick={handleToggle}
              data-testid='hamburger-menu-button'
              aria-label={isActive ? '關閉選單' : '開啟選單'}
            >
              {!isActive ? <VscGrabber /> : <VscClose />}
            </button>
          </div>
        </div>

        {/* 全螢幕選單 */}
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
                  {sections.map((section) => (
                    <li key={section.id} className={styles.menuItem}>
                      <GsapHashLink
                        to={section.id}
                        className={`my-3 ${
                          activeSection === section.id ? styles.active : ''
                        }`}
                        onClick={handleMenuClose}
                        data-testid={`nav-link-${section.id}`}
                      >
                        {section.label}
                      </GsapHashLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Email Footer */}
          <div
            className={`${styles.menuFooter} d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3`}
          >
            <div className='d-flex flex-column flex-md-row align-items-center'>
              <div className='d-flex align-items-center mb-2 mb-md-0 me-md-4'>
                <FaEnvelope className='me-2' />
                <a
                  href={`mailto:${contactConfig.YOUR_EMAIL}`}
                  className='text-decoration-none'
                  style={{ color: 'var(--text-color-2)' }}
                >
                  {contactConfig.YOUR_EMAIL}
                </a>
              </div>
              <div className='d-flex flex-column flex-md-row align-items-center'>
                <a
                  href={socialprofils.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='d-flex align-items-center me-3 mb-2 mb-md-0 text-decoration-none'
                  aria-label='GitHub'
                >
                  <FaGithub className='me-2' />
                  <span
                    style={{ color: 'var(--text-color-2)', fontSize: '0.9rem' }}
                  >
                    github.com/Kouji228
                  </span>
                </a>
                <a
                  href={socialprofils.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='d-flex align-items-center text-decoration-none'
                  aria-label='LinkedIn'
                >
                  <FaLinkedin className='me-2' />
                  <span
                    style={{ color: 'var(--text-color-2)', fontSize: '0.9rem' }}
                  >
                    linkedin.com/in/kouji-song/
                  </span>
                </a>
              </div>
            </div>
            <p className='m-0'>copyright © {logotext}</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default GsapNav;
