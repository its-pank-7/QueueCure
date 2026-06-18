const express = require("express");
const router = express.Router();

const QueueSettings = require("../models/QueueSettings");

// GET SETTINGS

router.get("/", async (req, res) => {
  try {

    let settings = await QueueSettings.findOne();

    if (!settings) {
      settings = await QueueSettings.create({
        avgConsultationTime: 5,
      });
    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// UPDATE SETTINGS

router.put("/", async (req, res) => {
  try {

    const { avgConsultationTime } = req.body;

    let settings = await QueueSettings.findOne();

    if (!settings) {

      settings = await QueueSettings.create({
        avgConsultationTime,
      });

    } else {

      settings.avgConsultationTime =
        avgConsultationTime;

      await settings.save();
    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;