import { test, expect } from '@playwright/test';

test.describe('ScrollTrigger 功能測試', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('頁面載入時 ScrollTrigger 正確初始化', async ({ page }) => {
    // 等待 ScrollTrigger 初始化
    await page.waitForTimeout(1000);

    // 檢查 ScrollTrigger 是否已載入
    const scrollTriggerLoaded = await page.evaluate(() => {
      return typeof window !== 'undefined' && 'ScrollTrigger' in window;
    });
    expect(scrollTriggerLoaded).toBeTruthy();
  });

  test('滾動時導航高亮正確更新', async ({ page }) => {
    // 滾動到 about section
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // 等待滾動完成
    await page.waitForTimeout(2000);

    // 檢查 about 連結為高亮狀態
    const aboutLink = page.getByTestId('nav-link-about');
    await expect(aboutLink).toHaveClass(/active/);

    // 檢查其他連結不是高亮狀態
    const homeLink = page.getByTestId('nav-link-home');
    await expect(homeLink).not.toHaveClass(/active/);

    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 檢查 projects 連結為高亮狀態
    const projectsLink = page.getByTestId('nav-link-projects');
    await expect(projectsLink).toHaveClass(/active/);

    // 檢查 about 連結不再是高亮狀態
    await expect(aboutLink).not.toHaveClass(/active/);
  });

  test('手機版滾動時底部導航高亮正確更新', async ({ page }) => {
    // 設定為手機版
    await page.setViewportSize({ width: 375, height: 667 });

    // 滾動到 about section
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 檢查 about 底部導航按鈕為高亮狀態
    const aboutMobileLink = page.getByTestId('mobile-nav-about');
    await expect(aboutMobileLink).toHaveClass(/active/);

    // 檢查 home 按鈕不是高亮狀態
    const homeMobileLink = page.getByTestId('mobile-nav-home');
    await expect(homeMobileLink).not.toHaveClass(/active/);
  });

  test('Projects 區塊動態載入後 ScrollTrigger 正確 refresh', async ({
    page,
  }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 檢查 projects section 可見
    const projectsSection = page.getByTestId('projects-section');
    await expect(projectsSection).toBeVisible();

    // 等待載入動畫完成（模擬的 500ms 延遲）
    await page.waitForTimeout(1000);

    // 檢查專案卡片已載入
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    await expect(projectCards.first()).toBeVisible();

    // 檢查載入動畫已消失
    const loadingSpinner = page.locator('.spinner-border');
    await expect(loadingSpinner).toBeHidden();
  });

  test('視窗大小變化時 ScrollTrigger 正確 refresh', async ({ page }) => {
    // 滾動到 about section
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 檢查 about 連結為高亮狀態
    const aboutLink = page.getByTestId('nav-link-about');
    await expect(aboutLink).toHaveClass(/active/);

    // 改變視窗大小
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // 檢查 about 底部導航按鈕為高亮狀態
    const aboutMobileLink = page.getByTestId('mobile-nav-about');
    await expect(aboutMobileLink).toHaveClass(/active/);

    // 改變回桌面版
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(500);

    // 檢查 about 桌面導航連結仍為高亮狀態
    await expect(aboutLink).toHaveClass(/active/);
  });

  test('直接訪問帶 hash 的 URL 時正確滾動和高亮', async ({ page }) => {
    // 直接訪問 /#projects
    await page.goto('/#projects');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // 檢查 URL 為 /#projects
    await expect(page).toHaveURL(/#projects$/);

    // 檢查 projects section 可見且在視窗頂部附近
    const projectsSection = page.getByTestId('projects-section');
    await expect(projectsSection).toBeVisible();

    const projectsSectionBox = await projectsSection.boundingBox();
    expect(projectsSectionBox).toBeTruthy();
    expect(projectsSectionBox!.y).toBeLessThan(200);

    // 檢查 projects 連結為高亮狀態
    const projectsLink = page.getByTestId('nav-link-projects');
    await expect(projectsLink).toHaveClass(/active/);
  });

  test('水平滾動卡片容器 ScrollTrigger 功能', async ({ page }) => {
    // 訪問水平滾動卡片頁面
    await page.goto('/horizontal-cards');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // 檢查水平滾動容器存在
    const horizontalContainer = page.locator(
      '[data-testid="horizontal-cards-container"]',
    );
    await expect(horizontalContainer).toBeVisible();

    // 檢查卡片存在
    const cards = page.locator('[data-testid^="card-"]');
    await expect(cards.first()).toBeVisible();

    // 測試載入更多按鈕
    const loadMoreButton = page.getByRole('button', { name: '載入更多' });
    await loadMoreButton.click();
    await page.waitForTimeout(1500);

    // 檢查新卡片已載入
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(5); // 初始 5 張 + 新增的 2 張

    // 測試重新排列按鈕
    const shuffleButton = page.getByRole('button', { name: '重新排列' });
    await shuffleButton.click();
    await page.waitForTimeout(1000);

    // 檢查卡片數量不變
    const newCardCount = await cards.count();
    expect(newCardCount).toBe(cardCount);
  });
});
