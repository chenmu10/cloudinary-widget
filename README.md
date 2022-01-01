
# Cloudinary Upload Tool
This web app is using [Cloudinary upload widget](https://cloudinary.com/documentation/upload_widget) to perform signed uploads of images to Cloudinary's servers.

Image manipulation & optimization is done with [cloudinary-core](https://www.npmjs.com/package/cloudinary-core).

node.js server is used for: 
- serving static files (html,js,css)
- generating signatures for signed image upload.
- deleting images by tag name.


# How to Run
## Add Authentication Parameters
- create `.env` file and insert your parameters (used in `cloudinary-config.json`):

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- in `public/script.js`: update CLOUD_NAME (line 5) to your Cloudinary cloud name value.

## Run the server
```
npm install
node server.js
```


 
