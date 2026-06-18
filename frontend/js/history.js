const API_URL =
"http://localhost:5000/api/admin";

async function loadHistory() {

    const date =
    document.getElementById(
        "historyDate"
    ).value;

    if(!date){

        alert(
            "Please Select Date"
        );

        return;
    }

    try {

        const response =
        await fetch(
            `${API_URL}/history/${date}`
        );

        const data =
        await response.json();

        if(!data.success){

            alert(
                data.message
            );

            return;
        }

        const history =
        data.history;

        document.getElementById(
            "totalPatients"
        ).innerText =
        history.totalPatients;

        document.getElementById(
            "completedPatients"
        ).innerText =
        history.completed;

        document.getElementById(
            "skippedPatients"
        ).innerText =
        history.skipped;

        const table =
        document.getElementById(
            "historyTable"
        );

        table.innerHTML = "";

        history.patients.forEach(
            patient => {

            table.innerHTML += `

            <tr>

                <td>
                    ${patient.tokenNumber}
                </td>

                <td>
                    ${patient.name}
                </td>

                <td>
                    ${patient.queueType}
                </td>

                <td>
                    ${patient.status}
                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        alert(
            "Error Loading History"
        );

    }

}