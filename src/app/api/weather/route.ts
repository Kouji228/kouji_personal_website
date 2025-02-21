import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cityName = searchParams.get('city') || '新北市';
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: '未設定 API 密鑰' }, { status: 500 });
  }

  const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}&locationName=${cityName}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // ✅ 確保 API 有回傳正確的資料
    if (
      !data.records ||
      !data.records.location ||
      data.records.location.length === 0
    ) {
      return NextResponse.json(
        { error: 'API 沒有回傳有效的天氣數據', data },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: '無法獲取天氣資料', details: error },
      { status: 500 },
    );
  }
}
