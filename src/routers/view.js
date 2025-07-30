const { Router } = require("express");
const { ensureAuthenticated, authorizeRoles } = require("../authMiddleware");

const viewRouter = Router();

viewRouter.get("/login", (req, reply) => {
  reply.render("login");
});

viewRouter.get("/logout", (req, reply) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    reply.redirect("/login");
  });
});

viewRouter.get("/", ensureAuthenticated, (req, reply) => {
  const { profile_id } = req.session.user

  if (profile_id === 1) return reply.redirect("/view/dashboard");
  if (profile_id === 2) return reply.redirect("/view/sales");
  if (profile_id === 3) return reply.redirect("/view/tickets");

  return reply.status(500).send({ message: "Erro interno" })
});

//

viewRouter.get("/view/dashboard", ensureAuthenticated, authorizeRoles([1])
  , (req, reply) => {
    reply.render("dashboard", { user: req.session.user });
  });

viewRouter.get("/view/events", ensureAuthenticated, authorizeRoles([1])
  , (req, reply) => {
    reply.render("events", { user: req.session.user });
  });

viewRouter.get("/view/sectors", ensureAuthenticated, authorizeRoles([1])
  , (req, reply) => {
    reply.render("sectors", { user: req.session.user });
  });

viewRouter.get("/view/clients", ensureAuthenticated, authorizeRoles([1])
  , (req, reply) => {
    reply.render("clients", { user: req.session.user });
  });

viewRouter.get("/view/sales", ensureAuthenticated, authorizeRoles([1, 2])
  , (req, reply) => {

    reply.render("sales", { user: req.session.user });
  });

viewRouter.get("/view/tickets", ensureAuthenticated, authorizeRoles([1, 2, 3])
  , (req, reply) => {

    // TICKET OPTIONS BASED ON PROFILE ID 
    reply.render("tickets", { user: req.session.user });

  });

module.exports = viewRouter