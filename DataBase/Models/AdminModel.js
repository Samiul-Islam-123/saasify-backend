const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    AdminName : String,
    AdminEmail : String,
    AdminProfilePicURL : String,
    Customers:[
        {
            CustomerName : String,
            CustomerEmail : String,
            CustomerRole : String
        }
    ]

})

const AdminModel = new mongoose.model('admin',AdminSchema);
module.exports = AdminModel