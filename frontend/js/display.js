const API_URL = "http://localhost:5000/api/patients";

const socket = io("http://localhost:5000");

// Initial Load
loadDisplay();

// ===============================
// Voice Function
// ===============================

function speakAnnouncement(text){

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

}

// ===============================
// Socket Real-Time Update
// ===============================

socket.on(
    "queueUpdated",
    async (data) => {

        console.log("EVENT RECEIVED");

        console.log(data);

        alert("Queue Updated Event Triggered");

        await loadDisplay();

        if(data){

            speakAnnouncement(
                `Token ${data.tokenNumber}
                ${data.patientName}
                Please proceed to Doctor Room`
            );

        }

    }
);

// Load Display Data
async function loadDisplay() {

    try{

        const response =
        await fetch(API_URL);

        const data =
        await response.json();

        const patients =
        data.patients || [];

        const currentPatient =
        patients.find(
            p => p.status === "current"
        );

        const nextPatient =
        patients.find(
            p => p.status === "waiting"
        );

        const waitingPatients =
        patients.filter(
            p => p.status === "waiting"
        ).length;

        document.getElementById(
            "currentToken"
        ).innerText =
        currentPatient
            ? currentPatient.tokenNumber
            : "--";

        document.getElementById(
            "nextToken"
        ).innerText =
        nextPatient
            ? nextPatient.tokenNumber
            : "--";

        document.getElementById(
            "waitingCount"
        ).innerText =
        waitingPatients;

        if(currentPatient){

            document.getElementById(
                "announcementText"
            ).innerText =

            `Token ${currentPatient.tokenNumber}
            ${currentPatient.name}
            Please proceed to Doctor Room`;

        }

    }
    catch(error){

        console.log(error);

    }

}

// Live Clock
    function updateClock(){

        const now =
        new Date();

        document.getElementById(
            "liveClock"
        ).innerText =
        now.toLocaleTimeString();

        }

        setInterval(updateClock,1000);

        updateClock();

// ===============================
// Welcome Voice
// ===============================

window.onload = () => {

setTimeout(() => {

    speakAnnouncement(
        "Welcome to Queue Cure Smart Hospital Queue Management System"
    );

},1500);

};