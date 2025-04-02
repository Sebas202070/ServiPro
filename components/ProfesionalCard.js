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

export default function ProfesionalCard({ profesional, distancia }) { // Cambia usuarioUbicacion por distancia
    const defaultImage = '/placeholder.jpg';

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden w-64">
            <div className="relative h-48 w-full">
                <Image
                    src={profesional.foto || defaultImage}
                    alt={profesional.nombre}
                    fill
                    style={{ objectFit: 'contain' }}
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
                {distancia !== null && (
                    <div className="mt-2 text-sm text-gray-500">
                        {distancia.toFixed(2)} km de distancia
                    </div>
                )}
            </div>
        </div>
    );
}