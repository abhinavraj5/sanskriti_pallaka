const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAll, create, uploadScanner, deleteCraft } = require('../controllers/craftController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// multer storage for scanners
const scannersDir = path.join(__dirname, '..', 'uploads', 'scanners');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, scannersDir);
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname) || '.png';
		cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
	}
});
const upload = multer({ storage });

router.get('/', getAll);
router.post('/', requireAuth, create);
router.post('/upload-scanner', requireAuth, upload.single('scanner'), uploadScanner);
router.delete('/:id', requireAuth, deleteCraft);

module.exports = router;
