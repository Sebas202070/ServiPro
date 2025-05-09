import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import dbConnect from '@/lib/db';

cloudinary.config(process.env.CLOUDINARY_URL ?? ' ');

let cachedClient = null;

async function getClient() {
    try {
        if (cachedClient && cachedClient.isConnected()) {
            return cachedClient;
        }

        cachedClient = await dbConnect();
        return cachedClient;
    } catch (error) {
        console.error('Error getting client:', error);
        cachedClient = await dbConnect();
        return cachedClient;
    }
}

export async function POST(req) {
    try {
        console.log('Inicio de la petición POST a /api/profesionales');
        const formData = await req.formData();
        const nombre = formData.get('nombre');
        const apellido = formData.get('apellido');
        const profesion = formData.get('profesion');
        const especialidad = formData.get('especialidad');
        const matriculado = formData.get('matriculado');
        const numeroMatricula = formData.get('numeroMatricula');
        const descripcion = formData.get('descripcion');
        const ubicacion = formData.get('ubicacion');
        const fotoFile = formData.get('foto');
        const userId = formData.get('userId');

        let fotoUrl = null;
        if (fotoFile) {
            console.log('Archivo recibido:', fotoFile);
            const fileBuffer = await fotoFile.arrayBuffer();
            const base64Image = Buffer.from(fileBuffer).toString('base64');
            const dataURI = `data:${fotoFile.type};base64,${base64Image}`;

            console.log('Cargando imagen a Cloudinary...');
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(dataURI);
                console.log('Respuesta de Cloudinary:', cloudinaryResponse);
                fotoUrl = cloudinaryResponse.secure_url;
            } catch (cloudinaryError) {
                console.error('Error al cargar la imagen a Cloudinary:', cloudinaryError);
                return NextResponse.json({ error: 'Error al cargar la imagen a Cloudinary' }, { status: 500 });
            }
        }

        console.log('Conectando a MongoDB...');
        const client = await getClient();
        const db = client.db();
        const profesionalesCollection = db.collection('profesionales');
        const usersCollection = db.collection('users');

        const profesional = {
            nombre,
            apellido,
            profesion,
            especialidad,
            matriculado: matriculado === 'true',
            numeroMatricula,
            descripcion,
            ubicacion,
            foto: fotoUrl,
            userId: new ObjectId(userId),
        };

        console.log('Insertando profesional en MongoDB:', profesional);
        await profesionalesCollection.insertOne(profesional);
        console.log('Profesional insertado con éxito');

        // Actualizar el campo professionalFormCompleted en la colección users
        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { professionalFormCompleted: true } }
        );

        return NextResponse.json(profesional, { status: 201 });
    } catch (error) {
        console.error('Error en la petición POST:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        console.log('Inicio de la petición GET a /api/profesionales');
        const client = await getClient();
        const db = client.db();
        const collection = db.collection('profesionales');

        const profesionales = await collection.find({}).toArray();
        console.log('Profesionales obtenidos:', profesionales);

        return NextResponse.json(profesionales, { status: 200 });
    } catch (error) {
        console.error('Error en la petición GET:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}