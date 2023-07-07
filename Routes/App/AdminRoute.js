const express = require('express');
const AdminModel = require('../../DataBase/Models/AdminModel')
const upload = require('../../Utils/FileUploader')
const AdminRoute = express();
const BuyerModel = require('../../DataBase/Models/BuyerModel')
const SellerModel = require("../../DataBase/Models/SellerModel")
const OrderModel = require("../../DataBase/Models/OrderModel");
const ProductModel = require("../../DataBase/Models/ProductModel")

//api to create admin data

AdminRoute.post(
  "/create-admin",
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        res.json({
          message: "File not founf",
        });
      }

      const AdminProfilePicURL = `http://localhost:5500/uploads/${file.filename}`;
      const CurrentAdminData = new AdminModel({
        AdminName: req.body.AdminName,
        AdminEmail: req.body.AdminEmail,
        AdminProfilePicURL: AdminProfilePicURL
      });
      //saving Admin Data
      await CurrentAdminData.save();
      console.log("Admin Data Uploaded Successfully");
      res.status(200).json({
        message: "Admin Data Uploaded Successfully",
      });
    } catch (error) {
      console.error(error);
      res.json({
        error: error,
      });
    }
  }
);

//api route to update admin data
AdminRoute.post('/update-admin', upload.single('file'), async(req,res)=>{
  const file = req.file;
  if (!file) {
    res.json({
      message: "File not founf",
    });
  }

  const AdminProfilePicURL = `http://localhost:5500/uploads/${file.filename}`;

  //replace old image with new image
  
  const AdminID = req.body.AdminID;
  try{
    const UpdatedAdmin = await AdminModel.findByIdAndUpdate(
      AdminID,
      {
        AdminName : req.body.AdminName,
        AdminEmail : req.body.AdminEmail,
        AdminProfilePicURL : AdminProfilePicURL
      }
    )

    if(!UpdatedAdmin)
    {
      res.json({
        message : "An error occured"
      })
    }

    else
    res.json({
      message : "OK"
    })
  }

  catch(error)
  {
    console.log(error);
    res.json({
      message : "error",
      error : error
    })
  }

})

AdminRoute.get('/fetch-admin/:id', async(req,res)=>{
  const AdminData = await AdminModel.findOne({
    _id : req.params.id
  })
  res.json({
    message : "OK",
    AdminData : AdminData
  })
})

AdminRoute.get('/fetch-customers', async(req,res)=>{
  try{
    console.log("test")
    //fetch data
    const Buyers = await BuyerModel.find();
    const Sellers = await SellerModel.find();
  
    //prepare output data
    const outputData = {
      BuyersData : Buyers,
      SellerData : Sellers
    }
  
    //check condition
    if(outputData)
    {
      res.json({
        message : "OK",
        customers : outputData
      })
    }
  
    else{
      res.json({
        message : "No customers found"
      })
    }
  }
  catch(err)
  {
    console.error(err);
    res.json({
      message : "error",
      error : err
    })
  }

})

AdminRoute.get('/fetch-products', async(req,res)=>{
 try{
  const Products = await ProductModel.find().populate('Owner');
  if(Products)
  {
    res.json({
      message : "OK",
      products : Products
    })
  }
  else{
    res.json({
      message : "No products found"
    })
  }
 }
 catch(err)
 {
  console.log(err);
  res.json({
    message : "error",
    error : err
  })
 }
})

AdminRoute.get('/fetch-orders', async(req,res)=>{
  try{
   const Orders = await OrderModel.find().populate('Product Source Destination');
   if(Orders)
   {
     res.json({
       message : "OK",
       orders : Orders
     })
   }
   else{
     res.json({
       message : "No Orders found"
     })
   }
  }
  catch(err)
  {
   console.log(err);
   res.json({
     message : "error",
     error : err
   })
  }
 })

module.exports = AdminRoute;