const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  studentController.createStudent
);

router.get("/", authMiddleware, studentController.getAllStudents);

router.get("/:id", authMiddleware, studentController.getStudentById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  studentController.updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  studentController.deleteStudent
);

module.exports = router;