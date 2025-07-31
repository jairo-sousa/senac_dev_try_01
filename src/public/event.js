// CREATE - UPDATE
function showEditModal(button) {

    const event = JSON.parse(button.dataset.event)
    form.dataset.editing = "true";
    form.dataset.eventId = event.id;

    form.elements.name.value = event.name;
    form.elements.date.value = new Date(event.date).toISOString().split('T')[0];
    form.elements.capacity.value = event.capacity;

    dataModal.showModal();
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
