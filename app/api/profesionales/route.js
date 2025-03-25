// app/api/profesionales/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profesional from '@/lib/models/Profesional';

export async function GET(request) {
  await dbConnect();

  // Lógica para buscar profesionales por proximidad, rankings, etc.
}

export async function POST(request) {
  await dbConnect();

  // Lógica para registrar un profesional.
}