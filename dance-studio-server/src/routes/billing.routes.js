const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.post(
  "/invoice",
  authMiddleware,
  roleMiddleware("admin"),
  billingController.createInvoice
);

router.get(
  "/invoices",
  authMiddleware,
  billingController.getAllInvoices
);

router.post(
  "/payment",
  authMiddleware,
  roleMiddleware("admin"),
  billingController.recordPayment
);

router.get(
  "/payments",
  authMiddleware,
  billingController.getPayments
);

router.get(
  "/revenue-report",
  authMiddleware,
  roleMiddleware("admin"),
  billingController.getRevenueReport
);

module.exports = router;