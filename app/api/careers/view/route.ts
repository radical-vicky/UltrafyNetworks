import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';

export async function GET() {
  try {
    const dbPath = '/tmp/careers.db';
    
    // Create database if it doesn't exist
    let db: Database.Database;
    let isNew = false;
    
    if (!fs.existsSync(dbPath)) {
      isNew = true;
      db = new Database(dbPath);
      
      // Create table
      db.exec(`
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
      `);
      
      // Insert sample data
      const insertStmt = db.prepare(`
        INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleRoles = [
        ['Field Technician', 'Network Operations', 'Thika', 'Full-time', 'Wrench', 'Install and maintain fibre connections for homes and businesses, troubleshoot on-site issues, and keep our network running reliably across Thika.', 'open', '2026-06-01'],
        ['Customer Support Agent', 'Customer Experience', 'Thika', 'Full-time', 'Headset', 'Be the first voice customers hear — handle billing questions, technical support calls, and walk-in inquiries with patience and clarity.', 'open', '2026-06-10'],
        ['Sales Representative', 'Sales & Marketing', 'Thika', 'Full-time', 'TrendingUp', 'Help grow our customer base across Thika. Engage with potential clients, explain our packages, and drive adoption of fibre internet in new areas.', 'open', '2026-06-15']
      ];
      
      const insertMany = db.transaction((roles: any[][]) => {
        for (const role of roles) {
          insertStmt.run(role);
        }
      });
      
      insertMany(sampleRoles);
    } else {
      db = new Database(dbPath);
    }
    
    // Get all roles
    const roles = db.prepare('SELECT * FROM roles ORDER BY id DESC').all();
    db.close();
    
    return NextResponse.json({
      success: true,
      total: roles.length,
      data: roles,
      initialized: isNew,
      message: isNew ? 'Database created with sample data' : 'Database loaded',
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to read database' },
      { status: 500 }
    );
  }
         }
