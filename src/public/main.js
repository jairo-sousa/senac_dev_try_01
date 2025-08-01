console.log("+++++++ SENAC MUSIC HALL +++++++");

// FETCH
const sendFormData = async (route, method, bodyObj) => {
    const body = new URLSearchParams(bodyObj).toString()

    const response = await fetch(route, {
        method,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        credentials: "include"
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro ${response.status}: ${errorText}`);
        return
    }
}

const sendDeleteRequest = async (route) => {
    const response = await fetch(route, {
        method: "DELETE",
        credentials: "include"
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro ${response.status}: ${errorText}`);
        return
    }
}


// DOWNLOAD
function download(id, name) {
    const container = document.getElementById(id)

    var options = {
        margin: 1,
        filename: `${name}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf(container, options);
}