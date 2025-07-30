const { Router } = require("express");
const { comparePassword } = require("../modules/handlePassword");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const { idToProfile } = require("../modules/userHelper")

const userRouter = Router();
const userController = require("../controllers/user");
const userModel = require("../models/user");

// VIEW
userRouter.get("/view/users", ensureAuthenticated, authorizeRoles([1])
  , (req, reply) => {
    const response = userModel.getAll();
    response
      .then((users) => reply.status(200).render("users", {
        user: req.session.user, users
      })
      )
      .catch((error) => reply.status(500).render("error", { error }))
  });

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
  const profile_name = idToProfile(findUser.profile_id)
  req.session.user = { ...findUser, profile_name }

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
