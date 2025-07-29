const express = require("express");
const app = express();

const routers = require("./routers");
const configApp = require("./configApp");

configApp(app, express);
routers(app);

const APP_PORT = process.env.APP_PORT || 3334;
const APP_HOST = process.env.APP_HOST || "localhost";

app.get("/login", (req, reply) => {
  req.session.visited = true;
  reply.render("login");
});

app.listen(APP_PORT, (error) => {
  if (error) throw new Error(`Problema ao iniciar servidor: ${error.message}`);

  console.log(`Servidor iniciado em http://${APP_HOST}:${APP_PORT}`);
});
