'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserRegisterForm from '@/components/ProfesionalSignInForm';

export default function RegistroUsuarioPage() {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const handleUserRegistered = (id) => {
    setUserId(id);
    router.push('/registro-profesional'); // Redirige al formulario del profesional
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {userId ? (
        <div>Usuario registrado con éxito.</div>
      ) : (
        <UserRegisterForm onUserRegistered={handleUserRegistered} />
      )}
    </div>
  );
}