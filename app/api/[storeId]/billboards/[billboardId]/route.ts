import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
  try {
    if (!params.billboardId) {
      return new NextResponse('가게는 필수입니다.', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { billboardId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    console.log(label, '히힣');

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!label) {
      return new NextResponse('label 은 필수 입니다.', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('이미지 경로는 필수입니다.', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('스토어 id는 필수 입니다.', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.billboardId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('인증이 필요합니다', { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        storeId: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_PATCH]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('billboard는 필수입니다.', { status: 400 });
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

    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_DELETE]', error);
    return new NextResponse('에러', { status: 500 });
  }
}
