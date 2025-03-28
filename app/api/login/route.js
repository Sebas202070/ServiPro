import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

async function getClient() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const client = await getClient();
    const db = client.db();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'Credenciales incorrectas.' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Credenciales incorrectas.' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    const client = await getClient();
    await client.close();
  }
}