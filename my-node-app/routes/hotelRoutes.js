
const express = require('express');
const router = express.Router();
const db = require('../db'); 
const upload = require('../multerconfig'); 
const hotelController = require('../controllers/hotelcontroller');

router.post('/upload', upload.single('image'), hotelController.createHotelWithImage);
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM hotels');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

module.exports = router;
