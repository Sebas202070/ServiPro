// /api/users/route.js (o /api/users.js en pages/api)
import dbConnect from '@/lib/db'; // Asegúrate de que esta ruta sea correcta
import { NextResponse } from 'next/server'; // O 'next/server' si usas app router

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    try {
        const client = await dbConnect();
        const db = client.db();
        const user = await db.collection('users').findOne({ username });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}