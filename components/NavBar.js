'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session, status } = useSession();

    console.log('Navbar session:', session); // Log para debugging

 
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white font-bold text-xl">
                    Mi Aplicación
                </Link>
                <div className="flex space-x-4">
                    {session ? (
                        <>
                            <span className="text-gray-300 mr-4">Hola, {session.user.name}</span>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/loginusuario" className="text-gray-300 hover:text-white">
                                Iniciar Sesión
                            </Link>
                            <Link href="/registroprofesional" className="text-gray-300 hover:text-white">
                                ¿Eres profesional? Regístrate aquí
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}