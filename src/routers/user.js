const { Router } = require("express");
const { comparePassword } = require("../modules/handlePassword");
const userRouter = Router();

const userController = require("../controllers/user");

// USER

userRouter.post("/users/auth", async (req, reply) => {
  const { password, email } = req.body;

  const findUser = await userController.getByEmail(email);

  if (!findUser)
    return reply.status(401).send({ message: "Credencial inválida" });

  const passwordMatch = comparePassword(password, findUser.password);
  if (!passwordMatch)
    return reply.status(401).send({ message: "Credencial inválida" });

  req.session.authenticated = true;
  req.session.user = findUser

  reply.redirect("/");
});

userRouter.get("/users/auth/status", async (req, reply) => {
  const { cookie, id } = req.session;

  if (id) {
    return reply.status(200).send({ cookie, id });
  }

  return reply.status(400).send("Não autenticado");
});

userRouter.get("/users/:id", async (req, reply) => {
  const { id } = req.params;

  const user = await userController.getById(id);

  return reply.status(200).send(user);
});

// CRUD
userRouter.get("/users", userController.getAll);
userRouter.post("/users", userController.post);
userRouter.put("/users", userController.update);
userRouter.delete("/users", userController.delete);

module.exports = userRouter;
