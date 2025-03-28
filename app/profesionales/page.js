'use client';

import ProfesionalCard from '@/components/ProfesionalCard';
import ResenaCard from '@/components/ResenaCard';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Profesionales() {
  const searchParams = useSearchParams();
  const especialidad = searchParams.get('especialidad');
  const [profesionales, setProfesionales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProfesionales();
  }, []);

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

  const profesionalesFiltrados = especialidad
    ? [...profesionales, ...profesionalesCargados].filter((profesional) => profesional.especialidad === especialidad)
    : [...profesionales, ...profesionalesCargados];

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar profesionales.</div>;
  }

  return (
    <div className="mt-16 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {profesionalesFiltrados.map((profesional) => (
          <div key={profesional.nombre || profesional._id} className="mb-4 w-full md:w-auto">
            <ProfesionalCard profesional={profesional} />
            {profesional.resenas && profesional.resenas.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {profesional.resenas.map((resena) => (
                  <ResenaCard key={resena.nombreUsuario} resena={resena} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}