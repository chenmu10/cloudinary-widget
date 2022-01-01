const express = require("express");
const router = express.Router();
const signature = require("../modules/sign-upload-widget-module");
require("../cloudinary-config");

const cloudinary = require("cloudinary").v2;
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;


router.get("/", function (req, res) {
  const sig = signature.signUploadWidget();
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey,
    
  });
});




module.exports = router;
