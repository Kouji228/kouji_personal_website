import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 定義舊路由到新路由的映射
const redirectMap: Record<string, string> = {
  '/about': '/#about',
  '/projects': '/#projects',
  '/contact': '/#contact',
  '/project': '/#projects', // 處理可能的拼寫變體
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 檢查是否需要轉址
  if (redirectMap[pathname]) {
    const redirectUrl = new URL(redirectMap[pathname], request.url);

    // 執行 301 永久轉址
    return NextResponse.redirect(redirectUrl, { status: 301 });
  }

  // 不需要轉址，繼續正常處理
  return NextResponse.next();
}

// 設定 middleware 的匹配規則
export const config = {
  matcher: [
    // 匹配需要轉址的路由
    '/about',
    '/projects',
    '/project',
    '/contact',
  ],
};
