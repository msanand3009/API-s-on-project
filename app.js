const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const paymentRoutes = require("./paymentRoutes");
// const searchRoutes = require("./routes/searchRoutes");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
dotenv.config({ path: "./config.env" });

//connect to MongoDB

let DBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://manjotsinghanandcse23:dOsO2lApY2wU1Js3@cluster1.ylu6yab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
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


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
// \\Desktop\\Api latest\\API's on project\\