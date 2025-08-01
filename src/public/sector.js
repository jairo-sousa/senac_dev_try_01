// CREATE - UPDATE
function showEditModal(button) {

    const sector = JSON.parse(button.dataset.sector)
    form.dataset.editing = "true";
    form.dataset.sectorId = sector.id;

    form.elements.name.value = sector.name;
    form.elements.capacity.value = sector.capacity;

    dataModal.showModal();
}

async function saveSector(htmlEvent) {
    htmlEvent.preventDefault();
    const form = htmlEvent.target;

    const sector = {
        name: form.elements.name.value,
        capacity: form.elements.capacity.value,
    }

    if (form.dataset.editing == "true") {
        const { sectorId } = form.dataset

        await sendFormData(`/sectors/${sectorId}`, "PUT", sector)
        window.location.reload()
    } else {
        await sendFormData("/sectors", "POST", sector)
        window.location.reload()
    }
}
