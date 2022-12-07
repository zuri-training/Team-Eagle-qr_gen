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
    address: String,
    productTitle: String,
    CatalogTitle: String,
    phonenumber: String,
    websiteUrl: String,
    openingDay: Array,
    OpenAndCloseTime: TimeRanges,
    socialMedia: Array
});
  
module.exports = new mongoose.model('collection', collectionSchema);