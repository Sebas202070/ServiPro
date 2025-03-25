// app/layout.js

import Navbar from '@/components/NavBar';
import './globals.css';

export const metadata = {
  title: 'ServiPro',
  description: 'Servicios para tu hogar y empresa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}