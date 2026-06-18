import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';

export async function GET() {
  try {
    const dbPath = '/tmp/careers.db';
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({
        error: 'Database not found',
        data: [],
      });
    }
    
    const db = new Database(dbPath);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    
    const result: any = {
      tables: tables.map((t: any) => t.name),
      data: {},
    };
    
    // Get data from each table
    for (const table of tables) {
      const tableName = table.name;
      const data = db.prepare(`SELECT * FROM ${tableName}`).all();
      result.data[tableName] = data;
    }
    
    db.close();
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to read database' },
      { status: 500 }
    );
  }
}
