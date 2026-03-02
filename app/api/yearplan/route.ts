import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
    try {
        const XLSX = require('xlsx');
        const filePath = path.join(process.cwd(), 'public', 'aarsplan.xlsx');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Yearplan file not found' }, { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        return NextResponse.json({ data, sheetNames: workbook.SheetNames });
    } catch (error) {
        console.error('Error reading yearplan:', error);
        return NextResponse.json({ error: 'Failed to read yearplan' }, { status: 500 });
    }
}
