/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const signUploadWidgetRouter = require("./routes/sign-upload-widget-route");
const deleteByTagRouter = require("./routes/delete-by-tag-route");
const app = express();
app.use(express.json());

app.use(cors()); 

app.use("/api/sign-upload-widget", signUploadWidgetRouter);
app.use("/api/delete-by-tag", deleteByTagRouter);
app.use(express.static(path.join(__dirname, "public")));
// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });



const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.info(`Server is up on http://localhost:${port}`)
);
