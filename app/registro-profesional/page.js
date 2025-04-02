
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RegistroProfesional() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [profesion, setProfesion] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [matriculado, setMatriculado] = useState(false);
    const [numeroMatricula, setNumeroMatricula] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [foto, setFoto] = useState(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (status === 'authenticated') {
            setUserId(session.user.id);
        }
    }, [session, status]);

    const handleUbicacion = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUbicacion(`${position.coords.latitude},${position.coords.longitude}`);
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error);
                    alert('No se pudo obtener la ubicación.');
                }
            );
        } else {
            alert('La geolocalización no es compatible con este navegador.');
        }
    };

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert('Error: Usuario no autenticado.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('profesion', profesion);
        formData.append('especialidad', especialidad);
        formData.append('matriculado', matriculado);
        formData.append('numeroMatricula', numeroMatricula);
        formData.append('descripcion', descripcion);
        formData.append('ubicacion', ubicacion);
        if (foto) {
            formData.append('foto', foto);
        }
        formData.append('userId', userId);

        try {
            const response = await fetch('/api/profesionales', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Error al registrar profesional.';
                alert(errorMessage);
                return;
            }

            console.log('Profesional registrado:', await response.json());
            alert('Profesional registrado con éxito.');
            router.push('/profesionales');
        } catch (error) {
            console.error('Error al registrar profesional:', error);
            alert('Error al registrar profesional.');
        }
    };

    if (status === 'loading') {
        return <div>Cargando...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/login'); // Redirige a login si no está autenticado
        return null;
    }

    if (status === 'authenticated' && userId) {
        return (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                        Apellido:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="apellido"
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profesion">
                        Profesión:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="profesion"
                        type="text"
                        value={profesion}
                        onChange={(e) => setProfesion(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especialidad">
                        Especialidad:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="especialidad"
                        type="text"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matriculado">
                        Matriculado:
                    </label>
                    <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        id="matriculado"
                        checked={matriculado}
                        onChange={(e) => setMatriculado(e.target.checked)}
                    />
                    <label className="text-sm" htmlFor="matriculado">
                        Sí
                    </label>
                </div>
                {matriculado && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroMatricula">
                            Número de Matrícula:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="numeroMatricula"
                            type="text"
                            value={numeroMatricula}
                            onChange={(e) => setNumeroMatricula(e.target.value)}
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                        Descripción de Tareas:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ubicacion">
                        Ubicación:
                    </label>
                    <div className="flex items-center">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ubicacion"
                            type="text"
                            value={ubicacion}
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={handleUbicacion}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        >
                            Obtener Ubicación
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                        Foto:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="foto"
                        type="file"
                        onChange={handleFotoChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        );
    }

    return <div>Usuario no encontrado. Por favor, inicie sesión nuevamente.</div>;
}