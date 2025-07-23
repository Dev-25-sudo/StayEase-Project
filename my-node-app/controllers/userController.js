const db = require('../db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/apperror');

(async () => {
  try { 
    const [rows] = await db.query('SELECT NOW() as now');
    console.log('Connected! Current time is:', rows[0].now);
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
})();


exports.getAllUsers = catchAsync(async (req, res, next) => {
  
  const [rows] = await db.query('SELECT * FROM Hotels');

  if (!rows) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ status: 'success', data: rows });
});


exports.getUserByID = catchAsync(async (req, res, next) => {
  const supplierHotelId = req.params.supplierHotelId;

  if (!supplierHotelId) {
    return next(new AppError('supplierHotelId is required', 400));
  }

  const [rows] = await db.query(
    'SELECT * FROM Hotels WHERE supplierHotelId = ?',
    [supplierHotelId]
  );

  if (rows.length === 0) {
    return next(new AppError('Hotel not found', 404));
  }

  res.status(200).json({ status: 'success', data: rows[0] });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const {
    supplierHotelId,
    hotelName,
    brand,
    category,
    starRating,
    latitude,
    longitude,
    address,
    cityName,
    stateCode,
    zipCode,
    countryCode,
    image,
    pricePerNight,
    price
  } = req.body;

  console.log("🚀 Received body:", req.body);


  if (
    !supplierHotelId ||
    !hotelName ||
    !brand ||
    !category ||
    !starRating ||
    !latitude ||
    !longitude ||
    !address ||
    !cityName ||
    !stateCode ||
    !zipCode ||
    !countryCode ||
    !image ||
    !pricePerNight ||
    !price
  ) {
    return next(new AppError('Missing one or more required fields', 400));
  }


  await db.query(
    `INSERT INTO Hotels (
      supplierHotelId, hotelName, brand, category, starRating, 
      latitude, longitude, address, cityName, stateCode, 
      zipCode, countryCode, image, pricePerNight, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      supplierHotelId, hotelName, brand, category, starRating,
      latitude, longitude, address, cityName, stateCode,
      zipCode, countryCode, image, pricePerNight, price
    ]
  );

  res.status(201).json({
    status: 'success',
    message: 'Hotel created successfully'
  });
});


exports.editUser = catchAsync(async (req, res, next) => {
  const supplierHotelId = req.params.supplierHotelId;
  const { hotelName, cityName } = req.body;

  const [rows] = await db.query('SELECT * FROM Hotels WHERE supplierHotelId = ?', [supplierHotelId]);
  if (rows.length === 0) {
    return next(new AppError('Hotel not found', 404));
  }

  const existing = rows[0];

  await db.query(
    'UPDATE Hotels SET hotelName = ?, cityName = ? WHERE supplierHotelId = ?',
    [
      hotelName || existing.hotelName,
      cityName || existing.cityName,
      supplierHotelId
    ]
  );

  res.status(200).json({
    status: 'success',
    data: {
      supplierHotelId,
      hotelName: hotelName || existing.hotelName,
      cityName: cityName || existing.cityName
    }
  });
});



exports.deleteUser = catchAsync(async (req, res, next) => {
  const supplierHotelId = req.params.supplierHotelId;

  const [rows] = await db.query('SELECT * FROM Hotels WHERE supplierHotelId = ?', [supplierHotelId]);
  if (rows.length === 0) {
    return next(new AppError('Hotel not found', 404));
  }

  await db.query('DELETE FROM Hotels WHERE supplierHotelId = ?', [supplierHotelId]);

  res.status(200).json({ status: 'success', data: null });
});
