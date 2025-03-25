// lib/models/Profesional.js
import mongoose from 'mongoose';

const ProfesionalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  servicios: [{ type: String }],
  ubicacion: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  rankings: [{ type: Number }],
});

ProfesionalSchema.index({ ubicacion: '2dsphere' });

export default mongoose.models.Profesional ||
  mongoose.model('Profesional', ProfesionalSchema);