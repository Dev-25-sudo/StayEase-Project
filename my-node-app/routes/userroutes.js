const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
 
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:supplierHotelId', userController.getUserByID);

router.patch('/:supplierHotelId', userController.editUser);   
router.delete('/:supplierHotelId', userController.deleteUser);
 
module.exports = router;