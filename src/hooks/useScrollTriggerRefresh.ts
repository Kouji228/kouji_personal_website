'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ScrollTriggerUtils } from '../utils/scrollTriggerUtils';

interface UseScrollTriggerRefreshOptions {
  /**
   * 是否在組件掛載時自動 refresh
   */
  refreshOnMount?: boolean;

  /**
   * 是否監聽容器尺寸變化
   */
  observeResize?: boolean;

  /**
   * 是否監聽水平滾動容器的內容變化
   */
  observeHorizontalScroll?: boolean;

  /**
   * 自定義容器元素
   */
  containerRef?: React.RefObject<HTMLElement>;

  /**
   * 內容變化時的回調
   */
  onContentChange?: () => void;

  /**
   * 防抖延遲時間（毫秒）
   */
  debounceDelay?: number;
}

/**
 * ScrollTrigger 集中管理 Hook
 *
 * 使用範例：
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { refresh, refreshAfterImages, refreshAfterFonts } = useScrollTriggerRefresh({
 *   containerRef,
 *   observeResize: true,
 *   observeHorizontalScroll: true,
 * });
 *
 * // 在圖片載入完成後調用
 * const handleImageLoad = () => {
 *   refreshAfterImages();
 * };
 * ```
 */
export const useScrollTriggerRefresh = (
  options: UseScrollTriggerRefreshOptions = {},
) => {
  const {
    refreshOnMount = false,
    observeResize = false,
    observeHorizontalScroll = false,
    containerRef,
    onContentChange,
    debounceDelay = 200,
  } = options;

  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  // 清理函數
  const cleanup = useCallback(() => {
    cleanupFunctionsRef.current.forEach((cleanup) => cleanup());
    cleanupFunctionsRef.current = [];
    ScrollTriggerUtils.cleanup();
  }, []);

  // 立即 refresh
  const refresh = useCallback(() => {
    ScrollTriggerUtils.refreshImmediate();
  }, []);

  // 防抖 refresh
  const refreshDebounced = useCallback(() => {
    ScrollTriggerUtils.refreshDebounced();
  }, []);

  // 等待圖片載入後 refresh
  const refreshAfterImages = useCallback(async () => {
    const container = containerRef?.current;
    await ScrollTriggerUtils.refreshAfterImagesLoad(container);
  }, [containerRef]);

  // 等待字體載入後 refresh
  const refreshAfterFonts = useCallback(async () => {
    await ScrollTriggerUtils.refreshAfterFontsLoad();
  }, []);

  // 等待動態內容載入後 refresh
  const refreshAfterDynamicContent = useCallback(
    async (contentLoader: () => Promise<void> | void) => {
      const container = containerRef?.current;
      await ScrollTriggerUtils.refreshAfterDynamicContent(
        contentLoader,
        container,
      );
    },
    [containerRef],
  );

  // 組合 refresh：圖片 + 字體
  const refreshAfterAssets = useCallback(async () => {
    await Promise.all([refreshAfterImages(), refreshAfterFonts()]);
  }, [refreshAfterImages, refreshAfterFonts]);

  // 監聽容器尺寸變化
  useEffect(() => {
    if (!observeResize || !containerRef?.current) return;

    const cleanup = ScrollTriggerUtils.observeResize(
      containerRef.current,
      onContentChange,
    );
    cleanupFunctionsRef.current.push(cleanup);

    return cleanup;
  }, [observeResize, containerRef, onContentChange]);

  // 監聽水平滾動容器內容變化
  useEffect(() => {
    if (!observeHorizontalScroll || !containerRef?.current) return;

    const cleanup = ScrollTriggerUtils.observeHorizontalScrollContainer(
      containerRef.current,
      {
        onContentChange,
        debounceDelay,
      },
    );
    cleanupFunctionsRef.current.push(cleanup);

    return cleanup;
  }, [observeHorizontalScroll, containerRef, onContentChange, debounceDelay]);

  // 組件掛載時 refresh
  useEffect(() => {
    if (refreshOnMount) {
      // 延遲執行，確保 DOM 完全渲染
      const timeoutId = setTimeout(() => {
        refreshDebounced();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [refreshOnMount, refreshDebounced]);

  // 組件卸載時清理
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    // 基本 refresh 方法
    refresh,
    refreshDebounced,

    // 特定場景的 refresh 方法
    refreshAfterImages,
    refreshAfterFonts,
    refreshAfterDynamicContent,
    refreshAfterAssets,

    // 工具方法
    cleanup,
  };
};

/**
 * 簡化版 Hook，專用於圖片載入場景
 */
export const useImageScrollTrigger = (
  containerRef?: React.RefObject<HTMLElement>,
) => {
  return useScrollTriggerRefresh({
    containerRef,
    refreshOnMount: true,
    observeResize: true,
  });
};

/**
 * 專用於水平滾動容器的 Hook
 */
export const useHorizontalScrollTrigger = (
  containerRef: React.RefObject<HTMLElement>,
  options?: {
    onContentChange?: () => void;
    debounceDelay?: number;
  },
) => {
  return useScrollTriggerRefresh({
    containerRef,
    observeHorizontalScroll: true,
    observeResize: true,
    ...options,
  });
};
