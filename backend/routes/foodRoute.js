const express = require('express');
const foodRouter = express.Router();
const { addfood, listfood, removefood } = require('../controllers/foodController');
const multer = require('multer');
const { storage } = require('../config/cloudinary');  

const upload = multer({ storage }); 
foodRouter.post('/add', upload.single('image'), addfood);
foodRouter.get('/list', listfood);
foodRouter.delete('/remove', removefood);

module.exports = foodRouter;
