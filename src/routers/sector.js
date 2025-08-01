const { Router } = require("express");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const sectorRouter = Router();
const sectorController = require("../controllers/sector");
const sectorModel = require("../models/sector");

sectorRouter.use(ensureAuthenticated, authorizeRoles([1]));

// VIEW
sectorRouter.get("/view/sectors", (req, reply) => {
  const response = sectorModel.getAll();

  response
    .then((sectors) => reply.status(200).render("sectors", {
      user: req.session.user, sectors
    })
    )
    .catch((error) => reply.status(500).render("error", { error }))
});

// CRUD
sectorRouter.get("/sectors/:id", async (req, reply) => {
  const { id } = req.params;

  const sector = await sectorController.getById(id);

  return reply.status(200).send(sector);
});

sectorRouter.get("/sectors", sectorController.getAll);
sectorRouter.post("/sectors", sectorController.post);
sectorRouter.put("/sectors/:id", sectorController.update);
sectorRouter.delete("/sectors/:id", sectorController.delete);

module.exports = sectorRouter;
