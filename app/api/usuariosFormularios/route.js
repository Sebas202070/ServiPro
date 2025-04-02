import dbConnect from '@/lib/db.mjs';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Importa ObjectId

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ message: 'userId is required' }, { status: 400 });
    }

    try {
        const client = await dbConnect();
        const db = client.db();
        const usuariosFormularios = await db.collection('usuariosFormularios').find({ userId: new ObjectId(userId) }).toArray(); // Usa new ObjectId

        if (!usuariosFormularios || usuariosFormularios.length === 0) {
            return NextResponse.json({ message: 'UsuarioFormulario not found' }, { status: 404 });
        }

        return NextResponse.json(usuariosFormularios, { status: 200 });
    } catch (error) {
        console.error('Error fetching usuariosFormularios:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}