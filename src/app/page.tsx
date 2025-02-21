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

  useEffect(() => {
    fetch(`/api/weather?city=${selectedCity}`)
      .then((res) => res.json())
      .then((data) => {
        // 確保 data 結構正確
        if (
          !data.records ||
          !data.records.location ||
          data.records.location.length === 0
        ) {
          console.error('API 回傳的資料結構異常:', data);
          return;
        }

        //  確保 location 數據存在後才設定
        setWeatherData(data.records.location[0]);
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  }, [selectedCity]);

  // 將相同時間段的資料合併
  const mergedData: { [key: string]: { [key: string]: string } } = {};

  weatherData?.weatherElement.forEach((element) => {
    element.time.forEach((time) => {
      const timeKey = `${time.startTime.slice(5, 16)} - ${time.endTime.slice(
        5,
        16,
      )}`; // 格式化時間
      if (!mergedData[timeKey]) {
        mergedData[timeKey] = {};
      }
      mergedData[timeKey][element.elementName] = time.parameter.parameterName;
    });
  });

  return (
    <main
      className=" min-h-screen flex flex-col items-center justify-center p-12 text-black
    bg-[url('/background.jpg')] bg-cover bg-center " // 背景圖片設置
    >
      <h1 className='text-4xl font-bold text-white mb-6'>
        Welcome to the Home Page
      </h1>

      {/* 天氣資訊區塊 */}
      <motion.div
        className='bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mb-8'
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
              <tr className='bg-gray-200'>
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
                    {/* 📅 左側：時間區間 */}
                    <td className='border border-gray-400 px-4 py-2 font-medium text-gray-700'>
                      {timeRange}
                    </td>

                    {/* 🌤️ 中間：天氣現象、降雨、體感 */}
                    <td className='border border-gray-400 px-4 py-2 text-gray-600'>
                      {elements['Wx'] && <p>🌥️ {elements['Wx']}</p>}
                      {elements['PoP'] && (
                        <p>💧 降雨機率: {elements['PoP']}%</p>
                      )}
                      {elements['CI'] && <p>🌡️ {elements['CI']}</p>}
                    </td>

                    {/* 🌡️ 右側：氣溫 */}
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
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-xl w-full'>
        <header className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>Kouji</h1>
          <p className='text-l text-gray-600'>Front-End Developer starter</p>
        </header>

        <section className='mt-8'>
          <h2 className='text-2xl '>基本資料</h2>
          <ul className='mt-4 space-y-2'>
            <li>
              <span className='font-semibold'>Email:</span> example@example.com
            </li>
            <li>
              <span className='font-semibold '>Location:</span> Taipei
            </li>
          </ul>
        </section>

        {/* 技能區塊 */}
        <motion.div
          className='bg-white p-8 rounded-lg shadow-lg max-w-xl w-full '
          initial={{ opacity: 0, y: 20 }} // 初始狀態
          animate={{ opacity: 1, y: 0 }} // 動畫效果
          transition={{ duration: 1 }} // 動畫時長
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
                initial={{ opacity: 0, x: -50 }} // 初始狀態：左側滑入
                animate={{ opacity: 1, x: 0 }} // 最終狀態
                transition={{ delay: index * 0.2, duration: 0.5 }} // 延遲讓技能依序出現
                whileHover={{ scale: 1.1 }} // 滑鼠懸停時放大
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>專案</h2>
          <ul className='mt-4 space-y-2'>
            <li>清大專案(2024-)</li>
          </ul>
        </section>
      </div>

      <Link href='/about' className='mt-6 text-blue-500 hover:underline'>
        Go to About Page
      </Link>
    </main>
  );
}
