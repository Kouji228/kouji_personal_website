import { useLayoutEffect, useEffect } from 'react';

/**
 * 同構的 useLayoutEffect hook
 * 在客戶端使用 useLayoutEffect，在伺服器端使用 useEffect
 * 避免 SSR 警告
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
