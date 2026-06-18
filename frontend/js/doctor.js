async function loadDoctorDashboard() {

    const response =
    await fetch(
        "http://localhost:5000/api/patients"
    );

    const data =
    await response.json();

    const patients =
    data.patients;

    updateDoctorAnalytics(
        patients
    );

    const currentPatient =
    patients.find(
        p => p.status === "current"
    );

    const nextPatient =
    patients.find(
        p => p.status === "waiting"
    );

    document.getElementById(
        "waitingCount"
    ).innerText =
    patients.filter(
        p => p.status === "waiting"
    ).length;

    if(currentPatient){

        document.getElementById(
            "currentToken"
        ).innerText =
        currentPatient.tokenNumber;

        document.getElementById(
            "currentName"
        ).innerText =
        currentPatient.name;

    }

    if(nextPatient){

        document.getElementById(
            "nextToken"
        ).innerText =
        nextPatient.tokenNumber;

    }

    const table =
    document.getElementById(
        "doctorTable"
    );

    table.innerHTML = "";

    patients.forEach(patient => {

        table.innerHTML += `
        <tr>
            <td>${patient.tokenNumber}</td>
            <td>${patient.name}</td>
            <td>
            ${
                patient.status === "waiting"
                    ? "🟡 Waiting"
                    : patient.status === "current"
                    ? "🟢 Current"
                    : patient.status === "completed"
                    ? "⚪ Completed"
                    : "🔴 Skipped"
            }
            </td>
        </tr>
        `;

    });

}

loadDoctorDashboard();

if(typeof socket !== "undefined"){

    socket.on(
        "queueUpdated",
        () => {

            loadDoctorDashboard();

        }
    );

}

document
.getElementById("completeBtn")
.addEventListener(
    "click",
    async () => {

        await completeConsultation();

        loadDoctorDashboard();

    }
);

document
.getElementById("skipBtn")
.addEventListener(
    "click",
    async () => {

        await skipPatient();

        loadDoctorDashboard();

    }
);

function updateDoctorAnalytics(patients){

    const completed =
    patients.filter(
        p => p.status === "completed"
    ).length;

    const skipped =
    patients.filter(
        p => p.status === "skipped"
    ).length;

    const treated =
    completed + skipped;

    const performance =
    treated > 0
        ? Math.round(
            (completed / treated) * 100
        )
        : 0;

    document.getElementById(
        "treatedCount"
    ).innerText =
    treated;

    document.getElementById(
        "completedCount"
    ).innerText =
    completed;

    document.getElementById(
        "skippedCount"
    ).innerText =
    skipped;

    document.getElementById(
        "performanceScore"
    ).innerText =
    performance + "%";
}