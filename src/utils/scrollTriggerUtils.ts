'use client';

import { ScrollTrigger } from '../components/gsap';

/**
 * ScrollTrigger 工具函數集合
 */
export class ScrollTriggerUtils {
  private static refreshTimeout: NodeJS.Timeout | null = null;
  private static readonly REFRESH_DEBOUNCE_DELAY = 100; // 防抖延遲

  /**
   * 防抖版本的 ScrollTrigger.refresh()
   * 避免短時間內多次調用造成效能問題
   */
  static refreshDebounced() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
      this.refreshTimeout = null;
    }, this.REFRESH_DEBOUNCE_DELAY);
  }

  /**
   * 立即執行 ScrollTrigger.refresh()
   */
  static refreshImmediate() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
    ScrollTrigger.refresh();
  }

  /**
   * 等待圖片載入完成後 refresh
   */
  static async refreshAfterImagesLoad(container?: HTMLElement) {
    if (typeof window === 'undefined') return;

    const images = container
      ? container.querySelectorAll('img')
      : document.querySelectorAll('img');

    if (images.length === 0) {
      this.refreshDebounced();
      return;
    }

    const imagePromises = Array.from(images).map((img) => {
      return new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
          return;
        }

        const onLoad = () => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
          resolve();
        };

        const onError = () => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
          resolve(); // 即使載入失敗也要 resolve
        };

        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
      });
    });

    try {
      await Promise.all(imagePromises);
      this.refreshDebounced();
    } catch (error) {
      console.warn('圖片載入過程中發生錯誤:', error);
      this.refreshDebounced();
    }
  }

  /**
   * 等待 WebFont 載入完成後 refresh
   */
  static async refreshAfterFontsLoad() {
    if (typeof window === 'undefined') return;

    try {
      // 檢查是否支援 FontFace API
      if ('fonts' in document) {
        await document.fonts.ready;
      } else {
        // 降級方案：等待一段時間讓字體載入
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      this.refreshDebounced();
    } catch (error) {
      console.warn('字體載入過程中發生錯誤:', error);
      this.refreshDebounced();
    }
  }

  /**
   * 等待動態內容注入完成後 refresh
   */
  static async refreshAfterDynamicContent(
    contentLoader: () => Promise<void> | void,
    container?: HTMLElement,
  ) {
    try {
      await contentLoader();

      // 等待 DOM 更新
      await new Promise((resolve) => setTimeout(resolve, 50));

      // 如果有容器，等待其中的圖片載入
      if (container) {
        await this.refreshAfterImagesLoad(container);
      } else {
        this.refreshDebounced();
      }
    } catch (error) {
      console.warn('動態內容載入過程中發生錯誤:', error);
      this.refreshDebounced();
    }
  }

  /**
   * 監聽容器尺寸變化並自動 refresh
   */
  static observeResize(container: HTMLElement, callback?: () => void) {
    if (typeof window === 'undefined') return;

    const resizeObserver = new ResizeObserver(() => {
      this.refreshDebounced();
      callback?.();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }

  /**
   * 監聽水平滾動容器的內容變化
   */
  static observeHorizontalScrollContainer(
    container: HTMLElement,
    options?: {
      onContentChange?: () => void;
      debounceDelay?: number;
    },
  ) {
    if (typeof window === 'undefined') return;

    const { onContentChange, debounceDelay = 200 } = options || {};
    let mutationTimeout: NodeJS.Timeout | null = null;

    const mutationObserver = new MutationObserver(() => {
      if (mutationTimeout) {
        clearTimeout(mutationTimeout);
      }

      mutationTimeout = setTimeout(() => {
        this.refreshDebounced();
        onContentChange?.();
        mutationTimeout = null;
      }, debounceDelay);
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    return () => {
      mutationObserver.disconnect();
      if (mutationTimeout) {
        clearTimeout(mutationTimeout);
      }
    };
  }

  /**
   * 清理所有定時器
   */
  static cleanup() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }
}

// 導出便捷函數
export const {
  refreshDebounced,
  refreshImmediate,
  refreshAfterImagesLoad,
  refreshAfterFontsLoad,
  refreshAfterDynamicContent,
  observeResize,
  observeHorizontalScrollContainer,
  cleanup,
} = ScrollTriggerUtils;
