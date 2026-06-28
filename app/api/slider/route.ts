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
      CREATE TABLE IF NOT EXISTS slides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        cta_text TEXT DEFAULT 'Learn More',
        cta_link TEXT DEFAULT '#',
        badge TEXT DEFAULT 'Featured',
        display_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Check if table has data
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM slides');
    const result = countStmt.get() as { count: number };
    
    if (result.count === 0) {
      console.log('📊 Inserting sample slide data...');
      
      const insertStmt = db.prepare(`
        INSERT INTO slides (
          title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleSlides = [
        [
          'UltrafyNetworks',
          'Tuko Thika',
          'Premium fibre internet built for Thika homes and businesses. Fast, reliable, and unlimited connectivity.',
          'https://placehold.co/1920x1080/1a56db/ffffff?text=UltrafyNetworks',
          'Get Connected Now',
          '#contact',
          'Now Live in Thika',
          0,
          'active'
        ],
        [
          'High-Speed Internet',
          '30 Mbps Plans',
          'Stream, work, and game with no lag. Choose from our range of packages starting at just KSh 1,000/month.',
          'https://placehold.co/1920x1080/065f46/ffffff?text=High-Speed+Internet',
          'View Packages',
          '#packages',
          'Exclusive Offer',
          1,
          'active'
        ],
        [
          'Solar Energy Solutions',
          'Power Your Future',
          'Affordable solar panel installations with battery backup. Save on electricity bills and go green.',
          'https://placehold.co/1920x1080/92400e/ffffff?text=Solar+Solutions',
          'Learn More',
          '#contact',
          'Eco-Friendly',
          2,
          'active'
        ],
      ];
      
      const insertMany = db.transaction((slides: any[][]) => {
        for (const slide of slides) {
          insertStmt.run(slide);
        }
      });
      
      insertMany(sampleSlides);
      console.log('✅ Sample slide data inserted into memory!');
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('❌ Error initializing slides database:', error);
  }
}

// GET: Fetch slides
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const id = searchParams.get('id');
    
    const db = getDb();
    
    // If specific ID is requested
    if (id) {
      const stmt = db.prepare('SELECT * FROM slides WHERE id = ?');
      const result = stmt.get(parseInt(id));
      
      if (!result) {
        return NextResponse.json(
          { success: false, error: 'Slide not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: result,
      });
    }
    
    let query = 'SELECT * FROM slides WHERE 1=1';
    const params: any[] = [];
    
    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY display_order ASC, created_at DESC';
    
    const stmt = db.prepare(query);
    const result = stmt.all(...params);
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching slides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch slides: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Create a new slide
export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    console.log('📝 POST request body:', body);
    
    const { 
      title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
    } = body;
    
    if (!title || !subtitle || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, subtitle, description, image' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO slides (
        title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      title.trim(),
      subtitle.trim(),
      description.trim(),
      image,
      cta_text || 'Learn More',
      cta_link || '#',
      badge || 'Featured',
      display_order || 0,
      status || 'active'
    );
    
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const newSlide = getStmt.get(info.lastInsertRowid);
    
    return NextResponse.json({
      success: true,
      data: newSlide,
      message: 'Slide created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating slide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create slide: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT: Update a slide
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    console.log('📝 PUT request body:', body);
    
    const { 
      id,
      title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
    } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if slide exists
    const checkStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Slide with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (subtitle !== undefined) { updates.push('subtitle = ?'); values.push(subtitle); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (image !== undefined) { updates.push('image = ?'); values.push(image); }
    if (cta_text !== undefined) { updates.push('cta_text = ?'); values.push(cta_text); }
    if (cta_link !== undefined) { updates.push('cta_link = ?'); values.push(cta_link); }
    if (badge !== undefined) { updates.push('badge = ?'); values.push(badge); }
    if (display_order !== undefined) { updates.push('display_order = ?'); values.push(display_order); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    values.push(parseInt(id));
    const query = `UPDATE slides SET ${updates.join(', ')} WHERE id = ?`;
    
    const stmt = db.prepare(query);
    const result = stmt.run(...values);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update slide' },
        { status: 500 }
      );
    }
    
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const updatedSlide = getStmt.get(parseInt(id));
    
    return NextResponse.json({
      success: true,
      data: updatedSlide,
      message: 'Slide updated successfully',
    });
  } catch (error) {
    console.error('Error updating slide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update slide: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a slide
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('🗑️ DELETE request, id:', id);
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if slide exists
    const checkStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Slide with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('DELETE FROM slides WHERE id = ?');
    const result = stmt.run(parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete slide' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Slide deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting slide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete slide: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
