// app/api/resenas/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Resena from '@/lib/models/Resena';

export async function POST(request) {
  try {
    const client = await dbConnect(); // Llama a dbConnect
    // ... Lógica para crear una reseña usando el cliente ...
    // Ejemplo (necesitas adaptar a tu modelo Resena):
    const db = client.db();
    const collection = db.collection('resenas');
    const resenaData = await request.json(); // Obtener los datos de la reseña desde el request
    const resena = await collection.insertOne(resenaData);

    await client.close(); // Cierra la conexión
    return NextResponse.json(resena, { status: 201 });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}