module.exports = {
  // Invoice statuses
  INVOICE: {
    PENDING: 'pending',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    PARTIAL: 'partial'
  },

  // Attendance statuses
  ATTENDANCE: {
    PRESENT: 'present',
    ABSENT: 'absent',
    LATE: 'late',
    EXCUSED: 'excused'
  },

  // Payment statuses
  PAYMENT: {
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PENDING: 'pending'
  },

  // Class statuses
  CLASS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed'
  },

  // User statuses
  USER: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended'
  }
