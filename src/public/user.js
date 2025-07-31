// CREATE - UPDATE
function showEditModal(button) {

    const user = JSON.parse(button.dataset.user)
    form.dataset.editing = "true";
    form.dataset.userId = user.id;

    form.elements.name.value = user.name;
    form.elements.email.value = user.email;
    form.elements.cpf.value = user.cpf;
    form.elements.password.value = ""
    form.elements.profile_id.value = user.profile_id;

    datamModal.showModal();
}

async function saveUser(event) {
    event.preventDefault();
    const form = event.target;

    const user = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        cpf: form.elements.cpf.value,
        password: form.elements.password.value,
        profile_id: form.elements.profile_id.value,
    }

    if (form.dataset.editing && !user.password.length) {
        delete user.password;
    }

    if (form.dataset.editing == "true") {
        const { userId } = form.dataset

        await sendFormData(`/users/${userId}`, "PUT", user)
        window.location.reload()
    } else {
        await sendFormData("/users", "POST", user)
        window.location.reload()
    }
}


