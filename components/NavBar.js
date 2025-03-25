// app/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          ServiPro
        </Link>
        <div className="flex space-x-4">
          <Link href="/profesionales" className="text-white">
            Profesionales
          </Link>
          <Link href="/servicios" className="text-white">
            Servicios
          </Link>
          <Link href="/resenas" className="text-white">
            Reseñas
          </Link>
          <Link href="/contacto" className="text-white">
            Contacto
          </Link>
          <Link href="/login" className="bg-white text-blue-500 px-4 py-2 rounded">
            Iniciar Sesión/Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}