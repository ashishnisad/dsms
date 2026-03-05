const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Class routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  classController.createClass
);

router.get("/", authMiddleware, classController.getAllClasses);

router.get("/:id", authMiddleware, classController.getClassById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  classController.updateClass
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  classController.deleteClass
);

// Session routes
router.post(
  "/session/create",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  classController.createSession
);

// Attendance routes
router.post(
  "/attendance/mark",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  classController.markAttendance
);

router.get(
  "/attendance/report",
  authMiddleware,
  classController.getAttendanceReport
);

module.exports = router;