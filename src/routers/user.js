const { Router } = require("express");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const userRouter = Router();
const userController = require("../controllers/user");
const userModel = require("../models/user");

userRouter.use(ensureAuthenticated, authorizeRoles([1]));

// VIEW
userRouter.get("/view/users", (req, reply) => {
  const response = userModel.getAll();
  response
    .then((users) => reply.status(200).render("users", {
      user: req.session.user, users
    })
    )
    .catch((error) => reply.status(500).render("error", { error }))
});

// CRUD
userRouter.get("/users/:id", async (req, reply) => {
  const { id } = req.params;

  const user = await userController.getById(id);

  return reply.status(200).send(user);
});

userRouter.get("/users", userController.getAll);
userRouter.post("/users", userController.post);
userRouter.put("/users/:id", userController.update);
userRouter.delete("/users/:id", userController.delete);
module.exports = userRouter;
