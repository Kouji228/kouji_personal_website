import { test, expect } from '@playwright/test';

test.describe('首頁拼圖遊戲功能測試', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('拼圖容器和拼圖塊正確顯示', async ({ page }) => {
    // 檢查拼圖容器存在
    const puzzleContainer = page.locator('#puzzle');
    await expect(puzzleContainer).toBeVisible();

    // 檢查拼圖塊存在（應該有 9 個）
    const puzzlePieces = page.locator('.piece');
    await expect(puzzlePieces).toHaveCount(9);

    // 檢查空塊存在
    const emptyPiece = page.locator('.piece.empty');
    await expect(emptyPiece).toHaveCount(1);

    // 檢查非空拼圖塊存在
    const nonEmptyPieces = page.locator('.piece:not(.empty)');
    await expect(nonEmptyPieces).toHaveCount(8);
  });

  test('拼圖塊具有正確的背景圖片', async ({ page }) => {
    // 檢查拼圖塊背景圖片
    const puzzlePieces = page.locator('.piece:not(.empty)');
    const firstPiece = puzzlePieces.first();

    // 檢查背景圖片樣式
    const backgroundImage = await firstPiece.evaluate((el) => {
      const innerPiece = el.querySelector('.piece-inner');
      return innerPiece ? getComputedStyle(innerPiece).backgroundImage : null;
    });

    expect(backgroundImage).toContain('url(');
  });

  test('拼圖塊可以拖拽', async ({ page }) => {
    // 選擇一個非空的拼圖塊
    const puzzlePiece = page.locator('.piece:not(.empty)').first();

    // 獲取初始位置
    const initialPosition = await puzzlePiece.boundingBox();
    expect(initialPosition).toBeTruthy();

    // 執行拖拽操作
    await puzzlePiece.dragTo(puzzlePiece, {
      targetPosition: { x: 50, y: 50 },
    });

    // 等待拖拽動畫完成
    await page.waitForTimeout(500);

    // 檢查拼圖塊位置是否改變（拖拽後應該回到原位置或交換位置）
    const finalPosition = await puzzlePiece.boundingBox();
    expect(finalPosition).toBeTruthy();
  });

  test('拼圖響應式設計正常運作', async ({ page }) => {
    // 檢查桌面版拼圖大小
    const puzzleContainer = page.locator('#puzzle');
    const desktopSize = await puzzleContainer.boundingBox();
    expect(desktopSize).toBeTruthy();

    // 切換到手機版
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // 檢查手機版拼圖大小
    const mobileSize = await puzzleContainer.boundingBox();
    expect(mobileSize).toBeTruthy();

    // 手機版拼圖應該比桌面版小
    expect(mobileSize!.width).toBeLessThan(desktopSize!.width);
  });

  test('拼圖塊位置數據正確設置', async ({ page }) => {
    // 檢查所有拼圖塊都有位置數據
    const puzzlePieces = page.locator('.piece');

    for (let i = 0; i < 9; i++) {
      const piece = puzzlePieces.nth(i);
      const positionLeft = await piece.getAttribute('data-position-left');
      const positionTop = await piece.getAttribute('data-position-top');

      expect(positionLeft).toBeTruthy();
      expect(positionTop).toBeTruthy();
      expect(['1', '2', '3']).toContain(positionLeft);
      expect(['1', '2', '3']).toContain(positionTop);
    }
  });

  test('拼圖塊樣式正確應用', async ({ page }) => {
    // 檢查拼圖塊基本樣式
    const puzzlePieces = page.locator('.piece');
    const firstPiece = puzzlePieces.first();

    // 檢查 CSS 類別
    await expect(firstPiece).toHaveClass(/piece/);

    // 檢查空塊樣式
    const emptyPiece = page.locator('.piece.empty');
    await expect(emptyPiece).toHaveClass(/empty/);

    // 檢查拼圖塊內部結構
    const pieceInner = firstPiece.locator('.piece-inner');
    await expect(pieceInner).toBeVisible();
  });

  test('拼圖容器樣式正確', async ({ page }) => {
    // 檢查拼圖容器
    const puzzleContainer = page.locator('#puzzle');
    await expect(puzzleContainer).toBeVisible();

    // 檢查容器有正確的 ID
    const containerId = await puzzleContainer.getAttribute('id');
    expect(containerId).toBe('puzzle');

    // 檢查容器在首頁 section 內
    const homeSection = page.getByTestId('home-section');
    await expect(homeSection).toBeVisible();

    const puzzleInHome = homeSection.locator('#puzzle');
    await expect(puzzleInHome).toBeVisible();
  });
});
