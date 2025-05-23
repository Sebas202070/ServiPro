
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a ServiPro</h1>
        <p className="text-lg text-gray-600 mb-8">
          Todos los servicios que necesitas para tu hogar o empresa en un solo lugar.
        </p>
      </div>

      {/* Categorías centradas y con menor separación */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid gap-2 justify-items-center [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {[
            {
              href: "/profesionales?especialidad=Plomeria",
              src: "/plomeria.png",
              alt: "Plomería",
              title: "Plomería",
              description: "Servicios de plomería para tu hogar o empresa.",
            },
            {
              href: "/profesionales?especialidad=Gas",
              src: "/gas.png",
              alt: "Gas",
              title: "Gas",
              description: "Instalación y reparación de gas.",
            },
            {
              href: "/profesionales?especialidad=Electricidad",
              src: "/electricidad.png",
              alt: "Electricidad",
              title: "Electricidad",
              description: "Servicios de electricidad para tu hogar o empresa.",
            },
          ].map(({ href, src, alt, title, description }) => (
            <Link
              key={title}
              href={href}
              className="text-center flex flex-col items-center"
            >
              <Image src={src} alt={alt} width={80} height={80} className="mb-2" />
              <div className="max-w-[160px] text-center">
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full max-w-7xl mx-auto flex justify-center">
        <Link
          href="/servicios"
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold"
        >
          Ver todos los servicios
        </Link>
      </div>
    </main>
  );
}
