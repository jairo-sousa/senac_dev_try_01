// SEARCH
const searchInput = document.getElementById('tableSearchInput');

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

// DATA MODAL
const datamModal = document.getElementById("dataModal")
const form = datamModal.querySelector("form");

const closeModal = () => datamModal.close()

function showCreateModal() {
    form.reset();
    form.dataset.editing = "false";
    dataModal.showModal();
}

// CONFIRM MODAL
const confirmModal = document.getElementById("confirmModal")

const declineModal = () => confirmModal.close()

const showConfirm = (button) => {
    const { id } = button.dataset
    confirmModal.dataset.id = id
    confirmModal.showModal()
}

const removeData = async (route) => {
    const { id } = confirmModal.dataset

    await sendDeleteRequest(`${route}/${id}`)
    window.location.reload()
}