const mongoose = require('mongoose');
  
const qrCodeSchema = new mongoose.Schema({
    userID: String,
    imgUrl: String
});
  
module.exports = new mongoose.model('qrCode', qrCodeSchema);