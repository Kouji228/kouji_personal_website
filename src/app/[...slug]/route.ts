import { NextResponse } from 'next/server';

// 定義舊路由到新路由的映射
const redirectMap: Record<string, string> = {
  about: '/#about',
  projects: '/#projects',
  project: '/#projects', // 處理可能的拼寫變體
  contact: '/#contact',
};

// 處理所有舊路由的 301 轉址
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0]; // 取得第一個路徑段

  if (redirectMap[slug]) {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (request.url.includes('localhost')
        ? 'http://localhost:3000'
        : 'https://your-domain.com');

    return NextResponse.redirect(new URL(redirectMap[slug], baseUrl), {
      status: 301,
    });
  }

  // 如果不是已知的轉址路由，返回 404
  return new NextResponse('Not Found', { status: 404 });
}
