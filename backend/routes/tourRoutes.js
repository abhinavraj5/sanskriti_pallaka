const express = require('express');
const { getAll, create } = require('../controllers/tourController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.post('/', requireAuth, create);

module.exports = router;
