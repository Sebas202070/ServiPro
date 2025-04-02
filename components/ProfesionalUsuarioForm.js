// components/RegisterForm.js
import { useState, useEffect } from 'react';

function RegisterForm() {
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Utilizar un servicio de geocodificación inversa para obtener la dirección
                    fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.display_name) {
                                setAddress(data.display_name);
                            }
                        })
                        .catch((error) => {
                            console.error('Error al obtener la dirección:', error);
                        });
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error);
                }
            );
        } else {
            console.error('La geolocalización no es compatible con este navegador.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password,
                firstName,
                lastName,
                address,
                phoneNumber,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Registro exitoso:', data);
        } else {
            console.error('Error en el registro:', data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Contraseña:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <label>Nombre:</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <label>Apellido:</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <label>Dirección:</label>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <label>Número de Teléfono:</label>
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default RegisterForm;