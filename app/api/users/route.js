import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function getClient() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function POST(req) {
  try {
    const { username, password, email } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await getClient();
    const db = client.db();
    const usersCollection = db.collection('users');

    const user = {
      username,
      password: hashedPassword,
      email,
    };

    await usersCollection.insertOne(user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    const client = await getClient();
    await client.close();
  }
}