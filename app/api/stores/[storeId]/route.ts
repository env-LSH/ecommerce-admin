import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!name) {
      return new NextResponse('이름은 필수 입니다.', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('가게는 필수입니다.', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('가게는 필수입니다.', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('에러', { status: 500 });
  }
}
