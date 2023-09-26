import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, price, categoryId, sizeId, colorId, images, isFeatured, isArchived } = body;

    console.log(images, '원본');
    console.log([...images.map((image: { url: string }) => image)], '이미지 맵');

    if (!userId) {
      return new NextResponse('인증이 필요합니다.', { status: 401 });
    }

    if (!name) {
      return new NextResponse('이름은 필수 입니다.', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('images 은 필수입니다.', { status: 400 });
    }

    if (!price) {
      return new NextResponse('가격은 필수입니다.', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('categoryId 은 필수입니다.', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('sizeId 은 필수입니다.', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('colorId 은 필수입니다.', { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('에러', { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured') === 'true' ? true : undefined;

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
