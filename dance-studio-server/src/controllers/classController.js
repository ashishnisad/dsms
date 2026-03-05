const Class = require("../models/Class");
const Session = require("../models/Session");
const Attendance = require("../models/Attendance");

exports.createClass = async (req, res) => {
  try {
    const classData = await Class.create(req.body);
    res.status(201).json({
      message: "Class created successfully",
      class: classData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("teacher").sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate("teacher");
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({
      message: "Class updated successfully",
      class: classData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json({
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { sessionId, students } = req.body;

    const attendance = await Attendance.insertMany(
      students.map((student) => ({
        sessionId,
        studentId: student.studentId,
        status: student.status,
        remarks: student.remarks,
      }))
    );

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendanceReport = async (req, res) => {
  try {
    const { studentId, classId, month } = req.query;

    let filter = {};
    if (studentId) filter.studentId = studentId;
    if (classId) {
      const sessions = await Session.find({ classId });
      filter.sessionId = { $in: sessions.map((s) => s._id) };
    }

    const attendance = await Attendance.find(filter)
      .populate("studentId")
      .populate("sessionId")
      .sort({ createdAt: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};