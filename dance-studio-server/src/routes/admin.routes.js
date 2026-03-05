const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const settingsController = require("../controllers/settingsController");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Teacher routes
router.post(
  "/teacher",
  authMiddleware,
  roleMiddleware("admin"),
  teacherController.createTeacher
);

router.get("/teachers", authMiddleware, teacherController.getAllTeachers);

router.get("/teacher/:id", authMiddleware, teacherController.getTeacherById);

router.put(
  "/teacher/:id",
  authMiddleware,
  roleMiddleware("admin"),
  teacherController.updateTeacher
);

router.delete(
  "/teacher/:id",
  authMiddleware,
  roleMiddleware("admin"),
  teacherController.deleteTeacher
);

router.post(
  "/assign-class",
  authMiddleware,
  roleMiddleware("admin"),
  teacherController.assignClassToTeacher
);

// Settings routes
router.get("/settings", authMiddleware, settingsController.getSettings);

router.put(
  "/settings",
  authMiddleware,
  roleMiddleware("admin"),
  settingsController.updateSettings
);

module.exports = router;