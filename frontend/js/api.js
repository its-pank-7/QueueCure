const API_URL = "http://localhost:5000/api/patients";

// GET ALL PATIENTS
async function getPatients() {
  const response = await fetch(API_URL);
  return await response.json();
}

// ADD PATIENT
async function addPatient(patientData) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  return await response.json();
}

// CALL NEXT PATIENT
async function callNextPatient() {
  const response = await fetch(`${API_URL}/call-next`, {
    method: "PUT",
  });

  return await response.json();
}

// GET CURRENT PATIENT
async function getCurrentPatient() {
  const response = await fetch(`${API_URL}/current`);
  return await response.json();
}
async function getSettings() {

    const response = await fetch(
        "http://localhost:5000/api/settings"
    );

    return await response.json();
}

async function updateSettings(time) {

    const response = await fetch(
        "http://localhost:5000/api/settings",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avgConsultationTime: time,
            }),
        }
    );

    return await response.json();
}

async function completeConsultation() {

    const response =
    await fetch(
        "http://localhost:5000/api/patients/complete-current",
        {
            method: "PUT"
        }
    );

    return await response.json();

}

async function skipPatient() {

    const response =
    await fetch(
        "http://localhost:5000/api/patients/skip-current",
        {
            method: "PUT"
        }
    );

    return await response.json();

}