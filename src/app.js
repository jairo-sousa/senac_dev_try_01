const express = require("express");
const app = express();

const routers = require("./routers");
const configApp = require("./configApp");

configApp(app, express);
routers(app);

const APP_PORT = process.env.APP_PORT || 3334;
const APP_HOST = process.env.APP_HOST || "localhost";

app.get("/dashboard", (req, reply) => {
  reply.render("dashboard");
});

app.get("/", (req, reply) => {
  reply.redirect("/login");
});

app.get("/login", (req, reply) => {
  reply.render("login");
});

app.get("/logout", (req, reply) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    reply.redirect("/login");
  });
});

app.listen(APP_PORT, (error) => {
  if (error) throw new Error(`Problema ao iniciar servidor: ${error.message}`);

  console.log(`Servidor iniciado em http://${APP_HOST}:${APP_PORT}`);
});
