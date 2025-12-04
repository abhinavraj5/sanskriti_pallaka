const MusicLesson = require('../models/MusicLesson');

exports.getAll = async (req, res) => {
  const filter = req.user ? { owner: req.user._id } : {};
  const lessons = await MusicLesson.find(filter);
  res.json(lessons);
};

exports.create = async (req, res) => {
  const owner = req.user ? req.user._id : undefined;
  if (req.body && Array.isArray(req.body.keywords)) {
    const payload = { keywords: req.body.keywords };
    if (owner) payload.owner = owner;
    const lesson = await MusicLesson.create(payload);
    return res.status(201).json(lesson);
  }
  const payload = { ...req.body };
  if (owner) payload.owner = owner;
  const lesson = await MusicLesson.create(payload);
  res.status(201).json(lesson);
};
