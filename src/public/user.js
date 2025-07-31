const modal = document.getElementById("modalUser")
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

    const user = JSON.parse(button.dataset.user)
    form.dataset.editing = "true";
    form.dataset.userId = user.id;

    form.elements.name.value = user.name;
    form.elements.email.value = user.email;
    form.elements.cpf.value = user.cpf;
    form.elements.password.value = ""
    form.elements.profile_id.value = user.profile_id;

    modal.showModal();
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

        console.log({ user, userId })

        const response = await sendFormData(`/users/${userId}`, "PUT", user)
        window.location.reload()
    } else {
        const response = await sendFormData("/users", "POST", user)
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
const removeUser = () => {
    const { id } = confirmModal.dataset

    console.log("Remover: ", id)

    confirmModal.close()
}

