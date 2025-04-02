// pages/api/users.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';

export async function POST(req) {
  try {
    const { username, password, email, userType } = await req.json();

    // Validación de datos
    if (!username || !password || !email) {
      return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
    }

    // Conexión a la base de datos
    const client = await dbConnect();
    const db = client.db();
    const usersCollection = db.collection('users');

    // Verificar si el usuario ya existe
    const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
      email,
      userType,
    };

    await usersCollection.insertOne(user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}