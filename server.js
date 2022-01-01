const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const signUploadWidgetRouter = require("./routes/sign-upload-widget-route");
const deleteByTagRouter = require("./routes/delete-by-tag-route");
const app = express();
app.use(express.json());
app.use(cors()); 
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/sign-upload-widget", signUploadWidgetRouter);
app.use("/api/delete-by-tag", deleteByTagRouter);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.info(`Server is up on http://localhost:${port}`)
);
