// app/reseñas/page.js

import ResenaCard from "@/components/ResenaCard";


export default function Resenas() {
  const resenas = [
    {
      nombreUsuario: 'Ana López',
      comentario: 'Excelente servicio, muy profesional.',
      calificacion: 5,
      fecha: '2024-05-27',
    },
    {
      nombreUsuario: 'Carlos Rodríguez',
      comentario: 'Muy satisfecho con el trabajo realizado.',
      calificacion: 4,
      fecha: '2024-05-27',
    },
    // ... más reseñas
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resenas.map((resena) => (
        <ResenaCard key={resena.nombreUsuario} resena={resena} />
      ))}
    </div>
  );
}