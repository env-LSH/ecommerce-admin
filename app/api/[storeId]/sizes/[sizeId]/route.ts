import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { sizeId: string } }) {
  try {
    if (!params.sizeId) {
      return new NextResponse('sizeId는 필수입니다.', { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
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

    if (!params.sizeId) {
      return new NextResponse('sizeId는 필수 입니다.', { status: 400 });
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

    const category = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse('categoryId는 필수입니다.', { status: 400 });
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

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse('에러', { status: 500 });
  }
}
