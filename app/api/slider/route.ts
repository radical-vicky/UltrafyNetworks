import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'slider.db');

function initializeDatabase() {
  try {
    const dbExists = fs.existsSync(DB_PATH);
    const db = new Database(DB_PATH);
    
    if (!dbExists) {
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
          status TEXT DEFAULT 'active',
          display_order INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      const insertStmt = db.prepare(`
        INSERT INTO slides (
          title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleSlides = [
        [
          'UltrafyNetworks',
          'Tuko Thika',
          'Premium fibre internet built for Thika homes and businesses.',
          'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&h=500&fit=crop',
          'Get Connected Now',
          '#contact',
          'Now live in Thika',
          1,
          'active'
        ],
        [
          'Fibre to the Home',
          'Lightning Fast Speeds',
          'Experience the power of true fibre internet with speeds up to 30 Mbps.',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
          'View Packages',
          '#packages',
          'Fibre Internet',
          2,
          'active'
        ],
        [
          '1 Month Free',
          'Special Offer',
          'Sign up today and get your first month absolutely free!',
          'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
          'Claim Offer',
          '#contact',
          'Special Offer',
          3,
          'active'
        ],
        [
          'UltrafyNetworks',
          'Connecting Thika',
          'Join hundreds of satisfied customers across Thika.',
          'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=500&fit=crop',
          'Learn More',
          '/services',
          'Trusted Provider',
          4,
          'active'
        ],
      ];
      
      const insertMany = db.transaction((slides: any[][]) => {
        for (const slide of slides) {
          insertStmt.run(slide);
        }
      });
      
      insertMany(sampleSlides);
      console.log('✅ Slider database initialized!');
    }
    db.close();
    return true;
  } catch (error) {
    console.error('❌ Error initializing slider database:', error);
    return false;
  }
}

// GET: Fetch all slides
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
      });
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(
      'SELECT * FROM slides WHERE status = ? ORDER BY display_order ASC, created_at DESC'
    );
    const result = stmt.all(status);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching slides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch slides' },
      { status: 500 }
    );
  }
}

// POST: Create a new slide
export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    console.log('📥 Received slide data:', {
      title: body.title,
      subtitle: body.subtitle,
      hasImage: !!body.image,
      imageLength: body.image?.length || 0
    });
    
    const { 
      title, 
      subtitle, 
      description, 
      image, 
      cta_text, 
      cta_link, 
      badge, 
      display_order, 
      status 
    } = body;
    
    if (!title || !subtitle || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image is required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO slides (
        title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      title,
      subtitle,
      description,
      image,
      cta_text || 'Learn More',
      cta_link || '#',
      badge || 'Featured',
      display_order || 0,
      status || 'active'
    );
    
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const newSlide = getStmt.get(info.lastInsertRowid);
    db.close();
    
    console.log('✅ Slide created with ID:', info.lastInsertRowid);
    
    return NextResponse.json({
      success: true,
      data: newSlide,
      message: 'Slide created successfully',
    });
  } catch (error) {
    console.error('❌ Error creating slide:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to create slide' },
      { status: 500 }
    );
  }
}

// PUT: Update a slide
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { 
      title, 
      subtitle, 
      description, 
      image, 
      cta_text, 
      cta_link, 
      badge, 
      display_order, 
      status 
    } = body;
    
    const db = new Database(DB_PATH);
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const existingSlide = getStmt.get(parseInt(id)) as any;
    
    if (!existingSlide) {
      db.close();
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare(`
      UPDATE slides 
      SET title = ?, subtitle = ?, description = ?, image = ?, 
          cta_text = ?, cta_link = ?, badge = ?, display_order = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(
      title || existingSlide.title,
      subtitle || existingSlide.subtitle,
      description || existingSlide.description,
      image || existingSlide.image,
      cta_text || existingSlide.cta_text,
      cta_link || existingSlide.cta_link,
      badge || existingSlide.badge,
      display_order || existingSlide.display_order,
      status || existingSlide.status,
      parseInt(id)
    );
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Slide updated successfully',
    });
  } catch (error) {
    console.error('Error updating slide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update slide' },
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
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('DELETE FROM slides WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Slide deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting slide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete slide' },
      { status: 500 }
    );
  }
}
