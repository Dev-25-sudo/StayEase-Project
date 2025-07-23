const fs = require('fs');
const path = require('path');
const db = require('./db');


const hotels = JSON.parse(fs.readFileSync(path.join(__dirname, 'hotels.json'), 'utf-8'));


async function insertHotels() {
  for (const hotel of hotels) {
    try {
      const [result] = await db.query(
        `INSERT INTO hotels 
         (supplierHotelId, hotelName, brand, category, starRating, latitude, longitude, address, cityName, stateCode, zipCode, countryCode, image, pricePerNight, price) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          hotel.supplierHotelId,
          hotel.hotelName,
          hotel.brand,
          hotel.category,
          hotel.starRating,
          hotel.latitude,
          hotel.longitude,
          hotel.address,
          hotel.cityName,
          hotel.stateCode,
          hotel.zipCode,
          hotel.countryCode,
          hotel.image,
          hotel.pricePerNight,
          hotel.price
        ]
      );
      console.log(`✅ Inserted: ${hotel.hotelName}`);
    } catch (err) {
      console.error(`❌ Error inserting ${hotel.hotelName}:`, err);
    }
  }

  process.exit(); 
}

insertHotels();
