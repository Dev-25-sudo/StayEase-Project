

const db = require('../db'); 

exports.createHotelWithImage = async (req, res) => {
  try {
    const hotelData = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    hotelData.image = `/uploads/${file.filename}`;

    const [result] = await db.query('INSERT INTO Hotels SET ?', hotelData);
    
    res.status(201).json({ message: 'Hotel created with image', hotelId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create hotel', error: err.message });
  }
};
