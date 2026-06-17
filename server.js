const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🏨 Welcome to StayEase API",
    version: "1.0.0",
    endpoints: {
      hotels:   "/api/hotels",
      rooms:    "/api/rooms",
      guests:   "/api/guests",
      bookings: "/api/bookings",
    },
  });
});

// API Routes
app.use("/api/hotels",   require("./routes/hotelRoutes"));
app.use("/api/rooms",    require("./routes/roomRoutes"));
app.use("/api/guests",   require("./routes/guestRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 StayEase API running on http://localhost:${PORT}`);
});
