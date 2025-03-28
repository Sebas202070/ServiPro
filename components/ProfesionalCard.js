// app/components/ProfesionalCard.js
import Image from 'next/image';

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`text-yellow-500 ${i <= rating ? 'fas fa-star' : 'far fa-star'}`}></span>
    );
  }
  return <div>{stars}</div>;
}

export default function ProfesionalCard({ profesional }) {
  const defaultImage = '/placeholder.jpg'; // Ruta a una imagen de marcador de posición

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden w-64">
      <div className="relative h-48 w-full">
        <Image
          src={profesional.foto || defaultImage}
          alt={profesional.nombre}
          fill
          style={{objectFit: 'contain'}}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </div>
      <div className="p-4">
        <div className="font-semibold text-lg">{profesional.nombre}</div>
        <div className="text-sm text-gray-600">{profesional.especialidad}</div>
        <div className="mt-2 text-sm text-gray-500">
          <StarRating rating={profesional.calificacion} />
        </div>
      </div>
    </div>
  );
}