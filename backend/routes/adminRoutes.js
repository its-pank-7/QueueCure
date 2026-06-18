const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const QueueHistory = require("../models/QueueHistory");

// ==========================================
// ARCHIVE CURRENT DAY
// POST /api/admin/archive-day
// ==========================================

router.post("/archive-day", async (req, res) => {

    try {

        const patients = await Patient.find();

        const history = new QueueHistory({

            date:
                new Date()
                    .toISOString()
                    .split("T")[0],

            patients,

            totalPatients:
                patients.length,

            completed:
                patients.filter(
                    p => p.status === "completed"
                ).length,

            skipped:
                patients.filter(
                    p => p.status === "skipped"
                ).length

        });

        await history.save();

        // Clear today's queue
        await Patient.deleteMany({});

        res.json({
            success: true,
            message: "Day Archived Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// ==========================================
// GET ALL ARCHIVED DAYS
// GET /api/admin/history
// ==========================================

router.get("/history", async (req, res) => {

    try {

        const history =
            await QueueHistory.find()
                .sort({ date: -1 });

        res.json({
            success: true,
            count: history.length,
            history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// ==========================================
// GET ARCHIVE BY DATE
// GET /api/admin/history/:date
// ==========================================

router.get("/history/:date", async (req, res) => {

    try {

        const selectedDate =
            req.params.date;

        const parts =
            selectedDate.split("-");

        const oldFormat =
            `${Number(parts[2])}/${Number(parts[1])}/${parts[0]}`;

        const history =
            await QueueHistory.findOne({

                $or: [
                    { date: selectedDate },
                    { date: oldFormat }
                ]

            });

        if (!history) {

            return res.status(404).json({
                success: false,
                message: "No Record Found"
            });

        }

        res.json({
            success: true,
            history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// ==========================================
// DELETE HISTORY RECORD
// DELETE /api/admin/history/:id
// ==========================================

router.delete("/history/:id", async (req, res) => {

    try {

        await QueueHistory.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "History Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;