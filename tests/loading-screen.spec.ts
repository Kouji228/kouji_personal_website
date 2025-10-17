import { test, expect } from '@playwright/test';

test.describe('載入畫面功能測試', () => {
  test('頁面載入時顯示載入畫面', async ({ page }) => {
    // 訪問首頁
    await page.goto('/');

    // 檢查載入畫面元素存在
    const loadingScreen = page.locator('.loading-screen');
    await expect(loadingScreen).toBeVisible();

    // 檢查載入動畫元素
    const loadingAnimation = page.locator('.loadingAnimation');
    await expect(loadingAnimation).toBeVisible();

    // 檢查進度條
    const progressBar = page.locator('.progressBar');
    await expect(progressBar).toBeVisible();

    // 檢查載入文字
    const loadingText = page.locator('.loadingText');
    await expect(loadingText).toBeVisible();
    await expect(loadingText).toContainText('Kouji Song');
    await expect(loadingText).toContainText('Front-End Developer');
  });

  test('載入完成後載入畫面消失', async ({ page }) => {
    // 訪問首頁
    await page.goto('/');

    // 等待載入畫面消失（最多等待 5 秒）
    await page.waitForTimeout(5000);

    // 檢查載入畫面已消失
    const loadingScreen = page.locator('.loading-screen');
    await expect(loadingScreen).toBeHidden();

    // 檢查主要內容可見
    const homeSection = page.getByTestId('home-section');
    await expect(homeSection).toBeVisible();
  });

  test('載入進度條正常運作', async ({ page }) => {
    // 訪問首頁
    await page.goto('/');

    // 檢查進度條初始狀態
    const progressFill = page.locator('.progressFill');
    await expect(progressFill).toBeVisible();

    // 等待一段時間讓進度條更新
    await page.waitForTimeout(1000);

    // 檢查進度文字存在
    const progressText = page.locator('.progressText');
    await expect(progressText).toBeVisible();

    // 檢查進度文字格式正確（百分比）
    const progressValue = await progressText.textContent();
    expect(progressValue).toMatch(/\d+%/);
  });

  test('載入動畫元素正常顯示', async ({ page }) => {
    // 訪問首頁
    await page.goto('/');

    // 檢查圓形載入動畫
    const circle = page.locator('.circle');
    await expect(circle).toBeVisible();

    // 檢查內圓
    const innerCircle = page.locator('.innerCircle');
    await expect(innerCircle).toBeVisible();

    // 檢查脈衝環
    const pulseRings = page.locator('.pulseRing');
    await expect(pulseRings).toHaveCount(3);

    // 檢查載入點動畫
    const loadingDots = page.locator('.loadingDots span');
    await expect(loadingDots).toHaveCount(3);
  });

  test('載入完成後頁面功能正常', async ({ page }) => {
    // 訪問首頁
    await page.goto('/');

    // 等待載入完成
    await page.waitForTimeout(5000);

    // 檢查導航功能正常
    const aboutLink = page.getByTestId('nav-link-about');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await page.waitForTimeout(2000);

    // 檢查滾動到 about section
    await expect(page).toHaveURL(/#about$/);
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();
  });
});
