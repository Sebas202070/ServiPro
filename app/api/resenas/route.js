// app/api/resenas/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Resena from '@/lib/models/Resena';

export async function POST(request) {
  await dbConnect();

  // Lógica para crear una reseña.
}