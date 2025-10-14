'use client';

import React from 'react';
import { useGsapSpy, SectionConfig } from './useGsapSpy';
import GsapHashLink from './GsapHashLink';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import styles from './GsapBottomTab.module.css';

const sections: SectionConfig[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const iconMap = {
  home: FaHome,
  about: FaUser,
  projects: FaProjectDiagram,
  contact: FaEnvelope,
};

const GsapBottomTab: React.FC = () => {
  const { activeSection } = useGsapSpy(sections);

  return (
    <div
      className={`d-lg-none ${styles.bottomTab}`}
      data-testid='mobile-bottom-nav'
    >
      <div className={styles.tabContainer}>
        {sections.map((section) => {
          const IconComponent = iconMap[section.id as keyof typeof iconMap];
          return (
            <GsapHashLink
              key={section.id}
              to={section.id}
              className={`${styles.tabItem} ${
                activeSection === section.id ? styles.active : ''
              }`}
              data-testid={`mobile-nav-${section.id}`}
            >
              <IconComponent className={styles.tabIcon} />
              <span className={styles.tabLabel}>{section.label}</span>
            </GsapHashLink>
          );
        })}
      </div>
    </div>
  );
};

export default GsapBottomTab;
