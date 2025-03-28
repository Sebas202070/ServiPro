// app/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          ServiPro
        </Link>
        <div className="flex space-x-4">
          <Link href="/servicios" className="text-gray-300 hover:text-white">
            Servicios
          </Link>
          <Link href="/profesionales" className="text-gray-300 hover:text-white">
            Profesionales
          </Link>
           <Link href="/profesionales" className="text-gray-300 hover:text-white">
            Inicia Sesion
          </Link>
          <Link href="/registro-usuario" className="text-gray-300 hover:text-white">
          ¿Eres Profesional?, Registrate aqui
          </Link>
        </div>
      </div>
    </nav>
  );
}