const express = require("express");
const mongoose = require("mongoose");
const enableCors = require("./middlewares/cors");
const HttpError = require("./models/http-error");
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const port = process.env.PORT || 3000;
const app = express();
app.use(enableCors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use((req, res, next) => {
  const error = new HttpError("Could not found this route.", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ocpjbmx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, (e) => {
      if (e) {
        return console.log("cant run app message error :" + e);
      }
      console.log("server runing on port: " + port);
    });
  })
  .catch((e) => console.log("can not connect to db : " + e));
