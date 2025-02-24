'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // ✅ 導入 Framer Motion

type WeatherElement = {
  elementName: string;
  time: {
    startTime: string;
    endTime: string;
    parameter: {
      parameterName: string;
    };
  }[];
};

type WeatherData = {
  locationName: string;
  weatherElement: WeatherElement[];
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('新北市');

  // 用於彈窗控制
  const [showModal, setShowModal] = useState(false);

  // 取得天氣資訊
  useEffect(() => {
    fetch(`/api/weather?city=${selectedCity}`)
      .then((res) => res.json())
      .then((data) => {
        if (
          !data.records ||
          !data.records.location ||
          data.records.location.length === 0
        ) {
          console.error('API 回傳的資料結構異常:', data);
          return;
        }
        setWeatherData(data.records.location[0]);
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  }, [selectedCity]);

  // 將相同時間段的天氣資料合併
  const mergedData: { [key: string]: { [key: string]: string } } = {};

  weatherData?.weatherElement.forEach((element) => {
    element.time.forEach((time) => {
      const timeKey = `${time.startTime.slice(5, 16)} - ${time.endTime.slice(
        5,
        16,
      )}`;
      if (!mergedData[timeKey]) {
        mergedData[timeKey] = {};
      }
      mergedData[timeKey][element.elementName] = time.parameter.parameterName;
    });
  });

  // 打開/關閉 Modal
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center p-12 text-black
                 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <h1 className='text-4xl font-bold text-white mb-6'>
        Welcome to Kouji's Personal Website
      </h1>

      {/* 天氣資訊區塊 */}
      <motion.div
        className='bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mb-12 text-xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl font-bold text-center mb-4'>
          🌤️ {weatherData?.locationName} 天氣預報
        </h1>
        <div className='mb-6'>
          <select
            id='city'
            className='ml-2 p-2 border rounded-md'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value='基隆市'>基隆市</option>
            <option value='臺北市'>臺北市</option>
            <option value='新北市'>新北市</option>
            <option value='桃園市'>桃園市</option>
            <option value='新竹市'>新竹市</option>
            <option value='新竹縣'>新竹縣</option>
            <option value='苗栗縣'>苗栗縣</option>
            <option value='臺中市'>臺中市</option>
            <option value='彰化縣'>彰化縣</option>
            <option value='南投縣'>南投縣</option>
            <option value='雲林縣'>雲林縣</option>
            <option value='嘉義市'>嘉義市</option>
            <option value='嘉義縣'>嘉義縣</option>
            <option value='臺南市'>臺南市</option>
            <option value='高雄市'>高雄市</option>
            <option value='屏東縣'>屏東縣</option>
            <option value='宜蘭縣'>宜蘭縣</option>
            <option value='花蓮縣'>花蓮縣</option>
            <option value='臺東縣'>臺東縣</option>
            <option value='澎湖縣'>澎湖縣</option>
            <option value='金門縣'>金門縣</option>
            <option value='連江縣'>連江縣</option>
          </select>
        </div>

        {/* 天氣表格 */}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200 text-lg'>
                <th className='border border-gray-400 px-4 py-2'>📅 時間</th>
                <th className='border border-gray-400 px-4 py-2'>
                  🌤️ 天氣 & 降雨
                </th>
                <th className='border border-gray-400 px-4 py-2'>🌡️ 氣溫</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(mergedData).map(
                ([timeRange, elements], index) => (
                  <tr
                    key={index}
                    className='border-t border-gray-300 text-center'
                  >
                    <td className='border border-gray-400 px-4 py-2 font-medium text-gray-700'>
                      {timeRange}
                    </td>
                    <td className='border border-gray-400 px-4 py-2 text-gray-600'>
                      {elements['Wx'] && <p>🌥️ {elements['Wx']}</p>}
                      {elements['PoP'] && (
                        <p>💧 降雨機率: {elements['PoP']}%</p>
                      )}
                      {elements['CI'] && <p>🌡️ {elements['CI']}</p>}
                    </td>
                    <td className='border border-gray-400 px-4 py-2 text-gray-600'>
                      {elements['MinT'] && (
                        <p>🔹 最低溫: {elements['MinT']}°C</p>
                      )}
                      {elements['MaxT'] && (
                        <p>🔺 最高溫: {elements['MaxT']}°C</p>
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 履歷資訊區塊 */}
      {/* 注意這裡將 className 裡的 md-12 改為 mb-12 */}
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full text-xl mb-12'>
        <header className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>Kouji</h1>
          <p className='text-lg text-gray-600'>Front-End Developer starter</p>
        </header>

        <section className='mt-8'>
          <h2 className='text-2xl '>基本資料</h2>
          <ul className='mt-4 space-y-2'>
            <li>
              <span className='font-semibold'>Email:</span> example@example.com
            </li>
            <li>
              <span className='font-semibold'>Location:</span> Taipei
            </li>
          </ul>
        </section>

        {/* 技能區塊 */}
        <motion.div
          className='bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mt-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className='text-2xl font-semibold text-gray-800 '>🚀 我的技能</h2>
          <ul className='mt-4 space-y-3'>
            {[
              'JavaScript',
              'React',
              'HTML',
              'Python',
              'Tailwind CSS',
              'Next.js',
            ].map((skill, index) => (
              <motion.li
                key={index}
                className='p-2 bg-gray-100 rounded-lg text-center text-lg font-medium'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <section className='mt-12'>
          <h2 className='text-3xl font-semibold text-gray-800'>專案</h2>
          <ul className='mt-4 space-y-2'>
            {/* 點擊清大專案 → 打開 Modal */}
            <li>
              <button
                className='text-blue-600 underline hover:text-blue-800'
                onClick={toggleModal}
              >
                清大專案 (2024-)
              </button>
            </li>
          </ul>
        </section>
      </div>

      <Link href='/about' className='mt-6 text-blue-500 hover:underline'>
        Go to About Page
      </Link>

      {/* Modal 大視窗 */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          {/* Modal 內容容器 */}
          <motion.div
            className='bg-white w-11/12 md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-2xl relative'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* 關閉按鈕 */}
            <button
              className='absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900'
              onClick={toggleModal}
            >
              &times;
            </button>
            <h2 className='text-3xl font-bold mb-4'>清大專案</h2>
            <p className='text-lg leading-relaxed mb-4'>
              這裡放置清大專案的詳細內容、相關連結、或圖片說明等。
            </p>
            {/* 範例圖片插入： */}
            {/* <img src="/project-nthu.png" alt="清大專案截圖" className='mb-4' /> */}
            <p className='text-lg'>
              你可以在這裡詳細描述專案目標、技術用法、成果展示，或加上更多連結。
            </p>
          </motion.div>
        </div>
      )}
    </main>
  );
}
