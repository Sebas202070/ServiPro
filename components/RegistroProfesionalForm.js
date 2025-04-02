'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RegistroProfesionalForm() {
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
        return <div>No autenticado</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            {/* ... (resto del formulario) ... */}
        </form>
    );
}