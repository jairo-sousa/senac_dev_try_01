console.log("+++++++ SENAC MUSIC HALL +++++++");

const postFormData = async (route, bodyObj) => {
    const body = new URLSearchParams(bodyObj).toString()

    const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        credentials: "include"
    })

    return response
}
