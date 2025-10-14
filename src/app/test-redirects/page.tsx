'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TestRedirects() {
  const [testResults, setTestResults] = useState<
    Array<{
      url: string;
      status: 'pending' | 'success' | 'error';
      message: string;
    }>
  >([]);

  const testUrls = ['/about', '/projects', '/project', '/contact'];

  const testRedirect = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual', // 不自動跟隨重定向
      });

      if (response.status === 301 || response.status === 302) {
        const location = response.headers.get('location');
        setTestResults((prev) => [
          ...prev,
          {
            url,
            status: 'success',
            message: `✅ 轉址到: ${location}`,
          },
        ]);
      } else {
        setTestResults((prev) => [
          ...prev,
          {
            url,
            status: 'error',
            message: `❌ 狀態碼: ${response.status}`,
          },
        ]);
      }
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          url,
          status: 'error',
          message: `❌ 錯誤: ${error}`,
        },
      ]);
    }
  };

  const runAllTests = () => {
    setTestResults([]);
    testUrls.forEach((url) => {
      testRedirect(url);
    });
  };

  return (
    <div className='container py-5'>
      <h1 className='mb-4'>轉址功能測試</h1>

      <div className='mb-4'>
        <button onClick={runAllTests} className='btn btn-primary'>
          執行所有測試
        </button>
      </div>

      <div className='mb-4'>
        <h3>手動測試連結：</h3>
        <div className='d-flex flex-wrap gap-2'>
          {testUrls.map((url) => (
            <Link
              key={url}
              href={url}
              className='btn btn-outline-primary'
              target='_blank'
            >
              {url}
            </Link>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h3>Hash 滾動測試：</h3>
        <div className='d-flex flex-wrap gap-2'>
          <Link href='/#about' className='btn btn-outline-secondary'>
            /#about
          </Link>
          <Link href='/#projects' className='btn btn-outline-secondary'>
            /#projects
          </Link>
          <Link href='/#contact' className='btn btn-outline-secondary'>
            /#contact
          </Link>
        </div>
      </div>

      {testResults.length > 0 && (
        <div>
          <h3>測試結果：</h3>
          <div className='list-group'>
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`list-group-item ${
                  result.status === 'success'
                    ? 'list-group-item-success'
                    : result.status === 'error'
                    ? 'list-group-item-danger'
                    : 'list-group-item-warning'
                }`}
              >
                <strong>{result.url}</strong>: {result.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
