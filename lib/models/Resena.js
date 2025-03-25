// lib/models/Resena.js
import mongoose from 'mongoose';

const ResenaSchema = new mongoose.Schema({
  profesionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesional',
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  comentario: { type: String, required: true },
  rating: { type: Number, required: true },
});

export default mongoose.models.Resena || mongoose.model('Resena', ResenaSchema);