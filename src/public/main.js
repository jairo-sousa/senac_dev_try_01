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

const searchInput = document.getElementById('tableSearchInput');

if (searchInput) {
    searchInput.addEventListener('input', function () {
        const search = this.value.toLowerCase();
        const rows = document.querySelectorAll('table tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const match = Array.from(cells).some(cell =>
                cell.textContent.toLowerCase().includes(search)
            );

            row.style.display = match ? '' : 'none';
        });
    });
}