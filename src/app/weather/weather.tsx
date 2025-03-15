// const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
// const [selectedCity, setSelectedCity] = useState<string>('新北市');

// type WeatherElement = {
//   elementName: string;
//   time: {
//     startTime: string;
//     endTime: string;
//     parameter: {
//       parameterName: string;
//     };
//   }[];
// };

// type WeatherData = {
//   locationName: string;
//   weatherElement: WeatherElement[];
// };

// // 取得天氣資訊
// useEffect(() => {
//   fetch(`/api/weather?city=${selectedCity}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (
//         !data.records ||
//         !data.records.location ||
//         data.records.location.length === 0
//       ) {
//         console.error('API 回傳的資料結構異常:', data);
//         return;
//       }
//       setWeatherData(data.records.location[0]);
//     })
//     .catch((error) => console.error('Error fetching weather data:', error));
// }, [selectedCity]);

// // 將相同時間段的天氣資料合併
// const mergedData: { [key: string]: { [key: string]: string } } = {};

// weatherData?.weatherElement.forEach((element) => {
//   element.time.forEach((time) => {
//     const timeKey = `${time.startTime.slice(5, 16)} - ${time.endTime.slice(
//       5,
//       16,
//     )}`;
//     if (!mergedData[timeKey]) {
//       mergedData[timeKey] = {};
//     }
//     mergedData[timeKey][element.elementName] = time.parameter.parameterName;
//   });
// });

// {
//   /* 天氣資訊區塊 */
// }
// <motion.div
//   className='bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mb-12 text-xl'
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
// >
//   <h1 className='text-3xl font-bold text-center mb-4'>
//     🌤️ {weatherData?.locationName} 天氣預報
//   </h1>
//   <div className='mb-6'>
//     <select
//       id='city'
//       className='ml-2 p-2 border rounded-md'
//       value={selectedCity}
//       onChange={(e) => setSelectedCity(e.target.value)}
//     >
//       <option value='基隆市'>基隆市</option>
//       <option value='臺北市'>臺北市</option>
//       <option value='新北市'>新北市</option>
//       <option value='桃園市'>桃園市</option>
//       <option value='新竹市'>新竹市</option>
//       <option value='新竹縣'>新竹縣</option>
//       <option value='苗栗縣'>苗栗縣</option>
//       <option value='臺中市'>臺中市</option>
//       <option value='彰化縣'>彰化縣</option>
//       <option value='南投縣'>南投縣</option>
//       <option value='雲林縣'>雲林縣</option>
//       <option value='嘉義市'>嘉義市</option>
//       <option value='嘉義縣'>嘉義縣</option>
//       <option value='臺南市'>臺南市</option>
//       <option value='高雄市'>高雄市</option>
//       <option value='屏東縣'>屏東縣</option>
//       <option value='宜蘭縣'>宜蘭縣</option>
//       <option value='花蓮縣'>花蓮縣</option>
//       <option value='臺東縣'>臺東縣</option>
//       <option value='澎湖縣'>澎湖縣</option>
//       <option value='金門縣'>金門縣</option>
//       <option value='連江縣'>連江縣</option>
//     </select>
//   </div>

//   {/* 天氣表格 */}
//   <div className='overflow-x-auto'>
//     <table className='w-full border-collapse border border-gray-300'>
//       <thead>
//         <tr className='bg-gray-200 text-lg'>
//           <th className='border border-gray-400 px-4 py-2'>📅 時間</th>
//           <th className='border border-gray-400 px-4 py-2'>🌤️ 天氣 & 降雨</th>
//           <th className='border border-gray-400 px-4 py-2'>🌡️ 氣溫</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Object.entries(mergedData).map(([timeRange, elements], index) => (
//           <tr key={index} className='border-t border-gray-300 text-center'>
//             <td className='border border-gray-400 px-4 py-2 font-medium text-gray-700'>
//               {timeRange}
//             </td>
//             <td className='border border-gray-400 px-4 py-2 text-gray-600'>
//               {elements['Wx'] && <p>🌥️ {elements['Wx']}</p>}
//               {elements['PoP'] && <p>💧 降雨機率: {elements['PoP']}%</p>}
//               {elements['CI'] && <p>🌡️ {elements['CI']}</p>}
//             </td>
//             <td className='border border-gray-400 px-4 py-2 text-gray-600'>
//               {elements['MinT'] && <p>🔹 最低溫: {elements['MinT']}°C</p>}
//               {elements['MaxT'] && <p>🔺 最高溫: {elements['MaxT']}°C</p>}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </motion.div>;
