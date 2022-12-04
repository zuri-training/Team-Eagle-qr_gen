const mongoose = require('mongoose');
  
const collectionSchema = new mongoose.Schema({
    userID: String,
    qrcodeID: String,

});
  
module.exports = new mongoose.model('collection', collectionSchema);