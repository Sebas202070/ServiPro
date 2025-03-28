import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db'; // Importa dbConnect

export async function POST(req) {
  try {
    const { username, password, email } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await dbConnect(); // Llama a dbConnect
    const db = client.db();
    const usersCollection = db.collection('users');

    const user = {
      username,
      password: hashedPassword,
      email,
    };

    await usersCollection.insertOne(user);

    await client.close(); // Cierra la conexión
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}