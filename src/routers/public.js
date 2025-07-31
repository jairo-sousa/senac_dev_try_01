const { Router } = require("express");
const { comparePassword } = require("../modules/handlePassword");
const { idToProfile } = require("../modules/userHelper")
const { ensureAuthenticated } = require("../authMiddleware");

const userController = require("../controllers/user");

const publicRouter = Router();

publicRouter.post("/auth", async (req, reply) => {
    const { password, email } = req.body;

    const findUser = await userController.getByEmail(email);

    if (!findUser)
        return reply.status(401).send({ message: "Credencial inválida" });

    const passwordMatch = await comparePassword(password, findUser.password);
    if (!passwordMatch)
        return reply.status(401).send({ message: "Credencial inválida" });

    req.session.authenticated = true;
    const profile_name = idToProfile(findUser.profile_id)
    req.session.user = { ...findUser, profile_name }

    reply.redirect("/");
});

publicRouter.get("/login", (req, reply) => {
    reply.render("login");
});

publicRouter.get("/logout", (req, reply) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        reply.redirect("/login");
    });
});

publicRouter.get("/", ensureAuthenticated, (req, reply) => {
    const { profile_id } = req.session.user

    if (profile_id === 1) return reply.redirect("/view/dashboard");
    if (profile_id === 2) return reply.redirect("/view/sales");
    if (profile_id === 3) return reply.redirect("/view/tickets");

    return reply.status(500).send({ message: "Erro interno" })
});

module.exports = publicRouter