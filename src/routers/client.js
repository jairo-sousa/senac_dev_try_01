const { Router } = require("express");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const clientRouter = Router();
const clientController = require("../controllers/client");
const clientModel = require("../models/client");

clientRouter.use(ensureAuthenticated, authorizeRoles([1]));

// VIEW
clientRouter.get("/view/clients", (req, reply) => {
  const response = clientModel.getAll();

  response
    .then((clients) => reply.status(200).render("clients", {
      user: req.session.user, clients
    })
    )
    .catch((error) => reply.status(500).render("error", { error }))
});

// CRUD
clientRouter.get("/clients/:id", async (req, reply) => {
  const { id } = req.params;

  const user = await clientController.getById(id);

  return reply.status(200).send(user);
});

clientRouter.get("/clients", clientController.getAll);
clientRouter.post("/clients", clientController.post);
clientRouter.put("/clients/:id", clientController.update);
clientRouter.delete("/clients/:id", clientController.delete);
module.exports = clientRouter;
