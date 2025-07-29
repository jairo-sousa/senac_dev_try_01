const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/user");
const user = require("../models/user");

// USER
userRouter.get("/users/:id", async (req, reply) => {
  const { id } = req.params;

  const users = await userController.getById(id);

  return reply.status(200).send(users[0]);
});

// CRUD
userRouter.get("/users", userController.getAll);
userRouter.post("/users", userController.post);
userRouter.put("/users", userController.update);
userRouter.delete("/users", userController.delete);

module.exports = userRouter;
