'use client';

import React from 'react';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'WebPage';
  data: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://kouji-song.dev';

    switch (type) {
      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Kouji Song',
          alternateName: '宋平浩',
          jobTitle: 'Front-End Developer',
          description: '前端工程師，專精 React.js/Next.js 開發',
          url: baseUrl,
          sameAs: [
            'https://github.com/Kouji228',
            'https://linkedin.com/in/kouji-song/',
          ],
          knowsAbout: [
            'React.js',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'Frontend Development',
            'Web Development',
            'UI/UX Design',
          ],
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Front-End Developer',
            description:
              '專精現代前端框架開發，具備購物車、會員系統與 API 串接經驗',
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'New Taipei City',
            addressCountry: 'TW',
          },
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Kouji Song Portfolio',
          alternateName: '宋平浩作品集',
          url: baseUrl,
          description: 'Kouji Song 前端工程師個人作品集網站',
          author: {
            '@type': 'Person',
            name: 'Kouji Song',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        };

      case 'WebPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: data.title || 'Kouji Song - Front-End Developer',
          description: data.description || '前端工程師作品集',
          url: data.url || baseUrl,
          mainEntity: {
            '@type': 'Person',
            name: 'Kouji Song',
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
              },
              ...((data.breadcrumbs as Array<unknown>) || []),
            ],
          },
        };

      default:
        return {};
    }
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
};

export default StructuredData;
