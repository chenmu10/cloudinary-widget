const express = require("express");
const router = express.Router();
require("../cloudinary-config");

const cloudinary = require("cloudinary").v2;

router.get("/", function (req, res, next) {
  const tag = req.query.tag_name;
  cloudinary.config();
  cloudinary.api.delete_resources_by_tag(tag, (error, result) => {

    res.json({
      result,
      error,
    });
  });
});

module.exports = router;
