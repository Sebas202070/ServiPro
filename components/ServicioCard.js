// app/components/ServicioCard.js
import Image from 'next/image';

export default function ServicioCard({ servicio }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src={servicio.imagen} // Ruta de la imagen del servicio
        alt={servicio.nombre}
        width={300} // Ajusta el ancho según tus necesidades
        height={200} // Ajusta la altura según tus necesidades
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{servicio.nombre}</div>
        <p className="text-gray-700 text-base">{servicio.descripcion}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${servicio.precio}
        </span>
        {servicio.categorias.map((categoria) => (
          <span
            key={categoria}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {categoria}
          </span>
        ))}
      </div>
    </div>
  );
}