const express = require("express");
const fishRoutes = require("./routes/fishRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fish Wholesale API is running",
  });

});
app.use("/api/fish", fishRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/orders", orderRoutes)
module.exports = app;
