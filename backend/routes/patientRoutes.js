const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");


// ==========================================
// ADD PATIENT
// POST /api/patients/add
// ==========================================
router.post("/add", async (req, res) => {

  try {

    const {
      patientId,
      name,
      mobile,
      tokenNumber,
      doctor,
      queueType
    } = req.body;

    // Validation

    if (!name || name.trim().length < 3) {

      return res.status(400).json({
        success: false,
        message: "Patient name must contain at least 3 letters"
      });

    }

    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {

      return res.status(400).json({
        success: false,
        message: "Enter valid 10 digit mobile number"
      });

    }

    // Duplicate Mobile Check

    const existingPatient =
    await Patient.findOne({ mobile });

    if (existingPatient) {

      return res.status(400).json({
        success: false,
        message: "Patient already registered"
      });

    }

    const patient = new Patient({

      patientId,

      name,

      mobile,

      tokenNumber,

      doctor:
      doctor || "General",

      queueType:
      queueType || "normal"

    });

    await patient.save();

    res.status(201).json({

      success: true,

      message:
      "Patient Added Successfully",

      patient

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
      error.message

    });

  }

});


// ==========================================
// GET ALL PATIENTS (FULL QUEUE)
// GET /api/patients
// ==========================================
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find()
      .sort({ tokenNumber: 1 });

    res.status(200).json({
      success: true,
      count: patients.length,
      patients,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// GET CURRENT PATIENT (FOR DISPLAY SCREEN)
// GET /api/patients/current
// ==========================================
router.get("/current", async (req, res) => {
  try {
    const currentPatient = await Patient.findOne({
      status: "current",
    });

    if (!currentPatient) {
      return res.status(404).json({
        success: false,
        message: "No patient currently being served",
      });
    }

    res.status(200).json({
      success: true,
      patient: currentPatient,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// GET WAITING PATIENTS (QUEUE VIEW)
// GET /api/patients/waiting
// ==========================================
router.get("/waiting", async (req, res) => {
  try {
    const waitingPatients = await Patient.find({
      status: "waiting",
    }).sort({ tokenNumber: 1 });

    res.status(200).json({
      success: true,
      count: waitingPatients.length,
      patients: waitingPatients,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// CALL NEXT PATIENT (MAIN LOGIC)
// PUT /api/patients/call-next
// ==========================================
router.put("/call-next", async (req, res) => {
  const currentPatient =
    await Patient.findOne({

        status:"current"

    });

    if(currentPatient){

        return res.json({

            success:false,

            message:
            "Patient already in consultation"

        });

    }

  const waitingPatients =
    await Patient.find({
        status:"waiting"
    });

    if(waitingPatients.length === 0){

        return res.json({

            success:false,

            message:
            "No Patients Waiting"

        });
    }

  try {

    // Mark current patient as completed
    await Patient.updateMany(
      { status: "current" },
      { status: "completed" }
    );

    // Find next waiting patient
    const emergencyPatient =
    await Patient.findOne({
      status: "waiting",
      queueType: "emergency"
    }).sort({
      tokenNumber: 1
    });

    const priorityPatient =
    await Patient.findOne({
        status: "waiting",
        queueType: "priority"
    }).sort({
        tokenNumber: 1
    });

    const normalPatient =
    await Patient.findOne({
        status: "waiting",
        queueType: "normal"
    }).sort({
        tokenNumber: 1
    });

    const nextPatient =
        emergencyPatient ||
        priorityPatient ||
        normalPatient;
        

    if (!nextPatient) {
      return res.status(404).json({
        success: false,
        message: "No patients waiting",
      });
    }

    // Update to current
    nextPatient.status = "current";
    nextPatient.calledAt = new Date();

    await nextPatient.save();
    const io = req.app.get("io");

    io.emit("queueUpdated", {
      tokenNumber: nextPatient.tokenNumber,
      patientName: nextPatient.name,
      status: nextPatient.status,
    });
    


    res.status(200).json({
      success: true,
      message: "Next Patient Called",
      patient: nextPatient,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// GET SINGLE CURRENT PATIENT (SAFE UI CALL)
// ==========================================
router.get("/active", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      status: "current",
    });

    res.status(200).json({
      success: true,
      patient: patient || null,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/complete-current", async (req, res) => {

    try {

        const currentPatient =
        await Patient.findOne({
            status: "current"
        });

        if (!currentPatient) {

            return res.status(404).json({
                success: false,
                message: "No Current Patient"
            });

        }

        currentPatient.status = "completed";

        currentPatient.completedAt =
        new Date();

        await currentPatient.save();

        const io = req.app.get("io");

        io.emit("queueUpdated", {
          patientName: currentPatient.name,
          tokenNumber: currentPatient.tokenNumber,
          status: "completed"
        });

        res.status(200).json({
            success: true,
            message: "Consultation Completed"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

router.put("/skip-current", async (req, res) => {
  

    try {

        const currentPatient =
        await Patient.findOne({
            status: "current"
        });

        if (!currentPatient) {

            return res.status(404).json({
                success: false,
                message: "No Current Patient"
            });

        }

        currentPatient.status = "skipped";

        await currentPatient.save();

        const io = req.app.get("io");

        io.emit("queueUpdated", {
            patientName: currentPatient.name,
            tokenNumber: currentPatient.tokenNumber,
            status: "skipped"
        });

        res.status(200).json({
            success: true,
            message: "Patient Skipped"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

router.get(
"/average-time",
async (req,res)=>{

try{

    const completedPatients =
    await Patient.find({

        status:"completed",

        calledAt:{
            $ne:null
        },

        completedAt:{
            $ne:null
        }

    });

    if(
        completedPatients.length===0
    ){

        return res.json({
            averageTime:5
        });

    }

    let totalMinutes = 0;

    completedPatients.forEach(
        patient=>{

            const duration =

            (
                new Date(
                    patient.completedAt
                )

                -

                new Date(
                    patient.calledAt
                )

            ) / 60000;

            totalMinutes += duration;

        }
    );

    const averageTime =
    Math.round(

        totalMinutes
        /

        completedPatients.length

    );

    res.json({
        averageTime
    });

}
catch(error){

    res.status(500).json({
        message:error.message
    });

}

});

module.exports = router;