const express = require("express");
const router = express.Router();
const UserModel = require("../../DataBase/Models/UserModel");
router.post("/verify", async (req, res) => {
  if (req.body.otp == null) {
    res.json({
      message: "OTP should be provided",
    });
  } else {
    const Data = await UserModel.findOne({
      otp: req.body.otp,
    });
    if (!Data) {
      res.json({
        message: "OTP not verified",
      });
    } else {
      //console.log("OTP verified");
      await UserModel.findOneAndUpdate(
        { otp: req.body.otp },
        {
          verified: true,
          otp: "",
        }
      );

      res.json({
        message: "OTP verified",
      });
    }
  }
});

module.exports = router;