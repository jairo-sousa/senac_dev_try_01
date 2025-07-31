const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    const response = await sendFormData("/auth", "POST", data)

    window.location.href = "/"
});

