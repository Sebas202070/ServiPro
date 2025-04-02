'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registrationError, setRegistrationError] = useState(null);
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
                    setAddress(`${position.coords.latitude},${position.coords.longitude}`);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegistrationError(null);

        if (!userId) {
            setRegistrationError("Usuario no autenticado.");
            return;
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                address,
                phoneNumber,
                userId: userId,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Registro exitoso:', data);
            router.push('/');
        } else {
            console.error('Error en el registro:', data.error);
            setRegistrationError(data.error || 'Ocurrió un error al registrar el formulario.');
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
            {registrationError && (
                <div className="text-red-500 mb-4">{registrationError}</div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Nombre:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
          <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Apellido:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Dirección:
                </label>
                <div className="flex items-center">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        value={address}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                    Número de Teléfono:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
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