const mongoose = require('mongoose');
  
const qrCodeSchema = new mongoose.Schema({
    user: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    password: String
});
  
module.exports = new mongoose.model('qrCode', qrCodeSchema);