'use client';

import ProfesionalCard from '@/components/ProfesionalCard';
import ResenaCard from '@/components/ResenaCard';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';

// Función para calcular la distancia entre dos puntos
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
    const dLat = gradosARadianes(lat2 - lat1);
    const dLon = gradosARadianes(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(gradosARadianes(lat1)) * Math.cos(gradosARadianes(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c; // Distancia en kilómetros
    return distancia;
}

function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}

function SearchParamsComponent({ profesionales, profesionalesCargados, isLoading, error, usuarioUbicacion }) {
    const searchParams = useSearchParams();
    const especialidad = searchParams.get('especialidad');

    // Combinar los profesionales de la API y los cargados localmente
    const todosLosProfesionales = [...profesionales, ...profesionalesCargados];

    // Filtrar los profesionales combinados
    const profesionalesFiltrados = especialidad
        ? todosLosProfesionales.filter((profesional) => profesional.especialidad === especialidad)
        : todosLosProfesionales;

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar profesionales.</div>;
    }

    if (profesionalesFiltrados.length === 0) {
        return <div>No se encontraron profesionales para esta especialidad.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {profesionalesFiltrados.map((profesional) => {
                let distancia = null;
                if (usuarioUbicacion && profesional.ubicacion) {
                    const [lat1, lon1] = usuarioUbicacion.split(',').map(parseFloat);
                    const [lat2, lon2] = profesional.ubicacion.split(',').map(parseFloat);
                    distancia = calcularDistancia(lat1, lon1, lat2, lon2);
                }

                return (
                    <div key={profesional.nombre || profesional._id} className="mb-4 w-full md:w-auto">
                        <ProfesionalCard profesional={profesional} distancia={distancia} />
                        {profesional.resenas && profesional.resenas.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {profesional.resenas.map((resena) => (
                                    <ResenaCard key={resena.nombreUsuario} resena={resena} />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Profesionales() {
    const [profesionales, setProfesionales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usuarioUbicacion, setUsuarioUbicacion] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        console.log("session", session); // Agregado para inspeccionar la sesión

        async function fetchProfesionales() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/profesionales');
                if (!response.ok) {
                    console.error('Error al obtener profesionales:', response.status, response.statusText);
                    throw new Error('Error al obtener profesionales');
                }
                const data = await response.json();
                setProfesionales(data);
            } catch (error) {
                console.error('Error al obtener profesionales:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        async function fetchUsuarioFormulario() {
            if (session && session.user && session.user.id) {
                try {
                    const response = await fetch(`/api/usuariosFormularios?userId=${session.user.id}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener el usuarioFormulario');
                    }
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setUsuarioUbicacion(data[0].address);
                    }
                } catch (error) {
                    console.error('Error al obtener el usuarioFormulario:', error);
                }
            } else {
                console.error('session.user.id is undefined');
            }
        }

        fetchProfesionales();
        fetchUsuarioFormulario();
    }, [session]); // session es una dependencia

    const profesionalesCargados = [
        {
            foto: '/profesional1.jpg',
            nombre: 'Juan Perez',
            especialidad: 'Plomeria',
            calificacion: 4,
            resenas: [
                {
                    nombreUsuario: 'Ana Lopez',
                    comentario: 'Excelente servicio, muy profesional.',
                    calificacion: 5,
                    fecha: '2024-05-27',
                },
                {
                    nombreUsuario: 'Carlos Rodriguez',
                    comentario: 'Muy satisfecho con el trabajo realizado.',
                    calificacion: 4,
                    fecha: '2024-05-26',
                },
            ],
        },
        {
            foto: '/profesional2.jpg',
            nombre: 'Maria Garcia',
            especialidad: 'Gas',
            ubicacion: '-27.495919911363327,-58.865654187609785',
            calificacion: 5,
            resenas: [
                {
                    nombreUsuario: 'Laura Martinez',
                    comentario: 'Recomendado, muy buen servicio.',
                    calificacion: 5,
                    fecha: '2024-05-25',
                },
            ],
        },
        {
            foto: '/profesional3.jpg',
            nombre: 'Pedro Ramirez',
            especialidad: 'Electricidad',
            calificacion: 4,
            resenas: [],
        },
    ];

    return (
        <div className="mt-16 mx-auto max-w-7xl">
            <Suspense fallback={<div>Cargando...</div>}>
                <SearchParamsComponent
                    profesionales={profesionales}
                    profesionalesCargados={profesionalesCargados}
                    isLoading={isLoading}
                    error={error}
                    usuarioUbicacion={usuarioUbicacion}
                />
            </Suspense>
        </div>
    );
}