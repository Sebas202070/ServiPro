// app/layout.js
'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/NavBar'; // Importa tu Navbar
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <Navbar /> {/* Renderiza tu Navbar */}
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}