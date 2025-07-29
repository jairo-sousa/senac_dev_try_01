console.log("+++++++ SENAC MUSIC HALL +++++++");

const auth = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${email}&password=${password}`,
  });
};
