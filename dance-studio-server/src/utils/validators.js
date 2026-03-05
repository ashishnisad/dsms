const Joi = require("joi");

const studentValidation = {
  create: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    parentName: Joi.string(),
    parentPhone: Joi.string(),
  }),
  update: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    parentName: Joi.string(),
    parentPhone: Joi.string(),
    status: Joi.string().valid("active", "inactive"),
  }),
};

const invoiceValidation = {
  create: Joi.object({
    studentId: Joi.string().required(),
    description: Joi.string(),
    amount: Joi.number().required(),
    tax: Joi.number(),
    dueDate: Joi.date(),
  }),
};

const classValidation = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    danceStyle: Joi.string().required(),
    capacity: Joi.number(),
    schedule: Joi.object({
      day: Joi.string(),
      startTime: Joi.string(),
      endTime: Joi.string(),
    }),
  }),
};

module.exports = {
  studentValidation,
  invoiceValidation,
  classValidation,
};