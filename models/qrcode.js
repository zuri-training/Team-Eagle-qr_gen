const mongoose = require('mongoose');
  
const qrCodeSchema = new mongoose.Schema({
    user: String,
    img: String,
    password: String
});
  
module.exports = new mongoose.model('qrCode', qrCodeSchema);