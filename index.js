const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", authRoutes);
app.use("/", productRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://Yramm:Fafajay11@hughesapi.hnrn2xr.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Node API app is  running on port 3000");
    });
  })
  .catch(error => {
    console.log(error);
  });
