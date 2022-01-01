const cloudinary = require("cloudinary").v2;
require("../cloudinary-config");
const apiSecret = cloudinary.config().api_secret;

const signUploadWidget = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      source: "uw",
      tags: ["cl-chen"],     
    },
    apiSecret
  );

  return { timestamp, signature };
};

module.exports = {
  signUploadWidget,
};
