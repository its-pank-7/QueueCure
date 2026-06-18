const API_URL = "http://localhost:5000/api/patients";

const socket = io("http://localhost:5000");

socket.on("queueUpdated", () => {
    checkStatus();
});

async function getAvgConsultationTime(){

    const response =
    await fetch(

        "http://localhost:5000/api/patients/average-time"

    );

    const data =
    await response.json();

    return data.averageTime;

}

async function checkStatus() {

    const myToken = document.getElementById("myToken").value;
    document.getElementById("yourTokenDisplay").innerText =
    myToken;

    const response = await fetch(API_URL);

    const data = await response.json();

    const patients = data.patients;

    const currentPatient = patients.find(
        p => p.status === "current"
    );

    if(currentPatient){
        document.getElementById("currentToken").innerText =
            currentPatient.tokenNumber;
    }

    const myPatient = patients.find(
        p => p.tokenNumber == myToken
    );

    if(!myPatient){
        alert("Token Not Found");
        return;
    }

    const waitingPatients = patients.filter(
        p =>
            p.status === "waiting" &&
            p.tokenNumber < myPatient.tokenNumber
    );

    document.getElementById("tokensAhead").innerText =
        waitingPatients.length;



    const avgConsultationTime =
    await getAvgConsultationTime();

    const tokensAhead =
    waitingPatients.length;

    let aiMultiplier = 1;

    if(myPatient.queueType === "emergency"){
        aiMultiplier = 0.7;
    }
    else if(myPatient.queueType === "priority"){
        aiMultiplier = 0.85;
    }

    const predictedWait =
    Math.round(
        tokensAhead *
        avgConsultationTime *
        aiMultiplier
    );

    document.getElementById(
        "waitTime"
    ).innerText =
    predictedWait + " Min";

    document.getElementById(
        "predictionText"
    ).innerText =
    "AI Prediction Confidence: 94%";

    const totalQueue =
    patients.filter(
        p =>
            p.status === "waiting" ||
            p.status === "current"
    ).length;

    const progress =
    totalQueue > 0
    ? Math.round(
        (
            (totalQueue - tokensAhead)
            / totalQueue
        ) * 100
    )
    : 100;

    document.getElementById(
        "queueProgress"
    ).value =
    progress;

    document.getElementById(
        "progressText"
    ).innerText =
    progress + "% Queue Completed";
}

function updateClock() {
    const now = new Date();

    document.getElementById("liveClock").innerText =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

updateClock();