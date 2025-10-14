'use client';

import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface SectionConfig {
  id: string;
  label: string;
  threshold?: number;
}

export const useGsapSpy = (sections: SectionConfig[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 為每個 section 創建 ScrollTrigger
    const triggers = sections.map((section) => {
      return ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top 20%',
        end: 'bottom 20%',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
        onLeave: () => {
          // 只有在滾動到其他 section 時才更新
          const currentScroll = window.scrollY;
          const element = document.getElementById(section.id);
          if (element && currentScroll > element.offsetTop) {
            return;
          }
        },
        onLeaveBack: () => {
          // 向上滾動時的處理
          const currentScroll = window.scrollY;
          const element = document.getElementById(section.id);
          if (element && currentScroll < element.offsetTop) {
            return;
          }
        },
      });
    });

    // 設置初始 active section
    const firstSection = sections[0];
    if (firstSection) {
      setActiveSection(firstSection.id);
    }

    // 清理函數
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [sections]);

  return { activeSection };
};
