const Tour = require('../models/Tour');

exports.getAll = async (req, res) => {
  const filter = req.user ? { owner: req.user._id } : {};
  const tours = await Tour.find(filter);
  res.json(tours);
};

exports.create = async (req, res) => {
  const owner = req.user ? req.user._id : undefined;
  if (req.body && Array.isArray(req.body.keywords)) {
    const payload = { keywords: req.body.keywords };
    if (owner) payload.owner = owner;
    const tour = await Tour.create(payload);
    return res.status(201).json(tour);
  }
  const payload = { ...req.body };
  if (owner) payload.owner = owner;
  const tour = await Tour.create(payload);
  res.status(201).json(tour);
};
