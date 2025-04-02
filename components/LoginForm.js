'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const { status } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (status === 'loading') return; // Espera a que la sesión esté lista

        const result = await signIn('credentials', {
            username,
            password,
            redirect: false, // Evita la redirección automática
        });

        if (result?.error) {
            setError(result.error);
            return;
        }

        if (result?.ok) {
            try {
                // Obtener datos del usuario de la base de datos
                const response = await fetch(`/api/getUsers?username=${username}`); // Supongamos que tienes esta ruta
                if (!response.ok) {
                    throw new Error('Error al obtener datos del usuario');
                }
                const userData = await response.json();

                if (userData) {
                    if (userData.userType === 'usuario') {
                        if (userData.userFormCompleted) {
                            router.push('/');
                        } else {
                            router.push('/registrousuario');
                        }
                    } else if (userData.userType === 'profesional') {
                        if (userData.professionalFormCompleted) {
                            router.push('/');
                        } else {
                            router.push('/registro-profesional');
                        }
                    } else {
                        router.push('/');
                    }
                } else {
                    setError('Usuario no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                setError('Error al obtener datos del usuario.');
            }
        }
    };

    if (status === 'loading') {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Nombre de usuario:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Iniciar Sesión
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p>
                ¿Aún no estás registrado? <Link href="/registro-usuario">Regístrate aquí</Link>.
            </p>
            <p>
                ¿Eres profesional? <Link href="/registroprofesional">Regístrate aquí</Link>.
            </p>
        </form>
    );
}