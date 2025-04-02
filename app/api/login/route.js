// pages/api/login.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';

const jwtSecret = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const client = await dbConnect();
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

        // Include the _id in the user object
        const userWithId = {
            ...user,
            _id: user._id.toString(), // Convert ObjectId to string
        };

        return NextResponse.json({ token, userType: user.userType, user: userWithId }, { status: 200 });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}