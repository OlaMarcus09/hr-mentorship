import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH: Update Status (Accept/Reject)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const updated = await prisma.applicant.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

// DELETE: Remove Applicant
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.applicant.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete applicant" }, { status: 500 });
  }
}