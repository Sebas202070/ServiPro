'use client';

import RegistroProfesionalForm from '@/components/RegistroProfesionalForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtVerify } from 'jose'; // Importa jwtVerify de jose

const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default function RegistroProfesional() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    async function verifyToken() { // Make useEffect async
      try {
        const secret = new TextEncoder().encode(jwtSecret); // Convert jwtSecret to Uint8Array
        const { payload } = await jwtVerify(token, secret); // Usa jwtVerify de jose
        setUserId(payload.userId);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al verificar el token:', error);
        router.push('/login');
      }
      setIsLoading(false);
    }

    verifyToken();
  }, [router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null; // No renderiza nada si no está autenticado (ya redirigido)
  }

  return (
    <div>
      {userId ? (
        <RegistroProfesionalForm userId={userId} />
      ) : (
        <div>Usuario no encontrado. Por favor, inicie sesión nuevamente.</div>
      )}
    </div>
  );
}