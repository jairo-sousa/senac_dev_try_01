console.log("+++++++ SENAC MUSIC HALL +++++++");

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
