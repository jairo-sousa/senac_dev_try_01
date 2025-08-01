// CREATE - UPDATE
function showEditModal(button) {

    const client = JSON.parse(button.dataset.client)
    form.dataset.editing = "true";
    form.dataset.clientId = client.id;

    form.elements.name.value = client.name;
    form.elements.email.value = client.email;
    form.elements.cpf.value = client.cpf;

    datamModal.showModal();
}

async function saveClient(event) {
    event.preventDefault();
    const form = event.target;

    const client = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        cpf: form.elements.cpf.value,
    }

    if (form.dataset.editing == "true") {
        const { clientId } = form.dataset

        await sendFormData(`/clients/${clientId}`, "PUT", client)
        window.location.reload()
    } else {
        await sendFormData("/clients", "POST", client)
        window.location.reload()
    }
}

function mascara(i) {

    var v = i.value;

    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";

}

