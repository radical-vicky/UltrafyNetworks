import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

// Initialize SQLite database
const sqlite = new Database('careers.db');
const db = drizzle(sqlite);

// Create table if it doesn't exist
const createTable = sql`
  CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    icon TEXT DEFAULT 'Wrench',
    desc TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    posted_date TEXT DEFAULT CURRENT_DATE
  )
`;
db.run(createTable);

// Sample data - insert only if table is empty
const checkEmpty = db.get(sql`SELECT COUNT(*) as count FROM roles`) as { count: number };
if (checkEmpty.count === 0) {
  const insertData = sql`
    INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date) VALUES
    ('Field Technician', 'Network Operations', 'Thika', 'Full-time', 'Wrench', 'Install and maintain fibre connections for homes and businesses, troubleshoot on-site issues, and keep our network running reliably across Thika.', 'open', '2026-06-01'),
    ('Customer Support Agent', 'Customer Experience', 'Thika', 'Full-time', 'Headset', 'Be the first voice customers hear — handle billing questions, technical support calls, and walk-in inquiries with patience and clarity.', 'open', '2026-06-10'),
    ('Sales Representative', 'Sales & Marketing', 'Thika', 'Full-time', 'TrendingUp', 'Help grow our customer base across Thika. Engage with potential clients, explain our packages, and drive adoption of fibre internet in new areas.', 'open', '2026-06-15')
  `;
  db.run(insertData);
}

// GET: Fetch all open roles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    
    const result = db.all(
      sql`SELECT * FROM roles WHERE status = ${status} ORDER BY posted_date DESC`
    );
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job openings' },
      { status: 500 }
    );
  }
}

// POST: Create a new job opening
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, location, type, icon, desc } = body;
    
    if (!title || !department || !location || !type || !desc) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = db.run(
      sql`INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date)
          VALUES (${title}, ${department}, ${location}, ${type}, ${icon || 'Wrench'}, ${desc}, 'open', date('now'))`
    );
    
    const newRole = db.get(
      sql`SELECT * FROM roles WHERE id = ${result.lastInsertRowid}`
    );
    
    return NextResponse.json({
      success: true,
      data: newRole,
      message: 'Job opening created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job opening' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing job opening
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, department, location, type, icon, desc, status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    
    if (title) updates.push(`title = '${title}'`);
    if (department) updates.push(`department = '${department}'`);
    if (location) updates.push(`location = '${location}'`);
    if (type) updates.push(`type = '${type}'`);
    if (icon) updates.push(`icon = '${icon}'`);
    if (desc) updates.push(`desc = '${desc}'`);
    if (status) updates.push(`status = '${status}'`);
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = ${id} RETURNING *`;
    const result = db.get(sql.raw(query));
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Job opening updated successfully',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job opening' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job opening
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    const result = db.run(
      sql`DELETE FROM roles WHERE id = ${parseInt(id)}`
    );
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Job opening deleted successfully',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job opening' },
      { status: 500 }
    );
  }
}
