const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.get(
  "/attendance",
  authMiddleware,
  reportController.getAttendanceReport
);

router.get(
  "/revenue",
  authMiddleware,
  roleMiddleware("admin"),
  reportController.getMonthlyRevenueReport
);

router.get(
  "/student-growth",
  authMiddleware,
  roleMiddleware("admin"),
  reportController.getStudentGrowthReport
);

module.exports = router;