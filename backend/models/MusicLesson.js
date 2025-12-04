const mongoose = require('mongoose');

const musicLessonSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  level: String,
  description: String,
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MusicLesson', musicLessonSchema);
