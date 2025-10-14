import { test, expect } from '@playwright/test';

test.describe('單頁式網站導航功能', () => {
  test.beforeEach(async ({ page }) => {
    // 每個測試前都先訪問首頁
    await page.goto('/');
    // 等待頁面完全載入
    await page.waitForLoadState('networkidle');
  });

  test('進入首頁時導覽高亮 HOME', async ({ page }) => {
    // 檢查桌面導航存在
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible();

    // 檢查 HOME 連結存在且為高亮狀態
    const homeLink = page.getByTestId('nav-link-home');
    await expect(homeLink).toBeVisible();

    // 檢查 HOME 連結有 active 樣式
    await expect(homeLink).toHaveClass(/active/);

    // 檢查 URL 為首頁
    await expect(page).toHaveURL('/');
  });

  test('點擊 ABOUT 導覽 → URL 變為 /#about，且 about 內容可見', async ({
    page,
  }) => {
    // 點擊 ABOUT 導航連結
    const aboutLink = page.getByTestId('nav-link-about');
    await aboutLink.click();

    // 等待滾動動畫完成
    await page.waitForTimeout(1500);

    // 檢查 URL 變為 /#about
    await expect(page).toHaveURL(/#about$/);

    // 檢查 about section 可見
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();

    // 檢查 about section 在視窗頂部附近（考慮導航高度）
    const aboutSectionBox = await aboutSection.boundingBox();
    expect(aboutSectionBox).toBeTruthy();
    expect(aboutSectionBox!.y).toBeLessThan(200); // 考慮固定導航高度

    // 檢查 ABOUT 連結為高亮狀態
    await expect(aboutLink).toHaveClass(/active/);
  });

  test('重新整理後仍停留在 about', async ({ page }) => {
    // 先導航到 about section
    const aboutLink = page.getByTestId('nav-link-about');
    await aboutLink.click();
    await page.waitForTimeout(1500);

    // 檢查 URL 為 /#about
    await expect(page).toHaveURL(/#about$/);

    // 重新整理頁面
    await page.reload();
    await page.waitForLoadState('networkidle');

    // 檢查 URL 仍為 /#about
    await expect(page).toHaveURL(/#about$/);

    // 檢查 about section 可見且在視窗頂部附近
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();

    const aboutSectionBox = await aboutSection.boundingBox();
    expect(aboutSectionBox).toBeTruthy();
    expect(aboutSectionBox!.y).toBeLessThan(200);

    // 檢查 ABOUT 連結為高亮狀態
    const aboutLinkAfterReload = page.getByTestId('nav-link-about');
    await expect(aboutLinkAfterReload).toHaveClass(/active/);
  });

  test('視窗寬度 < 768px 時顯示底部導覽並可操作', async ({ page }) => {
    // 設定為手機視窗大小
    await page.setViewportSize({ width: 375, height: 667 });

    // 檢查桌面導航隱藏
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeHidden();

    // 檢查底部導航顯示
    const mobileBottomNav = page.getByTestId('mobile-bottom-nav');
    await expect(mobileBottomNav).toBeVisible();

    // 檢查所有底部導航按鈕存在
    const homeMobileLink = page.getByTestId('mobile-nav-home');
    const aboutMobileLink = page.getByTestId('mobile-nav-about');
    const projectsMobileLink = page.getByTestId('mobile-nav-projects');
    const contactMobileLink = page.getByTestId('mobile-nav-contact');

    await expect(homeMobileLink).toBeVisible();
    await expect(aboutMobileLink).toBeVisible();
    await expect(projectsMobileLink).toBeVisible();
    await expect(contactMobileLink).toBeVisible();

    // 檢查初始狀態 HOME 為高亮
    await expect(homeMobileLink).toHaveClass(/active/);

    // 點擊 PROJECTS 按鈕
    await projectsMobileLink.click();
    await page.waitForTimeout(1500);

    // 檢查 URL 變為 /#projects
    await expect(page).toHaveURL(/#projects$/);

    // 檢查 projects section 可見且在視窗頂部附近
    const projectsSection = page.getByTestId('projects-section');
    await expect(projectsSection).toBeVisible();

    const projectsSectionBox = await projectsSection.boundingBox();
    expect(projectsSectionBox).toBeTruthy();
    expect(projectsSectionBox!.y).toBeLessThan(200);

    // 檢查 PROJECTS 按鈕為高亮狀態
    await expect(projectsMobileLink).toHaveClass(/active/);
  });

  test('所有導航連結都能正確工作', async ({ page }) => {
    const sections = [
      { id: 'home', testId: 'nav-link-home' },
      { id: 'about', testId: 'nav-link-about' },
      { id: 'projects', testId: 'nav-link-projects' },
      { id: 'contact', testId: 'nav-link-contact' },
    ];

    for (const section of sections) {
      // 點擊導航連結
      const link = page.getByTestId(section.testId);
      await link.click();
      await page.waitForTimeout(1500);

      // 檢查 URL 變化
      await expect(page).toHaveURL(new RegExp(`#${section.id}$`));

      // 檢查對應 section 可見
      const sectionElement = page.getByTestId(`${section.id}-section`);
      await expect(sectionElement).toBeVisible();

      // 檢查連結為高亮狀態
      await expect(link).toHaveClass(/active/);
    }
  });

  test('手機版所有底部導航連結都能正確工作', async ({ page }) => {
    // 設定為手機視窗大小
    await page.setViewportSize({ width: 375, height: 667 });

    const sections = [
      { id: 'home', testId: 'mobile-nav-home' },
      { id: 'about', testId: 'mobile-nav-about' },
      { id: 'projects', testId: 'mobile-nav-projects' },
      { id: 'contact', testId: 'mobile-nav-contact' },
    ];

    for (const section of sections) {
      // 點擊底部導航按鈕
      const link = page.getByTestId(section.testId);
      await link.click();
      await page.waitForTimeout(1500);

      // 檢查 URL 變化
      await expect(page).toHaveURL(new RegExp(`#${section.id}$`));

      // 檢查對應 section 可見
      const sectionElement = page.getByTestId(`${section.id}-section`);
      await expect(sectionElement).toBeVisible();

      // 檢查按鈕為高亮狀態
      await expect(link).toHaveClass(/active/);
    }
  });

  test('直接訪問帶 hash 的 URL 能正確滾動到對應 section', async ({ page }) => {
    // 直接訪問 /#about
    await page.goto('/#about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // 等待滾動動畫

    // 檢查 URL 為 /#about
    await expect(page).toHaveURL(/#about$/);

    // 檢查 about section 可見且在視窗頂部附近
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();

    const aboutSectionBox = await aboutSection.boundingBox();
    expect(aboutSectionBox).toBeTruthy();
    expect(aboutSectionBox!.y).toBeLessThan(200);

    // 檢查 ABOUT 連結為高亮狀態
    const aboutLink = page.getByTestId('nav-link-about');
    await expect(aboutLink).toHaveClass(/active/);
  });
});
