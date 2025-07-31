const modal = document.getElementById("modal")
const confirmModal = document.getElementById("confirmModal")

const form = modal.querySelector("form");

const closeModal = () => modal.close()

// CREATE - UPDATE
function showCreateModal() {
    form.reset();
    form.dataset.editing = "false";
    modal.showModal();
}

function showEditModal(button) {

    const event = JSON.parse(button.dataset.event)
    form.dataset.editing = "true";
    form.dataset.eventId = event.id;

    form.elements.name.value = event.name;
    form.elements.date.value = new Date(event.date).toISOString().split('T')[0];
    form.elements.capacity.value = event.capacity;

    modal.showModal();
}

async function saveEvent(htmlEvent) {
    htmlEvent.preventDefault();
    const form = htmlEvent.target;

    const event = {
        name: form.elements.name.value,
        date: form.elements.date.value,
        capacity: form.elements.capacity.value,
        user_id: form.dataset.userid
    }

    if (form.dataset.editing == "true") {
        const { eventId } = form.dataset
        delete event.user_id

        await sendFormData(`/events/${eventId}`, "PUT", event)
        window.location.reload()
    } else {
        await sendFormData("/events", "POST", event)
        window.location.reload()
    }
}

// REMOVE
const declineModal = () => confirmModal.close()

const showConfirm = (button) => {
    const { id } = button.dataset
    confirmModal.dataset.id = id
    confirmModal.showModal()
}

const removeEvent = async () => {
    const { id } = confirmModal.dataset

    await sendDeleteRequest(`/events/${id}`)
    window.location.reload()
}
