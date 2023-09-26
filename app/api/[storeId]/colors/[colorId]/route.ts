import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { colorId: string } }) {
  try {
    if (!params.colorId) {
      return new NextResponse('colorID 는 필수입니다.', { status: 400 });
    }

    const color = await prismadb.size.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!name) {
      return new NextResponse('name 은 필수 입니다.', { status: 400 });
    }

    if (!value) {
      return new NextResponse('value 필수입니다.', { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse('colorId는 필수 입니다.', { status: 400 });
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

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse('colorId는 필수입니다.', { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const color = await prismadb.size.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('에러', { status: 500 });
  }
}
