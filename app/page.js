// app/page.js
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a ServiPro</h1>
        <p className="text-lg text-gray-600 mb-8">
          Todos los servicios que necesitas para tu hogar o empresa en un solo lugar.
        </p>
      </div>

      <div className="w-full flex justify-center max-w-5xl"> {/* Ancho máximo y centrado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center w-64 mx-auto">
            <Image src="/plomeria.png" alt="Plomería" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Plomería</h2>
            <p className="text-gray-600">Servicios de plomería para tu hogar o empresa.</p>
          </div>
          <div className="text-center w-64 mx-auto">
            <Image src="/gas.png" alt="Gas" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Gas</h2>
            <p className="text-gray-600">Instalación y reparación de gas.</p>
          </div>
          <div className="text-center w-64 mx-auto">
            <Image src="/electricidad.png" alt="Electricidad" width={80} height={80} className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Electricidad</h2>
            <p className="text-gray-600">Servicios de electricidad para tu hogar o empresa.</p>
          </div>
          {/* Agrega más iconos y servicios aquí */}
        </div>
      </div>

      <div className="mt-12">
        <Link href="/servicios" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold">
          Ver todos los servicios
        </Link>
      </div>
    </main>
  );
}