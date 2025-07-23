
 
const express = require('express');

const AppError = require('./utils/apperror');
const globalErrorHandler = require('./controllers/errorcontroller');
const hotelRoutes = require('./routes/hotelRoutes');
const cors = require('cors');


const fs = require('fs');
require('dotenv').config();
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

 
app.use('/api/v1/hotels', hotelRoutes);

 
const userRouter = require('./routes/userroutes');
console.log('Router loaded');
app.use('/api/v1/users', userRouter);
console.log('Router mounted');



app.use('/uploads', express.static('uploads'));

app.use((req, res , next) => { 
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
 
 

const port =3000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
 