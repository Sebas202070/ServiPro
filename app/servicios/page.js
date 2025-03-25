// app/servicios/page.js

import ServicioCard from "@/components/ServicioCard";


export default function Servicios() {
  const servicios = [
    {
      imagen: '/servicio1.jpg',
      nombre: 'Instalación eléctrica',
      descripcion: 'Instalación de cableado y enchufes',
      precio: 100,
      categorias: ['Electricidad', 'Hogar'],
    },
    {
      imagen: '/servicio2.jpg',
      nombre: 'Reparación de tuberías',
      descripcion: 'Reparación de fugas y tuberías rotas',
      precio: 150,
      categorias: ['Plomería', 'Hogar'],
    },
    // ... más servicios
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {servicios.map((servicio) => (
        <ServicioCard key={servicio.nombre} servicio={servicio} />
      ))}
    </div>
  );
}