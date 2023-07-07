const mongoose = require('mongoose');
const BuyerSchema = new mongoose.Schema({
    BuyerID : String,
    BuyerName : String,
    BuyerEmail : String,
    BuyerProfilePicURL : String
});

const BuyerModel = new mongoose.model('buyers',BuyerSchema);
module.exports = BuyerModel;