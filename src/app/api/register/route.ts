import prisma from '@/lib/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const body = await req.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return new NextResponse('Missing fields', { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return new NextResponse('User already exists', { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return NextResponse.json(newUser);
}
