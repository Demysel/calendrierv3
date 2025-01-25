import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Le titre est obligatoire"],
    maxlength: [50, "Maximum 50 caractères"]
  },
  start: { type: Date, required: true },
  end: Date,
  type: { 
    type: String, 
    enum: ['perso', 'pro', 'enfant'],
    default: 'perso'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
