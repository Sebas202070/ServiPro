// app/components/ResenaCard.js
export default function ResenaCard({ resena }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-2">
      <div className="flex items-center mb-2">
        <div className="font-semibold text-sm">{resena.nombreUsuario}</div>
        <div className="ml-2 text-xs text-gray-500">({resena.calificacion}/5)</div>
      </div>
      <p className="text-sm text-gray-700">{resena.comentario}</p>
    
    </div>
  );
}