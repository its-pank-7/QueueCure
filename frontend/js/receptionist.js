let analyticsChart = null;
const table = document.getElementById("patientTable");
const addBtn = document.getElementById("addBtn");
const patientNameInput = document.getElementById("patientName");

// Load Patients
async function loadPatients() {

    console.log("Loading Patients...");

    const data = await getPatients();

    console.log(data);

    const patients = data.patients || [];

    document.getElementById("totalPatients").innerText =
        patients.length;

    document.getElementById("waitingPatients").innerText =
        patients.filter(p => p.status === "waiting").length;

    document.getElementById("currentPatient").innerText =
        patients.filter(p => p.status === "current").length;

    document.getElementById("completedPatients").innerText =
        patients.filter(p => p.status === "completed").length;

    document.getElementById("skippedPatients").innerText =
        patients.filter(p => p.status === "skipped").length;

    updateAnalytics(patients);

    updatePerformanceAnalytics(patients);

    await loadRealAverageTime();

    table.innerHTML = "";

    patients.forEach((patient) => {

        table.innerHTML += `
        <tr>
            <td>${patient.tokenNumber}</td>

            <td>
                ${patient.name}
                <br>
                <small>📞 ${patient.mobile || "-"}</small>
            </td>

            <td class="${patient.queueType}">
                ${patient.queueType}
            </td>

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

// Add Patient
addBtn.addEventListener("click", async () => {

    const patientName =
    patientNameInput.value.trim();

    const mobile =
    document
    .getElementById(
        "patientMobile"
    )
    .value
    .trim();

    if(patientName.length < 3){

        alert(
            "Patient name must contain at least 3 letters"
        );

        return;
    }

    if(!/^[0-9]{10}$/.test(mobile)){

        alert(
            "Enter valid 10 digit mobile number"
        );

        return;
    }

    const data =
    await getPatients();

    const duplicate =
    data.patients.find(
        p => p.mobile === mobile
    );

    if(duplicate){

        alert(
            "Patient already registered"
        );

        return;
    }

    const nextToken =
    data.patients.length > 0
    ?
    data.patients[
        data.patients.length - 1
    ].tokenNumber + 1
    :
    101;

    const queueType =
    document.getElementById(
        "queueType"
    ).value;

    const patientData = {

        patientId:
        "P" + Date.now(),

        name:
        patientName,

        mobile:
        mobile,

        tokenNumber:
        nextToken,

        queueType:
        queueType

    };

    await addPatient(
        patientData
    );

    patientNameInput.value = "";

    document.getElementById(
        "patientMobile"
    ).value = "";

    loadPatients();
});


function updateClock() {
    const now = new Date();

    document.getElementById("liveClock").innerText =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

updateClock();

function updateAnalytics(patients){

    const completed =
    patients.filter(
        p => p.status === "completed"
    ).length;

    const waiting =
    patients.filter(
        p => p.status === "waiting"
    ).length;

    const skipped =
    patients.filter(
        p => p.status === "skipped"
    ).length;

    const current =
    patients.filter(
        p => p.status === "current"
    ).length;

    const ctx =
    document.getElementById(
        "analyticsChart"
    );

    if(analyticsChart){
        analyticsChart.destroy();
    }

    analyticsChart =
    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Completed",
                "Waiting",
                "Skipped",
                "Current"
            ],

            datasets: [{

                data: [
                    completed,
                    waiting,
                    skipped,
                    current
                ],

                backgroundColor: [
                    "#00B894", // Completed
                    "#74B9FF", // Waiting
                    "#6C5CE7", // Current
                    "#FF7675"  // Skipped
                ]
            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#acdf6f",

                        padding: 20,

                        boxWidth: 18,

                        font: {
                            size: 14,
                            weight: "bold"
                        }

                    }

                }

            }

        }

    });

    document.getElementById(
        "chartCompleted"
    ).innerText = completed;

    document.getElementById(
        "chartWaiting"
    ).innerText = waiting;

    document.getElementById(
        "chartCurrent"
    ).innerText = current;

    document.getElementById(
        "chartSkipped"
    ).innerText = skipped;

}

function updatePerformanceAnalytics(patients){

    const totalPatients =
    patients.length;

    const completed =
    patients.filter(
        p => p.status === "completed"
    ).length;

    const skipped =
    patients.filter(
        p => p.status === "skipped"
    ).length;

    const completionRate =
    totalPatients > 0
        ? Math.round(
            (completed / totalPatients) * 100
        )
        : 0;

    const avgConsultationTime =
    Number(
        document.getElementById(
            "avgTimeDisplay"
        ).innerText.replace(" Min","")
    ) || 5;

    const avgWaitTime =
    Math.round(
        avgConsultationTime *
        (
            patients.filter(
                p => p.status === "waiting"
            ).length
        )
    );

    const efficiencyScore =
    totalPatients > 0
        ? Math.round(
            (
                (
                    completed -
                    skipped
                ) / totalPatients
            ) * 100
        )
        : 0;

    document.getElementById(
        "patientsToday"
    ).innerText =
    totalPatients;

    document.getElementById(
        "completionRate"
    ).innerText =
    completionRate + "%";

    document.getElementById(
        "avgWaitTime"
    ).innerText =
    avgWaitTime + " Min";

    document.getElementById(
        "efficiencyScore"
    ).innerText =
    efficiencyScore + "%";
}

socket.on("queueUpdated", () => {
    loadPatients();
});

function downloadReport(){

    window.open(
        "http://localhost:5000/api/reports/daily-report",
        "_blank"
    );

}

document
.getElementById("archiveDayBtn")
.addEventListener(
    "click",
    async () => {

        const confirmReset = confirm(
            "Archive today's records and start a new day?"
        );

        if (!confirmReset) return;

        const response = await fetch(
            "http://localhost:5000/api/admin/archive-day",
            {
                method: "POST"
            }
        );

        const data = await response.json();

        alert(data.message);

        loadPatients();
    }
);

async function loadRealAverageTime() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/patients/average-time"
        );

        const data =
        await response.json();

        document.getElementById(
            "avgTimeDisplay"
        ).innerText =
        data.averageTime + " Min";

        const analyticsCard =
        document.getElementById(
            "realAvgTime"
        );

        if(analyticsCard){

            analyticsCard.innerText =
            data.averageTime + " Min";

        }

    }
    catch(error){

        console.error(error);

    }

}

const callNextBtn =
document.getElementById("callNextBtn");

callNextBtn.addEventListener("click", async () => {

    console.log("Call Next Clicked");

    const result =
    await callNextPatient();

    console.log(result);

    loadPatients();

});

window.onload = async () => {

    await loadPatients();

    await loadRealAverageTime();

};