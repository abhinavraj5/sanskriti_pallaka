const Craft = require('../models/Craft');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const { state, mine } = req.query;
    let filter = {};

    if (mine === 'true') {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      filter.owner = req.user._id;
    } else if (state) {
      // match by originState or origin field
      filter.$or = [ { originState: state }, { origin: state } ];
    }

    const crafts = await Craft.find(filter).populate('owner', 'username email');
    res.json(crafts);
  } catch (err) {
    console.error('Error fetching crafts:', err);
    res.status(500).json({ error: 'Failed to fetch crafts' });
  }
};

exports.create = async (req, res) => {
  try {
    const owner = req.user ? req.user._id : undefined;
    const body = { ...req.body };

    if (owner) body.owner = owner;

    // allow old 'name' or new 'title' interchangeably
    if (!body.title && body.name) body.title = body.name;
    if (!body.artist && body.artisan) body.artist = body.artisan;
    if (!body.origin && (body.originState || body.originCity)) {
      body.origin = [body.originCity, body.originState].filter(Boolean).join(', ');
    }

    const craft = await Craft.create(body);
    res.status(201).json(craft);
  } catch (err) {
    console.error('Error creating craft:', err);
    res.status(500).json({ error: 'Failed to create craft' });
  }
};

// Upload scanner image (multipart) - returns URL
exports.uploadScanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filePath = `/uploads/scanners/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${filePath}`;
    return res.json({ url: fullUrl });
  } catch (err) {
    console.error('Error uploading scanner:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};

// Delete craft by id (owner only)
exports.deleteCraft = async (req, res) => {
  try {
    const id = req.params.id;
    const craft = await Craft.findById(id);
    if (!craft) return res.status(404).json({ error: 'Not found' });
    if (!req.user || !craft.owner || craft.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // if scanner path stored and under uploads/scanners, try to remove file
    if (craft.paymentScanner && craft.paymentScanner.includes('/uploads/scanners/')) {
      const filename = craft.paymentScanner.split('/uploads/scanners/').pop();
      const fullPath = path.join(__dirname, '..', 'uploads', 'scanners', filename);
      fs.unlink(fullPath, (err) => { if (err) console.warn('Failed to remove scanner file', err); });
    }

    await Craft.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting craft:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
};
