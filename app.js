const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const paymentRoutes = require("./paymentRoutes");
// const searchRoutes = require("./routes/searchRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

const port = process.env.PORT;
app.use(bodyParser.json());
dotenv.config({ path: "./config.env" });
let hostName = process.env.HOSTNAME_LOCAL;

//connect to MongoDB

let DBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(async () => {
  try {
    await mongoose.connect(
      "mongodb://webmobril:wemobril1234@52.205.200.232:27017/home-for-sale-demo?authSource=admin",
      DBOptions
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB error" + err);
  }
})();

// mongoose.connect(

//   "mongodb+srv://manjotsinghanandcse23:dOsO2lApY2wU1Js3@cluster1.ylu6yab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

//Use authentication routes
app.use("/auth", authRoutes);

//use profile routes
app.use("/profile", profileRoutes);

//use search routes


//use payment routes
app.use("/payment", paymentRoutes);


// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

const server = app.listen(port, (req, res) => {
  console.log(`Server runing on ${hostName}:${port}`);
});





// \\Desktop\\Api latest\\API's on project\\