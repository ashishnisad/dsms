const mongoose = require("mongoose");

const studioSettingsSchema = new mongoose.Schema(
  {
    studioName: {
      type: String,
      default: "Dance Studio",
    },
    address: String,
    city: String,
    state: String,
    zipCode: String,
    email: String,
    phone: String,
    website: String,
    logo: String,
    taxId: String,
    currency: {
      type: String,
      default: "INR",
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    operatingHours: {
      weekday: {
        opening: String,
        closing: String,
      },
      weekend: {
        opening: String,
        closing: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudioSettings", studioSettingsSchema);