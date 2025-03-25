// app/profesionales/page.js

import ProfesionalCard from "@/components/ProfesionalCard";


export default function Profesionales() {
  const profesionales = [
    {
      imagen: '/profesional1.jpg',
      nombre: 'Juan Pérez',
      especialidad: 'Electricista',
      calificacion: 4,
    },
    {
      imagen: '/profesional2.jpg',
      nombre: 'María García',
      especialidad: 'Plomero',
      calificacion: 5,
    },
    // ... más profesionales
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profesionales.map((profesional) => (
        <ProfesionalCard key={profesional.nombre} profesional={profesional} />
      ))}
    </div>
  );
}