import { test, expect } from '@playwright/test';

test.describe('響應式導航測試', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('桌面版 (>= 992px) 顯示桌面導航，隱藏底部導航', async ({ page }) => {
    // 設定為桌面視窗大小
    await page.setViewportSize({ width: 1200, height: 800 });

    // 檢查桌面導航顯示
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible();

    const desktopNavMenu = page.getByTestId('desktop-nav-menu');
    await expect(desktopNavMenu).toBeVisible();

    // 檢查底部導航隱藏
    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeHidden();

    // 檢查所有桌面導航連結存在
    const navLinks = ['home', 'about', 'projects', 'contact'];
    for (const linkId of navLinks) {
      const link = page.getByTestId(`nav-link-${linkId}`);
      await expect(link).toBeVisible();
    }
  });

  test('平板版 (768px - 991px) 顯示桌面導航，隱藏底部導航', async ({
    page,
  }) => {
    // 設定為平板視窗大小
    await page.setViewportSize({ width: 768, height: 1024 });

    // 檢查桌面導航顯示
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible();

    // 檢查底部導航隱藏
    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeHidden();
  });

  test('手機版 (< 768px) 隱藏桌面導航，顯示底部導航', async ({ page }) => {
    // 設定為手機視窗大小
    await page.setViewportSize({ width: 375, height: 667 });

    // 檢查桌面導航隱藏
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible(); // 導航容器仍存在，但選單隱藏

    const desktopNavMenu = page.getByTestId('desktop-nav-menu');
    await expect(desktopNavMenu).toBeHidden();

    // 檢查底部導航顯示
    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeVisible();

    // 檢查所有底部導航按鈕存在
    const mobileNavLinks = ['home', 'about', 'projects', 'contact'];
    for (const linkId of mobileNavLinks) {
      const link = page.getByTestId(`mobile-nav-${linkId}`);
      await expect(link).toBeVisible();
    }
  });

  test('視窗大小變化時導航正確切換', async ({ page }) => {
    // 開始為桌面版
    await page.setViewportSize({ width: 1200, height: 800 });

    // 檢查桌面導航顯示
    const desktopNavMenu = page.getByTestId('desktop-nav-menu');
    await expect(desktopNavMenu).toBeVisible();

    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeHidden();

    // 縮小為手機版
    await page.setViewportSize({ width: 375, height: 667 });

    // 檢查桌面導航選單隱藏
    await expect(desktopNavMenu).toBeHidden();

    // 檢查底部導航顯示
    await expect(mobileBottomNav).toBeVisible();

    // 放大回桌面版
    await page.setViewportSize({ width: 1200, height: 800 });

    // 檢查桌面導航選單顯示
    await expect(desktopNavMenu).toBeVisible();

    // 檢查底部導航隱藏
    await expect(mobileBottomNav).toBeHidden();
  });

  test('手機版底部導航功能完整測試', async ({ page }) => {
    // 設定為手機版
    await page.setViewportSize({ width: 375, height: 667 });

    // 測試每個底部導航按鈕
    const testCases = [
      { id: 'home', expectedUrl: /#home$/, sectionTestId: 'home-section' },
      { id: 'about', expectedUrl: /#about$/, sectionTestId: 'about-section' },
      {
        id: 'projects',
        expectedUrl: /#projects$/,
        sectionTestId: 'projects-section',
      },
      {
        id: 'contact',
        expectedUrl: /#contact$/,
        sectionTestId: 'contact-section',
      },
    ];

    for (const testCase of testCases) {
      // 點擊底部導航按鈕
      const mobileLink = page.getByTestId(`mobile-nav-${testCase.id}`);
      await mobileLink.click();
      await page.waitForTimeout(1500);

      // 檢查 URL 變化
      await expect(page).toHaveURL(testCase.expectedUrl);

      // 檢查對應 section 可見
      const section = page.getByTestId(testCase.sectionTestId);
      await expect(section).toBeVisible();

      // 檢查按鈕為高亮狀態
      await expect(mobileLink).toHaveClass(/active/);

      // 檢查其他按鈕不是高亮狀態
      const otherLinks = testCases
        .filter((tc) => tc.id !== testCase.id)
        .map((tc) => page.getByTestId(`mobile-nav-${tc.id}`));

      for (const otherLink of otherLinks) {
        await expect(otherLink).not.toHaveClass(/active/);
      }
    }
  });

  test('手機版底部導航滾動到正確位置', async ({ page }) => {
    // 設定為手機版
    await page.setViewportSize({ width: 375, height: 667 });

    // 測試滾動到 about section
    const aboutMobileLink = page.getByTestId('mobile-nav-about');
    await aboutMobileLink.click();
    await page.waitForTimeout(1500);

    // 檢查 about section 在視窗頂部附近
    const aboutSection = page.getByTestId('about-section');
    const aboutSectionBox = await aboutSection.boundingBox();
    expect(aboutSectionBox).toBeTruthy();
    expect(aboutSectionBox!.y).toBeLessThan(300); // 考慮手機版導航高度

    // 測試滾動到 projects section
    const projectsMobileLink = page.getByTestId('mobile-nav-projects');
    await projectsMobileLink.click();
    await page.waitForTimeout(1500);

    // 檢查 projects section 在視窗頂部附近
    const projectsSection = page.getByTestId('projects-section');
    const projectsSectionBox = await projectsSection.boundingBox();
    expect(projectsSectionBox).toBeTruthy();
    expect(projectsSectionBox!.y).toBeLessThan(300);
  });

  test('手機版底部導航在頁面重新整理後保持狀態', async ({ page }) => {
    // 設定為手機版
    await page.setViewportSize({ width: 375, height: 667 });

    // 導航到 projects section
    const projectsMobileLink = page.getByTestId('mobile-nav-projects');
    await projectsMobileLink.click();
    await page.waitForTimeout(1500);

    // 檢查 URL 為 /#projects
    await expect(page).toHaveURL(/#projects$/);

    // 重新整理頁面
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // 檢查 URL 仍為 /#projects
    await expect(page).toHaveURL(/#projects$/);

    // 檢查 projects section 可見且在正確位置
    const projectsSection = page.getByTestId('projects-section');
    await expect(projectsSection).toBeVisible();

    const projectsSectionBox = await projectsSection.boundingBox();
    expect(projectsSectionBox).toBeTruthy();
    expect(projectsSectionBox!.y).toBeLessThan(300);

    // 檢查 projects 按鈕為高亮狀態
    const projectsMobileLinkAfterReload = page.getByTestId(
      'mobile-nav-projects',
    );
    await expect(projectsMobileLinkAfterReload).toHaveClass(/active/);
  });
});
