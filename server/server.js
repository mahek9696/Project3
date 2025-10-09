const express = require("express");
const mongoose = require("mongoose");
const cokieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const { registerUser, loginUser } = require("./controllers/auth-controller");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

//created database - this is the connection string to connect to the MongoDB database which will return a promise
mongoose
  .connect("mongodb+srv://mahek9696:mahek9696@cluster0.z2ofrzn.mongodb.net/")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
// then we create an app which - invoking the express(server) function
const app = express();
const PORT = process.env.PORT || 4000;
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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Multer configuration for handling multipart/form-data
const upload = multer();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload2 = multer({ storage });

app.post("/upload", upload2.single("photo"), (req, res) => {
  res.json({ path: `/uploads/${req.file.filename}` });
});

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Request Body:", req.body);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

// /api/auth/registerUser ->registerUser
// /api/auth/login -> loginUser

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

//ok after mentioning all the properties we can now use the app to listen to a port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
