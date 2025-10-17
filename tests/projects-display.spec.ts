import { test, expect } from '@playwright/test';

test.describe('專案展示功能測試', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('專案區塊正確載入和顯示', async ({ page }) => {
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

    // 等待載入動畫完成
    await page.waitForTimeout(1000);

    // 檢查專案卡片載入
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    await expect(projectCards.first()).toBeVisible();

    // 檢查載入動畫消失
    const loadingSpinner = page.locator('.spinner-border');
    await expect(loadingSpinner).toBeHidden();
  });

  test('專案按年份分組顯示', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 檢查年份標題存在
    const yearTitles = page.locator('[data-testid="projects-section"] h3');
    const yearCount = await yearTitles.count();
    expect(yearCount).toBeGreaterThan(0);

    // 檢查年份標題格式正確
    for (let i = 0; i < yearCount; i++) {
      const yearText = await yearTitles.nth(i).textContent();
      expect(yearText).toMatch(/^\d{4}$/);
    }
  });

  test('專案卡片包含必要資訊', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 獲取第一個專案卡片
    const firstProjectCard = page
      .locator(
        '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
      )
      .first();
    await expect(firstProjectCard).toBeVisible();

    // 檢查專案圖片
    const projectImage = firstProjectCard.locator('img');
    await expect(projectImage).toBeVisible();

    // 檢查專案描述
    const projectDescription = firstProjectCard.locator('p');
    await expect(projectDescription).toBeVisible();

    // 檢查專案連結
    const projectLink = firstProjectCard.locator('a');
    await expect(projectLink).toBeVisible();
  });

  test('專案卡片連結功能正常', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 獲取第一個專案卡片連結
    const firstProjectLink = page
      .locator(
        '[data-testid="projects-section"] .col-lg-6 a, [data-testid="projects-section"] .col-xl-4 a',
      )
      .first();
    await expect(firstProjectLink).toBeVisible();

    // 檢查連結有 href 屬性
    const href = await firstProjectLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//);

    // 檢查連結在新分頁開啟
    const target = await firstProjectLink.getAttribute('target');
    expect(target).toBe('_blank');

    // 檢查連結有 rel 屬性
    const rel = await firstProjectLink.getAttribute('rel');
    expect(rel).toContain('noopener');
  });

  test('專案載入動畫正常運作', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // 檢查載入動畫出現
    const loadingSpinner = page.locator('.spinner-border');
    await expect(loadingSpinner).toBeVisible();

    // 等待載入完成
    await page.waitForTimeout(1000);

    // 檢查載入動畫消失
    await expect(loadingSpinner).toBeHidden();

    // 檢查專案卡片出現
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    await expect(projectCards.first()).toBeVisible();
  });

  test('專案卡片響應式設計正常', async ({ page }) => {
    // 桌面版測試
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 檢查桌面版專案卡片佈局
    const desktopCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6',
    );
    const desktopCardCount = await desktopCards.count();
    expect(desktopCardCount).toBeGreaterThan(0);

    // 手機版測試
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // 檢查手機版專案卡片佈局
    const mobileCards = page.locator(
      '[data-testid="projects-section"] .col-12, [data-testid="projects-section"] .col-sm-12',
    );
    const mobileCardCount = await mobileCards.count();
    expect(mobileCardCount).toBeGreaterThan(0);
  });

  test('專案卡片內容完整性檢查', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 檢查所有專案卡片都有基本內容
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    const cardCount = await projectCards.count();

    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = projectCards.nth(i);

      // 檢查卡片可見
      await expect(card).toBeVisible();

      // 檢查卡片有圖片
      const image = card.locator('img');
      await expect(image).toBeVisible();

      // 檢查卡片有標題或描述
      const textContent = card.locator('h3, h4, h5, p');
      const textCount = await textContent.count();
      expect(textCount).toBeGreaterThan(0);

      // 檢查卡片有連結
      const link = card.locator('a');
      await expect(link).toBeVisible();
    }
  });

  test('專案區塊標題和分隔線正確顯示', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 檢查主要標題
    const mainTitle = page.locator('[data-testid="projects-section"] h2');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toContainText('Projects');

    // 檢查年份分隔線
    const yearSeparators = page.locator('[data-testid="projects-section"] hr');
    const separatorCount = await yearSeparators.count();
    expect(separatorCount).toBeGreaterThan(0);
  });
});
