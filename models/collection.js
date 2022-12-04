const mongoose = require('mongoose');
  
const collectionSchema = new mongoose.Schema({
    userID: String,
    qrcodeID: String,
    qrCodeType: String,
    firstname: String,
    lastname: String,
    imageurl: String,
    jobTitle: String,
    businessName: String,
    description: String,
    productTitle: String,
    CatalogTitle: String,
    phonenumber: String,
    websiteUrl: String,
    openingDay: String,
    OpenAndCloseTime: TimeRanges,
    socialMedia: String
});
  
module.exports = new mongoose.model('collection', collectionSchema);