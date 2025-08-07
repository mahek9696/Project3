const express = require("express");
const mongoose = require("mongoose");
const cokieParser = require("cookie-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const { registerUser } = require("./controllers/auth-controller");

//created database - this is the connection string to connect to the MongoDB database which will return a promise
mongoose
  .connect("mongodb+srv://mahek9696:mahek9696@cluster0.z2ofrzn.mongodb.net/")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
// then we create an app which - invoking the express(server) function
const app = express();
const PORT = process.env.PORT || 5000;
//this app will give so properties to the express app -  which are
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

// /api/auth/registerUser ->registerUser
// /api/auth/login -> loginUser

//ok after mentioning all the properties we can now use the app to listen to a port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
