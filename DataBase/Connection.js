//this file provide connection with database

const mongoose = require("mongoose");
const DataBaseURL = "mongodb+srv://Samiul:HoTDfkSqkINbHzpp@saasify-data-cluster.h4t97uw.mongodb.net/SaasifyData?retryWrites=true&w=majority";
const ConnectToDataBase = async () => {
  console.log("Establishing Connection with DataBase...");
  try {
    await mongoose.connect(DataBaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Established Successfully");
  } catch (error) {
    console.error(error);
    return error;
  }
};
module.exports = ConnectToDataBase;
