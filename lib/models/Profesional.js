// models/Profesional.js
const Profesional = {
    nombre: { type: 'string', required: true },
    apellido: { type: 'string', required: true },
    profesion: { type: 'string', required: true },
    matriculado: { type: 'boolean', default: false },
    numeroMatricula: { type: 'string' },
    descripcion: { type: 'string' },
    ubicacion: { type: 'string', required: true },
    foto: { type: 'string' },
  };
  
  export default Profesional;