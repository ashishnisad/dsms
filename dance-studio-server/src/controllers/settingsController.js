const StudioSettings = require("../models/StudioSettings");

exports.getSettings = async (req, res) => {
  try {
    let settings = await StudioSettings.findOne();
    if (!settings) {
      settings = await StudioSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await StudioSettings.findOne();
    if (!settings) {
      settings = await StudioSettings.create(req.body);
    } else {
      settings = await StudioSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};