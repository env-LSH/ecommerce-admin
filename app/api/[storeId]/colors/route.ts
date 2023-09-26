import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!name) {
      return new NextResponse('이름은 필수 입니다.', { status: 400 });
    }

    if (!value) {
      return new NextResponse('value는 필수입니다.', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('스토어 id는 필수 입니다.', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('인증이 필요합니다', { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_POST]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse('가게는 필수입니다.', { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse('에러', { status: 500 });
  }
}
