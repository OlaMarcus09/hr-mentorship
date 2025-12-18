import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // NEXT.JS 15 FIX: We must await params
  const { id } = await params;
  return NextResponse.json({ id, title: 'Fetched Blog Detail' });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  return NextResponse.json({ message: `Updated blog ${id}`, updatedData: body });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: `Blog ${id} deleted successfully` });
}
