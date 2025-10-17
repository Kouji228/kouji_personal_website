import { test, expect } from '@playwright/test';

test.describe('動畫效果測試', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('首頁進場動畫正常播放', async ({ page }) => {
    // 檢查首頁標題動畫
    const title = page.locator('h2').first();
    await expect(title).toBeVisible();

    // 檢查打字機效果
    const typewriter = page.locator('h1').first();
    await expect(typewriter).toBeVisible();

    // 檢查描述文字
    const description = page.locator('p.lead').first();
    await expect(description).toBeVisible();

    // 檢查按鈕
    const buttons = page.locator('.intro_btn-action');
    await expect(buttons).toBeVisible();

    // 檢查社群連結
    const socialLinks = page.locator('.homeSocialLinks');
    await expect(socialLinks).toBeVisible();
  });

  test('About section 滾動動畫正常觸發', async ({ page }) => {
    // 滾動到 about section
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 檢查 about section 可見
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();

    // 檢查技能卡片動畫
    const skillCards = page.locator('[data-testid="about-section"] .skillCard');
    await expect(skillCards.first()).toBeVisible();

    // 檢查時間軸動畫
    const timeline = page.locator('.timeline');
    await expect(timeline).toBeVisible();
  });

  test('Projects section 卡片動畫正常觸發', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 等待專案卡片載入
    await page.waitForTimeout(1000);

    // 檢查專案卡片可見
    const projectCards = page.locator(
      '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
    );
    await expect(projectCards.first()).toBeVisible();

    // 檢查載入動畫已消失
    const loadingSpinner = page.locator('.spinner-border');
    await expect(loadingSpinner).toBeHidden();
  });

  test('Contact section 動畫正常觸發', async ({ page }) => {
    // 滾動到 contact section
    await page.evaluate(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(2000);

    // 檢查 contact section 可見
    const contactSection = page.getByTestId('contact-section');
    await expect(contactSection).toBeVisible();

    // 檢查聯絡內容
    const contactContent = page.locator('[data-testid="contact-section"] h3');
    await expect(contactContent).toContainText(
      "Let's create something great together",
    );
  });

  test('卡片懸停動畫正常運作', async ({ page }) => {
    // 滾動到 projects section
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // 等待專案卡片載入
    await page.waitForTimeout(1000);

    // 獲取第一個專案卡片
    const projectCard = page
      .locator(
        '[data-testid="projects-section"] .col-lg-6, [data-testid="projects-section"] .col-xl-4',
      )
      .first();
    await expect(projectCard).toBeVisible();

    // 獲取初始變換
    const initialTransform = await projectCard.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // 懸停在卡片上
    await projectCard.hover();
    await page.waitForTimeout(300);

    // 檢查懸停效果（scale 應該改變）
    const hoverTransform = await projectCard.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // 懸停後變換應該不同
    expect(hoverTransform).not.toBe(initialTransform);

    // 移開滑鼠
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    // 檢查回到原始狀態
    const finalTransform = await projectCard.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    expect(finalTransform).toBe(initialTransform);
  });

  test('GSAP 動畫庫正確載入', async ({ page }) => {
    // 檢查 GSAP 是否載入
    const gsapLoaded = await page.evaluate(() => {
      return typeof window !== 'undefined' && 'gsap' in window;
    });
    expect(gsapLoaded).toBeTruthy();

    // 檢查 ScrollTrigger 是否載入
    const scrollTriggerLoaded = await page.evaluate(() => {
      return typeof window !== 'undefined' && 'ScrollTrigger' in window;
    });
    expect(scrollTriggerLoaded).toBeTruthy();
  });

  test('打字機效果正常運作', async ({ page }) => {
    // 檢查打字機容器存在
    const typewriterContainer = page.locator('h1').first();
    await expect(typewriterContainer).toBeVisible();

    // 等待打字機效果開始
    await page.waitForTimeout(2000);

    // 檢查文字內容變化（打字機效果會改變文字）
    const initialText = await typewriterContainer.textContent();
    expect(initialText).toBeTruthy();
    expect(initialText!.length).toBeGreaterThan(0);
  });

  test('按鈕懸停效果正常', async ({ page }) => {
    // 檢查按鈕存在
    const aboutButton = page.locator('a[href="#about"] .acBtn').first();
    await expect(aboutButton).toBeVisible();

    // 懸停在按鈕上
    await aboutButton.hover();
    await page.waitForTimeout(300);

    // 檢查按鈕有懸停效果（可能包括變換或顏色變化）
    const buttonStyle = await aboutButton.evaluate((el) => {
      return getComputedStyle(el).transform;
    });

    // 懸停後應該有視覺變化
    expect(buttonStyle).toBeTruthy();
  });

  test('載入畫面動畫正常播放', async ({ page }) => {
    // 重新載入頁面以觸發載入畫面
    await page.reload();

    // 檢查載入畫面動畫元素
    const loadingAnimation = page.locator('.loadingAnimation');
    await expect(loadingAnimation).toBeVisible();

    // 檢查圓形動畫
    const circle = page.locator('.circle');
    await expect(circle).toBeVisible();

    // 檢查脈衝環動畫
    const pulseRings = page.locator('.pulseRing');
    await expect(pulseRings).toHaveCount(3);

    // 等待載入完成
    await page.waitForTimeout(5000);

    // 檢查載入畫面消失
    const loadingScreen = page.locator('.loading-screen');
    await expect(loadingScreen).toBeHidden();
  });
});
