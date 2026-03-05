const Attendance = require("../models/Attendance");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Student = require("../models/Student");
const Session = require("../models/Session");

exports.getAttendanceReport = async (req, res) => {
  try {
    const { studentId, classId, month, year } = req.query;

    let filter = {};
    if (studentId) filter.studentId = studentId;

    const attendance = await Attendance.find(filter)
      .populate("studentId")
      .populate({
        path: "sessionId",
        populate: { path: "classId" },
      })
      .sort({ createdAt: -1 });

    // Filter by month and year if provided
    let filtered = attendance;
    if (month && year) {
      filtered = attendance.filter((a) => {
        const date = new Date(a.createdAt);
        return date.getMonth() === parseInt(month) - 1 && date.getFullYear() === parseInt(year);
      });
    }

    res.json({
      total: filtered.length,
      present: filtered.filter((a) => a.status === "present").length,
      absent: filtered.filter((a) => a.status === "absent").length,
      late: filtered.filter((a) => a.status === "late").length,
      attendance: filtered,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlyRevenueReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    let filter = { status: "completed" };
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      filter.paymentDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const payments = await Payment.find(filter);
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPayments = payments.length;

    res.json({
      month: month || new Date().getMonth() + 1,
      year: year || new Date().getFullYear(),
      totalRevenue,
      totalPayments,
      averagePayment: totalPayments > 0 ? totalRevenue / totalPayments : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentGrowthReport = async (req, res) => {
  try {
    const { year } = req.query;
    const currentYear = year || new Date().getFullYear();

    const monthlyGrowth = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 1, 0);

      const count = await Student.countDocuments({
        enrollmentDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      monthlyGrowth.push({
        month: month + 1,
        count,
      });
    }

    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: "active" });

    res.json({
      year: currentYear,
      totalStudents,
      activeStudents,
      inactiveStudents: totalStudents - activeStudents,
      monthlyGrowth,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};