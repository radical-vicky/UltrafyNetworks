import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { contacts } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch contact requests"
    }, { status: 500 });
  }
}