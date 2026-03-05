const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");

exports.createInvoice = async (req, res) => {
  try {
    const { studentId, description, amount, tax, dueDate } = req.body;
    
    const invoiceNumber = `INV-${Date.now()}`;
    const totalAmount = amount + (tax || 0);

    const invoice = await Invoice.create({
      invoiceNumber,
      studentId,
      description,
      amount,
      tax: tax || 0,
      totalAmount,
      dueDate,
    });

    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status) filter.status = status;

    const invoices = await Invoice.find(filter)
      .populate("studentId")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Invoice.countDocuments(filter);

    res.json({
      invoices,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const { invoiceId, studentId, amount, paymentMethod, transactionId, notes } = req.body;

    const payment = await Payment.create({
      invoiceId,
      studentId,
      amount,
      paymentMethod,
      transactionId,
      notes,
      status: "completed",
    });

    // Update invoice
    const invoice = await Invoice.findById(invoiceId);
    const paidAmount = invoice.paidAmount + amount;
    const newStatus = paidAmount >= invoice.totalAmount ? "paid" : "partial";

    await Invoice.findByIdAndUpdate(invoiceId, {
      paidAmount,
      status: newStatus,
    });

    res.status(201).json({
      message: "Payment recorded successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { invoiceId, studentId } = req.query;

    let filter = {};
    if (invoiceId) filter.invoiceId = invoiceId;
    if (studentId) filter.studentId = studentId;

    const payments = await Payment.find(filter)
      .populate("invoiceId")
      .populate("studentId")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = { status: "completed" };
    if (startDate && endDate) {
      filter.paymentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const payments = await Payment.find(filter);
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPayments = payments.length;

    res.json({
      totalRevenue,
      totalPayments,
      payments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};