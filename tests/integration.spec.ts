import { test, expect } from '@playwright/test';

test.describe('整體功能整合測試', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('完整用戶流程：載入 → 導航 → 瀏覽專案', async ({ page }) => {
    // 1. 檢查載入畫面
    const loadingScreen = page.locator('.loading-screen');
    await expect(loadingScreen).toBeVisible();

    // 2. 等待載入完成
    await page.waitForTimeout(5000);
    await expect(loadingScreen).toBeHidden();

    // 3. 檢查首頁內容
    const homeSection = page.getByTestId('home-section');
    await expect(homeSection).toBeVisible();

    // 4. 導航到 About
    const aboutLink = page.getByTestId('nav-link-about');
    await aboutLink.click();
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/#about$/);
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();

    // 5. 導航到 Projects
    const projectsLink = page.getByTestId('nav-link-projects');
    await projectsLink.click();
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/#projects$/);
    const projectsSection = page.getByTestId('projects-section');
    await expect(projectsSection).toBeVisible();

    // 6. 等待專案載入
    await page.waitForTimeout(1000);
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    await expect(projectCards.first()).toBeVisible();

    // 7. 導航到 Contact
    const contactLink = page.getByTestId('nav-link-contact');
    await contactLink.click();
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/#contact$/);
    const contactSection = page.getByTestId('contact-section');
    await expect(contactSection).toBeVisible();
  });

  test('手機版完整用戶流程', async ({ page }) => {
    // 設定為手機版
    await page.setViewportSize({ width: 375, height: 667 });

    // 等待載入完成
    await page.waitForTimeout(5000);

    // 檢查底部導航
    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeVisible();

    // 測試所有底部導航按鈕
    const sections = ['home', 'about', 'projects', 'contact'];

    for (const section of sections) {
      const mobileLink = page.getByTestId(`mobile-nav-${section}`);
      await mobileLink.click();
      await page.waitForTimeout(2000);

      await expect(page).toHaveURL(new RegExp(`#${section}$`));
      const sectionElement = page.getByTestId(`${section}-section`);
      await expect(sectionElement).toBeVisible();
    }
  });

  test('深連結功能完整測試', async ({ page }) => {
    // 測試直接訪問各個 section
    const sections = [
      { url: '/#about', sectionId: 'about-section' },
      { url: '/#projects', sectionId: 'projects-section' },
      { url: '/#contact', sectionId: 'contact-section' },
    ];

    for (const { url, sectionId } of sections) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);

      // 檢查 URL 正確
      await expect(page).toHaveURL(
        new RegExp(`#${sectionId.replace('-section', '')}$`),
      );

      // 檢查對應 section 可見
      const sectionElement = page.getByTestId(sectionId);
      await expect(sectionElement).toBeVisible();

      // 檢查導航高亮正確
      const sectionName = sectionId.replace('-section', '');
      const navLink = page.getByTestId(`nav-link-${sectionName}`);
      await expect(navLink).toHaveClass(/active/);
    }
  });

  test('頁面重新整理後狀態保持', async ({ page }) => {
    // 導航到 projects section
    const projectsLink = page.getByTestId('nav-link-projects');
    await projectsLink.click();
    await page.waitForTimeout(2000);

    // 檢查 URL 為 /#projects
    await expect(page).toHaveURL(/#projects$/);

    // 重新整理頁面
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 檢查 URL 仍為 /#projects
    await expect(page).toHaveURL(/#projects$/);

    // 檢查 projects section 可見
    const projectsSection = page.getByTestId('projects-section');
    await expect(projectsSection).toBeVisible();

    // 檢查導航高亮正確
    await expect(projectsLink).toHaveClass(/active/);
  });

  test('視窗大小變化時功能正常', async ({ page }) => {
    // 開始為桌面版
    await page.setViewportSize({ width: 1200, height: 800 });

    // 導航到 about section
    const aboutLink = page.getByTestId('nav-link-about');
    await aboutLink.click();
    await page.waitForTimeout(2000);

    // 切換到手機版
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // 檢查底部導航顯示
    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeVisible();

    // 檢查 about 按鈕高亮
    const aboutMobileLink = page.getByTestId('mobile-nav-about');
    await expect(aboutMobileLink).toHaveClass(/active/);

    // 切換回桌面版
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(500);

    // 檢查桌面導航顯示
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible();

    // 檢查 about 連結高亮
    await expect(aboutLink).toHaveClass(/active/);
  });

  test('所有動畫和互動功能正常運作', async ({ page }) => {
    // 等待載入完成
    await page.waitForTimeout(5000);

    // 測試拼圖遊戲
    const puzzleContainer = page.locator('#puzzle');
    await expect(puzzleContainer).toBeVisible();

    // 測試導航滾動
    const aboutLink = page.getByTestId('nav-link-about');
    await aboutLink.click();
    await page.waitForTimeout(2000);

    // 測試專案載入
    const projectsLink = page.getByTestId('nav-link-projects');
    await projectsLink.click();
    await page.waitForTimeout(3000);

    // 檢查專案卡片載入
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    await expect(projectCards.first()).toBeVisible();

    // 測試卡片懸停效果
    const firstCard = projectCards.first();
    await firstCard.hover();
    await page.waitForTimeout(300);
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
  });

  test('網站效能和載入時間測試', async ({ page }) => {
    // 記錄開始時間
    const startTime = Date.now();

    // 訪問首頁
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 記錄載入完成時間
    const loadTime = Date.now() - startTime;

    // 檢查載入時間合理（應該在 10 秒內）
    expect(loadTime).toBeLessThan(10000);

    // 檢查所有主要 section 都載入完成
    const sections = [
      'home-section',
      'about-section',
      'projects-section',
      'contact-section',
    ];

    for (const sectionId of sections) {
      const section = page.getByTestId(sectionId);
      await expect(section).toBeVisible();
    }
  });

  test('跨瀏覽器兼容性基本檢查', async ({ page }) => {
    // 檢查基本 HTML 結構
    const html = page.locator('html');
    await expect(html).toBeVisible();

    // 檢查 head 標籤
    const head = page.locator('head');
    await expect(head).toBeVisible();

    // 檢查 body 標籤
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // 檢查主要容器
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // 檢查導航元素
    const desktopNav = page.getByTestId('desktop-nav');
    const mobileNav = page.getByTestId('mobile-bottom-nav');

    // 至少有一個導航可見
    const desktopVisible = await desktopNav.isVisible();
    const mobileVisible = await mobileNav.isVisible();
    expect(desktopVisible || mobileVisible).toBeTruthy();
  });

  test('錯誤處理和邊界情況測試', async ({ page }) => {
    // 測試無效的 hash 連結
    await page.goto('/#invalid-section');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 應該仍然顯示首頁內容
    const homeSection = page.getByTestId('home-section');
    await expect(homeSection).toBeVisible();

    // 測試快速連續點擊導航
    const aboutLink = page.getByTestId('nav-link-about');
    const projectsLink = page.getByTestId('nav-link-projects');

    // 快速點擊多個導航
    await aboutLink.click();
    await projectsLink.click();
    await aboutLink.click();
    await page.waitForTimeout(2000);

    // 應該最終停留在 about section
    await expect(page).toHaveURL(/#about$/);
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();
  });
});
