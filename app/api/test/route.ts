import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    console.log(user);
    return NextResponse.json({ data: 'test' });
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Interal error', { status: 500 });
  }
}
