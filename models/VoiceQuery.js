import mongoose from 'mongoose';

const voiceQuerySchema = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'LegalIssue', required: true },
  spokenText: String,
  transcribedText: String,
  language: String,
  isDeleted: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('VoiceQuery', voiceQuerySchema);