const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema({
    SellerID : String,
    SellerName : String,
    SellerEmail : String,
    SellerProfilePicURL : String,
    SellerDescription : String
})

const SellerModel = new mongoose.model('sellers', SellerSchema);
module.exports = SellerModel;