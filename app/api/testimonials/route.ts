import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

// Use in-memory database for Vercel compatibility
let db: Database.Database | null = null;
let isInitialized = false;

function getDb() {
  if (!db) {
    db = new Database(':memory:');
    db.pragma('journal_mode = WAL');
  }
  return db;
}

function initializeDatabase() {
  if (isInitialized) return;
  
  try {
    const db = getDb();
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        area TEXT NOT NULL,
        quote TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Check if table has data
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM testimonials');
    const result = countStmt.get() as { count: number };
    
    if (result.count === 0) {
      console.log('📊 Inserting sample testimonial data...');
      
      const insertStmt = db.prepare(`
        INSERT INTO testimonials (name, area, quote, rating, status) 
        VALUES (?, ?, ?, ?, ?)
      `);
      
      const sampleTestimonials = [
        ['Grace Wanjiru', 'Weitethie', 'Switched from mobile data and never looked back. My kids\' online classes run without a single freeze now.', 5, 'approved'],
        ['Peter Mwangi', 'Ngoingwa', 'Installation took less than two hours and support actually picks up the phone when I call.', 5, 'approved'],
        ['Sarah Akinyi', 'Section 9', 'The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year.', 5, 'approved'],
        ['James Kariuki', 'Thika Town', 'The fibre connection is incredibly fast. I can work from home without any interruptions.', 5, 'pending'],
        ['Mary Wanjiku', 'Gatukuyu', 'Finally got reliable internet in my area. The team was professional and the setup was quick.', 4, 'pending'],
      ];
      
      const insertMany = db.transaction((testimonials: any[][]) => {
        for (const t of testimonials) {
          insertStmt.run(t);
        }
      });
      
      insertMany(sampleTestimonials);
      console.log('✅ Sample testimonial data inserted into memory!');
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('❌ Error initializing testimonials database:', error);
  }
}

// GET: Fetch testimonials with optional status filter
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'all';
    
    const db = getDb();
    
    let query = 'SELECT * FROM testimonials';
    const params: any[] = [];
    
    if (status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    if (limit > 0) {
      query += ' LIMIT ?';
      params.push(limit);
    }
    
    const stmt = db.prepare(query);
    const result = stmt.all(...params);
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Create a new testimonial (pending approval)
export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { name, area, quote, rating } = body;
    
    if (!name || !area || !quote) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please fill in all required fields: name, area, quote' 
        },
        { status: 400 }
      );
    }
    
    const validRating = rating && rating >= 1 && rating <= 5 ? rating : 5;
    
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO testimonials (name, area, quote, rating, status)
      VALUES (?, ?, ?, ?, 'pending')
    `);
    
    const info = stmt.run(name.trim(), area.trim(), quote.trim(), validRating);
    
    const getStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const newTestimonial = getStmt.get(info.lastInsertRowid);
    
    return NextResponse.json({
      success: true,
      data: newTestimonial,
      message: 'Thank you! Your review has been submitted and is awaiting approval.',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit review: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// PUT: Update testimonial status (admin only)
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    console.log('📝 PUT request body:', body);
    
    const { id, status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }
    
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Valid status (pending, approved, rejected) is required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if testimonial exists
    const checkStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Testimonial with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare(`
      UPDATE testimonials SET status = ? WHERE id = ?
    `);
    
    const result = stmt.run(status, parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update testimonial status' },
        { status: 500 }
      );
    }
    
    const getStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const updatedTestimonial = getStmt.get(parseInt(id));
    
    return NextResponse.json({
      success: true,
      data: updatedTestimonial,
      message: `Testimonial ${status} successfully`,
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a testimonial (admin only)
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('🗑️ DELETE request, id:', id);
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if testimonial exists
    const checkStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Testimonial with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
    const result = stmt.run(parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete testimonial' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
