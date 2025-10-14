#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧪 Playwright 測試驗證腳本');
console.log('============================');

// 檢查 Playwright 是否已安裝
try {
  execSync('npx playwright --version', { stdio: 'pipe' });
  console.log('✅ Playwright 已安裝');
} catch (error) {
  console.log('❌ Playwright 未安裝，請先運行: npm install @playwright/test');
  process.exit(1);
}

// 檢查測試檔案是否存在
const testFiles = [
  'tests/navigation.spec.ts',
  'tests/responsive-navigation.spec.ts',
  'tests/scroll-trigger.spec.ts',
];

console.log('\n📁 檢查測試檔案:');
testFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} 不存在`);
  }
});

// 檢查配置檔案
console.log('\n⚙️ 檢查配置檔案:');
if (fs.existsSync('playwright.config.ts')) {
  console.log('✅ playwright.config.ts');
} else {
  console.log('❌ playwright.config.ts 不存在');
}

if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts && packageJson.scripts.test) {
    console.log('✅ package.json 包含測試腳本');
  } else {
    console.log('❌ package.json 缺少測試腳本');
  }
} else {
  console.log('❌ package.json 不存在');
}

console.log('\n🚀 可用的測試命令:');
console.log('npm run test              # 運行所有測試');
console.log('npm run test:ui           # 使用 UI 模式運行測試');
console.log('npm run test:headed       # 以有頭模式運行測試');
console.log('npm run test:debug        # 調試模式運行測試');

console.log('\n📖 測試說明:');
console.log('1. 確保開發伺服器正在運行 (npm run dev)');
console.log('2. 在另一個終端運行測試命令');
console.log(
  '3. 如果端口衝突，請停止其他服務或修改 playwright.config.ts 中的 baseURL',
);

console.log('\n✨ 測試準備完成！');
