const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // ✅ 確保 Tailwind 掃描所有 `src/` 內的檔案
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
