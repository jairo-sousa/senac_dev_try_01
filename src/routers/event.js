const { Router } = require("express");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const eventRouter = Router();
const eventController = require("../controllers/event");
const eventModel = require("../models/event");

eventRouter.use(ensureAuthenticated, authorizeRoles([1]));

// VIEW
eventRouter.get("/view/events", (req, reply) => {
  const response = eventModel.getAll();

  response
    .then((events) => reply.status(200).render("events", {
      user: req.session.user, events
    })
    )
    .catch((error) => reply.status(500).render("error", { error }))
});

// CRUD
eventRouter.get("/events/:id", async (req, reply) => {
  const { id } = req.params;

  const event = await eventController.getById(id);

  return reply.status(200).send(event);
});

eventRouter.get("/events", eventController.getAll);
eventRouter.post("/events", eventController.post);
eventRouter.put("/events/:id", eventController.update);
eventRouter.delete("/events/:id", eventController.delete);

module.exports = eventRouter;
