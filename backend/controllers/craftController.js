const Craft = require('../models/Craft');

exports.getAll = async (req, res) => {
  const filter = req.user ? { owner: req.user._id } : {};
  const crafts = await Craft.find(filter);
  res.json(crafts);
};

exports.create = async (req, res) => {
  const owner = req.user ? req.user._id : undefined;
  if (req.body && Array.isArray(req.body.keywords)) {
    const payload = { keywords: req.body.keywords };
    if (owner) payload.owner = owner;
    const craft = await Craft.create(payload);
    return res.status(201).json(craft);
  }
  const payload = { ...req.body };
  if (owner) payload.owner = owner;
  const craft = await Craft.create(payload);
  res.status(201).json(craft);
};
