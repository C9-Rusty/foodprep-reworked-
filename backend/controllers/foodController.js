const foodModel = require('../models/foodModel');
const { cloudinary } = require('../config/cloudinary');

const addfood = async (req, res) => {
  try {
    const food = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path, // ✅ Full Cloudinary URL
    });
    res.json({ success: true, message: 'food added' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding food' });
  }
};

const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching foods' });
  }
};

const removefood = async (req, res) => {
  try {
    const { id } = req.query;
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'food not found' });
    }

    // Optional: delete image from Cloudinary
    const publicId = food.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`foodprep_uploads/${publicId}`);

    await foodModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: 'food deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting food' });
  }
};

module.exports = { addfood, listfood, removefood };
