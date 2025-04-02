// app/api/register/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(req) {
    try {
        const { firstName, lastName, address, phoneNumber, userId } = await req.json();

        if (!firstName || !lastName || !address || !phoneNumber || !userId) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const client = await dbConnect();
        const db = client.db();
        const usersCollection = db.collection('users');
        const usuariosFormulariosCollection = db.collection('usuariosFormularios');

        // Buscar el usuario por _id
        let user;
        try {
            user = await usersCollection.findOne({ _id: new ObjectId(userId) });
            if (!user) {
                return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
            }
        } catch (dbError) {
            console.error('Error al buscar usuario:', dbError);
            return NextResponse.json({ error: 'Error al buscar usuario' }, { status: 500 });
        }

        try {
            const insertResult = await usuariosFormulariosCollection.insertOne({
                userId: new ObjectId(userId),
                firstName,
                lastName,
                address,
                phoneNumber,
            });
            if (!insertResult.insertedId) {
                console.error('Error al insertar formulario de usuario:');
                return NextResponse.json({ error: 'Error al insertar formulario de usuario' }, { status: 500 });
            }
            console.log('Formulario de usuario insertado con éxito:', insertResult.insertedId);
        } catch (dbError) {
            console.error('Error al insertar formulario de usuario:', dbError);
            return NextResponse.json({ error: 'Error al insertar formulario de usuario' }, { status: 500 });
        }

        try {
            const updateResult = await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { userFormCompleted: true } }
            );
            if (updateResult.modifiedCount === 0) {
                console.error('Error al actualizar usuario:', updateResult);
                return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
            }
            console.log('Usuario actualizado con éxito:', userId);
        } catch (dbError) {
            console.error('Error al actualizar usuario:', dbError);
            return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
        }

        // Enviar una respuesta exitosa
        return NextResponse.json({ message: 'Formulario de usuario registrado con éxito', insertedId: userId }, { status: 201 });
    } catch (error) {
        console.error('Error en el registro:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}