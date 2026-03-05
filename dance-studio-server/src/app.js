const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");
const billingRoutes = require("./routes/billing.routes");
const adminRoutes = require("./routes/admin.routes");
const reportRoutes = require("./routes/report.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Dance Studio API Running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;