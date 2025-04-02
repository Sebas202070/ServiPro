'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
   
        router.refresh(); // Forzar la actualización de la sesión
        console.log("Status:", status);
        console.log("User Type:", session?.user?.userType);
        if (!session || session.user.userType !== 'profesional') {
            router.push('/');
        }
    }, [session, status, router]);

    if (!session || session.user.userType !== 'profesional') {
        return null;
    }

    return (
        <div>
            <h1>Página de Administración</h1>
            <p>Bienvenido, profesional.</p>
        </div>
    );
}