import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    default: 'gradient-1',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answeredAt: {
    type: Date,
    default: null,
  },
})

export const Question =
  mongoose.models.Question || mongoose.model('Question', QuestionSchema)
